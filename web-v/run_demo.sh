#!/bin/bash

#echo -n "[+] Parsing URLs..."
#`url_parsing/url_parser.py data/url/unique-sort-pathkeysval data/url/`
#echo " DONE"
#
#echo "[+] Extracting features..."
#echo -n "	  [+] Calculating character frequency distribution for paths..."
#`ascii_freq_distr/char_freq_distr.py data/url/only_paths data/features/paths_freq_distr`
#echo " DONE"
#echo -n "	  [+] Calculating character frequency distribution for keys..."
#`ascii_freq_distr/char_freq_distr.py data/url/only_keys data/features/keys_freq_distr`
#echo " DONE"
#echo -n "	  [+] Calculating character frequency distribution for vals..."
#`ascii_freq_distr/char_freq_distr.py data/url/only_vals data/features/vals_freq_distr`
#echo " DONE"
#echo -n "[+] Creating feature vectors..."
#`paste -d, data/features/paths_freq_distr data/features/keys_freq_distr data/features/vals_freq_distr > data/features/feature_vectors`
#echo " DONE"
#
#echo "[+] Coarse clustering..."
#echo -n "	   [+] K-means clustering..."
#`clustering/kmeans.py data/features/feature_vectors data/clusters/coarse-indexes-30-clusters`
#echo " DONE"
#echo -n "	   [+] Creating cluster files..."
#`clustering/create-cluster-files.py data/url/unique-sort-pathkeysval data/clusters/coarse-indexes-30-clusters data/clusters/coarse/`
#echo " DONE"

echo -n "[+] Clusters typing..."
    for file in `ls data/clusters/coarse/`
    do
        # split into path - keys - vals
        url_parsing/url_parser.py data/clusters/coarse/$file tmp/
        ./run_regex.sh tmp/only_vals ./tmp/only_vals_typed
        typing/build_url.py tmp/only_paths tmp/only_keys tmp/only_vals_typed data/clusters/coarse_typed/$file"_typed"
        rm -rf tmp/*
    done
echo " DONE"
