#!/usr/bin/env python

import simplejson
import urllib
import urllib2

url = "https://www.virustotal.com/vtapi/v2/file/report"

# f = file('../data/md5_partial')
# r = f.readlines()
# resource = ""
# for i in r:
# 	resource += '%s,' % i[:-1]
# resource = resource[:-1]

# from IPython import embed

# embed()

parameters = {"resource": "ab653fe366e50a7bca8e2f01c9af7a04",
	"apikey": "e46ca96bde755b4fbaa1bbef583a49684b7c99a9cd3382c4863499e4f3bf1bba"}
data = urllib.urlencode(parameters)
req = urllib2.Request(url, data)
response = urllib2.urlopen(req)
json = response.read()
response_dict = simplejson.loads(json)

from IPython import embed

embed()
