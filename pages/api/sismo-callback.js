
import axios from 'axios';

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
import TruthWallet from '@/models/TruthWallet';

export default async function handler(req, res) {
  const config = {
    // you will need to register an appId in the Factory
    appId: "0xa860f5fd71c5cf5707d371f589083d5a",
  }
  const sismoConnect = SismoConnect({ config });

  // if (req.method !== 'GET') {
  //   return res.status(405).end();
  // }
  // const sismoConnectResponse = req.query.sismoConnectResponseCompressed;

  // verifies the proofs contained in the sismoConnectResponse
  // with respect to the different auths
  // and the group(s) in the claim(s)
  // i.e. user prove they own a Vault, a Twitter account
  // and they are member of the group with id "0x42c768bb8ae79e4c5c05d3b51a4ec74a"
  // const result = await sismoConnect.verify(
  //   sismoConnectResponse,
  //   {
  // proofs in the sismoConnectResponse should be valid
  // with respect to a Vault and Twitter account ownership
  // auths: [
  //   { authType: AuthType.VAULT },
  //   { authType: AuthType.TWITTER }
  // ],
  // proofs in the sismoConnectResponse should be valid
  // with respect to a specific group membership
  // here the group with id 0x42c768bb8ae79e4c5c05d3b51a4ec74a
  //     claims: [{ groupId: "0x42c768bb8ae79e4c5c05d3b51a4ec74a" }],
  //   }
  // )

  // console.log({ result })

  // vaultId = hash(userVaultSecret, appId).
  // the vaultId is an app-specific, anonymous identifier of a vault
  // const vaultId = result.getUserId(AuthType.VAULT)
  // you can also get the twitterId of the user
  // const twitterId = result.getUserId(AuthType.TWITTER)
  await TruthWallet.findOneAndUpdate({ address: req.query.address }, {
    sismo: "linked"
  }, { upsert: true, new: true });

  res.redirect("/profile")
}