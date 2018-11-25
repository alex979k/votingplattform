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

async function vote(v){
	randomness=Math.floor(Math.random()*MAX_RAND);
	publicKey= await getElectionPublicKey();
	cyphertext=homoEncrypt(publicKey, v);
	execSync( 'VEncrypt '+String(publicKey)+' '+String(v) + '| ipfs add -Q > fileHash.txt');
	contractInvoke("vote", fs.readFileSync('fileHash.txt', 'utf8'));
}

function homoEncrypt(publicKey, payload, randomness){ //Fake
	return JSON.stringify({pKey: publicKey, value: payload, decrypted: 0, rand: randomness})
}

function getElectionPublicKey(){
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


async function getElectionResults(){
	votes= await getAllCyphertexts()
	//web=getWebOfTust()
	cKeys= await getCitizenKeys()
	//filter votes - TODO: Improve by analysing the web of trust for weird patterns that indicate manipulation
	votes=votes.filter((v)=>v.voter in cKeys)
	votes.map((v)=>v.cypher).forEach((v, i)=>{
		execSync('ipfs cat '+ v +" > "+i+".txt")
	})
	//compute result
	encryptedResult= await homomorphicSum(votes.length)
	result=await getDecryptedResult()
	publicKey=await getElectionPublicKey();
	if(!checkEncryption(encryptedResult, result, publicKey)){
		throw 1;
	}
	return result;
}

async function homomorphicSum(len){ //Fake
	execSync("sumEncrypted "+len+" > resultSum.txt");
	return fs.readFileSync('resultSum.txt', 'utf8');
}

function checkEncryption(encrypted, decrypted, publicKey){ //Fake
	if(publicKey==encrypted.pKey &&
		publicKey==decrypted.pKey &&
		encrypted.value==decrypted.value &&
		decrypted.decrypted>NUM_VALIDATORS)
		return true
	return false
}

function getDecryptedResult(){
	return contractCall("getResult")
}

function getAllCyphertexts(){ //[{cypher, voter}, ...]
	return JSON.parse(contractCall("getCyphertexts"))
}

function getWebOfTust(){
	return JSON.parse(contractCall("getWeb"))
}

function getCitizenKeys(){ //retrieve from IPFS
	execSync('ipfs cat '+ citizenKeysHash+" > cKeys.json")
	return JSON.parse(fs.readFileSync('cKeys.json', 'utf8'));
}

// SERVER

const http = require('http');
const urlParse=require('url').parse;
//const fs=require('fs');
const body=require('body');

const port = 9000;

var votes = [];

const server = http.createServer((req, res) => {
	if(urlParse(req.url).pathname.startsWith("/api")){
		switch(req.method){
			case "GET":
				res.end(JSON.stringify(getElectionresults()));
				break;
			case "POST":
				body(req, (err, body) => {
					vote(body);
					//votes.push(JSON.parse(body));
					res.end();
				});
				break;
		}
	}else{
		var path="./static"+urlParse(req.url).pathname; //HUGE security hole
		path.replace(/\.\./, "");
		if(path=="./static/"){
			path="./static/index.html";
		}
		fs.access(path, (err)=>{
			if(err){
				res.statusCode = 404;
				res.setHeader('Content-Type', 'text/plain');
				res.end('File doesn\'t exist\n');
			}else{
				fs.createReadStream(path).pipe(res);
			}
		});
	}
});

server.listen(port);
