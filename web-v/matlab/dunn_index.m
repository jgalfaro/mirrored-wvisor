% https://en.wikipedia.org/wiki/Cluster_analysis#Evaluation_of_clustering_results    
% D = \min_{1\leq i \leq n}\left\{\min_{1\leq j \leq n,i\neq j}\left\{\frac {d(i,j)}{\max_{1\leq k \leq n}{d^{'}(k)}}\right\}\right\} 
% where d(i,j) represents the distance between clusters i and j, and d^{'}(k) measures the intra-cluster distance of cluster k. The inter-cluster distance d(i,j) between two clusters may be any number of distance measures, such as the distance between the centroids of the clusters. Similarly, the intra-cluster distance d^{'}(k) may be measured in a variety ways, such as the maximal distance between any pair of elements in cluster k
% higher is better
% from http://www.mathworks.fr/matlabcentral/fileexchange/27859-dunns-index
% if = -1, only noise

function [DI]=dunn_index(clusters_number, distM, ind, folder_out, k, eps)
%%%Dunn's index for clustering compactness and separation measur=ement
% dunns(clusters_number,distM,ind)
% clusters_number = Number of clusters 
% distM = Dissimilarity matrix
% ind   = Indexes for each data point aka cluster to which each data point
% belongs
if clusters_number == 0
    DI = -1;
else
    i=clusters_number;
    denominator=[];

    for i2=1:i
        indi=find(ind==i2);
        indj=find(ind~=i2);
        x=indi;
        y=indj;
        temp=distM(x,y);
        denominator=[denominator;temp(:)];
    end

    num=min(min(denominator)); 
    neg_obs=zeros(size(distM,1),size(distM,2));

    for ix=1:i
        indxs=find(ind==ix);
        neg_obs(indxs,indxs)=1;
    end

    dem=neg_obs.*distM;
    dem=max(max(dem));

    DI=num/dem;
end
fid = fopen(strcat(folder_out, 'dunn.txt'), 'w');
fprintf(fid, 'k: %i\n', k);
fprintf(fid, 'Eps: %f\n', eps);
fprintf(fid, 'dunn: %f\n', DI);
fclose(fid);
end