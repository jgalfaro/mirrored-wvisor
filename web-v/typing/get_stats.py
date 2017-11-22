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

if len(sys.argv) != 2:
	print "Usage: %s <input_file> <regex> <type_string> <output_file>" % sys.argv[0]
	print "  input_file: File containing the values."
	exit(0)
else:
	# unique-sort-pathskeysval
	ifile_fd = open(sys.argv[1],"r")

url_redirect = 0
md5 = 0
sha1 = 0
base64 = 0
integer = 0
floatcnt = 0
non_typed = 0
hexenc = 0
macaddr = 0
resolution = 0
boolean = 0
filepath = 0
timestamp = 0
countrycode = 0
notype = 0

while True:
    try:
        read_array = pickle.load(ifile_fd)
        for element in read_array:
            if element == "url_redirection":
                url_redirect+=1
            elif element == "md5":
                md5+=1
            elif element == "sha1":
                sha1+=1
            elif element == "base64":
                base64+=1
            elif element == "integer":
                integer+=1
            elif element == "float":
                floatcnt+=1
            elif element == "hex_encoded":
                hexenc+=1
            elif element == "mac_addr":
                macaddr+=1
            elif element == "resolution":
                resolution+=1
            elif element == "bool":
                boolean+=1
            elif element == "file_path":
                filepath+=1
            elif element == "timestamp":
                timestamp+=1
            elif element == "country_code":
                countrycode+=1
            elif element == "no_type":
                notype+=1
        total_typed = url_redirect+md5+sha1+base64+integer+floatcnt+hexenc+macaddr+resolution+boolean+filepath+timestamp+countrycode
    except EOFError:
        print "Statistics"
        print "~~~~~~~~~~\n"
        print "Number of url_redirect: " + str(url_redirect)
        print "Number of md5: " + str(md5)
        print "Number of sha1: " + str(sha1)
        print "Number of base64: " + str(base64)
        print "Number of integer: " + str(integer)
        print "Number of float: " + str(floatcnt)
        print "Number of boolean: " + str(boolean)
        print "Number of resolution: " + str(resolution)
        print "Number of hex_encoded: " + str(hexenc)
        print "Number of mac_addr: " + str(macaddr)
        print "Number of filepath: " + str(filepath)
        print "Number of timestamp: " + str(timestamp)
        print "Number of countrycode: " + str(timestamp)
        print "Number of no_type: " + str(notype)
        print "Number of typed elements: " + str(total_typed)
        print "Number of total elements: " + str(total_typed+notype)
        print "\nPercentage of typed elements: " + str((total_typed*1.0/(total_typed+notype))*100)
        print "Percentage of typed elements: " + str((1-(total_typed*1.0/(total_typed+notype)))*100)
        break
