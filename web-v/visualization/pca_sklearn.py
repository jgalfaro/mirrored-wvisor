#!/usr/bin/env python
# Author: Nelle Varoquaux <nelle.varoquaux@gmail.com>
# Licence: BSD

#!/usr/bin/env python

import sys
import numpy
import scipy

from sklearn import manifold
from sklearn.metrics import euclidean_distances
from sklearn import decomposition

# Parse args
if len(sys.argv) != 6:
	print "Usage: %s <dimensions> <feature_vectors> <cluster_indexes> <urls> <pca>" % sys.argv[0]
	print "  dimensions: number of dimensions in output"
	print "  feature_vectors: Input file that contains the list of feature vectors."
	print "  cluster_indexes: Input file that contains the indexes of de clusters."
	print "  urls: Input file that contains the URLs."
	print "  pca: Output file that contains coords and image data."
	exit(0)
else:
	dimensions = int(sys.argv[1])
	features_file = sys.argv[2]
	clusters_file = sys.argv[3]
	urls_file = sys.argv[4]
	pca_file = sys.argv[5]

x = numpy.loadtxt(features_file,delimiter=',') #load feature vector file
clusters = numpy.loadtxt(clusters_file)
urls = open(urls_file).readlines()

class TruncatedSVDCustom(decomposition.TruncatedSVD):
	def __init__(self, n_components=2, algorithm="randomized",
	             n_iter=5, random_state=None, tol=0., n_iterations=None):
		super(TruncatedSVDCustom, self).__init__(n_components, algorithm,
                 n_iter, random_state, tol)

	def stress(self):
		return 0.


print 'pca...'
pca = TruncatedSVDCustom(n_components=dimensions)

pos = pca.fit_transform(x)


from IPython import embed

embed()

stress = pca.stress(pos)

from IPython import embed

embed()

print 'graph...'
pca_fd = open(pca_file, 'w+')
if dimensions == 2:
	pca_fd.write("x\ty\tcluster\turl\n")
elif dimensions == 3:
	pca_fd.write("x\ty\tz\tcluster\turl\n")
for i in range(len(pos)):
	if dimensions == 2:
		pca_fd.write("%s\t%s\t%i\t%s\n" % (
			str(pos[i][0]),
			str(pos[i][1]),
			clusters[i],
			urls[i][:-1]))
	elif dimensions == 3:
		pca_fd.write("%s\t%s\t%s\t%i\t%s\n" % (
			str(pos[i][0]),
			str(pos[i][1]),
			str(pos[i][2]),
			clusters[i],
			urls[i][:-1]))
pca_fd.close()
