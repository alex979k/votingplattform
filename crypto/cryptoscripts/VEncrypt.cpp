#include <cstring>
#include "EncryptedArray.h"
#include "FHE.h"
#include <fstream>
#include "myUtils.h"
#include <NTL/ZZX.h>
#include <iostream>

int main(int argc, char **argv)
{

	if(argc != 3){
		std::cout << "Please (only) enter your vote." << std::endl;
		return 0;
	}

	char *a0 = argv[1];
  string pubKeyPath = a0;

	char *a1 = argv[2];
  int vote = atoi(a1);

	srand(time(NULL));   // Initialization, should only be called once.
	int random = rand();

	//std::cout << "Reading publicKey.txt from disk..." << std::endl;

	// Read the public key from disk
	Timer tReadKeys;
	tReadKeys.start();
	fstream pubKeyFile(pubKeyPath, fstream::in);
	assert(pubKeyFile.is_open());
	unsigned long m, p, r;
	vector<long> gens, ords;

	readContextBase(pubKeyFile, m, p, r, gens, ords);
	FHEcontext context(m, p, r, gens, ords);
	pubKeyFile >> context;

	FHEPubKey publicKey(context);
	pubKeyFile >> publicKey;

	pubKeyFile.close();

	tReadKeys.stop();
	//std::cout << "Time for reading public key from disk: " << tReadKeys.elapsed_time() << "s" << std::endl;

	EncryptedArray ea(context);
	uint nslots = ea.size();

	uint count = 0;
	std::vector<NTL::ZZX> plaintext(nslots, NTL::ZZX(0));
	plaintext[nslots-2] = NTL::ZZX(vote);
	plaintext[nslots-1] = NTL::ZZX(random % p);

	//std::cout << "Message to be encrypted: " << std::endl << plaintext << std::endl;

    // Encryption
	Timer tEncryption;
	tEncryption.start();

	Ctxt ctxt(publicKey);
	ea.encrypt(ctxt, publicKey, plaintext);

	tEncryption.stop();
	//std::cout << "Time for encryption: " << tEncryption.elapsed_time() << "s" << std::endl;
	//std::cout << "Writing vote.txt to disk..." << std::endl;

	// Output ciphertext to file
	std::fstream ciphertext("../vote.txt", fstream::out|fstream::trunc);
	ciphertext << ctxt;
	ciphertext.close();

	std::cout << ctxt << std::endl;

	//std::cout << "IMPORTANT: Please upload the generated file: \"vote.txt\" to VoteXYZ." << std::endl ;

	return 0;
}
