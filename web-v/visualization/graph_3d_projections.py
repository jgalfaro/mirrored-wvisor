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
for i in range(1, len(x)):
	x[i] = x[i].split('\t')
	points.append((float(x[i][0]), float(x[i][1]), float(x[i][2]), int(x[i][3])))
cx = [p[0] for p in points]
cy = [p[1] for p in points]
cz = [p[2] for p in points]
cls = [p[3] for p in points]

fig = plt.figure(1,figsize=(32, 24))
ax1 = plt.subplot2grid((2,2), (0,0), projection='3d')
ax2 = plt.subplot2grid((2,2), (0,1))
ax3 = plt.subplot2grid((2,2), (1, 0))
ax4 = plt.subplot2grid((2,2), (1, 1))

plot1 = ax1.scatter(cx, cy, cz, c=cls, alpha=0.75)
plot2 = ax2.scatter(cx, cy, c=cls, alpha=0.75)
ax2.set_xlabel('x')
ax2.set_ylabel('y')
ax2.grid(True)
plot3 = ax3.scatter(cy, cz, c=cls, alpha=0.75)
ax3.set_xlabel('y')
ax3.set_ylabel('z')
ax3.grid(True)
plot4 = ax4.scatter(cz, cx, c=cls, alpha=0.75)
ax4.set_xlabel('z')
ax4.set_ylabel('x')
ax4.grid(True)

plt.savefig(image_file)
