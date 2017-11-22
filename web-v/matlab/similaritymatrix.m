input_file = '13.txt';

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

% [urls] = unique(urls);

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

valRef = unique(temp(:,3));
[ignore,indv] = ismember(temp(:,3),valRef);
valMat = full(sparse(cell2mat(temp(:,1)),indv,ones(length(indv),1),length(features(:,1)),length(valRef)));
keyMatbyVal = cell(size(valMat));
for ii=1:length(temp(:,1))
    keyMatbyVal(temp{ii,1},indv(ii)) = temp(ii,2);
end

%disp('starting clustering');
% [class,type] = dbscan_fast_DP2(features, keyMatbyVal, valMat, k, eps);

disp('distance matrix');
D = distance_url_fast2([1:length(features(:,1))], [1:length(features(:,1))], features, keyMatbyVal, valMat);

D = 1-D;
imagesc(D);
colormap('jet');
colorbar;
