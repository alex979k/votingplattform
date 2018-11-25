
//let Neon = require("@cityofzion/neon-js")
let Neon, { rpc, api, sc, u } = require('@cityofzion/neon-js')

//const neon_js = require('@cityofzion/neon-js');
//const Neon = neon_js.default;

    contract = '20855b99fbf9a5fe92ec2a1b0a76138d6ee3c590'; //TODO:CHANGE
    networkUrl = 'http://130.233.87.233:30333';
    neoscanUrl = 'http://130.233.87.233:4000/api/main_net/v1';

    //constructor() {
        // this.getDomainAddress(this.contract, 'asasd').then(res => alert(res), err => console.log(err));
        //this.alternateRegister('test5');
    //}

    function contractInvoke(operation, arg1) {

        const account = Neon.create.account('KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr'); //TODO:CHANGE
        const args = [arg1];
        const script = Neon.create.script({
            scriptHash: this.contract,
            operation: operation,
            args
        });

        const request = {
            net: this.neoscanUrl,
            url: this.networkUrl,
            script,
            address: account.address,
            privateKey: account.privateKey,
            publicKey: account.publicKey,
            gas: 1,
            balance: null
        };

        Neon.doInvoke(request).then(res => console.log(res.response));
    }

    function contractCall(operation) {
	scHash=this.contract;//TODO What is this???


        const sb = Neon.create.scriptBuilder();
        sb.emitAppCall(this.contract, operation, ["a"]);

        // Test the script with invokescript
        rpc.Query
            .invokeScript(sb.str)
            .execute(networkUrl)
            .then(data => {
                console.log(data.result);
            })
            .catch(err => {
                console.log(err);
            });
            //.execute(`http://neo-privnet:30333`)
	    /*
        return rpc.Query.invokeFunction(scHash, operation, []) //3.9.1
            .execute(this.neoscanUrl);
	    */
    }

//contractCall("getciphers")

const NUM_VALIDATORS=1;
const MAX_RAND=10000

async function vote(v){
	randomness=Math.floor(Math.random()*MAX_RAND);
	publicKey= await getElectionPublicKey();
	contractInvoke("vote", homoEncrypt(publicKey, v, randomness));
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
	//compute result
	encryptedResult=homomorphicSum(votes.map((v)=>v.cypher))
	result=await getDecryptedResult()
	publicKey=await getElectionPublicKey();
	if(!checkEncryption(encryptedResult, result, publicKey)){
		throw failure;
	}
	return result;
}

function homomorphicSum(cyphertexts){ //Fake
	sum=0
	pKey=cyphertexts[0].pKey
	for(c in cyphertexts){
		if(c.pKey==pKey){
			sum+=c.value;
		}
	}
	return {pKey: pKey, value: sum, decrypted:0}
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
	return fetch("https://ipfs.io/ipfs/Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a")
	.then((res)=>res.json())
}
