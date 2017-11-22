cd matlab

echo ${1}
matlab -nodisplay -nosplash -r "fine_grained_clustering_fast_func('../data/clusters/coarse_typed/${1}','../data/clusters/${1}_'); quit;" -logfile ${1}.log > /dev/null
