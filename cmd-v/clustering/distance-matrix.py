#!/usr/bin/env python

from sets import Set
import cPickle as pickle
import sys
import distances as dst

# Parse args
if len(sys.argv) != 5:
    print "Usage: %s <paths_file> <keys_file> <vals_file> <output_file>" % sys.argv[0]
    print "  paths_file: File containing the paths."
    print "  keys_file: File containing the keys."
    print "  vals_file: File containing the vals."
    print "  output_file: File containing distance matrix."
    exit(0)
else:
    paths_fd = open(sys.argv[1],'r')
    keys_file = open(sys.argv[2],'r')
    vals_file = open(sys.argv[3],'r')
    output_fd  = open(sys.argv[4], "w")

# Get the first URL and store it.
# Read 1 URL at a time, compute distance and store it into distance matrix
# Then repeat for the second Url etc.
#
# With this I can fill the upper part and the diagonal of the distance matrix.
# Then replicate the data onto the other half


row_count = 0
distance_matrix = []

while True:
    paths_fd = open(sys.argv[1],'r')
    keys_file = open(sys.argv[2],'r')
    vals_file = open(sys.argv[3],'r')

    matrix_row = []
    # Skip the lines already processed
    for i in range(0,row_count):
        skip = paths_fd.readline()
        skip = Set(pickle.load(keys_file))
        skip = Set(pickle.load(vals_file))
        matrix_row.append(-1)

    # Write each line to the file
    path = paths_fd.readline()
    if path == "":
        break
    keys_set = Set(pickle.load(keys_file))
    vals_set = Set(pickle.load(vals_file))
    url1 = (path, keys_set, vals_set)
    
    # Distance of url1 with itself
    matrix_row.append(0.0)

    while True:
        try:
            # read next url
            path = paths_fd.readline()
            keys_set = Set(pickle.load(keys_file))
            vals_set = Set(pickle.load(vals_file))
            url2 = (path, keys_set, vals_set)

            # Compute the distance & add it to the matrix
            distance = dst.url_lcs_jaccard(url1,url2)
            #matrix_row.append("{0:.2f}".format(distance))
            matrix_row.append(distance)
        except EOFError:
            break
    paths_fd.close()
    keys_file.close()
    vals_file.close()
    row_count += 1
    # write to file
    #output_fd.write(str(matrix_row).strip('[]')+"\n")
    #print matrix_row
    distance_matrix.append(matrix_row)

# Now we have the full matrix in memory, we should finish to fill it
for i in range(0,len(distance_matrix)):
    for j in range(0,i):
        distance_matrix[i][j] = distance_matrix[j][i]

# Now write to file
for i in range(0,len(distance_matrix)):
    output_fd.write(str(distance_matrix[i]).strip('[ ]')+"\n")
output_fd.close()

#print distance_matrix
