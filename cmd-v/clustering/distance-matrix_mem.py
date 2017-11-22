#!/usr/bin/env python

from sets import Set
import cPickle as pickle
import sys
import distances as dst
import numpy as np

# Parse args
if len(sys.argv) != 5:
    print "Usage: %s <paths_file> <keys_file> <vals_file> <output_file>" % sys.argv[0]
    print "  paths_file: File containing the paths."
    print "  keys_file: File containing the keys."
    print "  vals_file: File containing the vals."
    print "  output_file: File containing distance matrix."
    exit(0)
else:
    paths_fd = open(sys.argv[1],'r')
    keys_file = open(sys.argv[2],'r')
    vals_file = open(sys.argv[3],'r')
    output_fd  = open(sys.argv[4], "w")

# Get the first URL and store it.
# Read 1 URL at a time, compute distance and store it into distance matrix
# Then repeat for the second Url etc.
#
# With this I can fill the upper part and the diagonal of the distance matrix.
# Then replicate the data onto the other half


paths = []
keys = []
vals = []


# Load data in memory
for path in paths_fd:
    paths.append(path)
    keys.append(pickle.load(keys_file))
    vals.append(pickle.load(vals_file))

#distance_matrix = [[0.0 for x in range(0,len(paths))] for x in range(0,len(paths))]
matrix_row = np.zeros(len(paths))

# Now compute distances
for i in range(0,len(paths)):
    url1 = (paths[i], keys[i], vals[i])
    matrix_row = np.zeros(len(paths))
    for j in range(0,len(paths)):
        url2 = (paths[j], keys[j], vals[j])
        matrix_row[j] = dst.url_lcs_jaccard(url1,url2)
    print matrix_row
    output_fd.write(str(matrix_row).strip('[]')+"\n")

