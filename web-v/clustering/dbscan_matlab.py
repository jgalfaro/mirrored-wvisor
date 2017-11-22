#!/usr/bin/env python

from pymatbridge import Matlab

mlab = Matlab()
mlab.start()

res = mlab.run_func('../matalab/fine_grained_clustering_fast_func.m', {'input_file': '../data/clusters/coarse_typed/coarse-grain-indexes-14_typed', 'folder_out': '../data/clusters'})
print res['result']

mlab.stop()

