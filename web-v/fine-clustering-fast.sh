#!/bin/bash

ls data/clusters/coarse_typed | parallel ./fine-clustering-task.sh {}

for f in `ls data/clusters/coarse-grain-indexes-*_typed_*.txt`
do
    echo "removing duplicates in ${f}"
    sort $f | uniq > ${f}_final
    rm ${f}
done
