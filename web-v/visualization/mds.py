#!/usr/bin/env python

import sys
import numpy
import scipy
import orange
import orngMDS
import Orange

# Parse args
if len(sys.argv) != 5:
	print "Usage: %s <feature_vectors> <cluster_indexes> <urls> <mds>" % sys.argv[0]
	print "  feature_vectors: Input file that contains the list of feature vectors."
	print "  cluster_indexes: Input file that contains the indexes of de clusters."
	print "  urls: Input file that contains the URLs."
	print "  mds: Output file that contains the 2D Multidimensional scaling coords and image data."
	exit(0)
else:
	# unique-sort-pathskeysval
	features_file = sys.argv[1]
	clusters_file = sys.argv[2]
	urls_file = sys.argv[3]
	mds_file = sys.argv[4]

x = numpy.loadtxt(features_file,delimiter=',') #load feature vector file
clusters = numpy.loadtxt(clusters_file)
urls = open(urls_file).readlines()

print 'distance matrix...'
# MDS
#distance = orange.SymMatrix(len(x))
#for i in range(len(x)):
#	print "distance %i..." % i
#	for j in range(i+1):
#		distance[i, j] = numpy.linalg.norm(x[i]-x[j])
distance = scipy.spatial.distance.pdist(x, 'euclidean')
distance = scipy.spatial.distance.squareform(distance)
distance = Orange.core.SymMatrix(distance)

print "MDS..."
mds=orngMDS.MDS(distance)
mds.run(100)

print "Writing file..."

mds_fd=open(mds_file,'w+')
mds_fd.write("x\ty\tcluster\turl\n")
for i in range(len(x)):
	mds_fd.write("%s\t%s\t%i\t%s\n" % (
		str(mds.points[i][0]),
		str(mds.points[i][1]),
		clusters[i],
		urls[i][:-1]))
mds_fd.close()
