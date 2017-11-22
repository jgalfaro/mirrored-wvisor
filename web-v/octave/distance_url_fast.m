function [D]=distance_url_fast(ind, rest, features, keyMat, valMat)
% Calculates the distances between the i-th url and all url	 

% ind = 1;

% dist1
Dj = zeros(length(ind),length(rest));
% Dj = zeros(length(ind),length(rest));
for ii=1:length(ind)
    for jj=1:length(rest)
        Dj(ii,jj) = LCS_fast(features{ind(ii),1},features{rest(jj),1})/...
            max(length(features{ind(ii),1}),length(features{rest(jj),1}));
    end
end

% dist2
function d = jaccard(u, v)
  ## Jaccard distance, one minus the percentage of non-zero coordinates
  ## that differ
  sv2 = size(v, 2);
  for i = 1:sv2
    v(:,i) = (v(:,i) == u(i)) && (u(i) || v(:,i));
  endfor
  d = 1 - sum (v,2)./sv2;
endfunction

%Dk = pdist2(keyMat(ind,:), keyMat(rest,:),  'jaccard');
Dk = jaccard(keyMat(ind,:), keyMat(rest,:));
% dist3
%Dv = pdist2(valMat(ind,:), valMat(rest,:), 'jaccard');
Dv = jaccard(valMat(ind,:), valMat(rest,:));

D = (Dj+Dk+Dv)/3;

end

