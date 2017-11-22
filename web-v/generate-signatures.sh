#!/bin/bash

if [ $# -ne 1 ]; then
    echo "Usage: $0 <cluster_file>"
    echo "  cluster_file: File containing the cluster to generate the signatures."
    exit 1
else
    cluster_folder=$1
fi

echo -n "[+] Generating signatures..."
for f in `ls $cluster_folder`
do
	signatures/signature-generator.py $cluster_folder/$f > tmp/sigfile
	signatures/sigGen.py tmp/sigfile data/signatures/$f.sig
done
echo " DONE"
