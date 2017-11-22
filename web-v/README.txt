Installation
============

We used Debian Wheezy GNU/Linux as OS

Scripts (On Server)
-------------------

* Install matlab R2012
* Install tmux
* Install parallel
* Install zip

* Python 2.7

with pip install the following modules:
argparse==1.2.1
distribute==0.7.3
ipython==1.1.0
joblib==0.7.1
matplotlib==1.3.1
mlpy==3.5.0
nose==1.3.0
numpy==1.7.1
pygraphviz==1.2
pymatbridge==0.1
pyparsing==2.0.1
python-dateutil==2.2
scikit-learn==0.14.1
scipy==0.12.1
simplejson==3.3.1
six==1.4.1
wsgiref==0.1.2

Urho3D (on Client)
------------------

See Urho3D/Readme.txt and build with examples (our application is coded as parts of the examples) for your platform.

Web (on server)
---------------

* Install node.js (nodejs.org) v0.10.x

Frontend
********

* In web/frontend/js/settings.js, replace malwurl2 by the ip address of your server
* In web/frontend, launch "npm install"
* In web/frontend, launch "grunt concat"
* Configure a webserver (apache2 for e.g.) to serve web/frontend files

Backend
*******

* In web/malwurl-server, launch "npm install"

Run
===

In web/malwurl-server, launch "npm start"

Launch the web interface with your server IP in the address bar of a modern browser (chrome or firefox)

Development info
================

The main script is launchWeb.py, it launch experiments based on the config file web/malwurl-server/public/data/experiment/[id]/config.json
The webapp also uses a sqlite database.

The scripts use matlab and python (with a lot of modules).
For the web interface, for the frontend we use Ember.js, jquery, d3js (2d visualization) and socket.io (websockets). For the backend we use Node.js, Express and Socket.io.
The 3d visualization depends on the Urho3D 3d game engine (C++).

Scripts
-------

	1. ./url-parsing.sh

Generates data/url using extracted_data

	2. ./extract-features.sh

Extracts features into data/features/feature_vectors

	3. ./coarse-clustering.sh (fast)

Need to install:
* numpy
* mlpy (need to compile from source manualy because not on pypi)
* scipy

Generates coarse grained clusters data/clusters/coarse_grained/*

	4. ./cluster-typing.sh

Clustering on typing of query attributes

data in data/clusters/coarse_typed/*

	5. ./fine-clustering-fast.sh

	or ./fine-clustering.sh data/clusters/coarse_typed/coarse-grain-indexes-13_typed_nodups

Need to install:
* scikit-learn

data in data/clusters/fine_grained/*

	or in matlab execute matlab/fine_grained_clustering_fast.m


	6. ./generate-signatures.sh data/clusters/fine_grained/

data in data/signatures
