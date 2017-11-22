function [class,type]=fine_grained_clustering_fast_func2(input_file, folder_out, distance, k, eps, enableMDS, enableDunn)
tic;
%Fine-grained malware URL clustering using DBScan kernel
% [class,type]=fine_grained_clustering_fast_flexible_func(input_file, folder_out)
% input_file: path to a coarse-grain-index typed file
% folder_out: path to the output directory
% distance: distance function, 'v1-KeyMat' or 'v2-KeyMatByVal'
% enableMDS: calculate MDS projection and output results in folder_out 
% enableDunn: calculate Dunn index and output results in folder_out
%
% class: cluster index for each point (-1 indicates a noise point)
% type: core, border, noise points are represented by 1, 0, -1. The
% identification of border points are probably not complete at the
% tradeoff of runtime performance. It won't generate any problem in our use
% case.
%



% input_file = './data/clusters/coarse_typed/coarse-grain-indexes-13_typed';
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
        % kv: key/value pair
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
for ii=1:length(features(:,1)) % paths
    aFeature = features{ii,2}; % keys
    if ~isempty(aFeature)
        for jj=1:length(aFeature(:,1)) % for each key
            % temp = [path_id, key, value]
            temp{counter_temp,1} = ii;
            temp(counter_temp,2:3) = aFeature(jj,:);
            counter_temp = counter_temp + 1;
        end
    end
end
if (strcmp(distance,'v1-KeyMat'))
    % unique keys
    keyRef = unique(temp(:,2));
    % unique values
    valRef = unique(temp(:,3));
    % what is the key of temp(:,2) in keyRef wuth key id
    [ignore,indk] = ismember(temp(:,2),keyRef);
    % same thing for values
    [ignore,indv] = ismember(temp(:,3),valRef);

    % keyMat = zeros(length(features(:,1)),length(keyRef));
    % rows: urls, columns: unique key, 1 if the URL contrains this key, else 0
    keyMat = full(sparse(cell2mat(temp(:,1)),indk,ones(length(indk),1),length(features(:,1)),length(keyRef)));
    % rows: urls, columns: unique value, 1 if the URL contrains this value, else 0
    valMat = full(sparse(cell2mat(temp(:,1)),indv,ones(length(indv),1),length(features(:,1)),length(valRef)));
end
if (strcmp(distance,'v2-KeyMatByVal'))
    % unique values
    valRef = unique(temp(:,3));
    % what is the value of temp(:,3) in valRef with val id
    [ignore,indv] = ismember(temp(:,3),valRef);
    % rows: urls, columns: unique value, 1 if the URL contrains this value, else 0
    valMat = full(sparse(cell2mat(temp(:,1)),indv,ones(length(indv),1),length(features(:,1)),length(valRef)));
    keyMatbyVal = cell(size(valMat));
    for ii=1:length(temp(:,1)) % for each url
        % (url_id, value_id) -> key for each key/value pair
        keyMatbyVal(temp{ii,1},indv(ii)) = temp(ii,2);
    end
end

disp('starting clustering');
% [class,type] = dbscan_fast(features, keyMat, valMat, k, eps);
if (strcmp(distance,'v1-KeyMat'))
    [class,type] = dbscan_fast_DP(features, keyMat, valMat, k, eps);
end
if (strcmp(distance,'v2-KeyMatByVal'))
    [class,type] = dbscan_fast_DP2(features, keyMatbyVal, valMat, k, eps);
end

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


if (enableMDS + enableDunn > 0)
    if (strcmp(distance,'v1-KeyMat'))
        D = distance_url_fast([1:length(features(:,1))], [1:length(features(:,1))], features, keyMat, valMat);
    end
    if (strcmp(distance,'v2-KeyMatByVal'))
        D = distance_url_fast2([1:length(features(:,1))], [1:length(features(:,1))], features, keyMatbyVal, valMat);
    end
    D(isnan(D)) = 0;
end

if (enableMDS==1)
    disp('calculating MDS');
    mds_dbscan(D, urls, class, folder_out);
end

if (enableDunn==1)
    disp('calculating Dunn index');
    DI = dunn_index(length(clusters), D, class, folder_out, k, eps);
end

% writing clusters to file
for ii=1:length(clusters)
    path_out = strcat(folder_out, num2str(ii-1),'.txt');
    writeClustersToFile(clusters{ii},path_out);
end
end
