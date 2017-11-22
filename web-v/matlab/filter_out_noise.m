% Filter out noise cluster from parameters

function [D, class]=filter_out_noise(D, class)
   n = length(class);
   [a b] = size(unique(class));
   if ~(a == 1 && b == 1)
       for ii=n:-1:1
           %if class(ii) ~= -1
           %    class2 = [class2; class(ii)];
           %    D2 = [D2; D(ii, :)];
           %end
           if class(ii) == -1
               class(ii) = [];
               D(ii,:) = [];
               D(:,ii) = [];
           end
       end
   else
       class = -1;
   end
   %D2 = cell2mat(D2);
   %D2 = D2(1:length(D2(:,1)), 1:length(D2(:,1)));
end