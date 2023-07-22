
module.exports = async (req, res) => {
  const airstackQuery = `query walletDataQuery($owner: Identity!) {
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

  res.send(200)
};
