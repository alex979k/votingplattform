# Set up contract()


const MAX_RAND=10000

function vote(v){
	randomness=Math.floor(Math.random()*MAX_RAND);
	publicKey=getElectionPublicKey();
	contract("vote", homoEncrypt(publicKey, v, randomness));
}

function homoEncrypt(publicKey, payload, randomness){ //Fake

}

function getElectionPublicKey(){
	return contract("getElectionPublicKey")
}

function reverseGraph(graph){
	newGraph={}
	for(voter in graph){
		for(voted in graph[voter]){
			if(voted in newGraph){
				newGraph[voted].push(voter)
			}else{
				newGraph[voted]=[voter]
			}
		}
	}
	return newGraph
}
		

function getElectionResults(){
	votes=getAllCyphertexts()
	web=getWebOfTust()
	cKeys=getCitizenKeys()
	//filter votes
	web=filter
	//compute result
	encryptedResult=homomorphicSum(votes.map((v)=>v.cypher))
	result=getDecryptedResult()
	publicKey=getElectionPublicKey();
	if(!checkEncryption(encryptedResult, result, publicKey)){
		throw failure;
	}
	return result;
}

function homomorphicSum(cyphertexts){ //Fake

}

function checkEncryption(encrypted, decrypted, publicKey){ //Fake

}

function getDecryptedResult(){
	return contract("getResult")
}

function getAllCyphertexts(){ //[{cypher, voter}, ...]
	return JSON.parse(contract("getCyphertexts"))
}

function getWebOfTust(){
	return JSON.parse(contract("getWeb"))
}

function async getCitizenKeys(){ //retrieve IPFS
	return await fetch("https://ipfs.io/ipfs/Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a")
	.then((res)=>res.text())
}
