#!/usr/bin/env python

import sys
import numpy
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Parse args
if len(sys.argv) != 3:
	print "Usage: %s <mds> <<image>" % sys.argv[0]
	print "  mds: Input file that contains the image data after mds."
	print "  image: Output file that contains the image."
	exit(0)
else:
	# unique-sort-pathskeysval
	mds_file = sys.argv[1]
	image_file = sys.argv[2]


x = open(mds_file).readlines()

points = []
cat = len(x[0].split('\t'))
for i in range(1, len(x)):
	x[i] = x[i].split('\t')
	if cat == 4:
		points.append((float(x[i][0]), float(x[i][1]), int(x[i][2])))
	else:
		points.append((float(x[i][0]), float(x[i][1]), float(x[i][2]), int(x[i][3])))
cx = [p[0] for p in points]
cy = [p[1] for p in points]
if cat == 5:
	cz = [p[2] for p in points]
cls = [p[-2+cat] for p in points]

if cat == 5:
	fig = plt.figure(1,figsize=(32, 24))
	ax = fig.add_subplot(111, projection='3d')
	plot1 = ax.scatter(cx, cy, cz, c=cls, alpha=0.75)
else:
	fig = plt.figure(1,figsize=(32, 24))
	plot1 = plt.scatter(cx, cy, c=cls, alpha=0.75)
#plot2 = plt.scatter(x, y, c=np.unique(cls), s=60, marker='d') # plot the means
plt.savefig(image_file)
