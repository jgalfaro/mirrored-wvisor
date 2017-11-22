#!/usr/bin/env python

try:
    import cPickle as pickle
except:
    import pickle
import urlparse
import sys

"""
	Parse the URLs in the input file to separate it into paths, keys,
	and values.
"""

# Parse args
if len(sys.argv) != 3:
	print "Usage: %s <urls_file> <output_folder>" % sys.argv[0]
	print "  urls_file: File containing the list of URLs."
	print "  output_folder: Folder where output files will be stored."
	exit(0)
else:
	# unique-sort-pathskeysval
	ifile = sys.argv[1]
	ofolder = sys.argv[2]
	if (ofolder[-1] != "/"):
		ofolder += "/"

# Output files
filename_keys =  open(ofolder+"only_keys.txt", 'w+')
filename_paths =  open(ofolder+"only_paths.txt", 'w+')
filename_vals =  open(ofolder+"only_vals.txt", 'w+')

with open(ifile) as f:
    for url in f:
    	# Strip newline characters
    	url = url.rstrip('\n')
    	url = url.rstrip('\r')
    	if not url.startswith('http'):
    		url = '%s%s' % ('http://', url)
    	p = urlparse.urlparse(url)
    	
        if p.path != "":
            # Write the path
            print >> filename_paths,(p.path.rstrip())
            query = urlparse.parse_qs(p.query)

            keys = []
            values = []
            # Append keys and values to their arrays
            for key, value in query.iteritems():
                keys.append(key.rstrip())
                values.append(value[0].rstrip())
            # Now serialize and write keys and values
            pickle.dump(keys, filename_keys)
            pickle.dump(values, filename_vals)
