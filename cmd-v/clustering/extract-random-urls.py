#!/usr/bin/env python

import sys
import random

if len(sys.argv) != 3:
    print "Usage: %s <input_file> <number_of_url>" % sys.argv[0]
    print "     <input_file>: File with the URLs."
    print "     <number_of_url>: Number of URLs to be extracted from the file."
    exit(1)
else:
    input_fd = open(sys.argv[1])
    number_url = sys.argv[2]


f_data = input_fd.readlines()

for i in range(0,int(number_url)):
    n =  random.randrange(0,len(f_data))
    print f_data[n].rstrip()

input_fd.close()
