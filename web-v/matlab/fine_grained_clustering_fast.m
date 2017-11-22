% fine grained clustering fast
% take data from 
% '../data/clusters/coarse_typed/coarse-grain-index-13_typed'
tic;
% profile on;
% input_file = '../data/clusters/coarse_typed/coarse-grain-indexes-13_typed_large';
input_file = '../data/clusters/coarse_typed/coarse-grain-indexes-17_typed_nodups';
% input_file = './test_data/test.txt';

% reading urls from files
disp('reading urls');
fid = fopen(input_file,'r');
aLine = fgets(fid);
urls = cell(300000,1);
counter = 1;
counter_kv = 0;
while ischar(aLine)
    urls{counter} = aLine;
    counter = counter+1;
    aLine = fgets(fid);
end
urls = urls(1:counter-1,:);
fclose(fid);

[urls] = unique(urls);

% feature extraction
disp('getting features');
features = cell(length(urls),2);
for ii=1:length(urls)
    temp = regexp(urls{ii},'?','split');
    if length(temp)==1
        path = temp{1};
        kv_cell = cell(1);
    end
    if length(temp)==2
        path = temp{1};
        query = temp{2};
        items = regexp(query,'&','split');
        kv = cell(length(items),2);
        counter_kv = counter_kv + length(items);
        for jj=1:length(items)
            kv(jj,:) = regexp(items{jj},'=','split'); 
        end
        kv_cell = cell(1);
        kv_cell{1} = kv;
    end
    features(ii,:) = [path,kv_cell];
end



% transform key and value measure in to matrix
disp('data transformation');
temp = cell(counter_kv,3);
counter_temp = 1;
for ii=1:length(features(:,1))
    aFeature = features{ii,2};
    if ~isempty(aFeature)
        for jj=1:length(aFeature(:,1))
            temp{counter_temp,1} = ii;
            temp(counter_temp,2:3) = aFeature(jj,:);
            counter_temp = counter_temp + 1;
        end
    end
end
keyRef = unique(temp(:,2));
valRef = unique(temp(:,3));
[ignore,indk] = ismember(temp(:,2),keyRef);
[ignore,indv] = ismember(temp(:,3),valRef);

% keyMat = zeros(length(features(:,1)),length(keyRef));
keyMat = full(sparse(cell2mat(temp(:,1)),indk,ones(length(indk),1),length(features(:,1)),length(keyRef)));
valMat = full(sparse(cell2mat(temp(:,1)),indv,ones(length(indv),1),length(features(:,1)),length(valRef)));

disp('starting clustering');
k = 3;
eps = 0.5;
% [class,type] = dbscan_fast(features, keyMat, valMat, 3, 0.5);
[class,type] = dbscan_fast_DP(features, keyMat, valMat, k, eps);

disp('putting clusters in files');
class = class';
type = type';
cluster_num = max(class);
clusters = cell(cluster_num,1);
clusters{1} = urls(find(class<=0));
for ii=1:length(clusters)
    clusters{ii+1} = urls(find(class==ii));
end
toc;


folder_out = './clusters/';

disp('MDS');
D = distance_url_fast([1:length(features(:,1))], [1:length(features(:,1))], features, keyMat, valMat);
mds_dbscan(D, urls, class, folder_out);

disp('Dunn index');
[D2, class2] = filter_out_noise(D, class);
if class == -1
    clusters_number = 0;
else
    clusters_number = length(clusters)-1;
end
DI = dunn_index(clusters_number, D2, class2, folder_out, k, eps);
    
% writing clusters to file
for ii=1:length(clusters)
    path_out_clusters = strcat(folder_out, num2str(ii-1),'.txt');
    writeClustersToFile(clusters{ii},path_out_clusters);
end

% D = distance_url_fast([1:length(features(:,1))], [1:length(features(:,1))], features, keyMat, valMat);
% mean(mean(D))

% D1 = D;
% D2 = D;
% mean(mean(D1))
% mean(mean(D2))

% profile off;
% T = profile('info');
% profile viewer
% temp
% 228813*60/3600
% distance_url_fast(1, features, keyMat, valMat)
% y tmp/only_paths tmp/only_keys tmp/only_vals tmp/distance_matrix