#!/usr/bin/env python

import sys
import re

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

keys = keys_fd.readlines()
values = vals_fd.readlines()
j=0
for path in paths_fd:
    i=0
    url = path
    # keys/values loop
    while keys[j] != '&\n' and j < len(keys) and j < len(values):
        # Add path
        if '?' not in url:
            url = path.rstrip()+"?"
        # Add keys and values
        url += keys[j].rstrip()+"="+values[j].rstrip()+"&"
        j+=1
        i+=1
    j+=1
    #print url[0:-1]
    ofile_fd.write(url[:-1]+"\n")

ofile_fd.close()
