let Neon=require("@cityofzion/neon-js")

const props = {
  scriptHash: '476cd11848d20c19ceed3781327a8cb541669d8f', // Scripthash for the contract
  operation: 'query', // name of operation to perform.
  args: ['cef0c0fdcfe7838eff6ff104f9cdec2922297537'] // any optional arguments to pass in. If null, use empty array.
}

const script = Neon.default.create.script(props)

/*
Neon.rpc.Query.invokeScript(script).execute('http://10.100.54.31:30333').then(res => {
    console.log(res.result) // You should get a result with state: "HALT, BREAK"
})
*/

// ENCRYPTION

const fs = require('fs');
const { execSync } = require( 'child_process' );

const NUM_VALIDATORS=1;
const MAX_RAND=10000
const citizenKeysHash="QmQEf6CESiJQkRB3PdwDPshAzHc8QfdLDS63aFX8K9DsTt";
const privKey="987654321"

async function vote(v){
	publicKey= await getElectionPublicKey();
	//cyphertext=homoEncrypt(publicKey, v);
	execSync( 'VEncrypt '+String(publicKey)+' '+String(v) + '| ipfs add -Q > fileHash.txt');
	contractInvoke("vote", fs.readFileSync('fileHash.txt', 'utf8'));
}

async function getElectionPublicKey(){
	return contractCall("getElectionPublicKey")
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


function contractCall(op){
	switch(op){
		case "getElectionPublicKey":
			return 'aaaa'
			break;
		case "getResult":
			return fs.readFileSync('result_decrypted.txt', 'utf8');
			break;
		case "getCyphertexts":
			return fs.readFileSync('cyphers.json', 'utf8');
			break;
		case "getWeb":
			return [];
			break;
	}
}
		

async function getElectionResults(){
}

async function homomorphicSumAndDecrypt(len){ //Fake
	execSync("sumEncryptedValidator "+len+" > result_decr.txt");
	return fs.readFileSync('result_decrypted.txt', 'utf8');
}

function checkEncryption(encrypted, decrypted, publicKey){ //Fake
	if(publicKey==encrypted.pKey &&
		publicKey==decrypted.pKey &&
		encrypted.value==decrypted.value &&
		decrypted.decrypted>NUM_VALIDATORS)
		return true
	return false
}

async function getDecryptedResult(){
	return contractCall("getResult")
}

async function getAllCyphertexts(){ //[{cypher, voter}, ...]
	return JSON.parse(contractCall("getCyphertexts"))
}

async function getWebOfTust(){
	return JSON.parse(contractCall("getWeb"))
}

async function getCitizenKeys(){ //retrieve from IPFS
	execSync('ipfs cat '+ citizenKeysHash+" > cKeys.json")
	return JSON.parse(fs.readFileSync('cKeys.json', 'utf8'));
}

async function decryptVotes(){
	votes= await getAllCyphertexts()
	//web=getWebOfTust()
	cKeys= await getCitizenKeys()
	//filter votes - TODO: Improve by analysing the web of trust for weird patterns that indicate manipulation
	votes=votes.filter((v)=>v.voter in cKeys)
	if(votes.length<cKeys.length*0.7){
		return false;
	}
	votes.map((v)=>v.cypher).forEach((v, i)=>{
		execSync('ipfs cat '+ v +" > "+i+".txt")
	})
	//compute result
	result= await homomorphicSumAndDecrypt(votes.length)
	contractInvoke("uploadDecrypted", result);
	return result;
}

// SERVER

const http = require('http');
const urlParse=require('url').parse;
//const fs=require('fs');
const body=require('body');

const port = 9001;

var votes = [];

const server = http.createServer((req, res) => {
	if(urlParse(req.url).pathname.startsWith("/api")){
		switch(req.method){
			case "GET":
				res.end(JSON.stringify(decryptVotes()));
				break;
		}
	}
});

server.listen(port);
