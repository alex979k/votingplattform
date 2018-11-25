#include <iostream>
#include <time.h>
#include <stdlib.h>

#include "FHE.h"
#include "FHEContext.h"
#include "EncryptedArray.h"

#include "NTL/ZZ.h"
#include "NTL/ZZX.h"



int main()
{
//unsigned long m = 11119, p = 17, r = 1;
//long L = 11;


srand(time(NULL));   // Initialization, should only be called once.
int random = rand();


long m=0, p=11006761, r=1; // Native plaintext space
long L=16;          // Levels
long c=3;           // Columns in key switching matrix
long w=64;          // Hamming weight of secret key
long d=0;
long security = 128;
m = FindM(security, L, c, p, d, 0, 0);


std::cout << "Initializing context... " << std::flush;
FHEcontext context(m, p, r);
buildModChain(context, L);
std::cout << "OK!" << std::endl;
std::cout << "Generating keys... " << std::flush;

FHESecKey secretKey(context);
const FHEPubKey& publicKey = secretKey;
std::cout << "publicKey" << publicKey << std::endl;

secretKey.GenSecKey(64);
std::cout << "OK!" << std::endl;

addFrbMatrices(secretKey);
addSome1DMatrices(secretKey);

const EncryptedArray *ea = publicKey.getContext().ea;
long slots = ea->size();

std::cout << "slots" << slots << std::endl;
std::cout << std::endl;

Ctxt ctxt_0(publicKey);
std::vector<NTL::ZZX> vec_0(slots, NTL::ZZX(0));
vec_0[slots-2] = NTL::ZZX(0);
vec_0[slots-1] = NTL::ZZX(random % 11006761);
ea->encrypt(ctxt_0, publicKey, vec_0);
ea->shift(ctxt_0, 1);

long votesPlain = 0;
const int VOTERS = 100;
for(auto i = 0;i<VOTERS;i++){
  std::vector<NTL::ZZX> vec(slots, NTL::ZZX(0));
  long vote = rand() % 2;
  votesPlain += vote;
  std::cout << "vote" << vote << std::endl;
  vec[slots-2] = NTL::ZZX(vote);
  vec[slots-1] = NTL::ZZX(random % 11006761);

  Ctxt ctxt_vec(publicKey);
  ea->encrypt(ctxt_vec, publicKey, vec);
  ea->shift(ctxt_vec, 1);

  ctxt_0 += ctxt_vec;

  if(i % 10 == 0){
    std::cout << i << std::endl;
  }

}
//}

std::vector<NTL::ZZX> res(slots, NTL::ZZX(0));
ea->decrypt(ctxt_0, secretKey, res);

std::cout << res << std::endl;
std::cout << std::endl;
std::cout << "votesPlain" << votesPlain << std::endl;

// 0001 from shifting != 0001
/*Ctxt ctxt_vecx(secretKey);
std::vector<NTL::ZZX> vec_x(slots, NTL::ZZX(0));
vec_x[slots-1] = NTL::ZZX(1);
ea->encrypt(ctxt_vecx, secretKey, vec_x);
std::cout << "ctxt_vecx" << std::endl << ctxt_vecx << std::endl;
std::vector<NTL::ZZX> res_x(slots, NTL::ZZX(0));
ea->decrypt(ctxt_vecx, secretKey, res_x);
std::cout << "res_x" << std::endl << res_x << std::endl;



Ctxt ctxt_vecy(secretKey);
std::vector<NTL::ZZX> vec_y(slots, NTL::ZZX(0));
vec_y[slots-2] = NTL::ZZX(1);
ea->encrypt(ctxt_vecy, secretKey, vec_y);
ea->shift(ctxt_vecy, 1);
std::cout << "ctxt_vecy" << std::endl << ctxt_vecy << std::endl;
std::vector<NTL::ZZX> res_y(slots, NTL::ZZX(0));
ea->decrypt(ctxt_vecy, secretKey, res_y);
std::cout << "res_y" << std::endl << res_y << std::endl;
*/


return 0;
}
