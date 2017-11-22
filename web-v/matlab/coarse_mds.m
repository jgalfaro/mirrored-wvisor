tic;
% profile on;
features_file = '../data/features/feature_vectors';
disp('getting features');
fid = fopen(features_file,'r');
aLine = fgets(fid);
features = zeros(10000,379);
%urls = cell(3000000,1);
counter = 1;
%counter_kv = 0;
while ischar(aLine)
    temp = regexp(aLine,',','split');
    features(counter,:) = str2double(temp);
    %format long;
    %for x = 1:379
        %disp(temp(x))
    %    features(counter, x) = str2double(temp(x));
    %end
    %urls{counter} = aLine;
    counter = counter+1;
    aLine = fgets(fid);
end
%features = features(1:counter-1,:);
%urls = urls(1:counter-1,:);
fclose(fid);

disp('PCA');
[PC,Score,latent] = princomp(features);

disp('Writing file')
path_out = 'matlab_coarse_pca.txt';
fid = fopen(path_out,'w');
for ii=1:counter
    fprintf(fid,'%s\t%s\n',Score(ii,1), Score(ii,2));
end
fclose(fid);
% end

toc;

% transform key and velue measure in to matrix
% disp('data transformation');
% temp = cell(counter_kv,3);
% counter_temp = 1;
% for ii=1:length(features(:,1))
%     aFeature = features{ii,2};
%     if ~isempty(aFeature)
%         for jj=1:length(aFeature(:,1))
%             temp{counter_temp,1} = ii;
%             temp(counter_temp,2:3) = aFeature(jj,:);
%             counter_temp = counter_temp + 1;
%         end
%     end
% end
% keyRef = unique(temp(:,2));
% valRef = unique(temp(:,3));
% [ignore,indk] = ismember(temp(:,2),keyRef);
% [ignore,indv] = ismember(temp(:,3),valRef);
% 
% % keyMat = zeros(length(features(:,1)),length(keyRef));
% keyMat = full(sparse(cell2mat(temp(:,1)),indk,ones(length(indk),1),length(features(:,1)),length(keyRef)));
% valMat = full(sparse(cell2mat(temp(:,1)),indv,ones(length(indv),1),length(features(:,1)),length(valRef)));
% 
% 
% disp('starting clustering');
% % [class,type] = dbscan_fast(features, keyMat, valMat, 3, 0.5);
% [class,type] = dbscan_fast_DP(features, keyMat, valMat, 3, 0.5);
% 
% disp('putting clusters in files');
% class = class';
% type = type';
% cluster_num = max(class);
% clusters = cell(cluster_num,1);
% clusters{1} = urls(find(class=<0));
% for ii=1:length(clusters)
%     clusters{ii+1} = urls(find(class==ii));
% end
% toc;
% 
% % writing clusters to file
% folder_out = './clusters/';
% for ii=1:length(clusters)
%     path_out = strcat(folder_out, num2str(ii-1),'.txt');
%     writeClustersToFile(clusters{ii},path_out);
% end
% 
% % D = distance_url_fast([1:length(features(:,1))], [1:length(features(:,1))], features, keyMat, valMat);
% % mean(mean(D))
% 
% % D1 = D;
% % D2 = D;
% % mean(mean(D1))
% % mean(mean(D2))
% 
% % profile off;
% % T = profile('info');
% % profile viewer
% % temp
% % 228813*60/3600
% % distance_url_fast(1, features, keyMat, valMat)
% % y tmp/only_paths tmp/only_keys tmp/only_vals tmp/distance_matrix