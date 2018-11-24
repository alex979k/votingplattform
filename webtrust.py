def getWeb():
    return {1:[2,3], 2:[1]}

def getValidators(web, numValidators):
    nodeVotes={}
    for node in web:
        for vote in node:
            if vote in nodeVotes:
                nodeVotes[node]+=1
            else
                nodeVotes[node]=1
    sortedNodes=sorted(nodeVotes.keys(), key=lambda x: nodeVotes[x])
    return sortedNodes[:numValidators]

if __name__=="__main__":
    getValidators(getWeb(), 50)
