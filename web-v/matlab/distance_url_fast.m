function [D]=distance_url_fast(ind, rest, features, keyMat, valMat)
% Calculates the distances between the ind-th url and the rest-th url

% ind = 1;

% dist1 for paths
Dj = zeros(length(ind),length(rest));
% Dj = zeros(length(ind),length(rest));
for ii=1:length(ind)
    for jj=1:length(rest)
        Dj(ii,jj) = LCS_fast(features{ind(ii),1},features{rest(jj),1})/...
            max(length(features{ind(ii),1}),length(features{rest(jj),1}));
    end
end
Dj = 1- Dj;

% dist2 for keys
flag_Dk = 0;
if ~isempty(keyMat)
    Dk = pdist2(keyMat(ind,:), keyMat(rest,:),  'jaccard');
    flag_Dk = 1;
end
% dist3 for values
flag_Dv = 0;
if ~isempty(keyMat)
    Dv = pdist2(valMat(ind,:), valMat(rest,:), 'jaccard');
    flag_Dv = 1;
end

% return final distance which is the mean of the 3 distances
if flag_Dk==1 && flag_Dv==1
    D = (Dj+Dk+Dv)/3;
end
if flag_Dk==1 && flag_Dv==0
    D = (Dj+Dk)/2;
end
if flag_Dk==0 && flag_Dv==1
    D = (Dj+Dv)/2;
end
if flag_Dk==0 && flag_Dv==0
    D = Dj;
end

end

