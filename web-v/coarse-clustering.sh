#!/bin/bash

echo "[+] Coarse clustering..."
echo -n "	   [+] K-means clustering..."
clustering/kmeans.py data/features/feature_vectors data/clusters/coarse-grain-indexes 30
echo " DONE"
echo -n "	   [+] Creating cluster files..."
clustering/create-cluster-files.py extracted_data data/clusters/coarse-grain-indexes data/clusters/coarse_grained/
echo " DONE"
