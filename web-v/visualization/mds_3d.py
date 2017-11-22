#!/usr/bin/env python
# Author: Nelle Varoquaux <nelle.varoquaux@gmail.com>
# Licence: BSD

#!/usr/bin/env python

import sys
import numpy
import scipy

from sklearn import manifold
from sklearn.metrics import euclidean_distances
from sklearn.decomposition import PCA


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
distance = scipy.spatial.distance.pdist(x, 'euclidean')
distance = scipy.spatial.distance.squareform(distance)

print 'mds...'
seed = numpy.random.RandomState(seed=3)
mds = manifold.MDS(n_components=3, max_iter=100, eps=1e-9, random_state=seed,
                   dissimilarity="precomputed", n_jobs=-1)
fit = mds.fit(distance)

print "stress: "+str(fit.stress_)
pos = fit.embedding_

print 'pca...'
clf = PCA(n_components=3)
pos = clf.fit_transform(pos)

print 'graph...'
mds_fd = open(mds_file, 'w+')
mds_fd.write("x\ty\tz\tcluster\turl\n")
for i in range(len(pos)):
	mds_fd.write("%s\t%s\t%s\t%i\t%s\n" % (
		str(pos[i][0]),
		str(pos[i][1]),
		str(pos[i][2]),
		clusters[i],
		urls[i][:-1]))
mds_fd.close()
