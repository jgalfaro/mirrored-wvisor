function [D]=distance_url_fast2(ind, rest, features, keyMatbyVal, valMat)
% Calculates the distances between the ind-th url and rest-th url	 

% ind = 1;
D = zeros(length(ind),length(rest));
% dist1 for paths
Dj = zeros(length(ind),length(rest));
% Dj = zeros(length(ind),length(rest));
for ii=1:length(ind)
    for jj=1:length(rest)
        LSC_length = LCS_fast(features{ind(ii),1},features{rest(jj),1});
        Dj(ii,jj) = LSC_length/(length(features{ind(ii),1})+length(features{rest(jj),1})-LSC_length);
    end
end
% Dj = 1- Dj;

% dist2 for (key, values) pairs
flag_Dkv = 0;
if ~isempty(valMat) && ~isempty(keyMatbyVal)
%     Dv = pdist2(valMat(ind,:), valMat(rest,:), 'jaccard');
%     [vi_r, vi_c] = find(Dv<1);
    % number of common values, urls x urls matrix, (i, j) -> 1 if i-th url
    % and j-th url have one common value, else 0
    temp = valMat(ind,:)*valMat(rest,:)';
    % coords of urls having at least one common value in valMat
    [vi_r, vi_c] = find(temp>=1);
    Dk = zeros(length(ind),length(rest));
    for ii=1:length(vi_r) % for each distance
        % ind(vi_r(ii)) inner iterator between 1 and url number
        % rest(vi_c(ii)) outer iterator between 1 and url number
        % index(es) of common value(s)
        inds = find(valMat(ind(vi_r(ii)),:).*valMat(rest(vi_c(ii)),:));
        % index(es) of the union value(s)
        inds_union = find(valMat(ind(vi_r(ii)),:)+valMat(rest(vi_c(ii)),:));
        %disp('ind');
        %disp(ind(vi_r(ii)));
        %disp('rest');
        %disp(rest(vi_c(ii)));
        if isempty(inds) % for debugging, shouldn't happen
           error('index empty!'); 
        end
%         prepare factors to add basic similarity then only value matched
        factor = length(inds)/length(inds_union);
        % LCS of keys associated with common values
        Dk(vi_r(ii),vi_c(ii)) = (factor+LCS_fast_bunch(keyMatbyVal(ind(vi_r(ii)),:),keyMatbyVal(rest(vi_c(ii)),:),inds))/2;    
    end
    flag_Dkv = 1;
end
% Dk = 1-Dk;

% compute final distance
% identify if ind-th url has attributes
[temp1,ignore] = find(sum(valMat(ind,:),2));
% identify if rest-th urls have attributes
[temp2,ignore] = find(sum(valMat(rest,:),2));
weightMat = zeros(length(ind),length(rest));
weightMat(temp1,:) = weightMat(temp1,:) +1;
weightMat(:,temp2) = weightMat(:,temp2) +1;

weight_num = unique(weightMat);
if weight_num>3
    disp(weight_num);
    error('weight matrix error');
end
        
ind2 = find(weightMat==2);
ind1 = find(weightMat==1);
ind0 = find(weightMat==0);

% Use only paths
D(ind0) = 1-Dj(ind0);
% Use only paths, but URLs are more distants
D(ind1) = 1-Dj(ind1)/2;
% Use paths and key/values pairs
if ~isempty(valMat) && ~isempty(keyMatbyVal)
    D(ind2) = (1-Dj(ind2)*0.5-Dk(ind2)*0.5);
end
    
end

% debug testing
% LCS_fast_bunch(keyMatbyVal(vi_r(ii),:),keyMatbyVal(vi_c(ii),:),inds);    
