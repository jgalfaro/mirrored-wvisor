#!/usr/bin/env python

import sys
import cPickle as pk

"""
	Calculate the character frequency distribution vector of the strings
	in the input file.
"""

def get_ascii_vector(line):
    length=len(line)
    l = float(length)
    freqcounter = []
    for i in xrange(0,127):
        freqcounter.append(0);
            
    for x in line:
        freqcounter[ord(x)]=(line.count(x))/l
        return ','.join(str(v) for v in freqcounter)


# Parse args
if len(sys.argv) != 5:
    print "Usage: %s <only_paths> <only_keys> <only_vals> <vectors_file>" % sys.argv[0]
    print "  only_paths: File containing the list of paths." 
    print "  only_keys: File containing the list of keys." 
    print "  only_vals: File containing the list of vals." 
    print "  vectors_file: File where character frequency distribution" + \
                    "vectors will be stored."
    exit(0)
else:
    # only_path / only_keys / only_values
    paths_file = open(sys.argv[1],'r')
    keys_file = open(sys.argv[2],'r')
    vals_file = open(sys.argv[3],'r')
    # ascii-onlypath / ascii-onlykeys / ascii-onlyvalues 
    ofile = open(sys.argv[4],'w+')

for path in paths_file:
    keys = pk.load(keys_file)
    vals = pk.load(vals_file)

    vector = "" 
    vector += get_ascii_vector(path)
    vector += get_ascii_vector(str(keys))
    vector += get_ascii_vector(str(vals))

    ofile.write(vector + "\n")

paths_file.close()
keys_file.close()
vals_file.close()
ofile.close()
    


