import { init, useQuery } from "@airstack/airstack-react";

init('ee48db4ca302405691ee47714ed144f3'); 

const query = `query CombinedQuery {
  Poaps(input: {filter: {owner: {_eq: "0x0B64179958f7e98C49316119852128130De23dD7"}}, blockchain: ALL}) {
    Poap {
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
        metadata
        contentType
        contentValue {
          image {
            extraSmall
            small
            medium
            large
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
  }
  erc20: TokenBalances(
    input: {filter: {owner: {_in: ["0x0B64179958f7e98C49316119852128130De23dD7"]}, tokenType: {_in: [ERC20]}}, limit: 200, blockchain: ethereum}
  ) {
    TokenBalance {
      amount
      chainId
      id
      tokenAddress
      tokenId
      tokenType
      token {
        name
        symbol
      }
    }
  }
  erc721: TokenBalances(
    input: {filter: {owner: {_in: ["0x0B64179958f7e98C49316119852128130De23dD7"]}, tokenType: {_in: [ERC721]}, tokenAddress: {_nin: ["0x22C1f6050E56d2876009903609a2cC3fEf83B415"]}}, limit: 200, blockchain: ethereum}
  ) {
    TokenBalance {
      amount
      chainId
      id
      tokenAddress
      tokenId
      tokenType
      token {
        name
        symbol
      }
      tokenNfts {
        tokenId
        metaData {
          name
        }
        contentValue {
          image {
            medium
            extraSmall
            large
            original
            small
          }
        }
      }
    }
  }
  poap: TokenBalances(
    input: {filter: {owner: {_in: ["0x0B64179958f7e98C49316119852128130De23dD7"]}, tokenAddress: {_eq: "0x22C1f6050E56d2876009903609a2cC3fEf83B415"}}, limit: 200, blockchain: ethereum}
  ) {
    TokenBalance {
      amount
      tokenAddress
      tokenId
      tokenType
      token {
        name
        symbol
      }
      tokenNfts {
        metaData {
          name
        }
        tokenURI
      }
    }
  }
  transfers: TokenTransfers(
    input: {filter: {from: {_eq: "0x0B64179958f7e98C49316119852128130De23dD7"}}, blockchain: ethereum, limit: 200}
  ) {
    TokenTransfer {
      amount
      formattedAmount
      blockTimestamp
      token {
        symbol
        name
        decimals
      }
      from {
        addresses
      }
      to {
        addresses
      }
      type
    }
  }
}`


const variables = ""

const Airstack = () => {
  const { data, loading, error } = useQuery(query, variables, { cache: false });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  console.log(data);
};

export default Airstack;