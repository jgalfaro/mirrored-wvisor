cd matlab

echo ${1}
matlab -nodisplay -nosplash -r "fine_grained_clustering_fast_func2('../data/clusters/coarse_typed/${1}','../data/clusters/${1}_', 3, 0.5, 1, 1); quit;" -logfile ${1}.log > /dev/null
