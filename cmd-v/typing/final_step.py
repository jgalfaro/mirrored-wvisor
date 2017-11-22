#!/usr/bin/env python

import sys
import re
try:
    import cPickle as pickle
except:
    import pickle

"""
	Outputs on stdout the values that has a mathing result for the given
	regex.
"""

if len(sys.argv) != 4:
	print "Usage: %s <input_file> <type_string> <output_file>" % sys.argv[0]
	print "  input_file: File containing the values."
	print "  type_string: Name of the type that it will be assigned."
	print "  output_file: File containing the output."
	exit(0)
else:
	# unique-sort-pathskeysval
	ifile_fd = open(sys.argv[1],"r")
        typestr = sys.argv[2]
	ofile_fd = open(sys.argv[3],"w")

els = ["url_redirection","md5","sha1","base64","integer","float","bool","resolution","hex_encoded","mac_addr","file_path","timestamp","country_code"]
while True:
    try:
        read_array = pickle.load(ifile_fd)
        for i in range(0,len(read_array)):
            if not (read_array[i] in els):
                read_array[i] = typestr 
        # Write the array to the output file
        pickle.dump(read_array, ofile_fd)
    except EOFError:
        ofile_fd.close()
        break
