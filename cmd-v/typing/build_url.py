#!/usr/bin/env python

import sys
import re
try:
    import cPickle as pickle
except:
    import pickle

if len(sys.argv) != 5:
    print "Usage: %s <paths_file> <keys_file> <vals_file> <output_file>" % sys.argv[0]
    print "  paths_file: File containing the paths."
    print "  keys_file: File containing the keys."
    print "  vals_file: File containing the values."
    print "  output_file: File that will contain the reconstructed URLs."
    exit(0)
else:
	# unique-sort-pathskeysval
    paths_fd = open(sys.argv[1],"r")
    keys_fd  = open(sys.argv[2],"r")
    vals_fd  = open(sys.argv[3],"r")
    ofile_fd = open(sys.argv[4], "w")


i = 0

for path in paths_fd:
    read_keys  = pickle.load(keys_fd)
    read_vals  = pickle.load(vals_fd)

    url = path.rstrip()+"?"
    j=0
    for key in read_keys:
        url += key.rstrip()+"="+read_vals[j].rstrip()+"&"
        j += 1
    i += 1 
    #print url[0:-1]
    ofile_fd.write(url[0:-1]+"\n")

ofile_fd.close()
