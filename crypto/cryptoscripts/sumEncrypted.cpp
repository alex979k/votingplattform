#include <cstring>
#include "EncryptedArray.h"
#include "FHE.h"
#include <fstream>
#include "myUtils.h"
#include <NTL/ZZX.h>
#include <iostream>

int main(int argc, char **argv)
{

int numFiles = atoi(argv[1]);
// Read secret key from file
fstream secKeyFile("../seckey.txt", fstream::in);
unsigned long m, p, r;
vector<long> gens, ords;
readContextBase(secKeyFile, m, p, r, gens, ords);
FHEcontext context(m, p, r, gens, ords);
secKeyFile >> context;

FHESecKey secretKey(context);
const FHEPubKey& publicKey = secretKey;

secKeyFile >> secretKey;

addFrbMatrices(secretKey);
addSome1DMatrices(secretKey);

const EncryptedArray *ea = publicKey.getContext().ea;
long nslots = ea->size();

//**Aggregation
// Read ciphertext from file
Ctxt ctxt_0(publicKey);
std::vector<NTL::ZZX> vec_0(nslots, NTL::ZZX(0));
ea->encrypt(ctxt_0, publicKey, vec_0);


int MAX_NUMBER_FILES_DIGIT = 4;
for(int j = 0; j < numFiles; j++){
  char j_str[MAX_NUMBER_FILES_DIGIT];
  sprintf(j_str, "%d", j);
  std::string s_tmp = j_str;
  s_tmp.append(".txt");
  fstream ciphertextFile(s_tmp, fstream::in);

  Ctxt ctxt(publicKey);
  ciphertextFile >> ctxt;
  ea->shift(ctxt, 1);

  ctxt_0 += ctxt;
}

std::vector<long int> decrypted(nslots,0);
ea->decrypt(ctxt_0, secretKey, decrypted);

fstream ciphertextFileEnc("result_encrypted.txt", fstream::out|fstream::trunc);
ciphertextFileEnc << ctxt_0;
ciphertextFileEnc.close();

fstream ciphertextFileDec("result_decrypted.txt", fstream::out|fstream::trunc);
ciphertextFileDec << decrypted;
ciphertextFileDec.close();

return 0;
}
