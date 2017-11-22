#!/usr/bin/env python

import re,sys

if (len(sys.argv) < 3):
	print "This class should be executed as: python <SCRIPT_NAME> <TOKEN_FILE> <SIG_FILE>"
	sys.exit(0)

# This class transforms the list of token subsequences into a list of signatures
sigFile = open(sys.argv[1], 'r')
outFile = open(sys.argv[2], 'w')
curSig = sigFile.readline()

i = 0
while curSig != '':
	if curSig[0] != '#': curSig = '#' + curSig
	curSig = re.escape(curSig)
	curSig = curSig.replace('\#', '.*')
	spl = curSig.rsplit('\\', 1)
	curSig = ''.join(spl)
	if curSig[len(curSig)-2] != '*':
		spl = curSig.rsplit('\n', 1)
		curSig = spl[0] + '.*'
	curSig = curSig.replace('\n', '')
	outFile.write('%s\n' % (curSig))
	curSig = sigFile.readline()

sigFile.close()
outFile.close()
