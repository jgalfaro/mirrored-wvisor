#!/bin/bash

if [ $# -ne 1 ]; then
    echo "Usage: $0 <cluster_file>"
    echo "  cluster_file: File containing the cluster to generate the signatures."
    exit 1
else
    cluster_file=$1
fi

echo -n "[+] Generating signatures..."
signatures/signature-generator.py $cluster_file > tmp/sigfile
signatures/sigGen.py tmp/sigfile data/signatures
echo " DONE"
