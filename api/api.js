import { init, useQuery } from "@airstack/airstack-react";

init('ee48db4ca302405691ee47714ed144f3'); 

export function useAirstackData(id) {
    const query= `query PoapsAndEventsForWallet {
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
      }`
    
    const variables = ""
    const { data, loading, error } = useQuery(query, variables, { cache: false });
    if (loading) {
        return 'Loading...';
    }

    if (error) {
        console.error(error);
        return 'Error!';
    }
    
    return data;
  }
  
  export async function fetchQuicknodeData(id) {
    // fetch data from the Quicknode API
    const response = await fetch(`/api/quicknode/${id}`);
    const data = await response.json();
    return data;
  }