#!/bin/bash

echo -n "[+] Extracting features..."
`ascii_freq_distr/char_freq_distr.py data/url/only_paths data/url/only_keys data/url/only_vals data/features/feature_vectors`
echo " DONE"
