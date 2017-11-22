#!/usr/bin/env python

import numpy as np
import sys
from sklearn.cluster import DBSCAN


if len(sys.argv) != 3:
    print "Usage: %s <distance_matrix> <output_file>"
    print "     <distance_matrix>: File containing the distance matrix."
    print "     <output_file>: File where clusters labels will be stored."
    sys.exit(1)
else:
    dist_matrix = sys.argv[1]
    label_file = open(sys.argv[2],'w')

X=np.loadtxt(dist_matrix,delimiter=',') # Load similarity file
db = DBSCAN(eps=0.5, min_samples=3, metric='precomputed').fit(X)

for item in db.labels_:
	label_file.write(str(item)+"\n")
label_file.close()	
