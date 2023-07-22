import mongoose from 'mongoose';

import dbConnect from '../../../lib/dbConnect'
import TruthWallet from '../../../models/TruthWallet'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const user = await TruthWallet.find({ address: req.query.address });

        res.status(200).json(user)
      } catch (error) {
        res.status(400).json({ success: false, error })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}