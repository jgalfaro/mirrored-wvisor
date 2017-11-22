#!/usr/bin/env python

import sys
import numpy as np
import mlpy
from scipy.cluster.vq import whiten

"""
	Runs K-means clusering algorithm on the feature vectors given as input.
	Output a file with the indexes of the clusters.
"""

# Parse args
if len(sys.argv) != 3:
	print "Usage: %s <feature_vectors> <cluster_indexes>" % sys.argv[0]
	print "  feature_vectors: Input file that contains the list of feature vectors."
	print "  cluster_indexes: Output file that contains the indexes of de clusters."
	exit(0)
else:
	# unique-sort-pathskeysval
	features_file = sys.argv[1]
	indexes_file = sys.argv[2]

def normalize_columns(arr):
    rows, cols = arr.shape
    for col in xrange(cols):
        arr[:,col] /= abs(arr[:,col]).max()

x=np.loadtxt(features_file,delimiter=',') #load feature vector file
cls, means, steps = mlpy.kmeans(x, k=30, plus=True) #kmean from mlpy and number of clusters 30 
indexes_fd=open(indexes_file,'w+')
for item in cls:
        indexes_fd.write(str(item)+"\n")
indexes_fd.close()
