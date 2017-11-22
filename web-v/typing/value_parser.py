#!/usr/bin/env python

import sys
import re
try:
    import cPickle as pickle
except:
    import pickle

"""
	Outputs on stdout the values that has a matching result for the given
	regex.
"""

if len(sys.argv) != 5:
	print "Usage: %s <input_file> <regex> <type_string> <output_file>" % sys.argv[0]
	print "  input_file: File containing the values."
	print "  regex: regular expresion to be matched."
	print "  type_string: String that will replace the values that match the regex."
	print "  output_file: File that will contain the typed values."
	exit(0)
else:
	# unique-sort-pathskeysval
	ifile_fd = open(sys.argv[1],"r")
	regex = re.compile(sys.argv[2])
        typestr = sys.argv[3]
        ofile_fd = open(sys.argv[4], "w")

matches=0
ne_matches=0
total_vals=0
while True:
    try:
        read_array = pickle.load(ifile_fd)
        for i in range(0,len(read_array)):
           match = regex.search(read_array[i])
           total_vals+=1
           if match != None:
               #print read_array[i] 
               matches+=1
               if read_array[i] != match.group(0):
                   #print read_array[i] + "\t" + match.group(0)
                   ne_matches+=1
               read_array[i] = typestr 
        # Write the array to the output file
        pickle.dump(read_array, ofile_fd)
    except EOFError:
        ofile_fd.close()
        print "Statistics"
        print "~~~~~~~~~~\n"
        print "Number of total values: " + str(total_vals)
        print "Number of matches: " + str(matches)
        print "Number of equal value-regex matches: " + str(matches-ne_matches)
        print "Number of non-equal value-regex matches: " + str(ne_matches)
        break
