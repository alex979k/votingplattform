# Votingplatform

This project proposes an idea for decentralized, anonymous voting in government elections. It was developed on Junction 2018.

It enables the prove of identity, anonymous voting, and decentralized auditability.
The underlying innovation for the idea is threshold homomorphic encryption. However, in the code only non-threshold homomorphic encryption is used.

## Idea
###Submitting a vote
The idea is that people encrypt their votes (say 0 or 1) via homomorphic encryption and the votes are put into the Neo Blockchain via Smart Contracts. The encryption happen with a public key Pub1 chosen by a set of "validator nodes" in the Neo Blockchain. For the submission of the vote, another private key Prv2 is used, which was initially given to a user by the government. (We will not go into detail how this process works to be secure.)

###Calculating all votes
The validator nodes all have only one part of a private key Prv1. Prv1 is a Multi-Signature key. Every participant of the Neo Blockchain can add all the hashes (encrypted votes) associated with one voting process using cipher arithmetic and obtain a result-hash H. However, a single participant can not decrypt this result, nor any of the individual votes. Only the validator nodes can decrypt H, in the case that they collaborate and sequentially decrypt H with their respective part of the private key Prv1. They will only agree to this decryption if they can prove that they are receiving a derivate of the original hash H. If they notice that another validator node sends a hash of an individual vote, to reveal that single voting, other validator nodes would decline decryption. Eventually, H is fully decrypted. This is checked by every validator node (requires doing the encryption N times overall) so that every validator node at some point gets to be the final node to obtain the fully decrypted result of H. This is the cumulative result of all votes, hence the voting result. It is shared publicly as well as the H that was used by the validator nodes.

###Validating the calculation
If a non-validator node attempts to check this obtained result, he simply calculates H2 from all votes in the Blockchain (including his vote) and checks H2 against H. If they are equal the validator nodes used the same H for decryption and the voting result is valid. Of course, it is only valid if the validator nodes did not conspire and all provide a different result than is encrypted in H. However, the probability for this to be the case is marginally small with a significantly high number of randomly chosen validator nodes at each election. 

Side note: To increase trust, the validator nodes could be chosen from the prominent nodes in a Web of Trust.

#####Threshold Homomorphic Encryption
Homomorphic encryption is a method to do calculations on cipher texts.


    1 + 2 -> homomorphic encryption --> 0x3w2e + 0x342r = 0xr4r3
    0xr4r3 --> decryption --> 3


Threshold homomorphic encryption simply means that in order to decrypt the result of a hash, many independent parts of a private key (independent validator nodes) are needed.

## Run
You can run the frontend like this and click through the process:

    cd frontend
    yarn install
    yarn start


For questions regarding the homomorphic encryption [scripts](https://github.com/xanpj/votingplattform/tree/master/crypto/cryptoscripts), for which we used [HELib](https://github.com/shaih/HElib), you are encouraged to submit an issue and we'll explain.

The backend, smart contracts etc. is quite complex to setup.
