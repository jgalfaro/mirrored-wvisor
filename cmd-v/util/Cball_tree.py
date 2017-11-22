###############################
#
# Ball tree module
#
###############################

import distances as dst

class BallTree:

    def __init__(self, _data):
        self.ball_arr = _BArray(data)
        self.costs_arr = []
        self.tree = None

    def build(self, l, r):
        i = 0
        c = 0
        j = 0
        m = 0
        bdim = 0
        bloc = 0
        bcst = 0.0
        ball = None

        if l == r:
            # Create a leaf ball
            result = _BallNode()
            result.ball = _Ball(costs_arr[r])
        else:
            bloc = l
            for i in range(0, ball_arr.dim):
                # TODO: implement sort_on_coord
                ball_arr.sort_on_coord(i,l,r)
                # TODO: implement fill_in_cost_arr
                self.fill_in_cost_arr(l,r)
                if i == 0:
                    bcst = costs_arr[l]
                for j in range(l,r):
                    if costs_arr[j] < bcst:
                        bcst = costs_arr[j]
                        bdim = i
                        bloc = j
            ball_arr.sort_on_coord(bdim,l,r)
            # Create the tree
            result = _BallNode()
            result.left_tree = self.build(l,bloc)
            result.left_tree.parent = result
            result.right_tree = self.build(bloc+1,r)
            result.right_tree.parent = result
            # Create the ball, expand it, and associate it to its node ball
            ball = _Ball(ball_arr.dim)
            ball.expand_to_bound_balls(result.left_tree.ball,
                    result.right_tree.ball)
            result.ball = ball
        # Save the built ball-tree in self.tree
        self.tree = result


#    def _fill_in_cst(l,r):
        # TODO: implement



class _BArray:

    def __init__(self, _data, _dim):
        # Remember that data should be a list of triplets (path,keyset,valset)
        self.data = _data
        # Not used ---
        self.dim  = _dim
        # ------------

    def sort_on_coord(self, l, r, dim):
        # The implementation of this method is highly dependant on the data type

        first = self.data[0]
        for i in range(l+1,r):
            min_dist = dst.url_lcs_jaccard(first,self.data[i])
            index = -1
            for j in range(i+1, r):
                dist = dst.url_lcs_jaccard(first, self.data[j])
                if dist < min_dist:
                    min_dist = dist
                    index = j

            if index != -1:
                temp = self.data[i]
                self.data[i] = self.data[index]
                self.data[index] = temp

class _BallNode:

    def __init__(self):
        self.ball = None
        self.parent = None
        self.left_tree = None
        self.right_tree = None

class _Ball:

    def __init__(self, _dim):
        self.center = None
        self.dim = _dim
        self.radius = 0
        self.volume = 0
        # In leaf balls this should hold the URL (say vector of path, keys and vals)
        self.data = None 

    def expand_to_bound_balls(a, b):
        self.radius = radius.a + radius.b + dst.url_lcs_jaccard(a.data,b.data)
        self.volume = pow(self.radius, self.dim)


