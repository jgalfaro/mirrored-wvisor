% temporal test file
input_file = '../data/clusters/coarse_typed/coarse-grain-indexes-13_typed_nodups';
folder_out = './clusters/';
[class,type]=fine_grained_clustering_fast_func(input_file, folder_out);

[class,type]=fine_grained_clustering_fast_func2(input_file, folder_out, 3, 0.5, 0, 0);

