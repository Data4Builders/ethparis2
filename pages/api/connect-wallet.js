import mongoose from 'mongoose';

import dbConnect from '../../lib/dbConnect'
import TruthWallet from '../../models/TruthWallet'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const user = await TruthWallet.find({ address: req.query.address });

        console.log({ user, ad: req.query.address })

        if (!user || user.length === 0) {
          const fetchData = await fetch("https://api.web3.bio/profile/" + req.query.address),
            jsonData = await fetchData.json(),
            web3bio = jsonData ? jsonData[0] : {};

          console.log({ fetchData, jsonData, web3bio })

          if (!web3bio) {
            const finalUser = await TruthWallet.create({ address: req.query.address });
            return res.send(finalUser)
          }

          const saveableObject = {};

          saveableObject.address = req.query.address;
          if (web3bio.platform === "ENS" && web3bio.identity)
            saveableObject.ens = web3bio.identity;
          if (web3bio.location)
            saveableObject.location = web3bio.location;
          if (web3bio.links && web3bio.links.discord && web3bio.links.discord.link)
            saveableObject.discord = web3bio.links.discord;
          if (web3bio.links && web3bio.links.lenster && web3bio.links.lenster.link)
            saveableObject.lenster = web3bio.links.lenster;
          if (web3bio.links && web3bio.links.twitter && web3bio.links.twitter.link)
            saveableObject.twitter = web3bio.links.twitter;
          if (web3bio.links && web3bio.links.telegram && web3bio.links.telegram.link)
            saveableObject.telegram = web3bio.links.telegram;
          if (web3bio.links && web3bio.links.github && web3bio.links.github.link)
            saveableObject.github = web3bio.links.github;

          const finalUser = await TruthWallet.create({ ...saveableObject });
          return res.redirect("/profile");
        } else {
          return res.send(user)
        }

        res.status(200).json({ success: true, data: users })
      } catch (error) {
        res.status(400).json({ success: false, error })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}