import mongoose from 'mongoose'

const TruthWallet = new mongoose.Schema({
  address: {
    type: String,
    required: [true, 'Please provide a address for this wallet.'],
  },
  ens: {
    type: String,
  },
  discord: {
    link: {
      type: String
    },
    handle: {
      type: String
    }
  },
  github: {
    link: {
      type: String
    },
    handle: {
      type: String
    }
  },
  twitter: {
    link: {
      type: String
    },
    handle: {
      type: String
    }
  },
  telegram: {
    link: {
      type: String
    },
    handle: {
      type: String
    }
  },
  // addresses array of objects
  other_addresses: [
    {
      type: String
    }
  ],
  location:
  {
    type: String
  }
})

export default mongoose.models.TruthWallet || mongoose.model('TruthWallet', TruthWallet)