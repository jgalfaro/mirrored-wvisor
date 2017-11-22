#!/usr/bin/env python

import numpy as np
from sets import Set
import linecache
import sys

# Parse args
if len(sys.argv) != 4:
	print "Usage: %s <urls_file> <indexes_file> <output_folder>" % sys.argv[0]
	print "  urls_file: File containing the list of URLs."
	print "  indexes_file: File containing the indexes of the clusters."
	print "  output_folder: Folder where cluster files will be stored."
	exit(0)
else:
	urls_file = sys.argv[1]
	indexes_file = sys.argv[2]
	ofolder = sys.argv[3]
	if (ofolder[-1] != "/"):
		ofolder += "/"

urls_fd = open(sys.argv[1],'r')
label_fd = open(sys.argv[2],'r')

labels = []
clusters = []

for url in urls_fd:
    try:
        l = int(float(label_fd.readline().rstrip()))
        if labels.count(l) == 0:
            labels.append(l)
            clusters.append(open(ofolder+str(l)+'.txt','w'))
            clusters[-1].write(url)
        else:
            clusters[labels.index(l)].write(url)
    except:
        pass

for i in clusters:
    i.close()
