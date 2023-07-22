import { init, useQuery } from "@airstack/airstack-react";

init('ee48db4ca302405691ee47714ed144f3'); 

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