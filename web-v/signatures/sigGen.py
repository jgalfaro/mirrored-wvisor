#!/usr/bin/env python

import re,sys

symbol_regex = {
	'\xa7': '(https?\:\/\/)?(([a-z0-9~*$quote().&=+$%-]+:)?[a-z0-9!~*$quote().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([a-z0-9]!~*$quote()-]+\.)*([a-z0-9^-][a-z0-9-]{0,61})?[a-z0-9]\.[a-z]{2,6})(:[0-9]{1,4})?((\/*)|(\/+[a-z0-9!~*$quote().;?:@&=+$,%#-]+)+\/*)',
	'\xa8': '[a-f0-9]{32}',
	'\xa9': '[a-f0-9]{40}',
	'\xaa': 'base64',
	'\xb3': '[-\+]?[0-9]+',
	'\xab': '[-\+]?[0-9]*\.[0-9]+([eE][-+]?[0-9]+)?',
	'\xac': '(yes|no|true|false)',
	'\xad': '[0-9]+x[0-9]+(x[0-9]+)?',
	'\xae': '((\\)?\\x[a-f0-9]{1,2})+',
	'\xaf': '[0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2}',
	'\xb0': '[a-zA-Z]\:\\\{1,4}(.*\\\{1,4})+(((.*\..*)|(.*))?))|(^\/(.*\/)+(((.*\.*)|(.*))?)',
	'\xb1': '([0-9]{4}[\/-][0-9]{1,2}[\/-][0-9]{1,2})?\s([0-9]{1,2}\:[0-9]{1,2}\:[0-9]{1,2})|([0-9]{4}[\/-][0-9]{1,2}[\/-][0-9]{1,2})(\s([0-9]{1,2}\:[0-9]{1,2}\:[0-9]{1,2}))?',
	'\xb2': '(AB|AA|AF|SQ|AM|AR|HY|AS|AY|AZ|BA|EU|BN|DZ|BH|BI|BR|BG|MY|BE|KM|CA|ZH|CO|HR|CS|DA|NL|EN|EO|ET|FO|FJ|FI|FR|FY|GD|GL|KA|DE|EL|KL|GN|GU|HA|IW|HI|HU|IS|IN|IA|IE|IK|GA|IT|JA|JW|KN|KS|KK|RW|KY|RN|KO|KU|LO|LA|LV|LN|LT|MK|MG|MS|ML|MT|MI|MR|MO|MN|NA|NE|NO|OC|OR|OM|PS|FA|PL|PT|PA|QU|RM|RO|RU|SM|SG|SA|SR|SH|ST|TN|SN|SD|SI|SS|SK|SL|SO|ES|SU|SW|SV|TL|TG|TA|TT|TE|TH|BO|TI|TO|TS|TR|TK|TW|UK|UR|UZ|VI|VO|CY|WO|XH|JI|YO|ZU)'
}

def replace_symbol_regex(signature):
	pattern = re.compile('|'.join(symbol_regex.keys()))
	return pattern.sub(lambda x: symbol_regex[x.group()], signature)

def remove_duplicates_sharp(sig):
	output = sig[0]
	j = 0
	for i in sig[1:]:
		if not (i == '#' and sig[j] == '#'):
			output += i
		j += 1
	return output

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

	# no_type
	curSig = curSig.replace('\xb4', '#')
	curSig = re.sub('(\\\#)+', '\\\#', curSig)
	curSig = curSig.replace('\#', '.*')

	spl = curSig.rsplit('\\', 1)
	curSig = ''.join(spl)
	if curSig[len(curSig)-2] != '*':
		spl = curSig.rsplit('\n', 1)
		curSig = spl[0] + '.*'
	curSig = curSig.replace('\n', '')
	curSig = replace_symbol_regex(curSig)
	curSig = curSig.replace('=\\', '=')


	# *\/utest\/\?oo\=[-\+]?[0-9]+\&jutr\=[-\+]?[0-9]+\&.*ra\=[-\+]?[0-9]+.*
	# => r'\/utest\/\?(?=.*oo\=[-\+]?[0-9]+)(?=.*jutr\=[-\+]?[0-9]+)(?=.*ra\=[-\+]?[0-9]+)'
	# => r'\/utest\/\?(?=.*oo\=[-\+]?[0-9]+)(?=.*jutr\=[-\+]?[0-9]+)(?=.*ra\=[-\+]?[0-9]+)'

	# find query string position
	j = 0
	for i in curSig:
		if i == '?':
			break
		j += 1
	# if there's a query string, use positive lookahead to have unordered key/value pairs
	if j != len(curSig):
		split = curSig.split("\&")
		split[0] = split[0][j+1:]
		split[-1] = split[-1][:-2]
		# print split
		for i in xrange(len(split)):
			# avoid .*.*
			if split[i][:2] == ".*":
				split[i] = "(?="+split[i]+")"
			else:
				split[i] = "(?=.*"+split[i]+")"
		curSig = curSig[:j+1]
		curSig += "".join(split) + ".*"
		# print curSig

	outFile.write('%s\n' % (curSig))
	curSig = sigFile.readline()

sigFile.close()
outFile.close()
