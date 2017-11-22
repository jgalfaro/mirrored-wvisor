#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
TODO:
	* key/value pairs can be in any order

DISCLAIMER: signatures not tested
"""

import unicodedata
import sys, math, random, re, os
sys.path.insert(0, os.path.dirname(os.path.realpath(__file__))+"/../clustering")
from suffix_tree import GeneralisedSuffixTree

GAP = -1
scGAP = -2
SGAP = "#"
Th = 0.1

all_chars = (unichr(i) for i in xrange(0x110000))
control_chars = ''.join(c for c in all_chars if unicodedata.category(c) == 'Cc')
# or equivalently and much more efficiently
control_chars = ''.join(map(unichr, range(0,32) + range(127,160)))

control_char_re = re.compile('[%s]' % re.escape(control_chars))

def remove_control_chars(s):
        return control_char_re.sub('', s)


def buildShTokens(clusters):
	if len(clusters) == 0:
		return []
	tokens = []
        stree = GeneralisedSuffixTree(clusters)
        kTh = max(1, int( Th * len(clusters) ))
        for shared in stree.sharedSubstrings(kTh):
                for seq, start, stop in shared:
                        if stree.sequences[seq][start:stop] not in tokens:
                                tokens.append(stree.sequences[seq][start:stop])
        tokens.sort(lambda x,y: cmp(len(y), len(x))) #Sorting tokens according to the length of tokens in each list

	return tokens

def score(a,b):
    if a == b: return 3
    else: return scGAP

def bestAlign(strList):
	if len(strList) == 0: return None #Empty list given in parameter - No signature generated
	if len(strList) == 1: return strList[0] #Only one string given - return it as a signature
	str1 = strList[0]
	for i in range(len(strList)-1):
		str2 = strList[i+1]
		D = [[0 for j in range(len(str1) + 1)] for i in range(len(str2) + 1)]
		for i in range(len(str2)):
			for j in range(len(str1)):
				match = D[i][j] + score(str1[j], str2[i])
				gap1 = D[i][j+1] + GAP
				gap2 = D[i+1][j] + GAP
				D[i+1][j+1] = max(match, gap1, gap2, 0)
		i, j = len(str2), len(str1)
		output1, output2 = SGAP, SGAP
		while ((i >= 1) and (j >= 1)):
			if D[i][j] - GAP == D[i-1][j]: 
				output2 = str2[i-1] + output2
				output1 = SGAP + output1
				i-=1
			else:
				if D[i][j] - GAP == D[i][j-1]:
					output2 = SGAP + output2
					output1 = str1[j-1] + output1
					j-=1
				else:	
					if ((D[i][j] - score(str1[j-1], str2[i-1])) == D[i-1][j-1]):
						output1 = str1[j-1] + output1
						output2 = str2[i-1] + output2
						i -= 1
						j -= 1
					else:
						output1 = SGAP + output1
						output2 = str2[i-1] + output2
						i -= 1
		while j >= 1:
			output1 = str1[j-1] + output1
			output2 = SGAP + output2
			j -= 1
		while i >= 1:
			output2 = str2[i-1] + output2
			output1 = SGAP + output1
			i -= 1
		sig = ""
		for i in range(len(output1)):
			if ((output1[i] == SGAP) or (output2[i] == SGAP)): sig = sig + SGAP
			else: sig = sig + output1[i]
		str1 = re.sub("["+SGAP+"]+",SGAP,sig)
	return str1

def hashLgth(strg):
	output = "";
	for i in range(len(strg)): output = output + SGAP
	return output

def buildClstrSignatures(clstr, tkList):
	if len(clstr) == 0: return None
	sigList = []
	for i in range(len(tkList)):
		#Identifying the list of user agents that include the current token instance
		curTk = tkList[i]
		uaList,j = [],0
		while j < len(clstr):
			if (clstr[j].find(curTk) != -1):
				uaList.append(clstr[j])
				clstr.pop(j)
			else: j += 1
		for j in range(len(uaList)):
			bckUA,curUA = uaList[j],uaList[j]
			for k in range(len(tkList)):
				curUA = re.sub(re.escape(tkList[k]),hashLgth(tkList[k]),curUA)
			for k in range(len(curUA)):
				if curUA[k] != SGAP: bckUA = bckUA[0:k]+SGAP+bckUA[k+1:]
			uaList[j] = re.sub("["+SGAP+"]+",SGAP,bckUA)
		sig = bestAlign(uaList)
		if not(sig == None): sigList.append(sig)
		if (len(clstr) == 0): break
	return sigList

types_symbol = {
	'url_redirection': '\xa7',
	'md5': '\xa8',
	'sha1': '\xa9',
	'base64': '\xaa',
	'integer': '\xb3',
	'float': '\xab',
	'bool': '\xac',
	'resolution': '\xad',
	'hex_encoded': '\xae',
	'mac_addr': '\xaf',
	'file_path': '\xb0',
	'timestamp': '\xb1',
	'contry_code': '\xb2',
	'no_type': '\xb4'
}

def replace_types_symbol(url):
	pattern = re.compile('|'.join(types_symbol.keys()))
	return pattern.sub(lambda x: types_symbol[x.group()], url)


if len(sys.argv) != 2:
    print "Usage: %s <cluster>" % sys.argv[0]
    print "     <cluster>: File containing the cluster."
    sys.exit(1)
else:
    cluster_fd = open(sys.argv[1],'r')

urls = []
for url in cluster_fd:
	url = replace_types_symbol(url)
	urls.append(remove_control_chars(url.rstrip()))
tokens = buildShTokens(urls)

curSig = buildClstrSignatures(urls, tokens)
for el in curSig:
    print el
