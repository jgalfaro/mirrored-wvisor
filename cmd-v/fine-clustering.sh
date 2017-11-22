#!/bin/bash

if [ $# -ne 1 ]; then
    echo "Usage: $0 <coarse_cluster>"
    exit 1
else
    cluster_file=$1
fi

echo "[+] Fine grain clustering..."
echo -n "          [+] Parsing URLs from coarse clusters..."
url_parsing/url_parser.py $cluster_file tmp
echo " DONE"
echo -n "          [+] Computing distance matrix..."
clustering/distance-matrix.py tmp/only_paths tmp/only_keys tmp/only_vals tmp/distance_matrix
echo " DONE"
echo -n "	   [+] DBScan clustering..."
clustering/DBScan.py tmp/distance_matrix data/clusters/fine-grain-indexes
echo " DONE"
echo -n "	   [+] Creating cluster files..."
clustering/create-cluster-files.py $cluster_file data/clusters/fine-grain-indexes data/clusters/fine_grained
echo " DONE"
echo -n "          [+] Removing duplicates..."
for file in `ls data/clusters/fine_grained/`
do
    url_parsing/remove_duplicates.py data/clusters/fine_grained/$file data/clusters/fine_grained_nodups/$file"_nodups" &> /dev/null
done
echo " DONE"
