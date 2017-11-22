# clustering.py contains classes and functions that cluster data points
import sys, math, random, re
from suffix_tree import GeneralisedSuffixTree

if len(sys.argv) < 4:
	print "This classifier should be executed as: python <script_name> <input_ua_file> <output_clstr_file> <nb_clusters>"
	exit(0)

# -- The Cluster class represents clusters of points in n-dimensional space
class Cluster:
	def __init__(self, points):
		if len(points) == 0: raise Exception("ILLEGAL: EMPTY CLUSTER")
		self.points = points

	def __repr__(self):
		return str(self.points)

	def update(self, points):
		self.points = points

	def checkPoint(self, strg):
		for curSt in self.points:
			if curSt == strg: return True
		return False

# Calculate the mean distance between a new string and the cluster
# It calculates the mean of distances between the string and each of the strings in the cluster
def getDistanceToCluster(st, clstr, dMatrix):
	dist = 0.0
	if len(clstr.points) == 0: return float(1.0)
	for curP in clstr.points:
		if (curP == st): continue
		dist += dMatrix[max(st, curP)][min(st, curP)]		
	return float(dist/len(clstr.points))

def kmeans(dMatrix, k, threshold):
	initial = random.sample(range(len(dMatrix)), k) 
	clusters = []
	for p in initial: clusters.append(Cluster([p]))
	count = 0
	while True:
		count += 1
		# Make a list for each Cluster
		lists = []
		score = 0
		for c in clusters: lists.append([])
		# For each Point:
		for p in range(len(dMatrix)):
			# Figure out which Cluster's centroid is the nearest
			smallest_distance = getDistanceToCluster(p, clusters[0], dMatrix)
			index = 0
			for i in range(len(clusters[1:])):
				distance = getDistanceToCluster(p, clusters[i+1], dMatrix)
				if distance < smallest_distance:
					smallest_distance = distance
					index = i+1
			# Add this Point to that Cluster's corresponding list

			if smallest_distance > threshold:
				clusters.append(Cluster([p]))
				lists.append([])
				lists[len(lists)-1].append(p)
				score += 1
			else:
				lists[index].append(p)
				if (clusters[index].checkPoint(p) == False): score += 1
		# Update each Cluster with the corresponding list
		# Record the biggest centroid shift for any Cluster
		for i in range(len(clusters)):
			clusters[i].update(lists[i])
		# If the biggest centroid shift is less than the cutoff, stop
		if ((score == 0) or (count >= 20)): break
		print "Number of permutations: %s" % (score)
	# Return the list of Clusters
	return clusters


pattern = re.compile('[0-9]')
# Implements the modified Levenshtein distance between two strings
def levenshtein(s1, s2):
    if len(s1) > len(s2): s1,s2 = s2,s1
    if len(s2) == 0: return float(1.0)
    lenS1 = len(s1) + 1
    lenS2 = len(s2) + 1
    dM = [[0] * lenS2 for x in range(lenS1)]
    for i in range(lenS1): dM[i][0] = i
    for j in range(lenS2): dM[0][j]=j
    for i in xrange(1, lenS1):
        for j in range(1, lenS2):
            deletion = dM[i-1][j] + 1
            insertion = dM[i][j-1] + 1
            substitution = dM[i-1][j-1]
            if s1[i-1] != s2[j-1]: substitution += 1
            dM[i][j] = min(insertion, deletion, substitution)
    return float(dM[lenS1-1][lenS2-1])/lenS2


# Constant definitions
USER_AGENT_FILE = sys.argv[1]
OUTPUT_FILE = sys.argv[2]
K = int(sys.argv[3])
Th = 0.45

def plotDist(clusters, dMatrix):
	dists = []
	for cl in clusters:
		curDist = 0.0
		for i in range(len(cl.points)):
			for j in range(len(cl.points)):
				if j <= i: continue
				curDist += dMatrix[max(cl.points[j], cl.points[i])][min(cl.points[j], cl.points[i])]
		if len(cl.points) > 1:
			curDist = (curDist*2)/(len(cl.points)*( len(cl.points)-1 ) )
		dists.append(curDist)
	output = open("dists.txt", 'w')
	for j in dists:
		output.write("%s\n" % (j))
	output.close()


def buildClusters(uaFile, outFile):
	Output = open(outFile, 'w')
	print "\nProcessing the user agents file:"
	usrAgents = open(uaFile, 'r')
	AgList = []
	curAgent = usrAgents.readline()
	while (curAgent != ''):
        	AgList.append(re.sub("\n","",curAgent))
	        curAgent = usrAgents.readline()
	print "\nGot %s anomalous user agent to cluster" % (len(AgList))
	dMatrix = calcDMatrix(AgList)
	# Cluster the points using the K-means algorithm
	clusters = kmeans(dMatrix, K, Th)
	plotDist(clusters, dMatrix)
	# Print the results
	j = 0
	for c in clusters:
		points = []
		for i in range(len(c.points)):
			points.append(AgList[c.points[i]])
		c.points = points
		Output.write("\nCluster %s: %s\n" % (j, c))
		j += 1
	return clusters

def buildShTokens(clusters):
	if len(clusters) == 0:
		return []
	tokens = [[] for i in range(len(clusters))]
	for i in range(len(clusters)):
		try:
			if len(clusters[i].points) == 1:
				clusters[i].points.append(clusters[i].points[0])
			stree = GeneralisedSuffixTree(clusters[i].points)
			kTh = max(1, int( Th * len(clusters[i].points) ))
			for shared in stree.sharedSubstringsNK(kTh):
				for seq, start, stop in shared:
					if stree.sequences[seq][start:stop] not in tokens[i]:
						tokens[i].append(stree.sequences[seq][start:stop])
			tokens[i].sort(lambda x,y: cmp(len(y), len(x))) #Sorting tokens according to the length of tokens in each list
		except:
			print "Error extracting tokens from cluster number %s" % (i)
			continue
	return tokens
		
# Constants definitons
GAP   = -1
scGAP = -2
SGAP = '#'
def score(a,b):
	if a == b: return 3
	else: return scGAP

#Extracts a common signature for all the string set given in the list parameters
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

########################################################
#
# Signature builder
#
########################################################

def buildClstrSignatures(clstr, tkList):
	if len(clstr.points) == 0: return None
	sigList = []
	for i in range(len(tkList)):
		#Identifying the list of user agents that include the current token instance
		curTk = tkList[i]
		uaList,j = [],0
		while j < len(clstr.points):
			if (clstr.points[j].find(curTk) != -1):
				uaList.append(clstr.points[j])
				clstr.points.pop(j)
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
		if (len(clstr.points) == 0): break
	return sigList

def calcDMatrix(AgList):
	dMatrix = [[0 for i in range(j)] for j in range(len(AgList))]
	for i in range(len(AgList)):
		for j in range(i):
			if (i == j): continue
			dMatrix[i][j] = levenshtein(AgList[i], AgList[j])
	return dMatrix
	
clusters = buildClusters(USER_AGENT_FILE, OUTPUT_FILE)
tokens = buildShTokens(clusters)
if len(clusters) != len(tokens):
	print "Non matching cluster and token lengths"
	sys.exit(0)
signatures = []
i = 0
try:
	for i in range(len(clusters)):
		curSig = buildClstrSignatures(clusters[i], tokens[i])
		for j in range(len(curSig)): signatures.append(curSig[j])
except:
	print "i = %s" % (i)
Output2 = open(OUTPUT_FILE + ".sigs", 'w')
for i in range(len(signatures)):
	Output2.write("%s\n" % (signatures[i]))



