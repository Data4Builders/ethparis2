import { useEffect, useState } from "react";
import QuickNode from '@quicknode/sdk';
import { init, useQuery } from "@airstack/airstack-react";

init('ee48db4ca302405691ee47714ed144f3'); 

const qn = new QuickNode.API({
    graphApiKey: 'QN_6e0e82be1d3b4f95934fc950c6699997', 
});

const nftQuery = `query MyQuery {
    TokenBalances(
      input: {filter: {owner: {_eq: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"}}, blockchain: ethereum, limit: 25}
    ) {
      TokenBalance {
        tokenAddress
        amount
        formattedAmount
        tokenType
        owner {
          addresses
        }
        tokenNfts {
          address
          tokenId
          blockchain
          contentValue {
            image {
              original
            }
          }
        }
      }
    }
  }`

const variables = ""
  

const NFTsQuickNode = () => {
    const { data, loading, error } = useQuery(nftQuery, variables, { cache: false });
    let tokenAddresses = [];

    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }


    if(data) {
        //console.log(data.TokenBalances.TokenBalance)
    }
    
    if (data) {
        for(let i=0; i<data.TokenBalances.TokenBalance.length; i++) {
            let currentToken = data.TokenBalances.TokenBalance[i];
            //console.log(currentToken)
            if (currentToken.tokenNfts != null) {
                tokenAddresses.push(currentToken.tokenNfts.address);
            }
        }
        console.log(tokenAddresses);
    }

    const nftDetails = {}; 
    if (tokenAddresses.length > 0) {
        Promise.all(tokenAddresses.map((tokenId) => 
        qn.nfts
            .getCollectionDetails({
            contractAddress: tokenId,
            })
        )).then((responses) => {
        responses.forEach((response, index) => {
            nftDetails[tokenAddresses[index]] = response;
        });
        console.log(nftDetails);
        }).catch((error) => console.error(error));
    }
};
  
export default NFTsQuickNode;