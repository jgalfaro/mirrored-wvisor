#!/bin/bash

echo -n "[+] Clusters typing and remove duplicates..."
    for file in `ls data/clusters/coarse_grained/`
    do
        # split into path - keys - vals
        url_parsing/url_parser.py data/clusters/coarse_grained/$file tmp/
        ./run_regex.sh tmp/only_vals ./tmp/only_vals_typed
        typing/build_url.py tmp/only_paths tmp/only_keys tmp/only_vals_typed tmp/$file"_typed"
        url_parsing/remove_duplicates.py tmp/$file"_typed" data/clusters/coarse_typed/$file"_typed_nodups"
        rm -rf tmp/*
    done
echo " DONE"
