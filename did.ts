import { signW3C } from "@trustvc/trustvc";
import { Wallet, providers } from "ethers";

enum VerificationType {
  JsonWebKey2020 = "JsonWebKey2020",
  EcdsaSecp256k1VerificationKey2019 = "EcdsaSecp256k1VerificationKey2019",
  Ed25519VerificationKey2018 = "Ed25519VerificationKey2018",
  Bls12381G1Key2020 = "Bls12381G1Key2020",
  Bls12381G2Key2020 = "Bls12381G2Key2020",
  EcdsaSecp256k1RecoveryMethod2020 = "EcdsaSecp256k1RecoveryMethod2020"
}

const privateKey = '0x78178b5c5e7822d3fc742a5990b23fd30d23f575200ad1cf1fedd49003d63d4a';
const provider = new providers.JsonRpcProvider("https://rpc1.xinfin.network");

const wallet = new Wallet(privateKey, provider);

const rawDocument = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3c-ccg.github.io/citizenship-vocab/contexts/citizenship-v1.jsonld",
    "https://w3id.org/security/bbs/v1",
    "https://w3id.org/vc/status-list/2021/v1",
  ],
  credentialStatus: {
    id: "https://praduman2714.github.io/did/credentials/statuslist/1#1",
    type: "StatusList2021Entry",
    statusPurpose: "revocation",
    statusListIndex: "10",
    statusListCredential: "https://praduman2714.github.io/did/credentials/statuslist/1",
  },
  credentialSubject: {
    name: "TrustVC",
    birthDate: "2024-04-01T12:19:52Z",
    type: ["PermanentResident", "Person"],
  },
  expirationDate: "2029-12-03T12:19:52Z",
  issuer: "did:web:praduman2714.github.io:did:1",
  type: ["VerifiableCredential"],
  issuanceDate: "2024-04-01T12:19:52Z",
};

const privateKeyPair = {
  id: "did:web:praduman2714.github.io:did:1#keys-1",
  controller: "did:web:praduman2714.github.io:did:1",
  type: VerificationType.Bls12381G2Key2020,
  publicKeyBase58: "77T4CngAf4QWBFJTFFHtadrovf96QTX7chSEhVz8eX865m1jEXsoD1rRs5QgniABNL6dDTnmnVMo1KTCtB5rZWvBGXWvzuzakcwkNYFnVPYUThUu9xbCkcZH1MuK8EqKJQr8",
  privateKeyBase58: "7hCFcg2kGtQAZPjV8ZjHfydLVZycMwYnbnYRLh9LGVei",
};

async function main() {
  console.log(VerificationType.Bls12381G1Key2020);

  const signingResult = await signW3C(rawDocument, privateKeyPair);

  console.log(`Signed Document: ${JSON.stringify(signingResult)}`);
}

main().catch(console.error);
