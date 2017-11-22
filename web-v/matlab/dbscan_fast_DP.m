function [class,type]=dbscan_fast_DP(features, keyMat, valMat, k, Eps)

% k = 3;
% Eps = 0.5;

[m,n]=size(features);

type=zeros(1,m);
class=zeros(1,m);
no=1;
touched=zeros(m,1);

for i=1:m
    if touched(i)==0;
%        D=dist(ob(2:n),x(:,2:n));
       rest = find(touched==0);
       D = distance_url_fast(i, rest, features, keyMat, valMat);
       ind = rest(find(D<=Eps));
       
    
       if length(ind)>1 & length(ind)<k+1       
          type(i)=0;
          class(i)=0;
       end
       if length(ind)==1
          type(i)=-1;
          class(i)=-1;  
          touched(i)=1;
       end

       if length(ind)>=k+1
          type(i)=1;
          class(ind)=ones(length(ind),1)*max(no);
          touched(i)=1;
          touched(ind)=1;
          
          while ~isempty(ind)
                rest = find(touched==0);
                D = distance_url_fast(ind(1), rest, features, keyMat, valMat);

                ind(1)=[];
%                 disp(length(ind));
%                 D=dist(ob(2:n),x(:,2:n));
                i1 = rest(find(D<=Eps));
     
                if length(i1)>0
                   class(i1)=no;
                   type(i1)=1;
                   ind = [ind;i1];
                   touched(i1) = 1;
                end
          end
          no=no+1; 
       end
   end
end

i1=find(class==0);
class(i1)=-1;
type(i1)=-1;

end





