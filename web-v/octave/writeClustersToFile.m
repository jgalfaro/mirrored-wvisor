function [ res ] = writeClustersToFile( urls, filename )
% Summary of this function goes here
%   writeTipsToFile( tips,filename )

res = 0;
fid = fopen(filename,'w');
for ii=1:length(urls)
    fprintf(fid,'%s',urls{ii});
end
fclose(fid);

res = 1;

end

