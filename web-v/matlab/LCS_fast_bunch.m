function [dist] = LCS_fast_bunch(X_bunch,Y_bunch,inds)
%%%Calculates the longest common substring between two strings.
%%%Code written by David Cumin
%%%email: d.cumin@auckland.ac.nz
%%%INPUT
%%%X, Y - both are strings e.g. 'test' or 'stingtocompare'
%%%OUTPUT
%%%D is the substring over the length of the shortest string
%%%dist is the length of the substring
%%%aLongestString is a sting of length dist (only one of potentially many)

%%%For example
%%% X = 'abcabc';
%%% Y = 'adcbac';
%%% [D dist str] = LCS(X,Y);
%%% results in:
%%% D = 0.6667 
%%% dist = 4
%%% str = acbc
%%% this is seen for X: 'a-c-bc' and Y: 'a-cb-c'

sx = length(inds);
dist = 0;

for ii=1:sx
    LCS_length = LCS_fast(X_bunch{inds(ii)}, Y_bunch{inds(ii)});
    dist = dist + LCS_length/(length(X_bunch{inds(ii)})+length(Y_bunch{inds(ii)})-LCS_length);
end
dist = dist/sx;

end