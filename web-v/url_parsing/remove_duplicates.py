#!/usr/bin/env python

import sys
from sets import Set

if len(sys.argv) != 3:
    print "Usage: {} <dataset> <output>".format(sys.argv[0])
    print "     dataset: File containing the data whose duplicates will be " \
            "removed."
    print "     output: File where output data will be stored."
    exit(1)
else:
    dataset = open(sys.argv[1], 'r')
    output = open(sys.argv[2], 'w')

lines = dataset.readlines()
no_dups = Set(lines)

print "     Size with duplicates: %d" % len(lines)
print "     Size without duplicates: %d" % len(no_dups)

for l in no_dups:
    output.write(l)

dataset.close()
output.close()
