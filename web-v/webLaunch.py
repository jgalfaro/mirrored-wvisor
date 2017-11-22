#!/usr/bin/env python

import sys
import os
import json
import subprocess
import errno
import shutil
import re

def mkdir_p(path):
    try:
        os.makedirs(path)
    except OSError as exc: # Python >2.5
        if exc.errno == errno.EEXIST and os.path.isdir(path):
            pass
        else: raise

class cd:
    """Context manager for changing the current working directory"""
    def __init__(self, newPath):
        self.newPath = newPath

    def __enter__(self):
        self.savedPath = os.getcwd()
        os.chdir(self.newPath)

    def __exit__(self, etype, value, traceback):
        os.chdir(self.savedPath)

current_path = os.path.dirname(os.path.realpath(__file__))
print current_path
sys.stdout.flush()
experiment_id = int(sys.argv[1])
base_path = ('%s/web/malwurl-server/public/data/'
    'experiments/%i' % (current_path, experiment_id))
dataset_path = '%s/dataset.txt' % base_path
url_path = '%s/url' % base_path
features_path = '%s/features' % base_path
clusters_path = '%s/clusters' % base_path
coarse_path = '%s/coarse_grained' % clusters_path
coarse_typed_path = '%s/coarse_grained_typed' % clusters_path
fine_path = '%s/fine_grained' % clusters_path
signatures_path = '%s/signatures' % base_path

from pprint import pprint
json_data = open("%s/config.json" % (base_path))

config = json.load(json_data)

pprint(config)
json_data.close()

print "Config file loaded, starting tasks..."
sys.stdout.flush()

print "[+] Parsing URLs..."
sys.stdout.flush()
mkdir_p(url_path)
subprocess.call(['%s/url_parsing/url_parser.py' % current_path,
    dataset_path,url_path])
sys.stdout.flush()
sys.stderr.flush()
print "    Done"
sys.stdout.flush()
print "1%"
sys.stdout.flush()

if (config["coarseGrained-clusteringAlgorithm-kmeans-distance"] == "lettersFrequency"):
    print "[+] Extracting features..."
    sys.stdout.flush()
    mkdir_p(features_path)
    subprocess.call(['%s/ascii_freq_distr/char_freq_distr.py' % current_path,
        ('%s/only_paths.txt' % url_path),
        ('%s/only_keys.txt' % url_path),
        ('%s/only_vals.txt' % url_path),
        ('%s/feature_vectors.txt' % features_path)])
    sys.stdout.flush()
    sys.stderr.flush()
    print "    Done"
    sys.stdout.flush()
    print "3%"
    sys.stdout.flush()

if (config["coarseGrained-clusteringAlgorithm"] == "kmeans"):
    print "[+] Coarse clustering..."
    sys.stdout.flush()
    mkdir_p(clusters_path)
    subprocess.call(['%s/clustering/kmeans.py' % current_path,
        ('%s/feature_vectors.txt' % features_path),
        ('%s/coarse-grain-indexes.txt' % clusters_path),
        ('%i' % config["coarseGrained-clusteringAlgorithm-kmeans-k"])])
    sys.stdout.flush()
    sys.stderr.flush()
    print "    Done"
    sys.stdout.flush()
    print "6%"
    sys.stdout.flush()

print "[+] Creating coarse clusters files..."
sys.stdout.flush()
mkdir_p(coarse_path)
subprocess.call(['%s/clustering/create-cluster-files.py' % current_path,
    dataset_path,
    ('%s/coarse-grain-indexes.txt' % clusters_path),
    coarse_path])
sys.stdout.flush()
sys.stderr.flush()
print "    Done"
sys.stdout.flush()
print "7%"
sys.stdout.flush()

print "[+] Clusters typing and remove duplicates..."
sys.stdout.flush()
mkdir_p(coarse_typed_path)
i = 0
for root, _, files in os.walk(coarse_path):
    for f in files:
        mkdir_p("%s/tmp" % base_path)
        fullpath = os.path.join(root, f)
        # split into path - keys - vals
        subprocess.call(['%s/url_parsing/url_parser_nopickle.py' % current_path,
            fullpath,
            '%s/tmp' % base_path])
        sys.stderr.flush()
        sys.stdout.flush()
        # remplace values by types
        with open(os.devnull, "w") as null:
            subprocess.call(['%s/run_regex.sh' % current_path,
                '%s/tmp/only_vals' % base_path,
                '%s/tmp/only_vals_typed' % base_path,
                '%s/tmp/tmp_typing' % base_path],
                stdout=null)
            sys.stderr.flush()
            sys.stdout.flush()
        # rebuild full urls (with paths, keys and vals)
        subprocess.call(['%s/typing/build_url.py' % current_path,
            '%s/tmp/only_paths' % base_path,
            '%s/tmp/only_keys' % base_path,
            '%s/tmp/only_vals_typed' % base_path,
            '%s/tmp/full_typed' % base_path])
        sys.stderr.flush()
        sys.stdout.flush()
        # remove duplicates
        with open(os.devnull, "w") as null:
            subprocess.call(['%s/url_parsing/remove_duplicates.py' % current_path,
                '%s/tmp/full_typed' % base_path,
                ('%s/%s' % (coarse_typed_path, f))],
                stdout=null)
            sys.stderr.flush()
            sys.stdout.flush()
            shutil.rmtree("%s/tmp" % base_path)
        i += 1
print "    Done"
sys.stdout.flush()
print "10%"
sys.stdout.flush()

print "[+] Fine clustering..."
sys.stdout.flush()
mkdir_p(fine_path)
if (config["fineGrained-clusteringAlgorithm"] == "DBScan"):
    func_str = "fine_grained_clustering_fast_func2"
    # func_str = "fine_grained_clustering_fast_func('../data/clusters/coarse_typed/${1}','../data/clusters/${1}_'); quit;"
    func_str += "('%s/${1}', '%s/$fout-', '%s', %i, %f, %i, %i)" % (
        coarse_typed_path,
        fine_path,
        config["fineGrained-clusteringAlgorithm-dbscan-distance"],
        config["fineGrained-clusteringAlgorithm-dbscan-k"],
        config["fineGrained-clusteringAlgorithm-dbscan-eps"],
        int(config["fineGrained-visualization-enable"]),
        int(config["fineGrained-quality-dunn"]))
    func_str += "; quit;"
    # write parallel task to file
    f = open("%s/fine-clustering-task.sh" % clusters_path,'w')
    f.write("fout=${1%.*}\n")
    f.write('matlab -nodisplay -nosplash -r "%s"' % func_str)
    f.close()
    # launch
    with cd("%s/matlab" % current_path):
        p1 = subprocess.Popen(["ls",
            coarse_typed_path],
            stdout=subprocess.PIPE)
        p2 = subprocess.Popen(["parallel", "sh", 
            "%s/fine-clustering-task.sh" % clusters_path,
            "{}"], stdin=p1.stdout)
        p2.communicate()[0]
        sys.stderr.flush()
        sys.stdout.flush()
print "    Done"
sys.stdout.flush()

if (config["signatures-enable"]):
    print "98%"
    sys.stdout.flush()
    mkdir_p(signatures_path)
    print "[+] Generating signatures..."
    sys.stdout.flush()
    for root, _, files in os.walk(fine_path):
        for f in files:
            # filter out non clusters files
            if re.match(r'[0-9]+\-[1-9]+[0-9]*\.txt', f):
                mkdir_p("%s/tmp" % base_path)
                stdout_f = open('%s/tmp/sigfile' % base_path,'w')
                fullpath = os.path.join(root, f)
                subprocess.call(['%s/signatures/signature-generator.py' % current_path,
                    fullpath], stdout=stdout_f)
                sys.stderr.flush()
                sys.stdout.flush()
                subprocess.call(['%s/signatures/sigGen.py' % current_path,
                    '%s/tmp/sigfile' % base_path,
                    '%s/%s' % (signatures_path, f)])
                sys.stderr.flush()
                sys.stdout.flush()
                shutil.rmtree("%s/tmp" % base_path)
    print "    Done"
    sys.stdout.flush()

print "100%"
sys.stdout.flush()


print "Finished"
sys.stdout.flush()
