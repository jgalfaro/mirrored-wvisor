from sets import Set


def url_lcs_jaccard(url1, url2):
    # url1 and url2 are triplets of (path, keyset, valueset)
    path_distance = 1-(len(lcs(url1[0],url2[0]))*1.0/max(len(url1[0]),len(url2[0])))
    keyset_distance = jaccard(Set(url1[1]),Set(url2[1]))
    valset_distance = jaccard(Set(url1[2]),Set(url2[2]))
    return (path_distance+keyset_distance+valset_distance)/3


def strip_string_to_lowercase(s):
    tmpStr = s.lower().strip()
    retStrList = []
    for x in tmpStr:
        if x in string.ascii_lowercase:
            retStrList.append(x)

    return ''.join(retStrList)

def jaccard(a, b):
    # a & b must be sets
    if len(a) == 0 and len(b) == 0:
        return 0.0
    elif len(a) == 0 and len(b) != 0:
        return 1.0
    elif len(a) != 0 and len(b) == 0:
        return 1.0
    else:
        return 1-(len(a.intersection(b))*1.0 / len(a.union(b)))


# To me it would make more sense something like all substrings, not just the 
# common longest one.
def lcs(a, b):
    L = [[0 for x in range(len(b))] for x in range(len(a))]
    z = 0
    ret = ""

    for i in range(0,len(a)):
        for j in range(0,len(b)):
            if a[i] == b[j]:
                if i == 1 or j == 1:
                    L[i][j] = 1
                else:
                    L[i][j] = L[i-1][j-1] + 1
                if L[i][j] > z:
                    z = L[i][j]
                    ret = a[i-z+1:i+1]
                elif L[i][j] == z:
                    ret += a[i-z+1:i+1]
            else:
                L[i][j] = 0
    return ret

def levenshtein(s1, s2):
    if len(s1) < len(s2):
        return levenshtein(s2, s1)
 
    # len(s1) >= len(s2)
    if len(s2) == 0:
        return len(s1)
 
    previous_row = xrange(len(s2) + 1)
    for i, c1 in enumerate(s1):
        current_row = [i + 1]
        for j, c2 in enumerate(s2):
            insertions = previous_row[j + 1] + 1 # j+1 instead of j since previous_row and current_row are one character longer
            deletions = current_row[j] + 1       # than s2
            substitutions = previous_row[j] + (c1 != c2)
            current_row.append(min(insertions, deletions, substitutions))
        previous_row = current_row
 
    return previous_row[-1]

def winklerCompareP(str1, str2):
	"""Return approximate string comparator measure (between 0.0 and 1.0)

	USAGE:
	score = winklerCompareP(str1, str2)
	ARGUMENTS:
	str1  The first string
	str2  The second string

	DESCRIPTION:
	As described in 'An Application of the Fellegi-Sunter Model of
	Record Linkage to the 1990 U.S. Decennial Census' by William E. Winkler
	and Yves Thibaudeau.

	Based on the 'jaro' string comparator, but modifies it according to whether
	the first few characters are the same or not.
	"""

	# Quick check if the strings are the same - - - - - - - - - - - - - - - - - -
	#
	#str1=strip_string_to_lowercase(str1)
	#str2=strip_string_to_lowercase(str2)
	str1=str1.lower()
	str2=str2.lower()
	jaro_winkler_marker_char = chr(1)
	if (str1 == str2):
		return 1.0

	len1 = len(str1)
	len2 = len(str2)
	halflen = max(len1,len2) / 2 - 1

	ass1  = ''  # Characters assigned in str1
	ass2  = '' # Characters assigned in str2
	#ass1 = ''
	#ass2 = ''
	workstr1 = str1
	workstr2 = str2

	common1 = 0    # Number of common characters
	common2 = 0

	#print "'len1', str1[i], start, end, index, ass1, workstr2, common1"
	# Analyse the first string    - - - - - - - - - - - - - - - - - - - - - - - - -
	#
	for i in range(len1):
		start = max(0,i-halflen)
		end   = min(i+halflen+1,len2)
		index = workstr2.find(str1[i],start,end)
		#print 'len1', str1[i], start, end, index, ass1, workstr2, common1
		if (index > -1):    # Found common character
			common1 += 1
			#ass1 += str1[i]
			ass1 = ass1 + str1[i]
			workstr2 = workstr2[:index]+jaro_winkler_marker_char+workstr2[index+1:]
	#print "str1 analyse result", ass1, common1

	#print "str1 analyse result", ass1, common1
	# Analyse the second string - - - - - - - - - - - - - - - - - - - - - - - - -
	#
	for i in range(len2):
		start = max(0,i-halflen)
		end   = min(i+halflen+1,len1)
		index = workstr1.find(str2[i],start,end)
    #print 'len2', str2[i], start, end, index, ass1, workstr1, common2
		if (index > -1):    # Found common character
			common2 += 1
			#ass2 += str2[i]
			ass2 = ass2 + str2[i]
			workstr1 = workstr1[:index]+jaro_winkler_marker_char+workstr1[index+1:]

	if (common1 != common2):
		print('Winkler: Wrong common values for strings "%s" and "%s"' % \
                (str1, str2) + ', common1: %i, common2: %i' % (common1, common2) + \
                ', common should be the same.')
		common1 = float(common1+common2) / 2.0    ##### This is just a fix #####

	if (common1 == 0):
		return 0.0

	# Compute number of transpositions    - - - - - - - - - - - - - - - - - - - - -
	#
	transposition = 0
	for i in range(len(ass1)):
		if (ass1[i] != ass2[i]):
			transposition += 1
	transposition = transposition / 2.0

	# Now compute how many characters are common at beginning - - - - - - - - - -
	#
	minlen = min(len1,len2)
	for same in range(minlen+1):
		if (str1[:same] != str2[:same]):
			break
	same -= 1
	if (same > 4):
		same = 4

	common1 = float(common1)
	w = 1./3.*(common1 / float(len1) + common1 / float(len2) + (common1-transposition) / common1)

	wn = w + same*0.1 * (1.0 - w)
	return wn
