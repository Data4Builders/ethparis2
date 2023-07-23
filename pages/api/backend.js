import {
  SismoConnect,
  AuthType,
  SismoConnectVerifiedResult,
  ClaimType,
  SismoConnectConfig,
  SignatureRequest,
  AuthRequest,
  ClaimRequest,
  SismoConnectResponse
} from "@sismo-core/sismo-connect-server";

(async () => {
  // reusing the exact same config as the front end's
  const sismoConnect = SismoConnect({ config });
  
  const result: SismoConnectVerifiedResult = await sismoConnect.verify(
        sismoConnectResponse, // copied from the previous step or received from API call
        {
          auths,
          claims,
          signature,
        }
      );
  
  console.log(result.getUserIds(AuthType.VAULT));
  // vault anonymous identifier = hash(vaultSecret, AppId)
  // ['0x225c5b67c39778b40ef2528707c9fbdfed96f31b9a50826b95c2ac40e15e4c6b']
  console.log(result.getUserIds(AuthType.GITHUB));
  // [ '35774097' ] GitHub id of @dhadrien
  console.log(result.getUserIds(AuthType.TWITTER));
  // [ '2390703980' ] Twitter id of @dhadrien_
  console.log(result.getUserIds(AuthType.EVM_ACCOUNT));
  // [
  //   '0x8ab1760889f26cbbf33a75fd2cf1696bfccdc9e6', // dhadrien.sismo.eth
  //   '0xa4c94a6091545e40fc9c3e0982aec8942e282f38' // requested wallet auth
  // ]
  console.log(result.getUserIds(AuthType.TELEGRAM));
  // [ '875608110' ] // Telegram id of @dhadrien 
})()