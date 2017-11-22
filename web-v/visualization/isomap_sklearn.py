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
if len(sys.argv) != 6:
	print "Usage: %s <dimensions> <feature_vectors> <cluster_indexes> <urls> <isomap>" % sys.argv[0]
	print "  dimensions: number of dimensions in output"
	print "  feature_vectors: Input file that contains the list of feature vectors."
	print "  cluster_indexes: Input file that contains the indexes of de clusters."
	print "  urls: Input file that contains the URLs."
	print "  isomap: Output file that contains coords and image data."
	exit(0)
else:
        dimensions = int(sys.argv[1])
	features_file = sys.argv[2]
	clusters_file = sys.argv[3]
	urls_file = sys.argv[4]
	isomap_file = sys.argv[5]

x = numpy.loadtxt(features_file,delimiter=',') #load feature vector file
clusters = numpy.loadtxt(clusters_file)
urls = open(urls_file).readlines()

print 'isomap...'
isomap = manifold.Isomap(n_neighbors=5,n_components=dimensions, eigen_solver='auto',tol=0, path_method='auto', neighbors_algorithm='auto')

pos = isomap.fit_transform(x)
print 'reconstruction error: %f' % isomap.reconstruction_error()

print 'graph...'
isomap_fd = open(isomap_file, 'w+')
if dimensions == 2:
	isomap_fd.write("x\ty\tcluster\turl\n")
elif dimensions == 3:
	isomap_fd.write("x\ty\tz\tcluster\turl\n")
for i in range(len(pos)):
	if dimensions == 2:
		isomap_fd.write("%s\t%s\t%i\t%s\n" % (
			str(pos[i][0]),
			str(pos[i][1]),
			clusters[i],
			urls[i][:-1]))
	elif dimensions == 3:
		isomap_fd.write("%s\t%s\t%s\t%i\t%s\n" % (
			str(pos[i][0]),
			str(pos[i][1]),
			str(pos[i][2]),
			clusters[i],
			urls[i][:-1]))
isomap_fd.close()
