#!/bin/bash

echo -n "[+] Clusters typing and remove duplicates..."
    for file in `ls data/clusters/coarse_grained/`
    do
        # split into path - keys - vals
        url_parsing/url_parser_nopickle.py data/clusters/coarse_grained/$file tmp/
        # remplace values by types
        ./run_regex.sh tmp/only_vals ./tmp/only_vals_typed > /dev/null
        # rebuild full urls (with paths, keys and vals)
        typing/build_url.py tmp/only_paths tmp/only_keys tmp/only_vals_typed tmp/$file"_typed"
        # it's okay to sort because we build full urls before
        cat tmp/$file"_typed" | sort | uniq > data/clusters/coarse_typed/$file"_typed_nodups"
        rm -rf tmp/*
    done
echo " DONE"
