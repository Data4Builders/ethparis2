import axios from 'axios';
import { fetchQuicknodeData } from "../../lib/quicknode";
import TruthWallet from '../../models/TruthWallet';
import dbConnect from '@/lib/dbConnect';

module.exports = async (req, res) => {
  await dbConnect()

  const apiKey = 'ee48db4ca302405691ee47714ed144f3';
  let tagPlaintext = "";

  const query = `query walletDataQuery($owner: Identity!) {
  Wallet(input: {identity: $owner, blockchain: ethereum}) {
    poaps {
      id
      chainId
      blockchain
      dappName
      dappSlug
      dappVersion
      eventId
      createdAtBlockTimestamp
      createdAtBlockNumber
      tokenId
      tokenAddress
      tokenUri
      poapEvent {
        id
        chainId
        blockchain
        dappName
        dappSlug
        dappVersion
        eventId
        contentType
        contentValue {
          image {
            original
          }
        }
        eventName
        description
        country
        city
        startDate
        endDate
        isVirtualEvent
        eventURL
      }
    }
    tokenBalances {
      tokenNfts {
        id
        address
        tokenId
        blockchain
        chainId
        type
        totalSupply
        tokenURI
        contentType
        contentValue {
          image {
            original
          }
        }
        lastTransferHash
        lastTransferBlock
        lastTransferTimestamp
      }
    }
  }
}`

  const API = 'https://api.airstack.xyz/gql'
  const result = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKey
    },
    body: JSON.stringify({
      query,
      variables: {
        owner: req.query.address
      }
    })
  });
  const json = await result.json();
  const data = json?.data;

  if (!data)
    return res.send(200);

  const nftCollectionData = await fetchQuicknodeData(data);

  console.log({ data, nftCollectionData })

  data.Wallet.poaps && data.Wallet.poaps.forEach(poap => {
    tagPlaintext += `
          ID: ${poap.id}
          Blockchain: ${poap.blockchain}
          Event Description: ${poap.poapEvent.description}
          Event Country: ${poap.poapEvent.country}
          Event City: ${poap.poapEvent.city}
          Event URL: ${poap.poapEvent.eventURL}
          `;
  });

  data.Wallet.tokenBalances && data.Wallet.tokenBalances.forEach(balance => {
    if (balance.tokenNfts !== null) {
      tagPlaintext += `
              Blockchain: ${balance.tokenNfts.blockchain}
            `;
    }
  });

  for (let key in nftCollectionData) {
    setquickNodeLoaded(true);
    let collection = nftCollectionData[key].collection;
    tagPlaintext += "Information about art this person owns:"
    tagPlaintext += `Contract Name: ${collection.contract.name}\n`;
    tagPlaintext += `Circulating Supply: ${collection.circulatingSupply}\n`;
    tagPlaintext += `Contract Symbol: ${collection.contract.symbol}\n`;
    tagPlaintext += `External URL: ${collection.externalUrl}\n`;
    tagPlaintext += `Collection Name: ${collection.name}\n`;
    tagPlaintext += `Collection Symbol: ${collection.symbol}\n`;
    tagPlaintext += `Total Supply: ${collection.totalSupply}\n`;
    tagPlaintext += `Twitter Username: ${collection.twitterUsername}\n\n`;
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Generate a JavaScript array of 7 unique user tags in the format ['art collector', 'defi enthusiast', 'hackathon winner'], tags based on data about a user. Make them one to two words and as hyper-specific as possible (type of tech used, builder, investor, long-term, newbie, art collector, nyc events, etc). Do not include any extra words in your response, just the plain javascript array format. User Data: " + tagPlaintext
          }
        ],
        max_tokens: 75,
      }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`,
      },
    }
    );
    console.log("got there mate")
    const openAiContent = response.data.choices[0].message.content
    console.log({ openAiContent, response })
    if (openAiContent) {
      await TruthWallet.findOneAndUpdate({ address: req.query.address }, { tags: eval(openAiContent) }, { upsert: true, new: true });
    }
    res.status(200).json(openAiContent);
  } catch (error) {
    console.error(error.message);
    res.send({ status: 500, error: error.message })
  }
};