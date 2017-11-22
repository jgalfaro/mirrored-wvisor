% write mds visualization data for dbscan
function [res]=mds_dbscan(D, urls, class, folder_out)
    [Y,eigvals] = cmdscale(D);
    res = 0;
    % write Y
    % for each dbscan cluster
    filename = strcat(folder_out, 'mds.tsv');
    fid = fopen(filename,'w');
    fprintf(fid,'%s\t%s\t%s\t%s\t%s\n', 'x', 'y', 'z', 'cluster', 'url');
    urls = cellstr(urls);
    for ii=1:length(urls)
        if ~isempty(urls(ii))
            if class(ii) == -1
                class(ii) = 0;
            end
            [a b] = size(Y(ii,:));
            if b < 3
                continue;
            end
            Y(ii,1);
            Y(ii,2);
            Y(ii,3);
            class(3);
            urls{ii};
            %line = strcat(Y(ii,1),'\t',Y(ii,2),'\t',Y(ii,3),'\t',class(ii),'\t',urls(ii));
            fprintf(fid,'%f\t%f\t%f\t%i\t%s',Y(ii,1),Y(ii,2),Y(ii,3),class(ii),urls{ii});
        end
    end
    fclose(fid);
    % write eigvals
    filename = strcat(folder_out, 'mds_eigvals');
    fid = fopen(filename, 'w');
    for ii=1:length(eigvals)
        fprintf(fid,'%f\n',eigvals(ii));
    end
    fclose(fid);
    res = 1;
end