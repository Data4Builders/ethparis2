"use client"
import { useState, useEffect } from 'react';
import Story from '../components/Story'
import Web3 from 'web3';
import { init, useLazyQuery } from "@airstack/airstack-react";
const Parser = require("rss-parser");
import { fetchQuicknodeData } from "../lib/quicknode";

let airstackVariables = { owner: null };
let nftCollectionData;
let tagPlaintext = "";
let storycounter = 0;

export default function Home() {
  init('ee48db4ca302405691ee47714ed144f3');

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


  const feedUrls = [
    "https://rss.app/feeds/EsnHA9U6TsdCtbfa.xml", //cointelegraph Bitcoin
    "https://rss.app/feeds/zQQ7PRR5jF0MzvzI.xml", //cointelegraph altcoins
    "https://rss.app/feeds/2eVzGXasvz2StDp2.xml", //Ethereum World News Ethereum
    "https://rss.app/feeds/ULUmy2B29MFNOZux.xml", //Ethereum World News Bitcoin
    "https://rss.app/feeds/MAhv4PGaoU8DISSY.xml", //cryptodaily blockchain
    "https://rss.app/feeds/9baKck3TUNaq4lva.xml", //daily hodl bitcoin news
    "https://rss.app/feeds/FmltiNWiD6HIqnaS.xml", //daily hodl Ethereum news
    "https://rss.app/feeds/ePrOHijY6YRgeZlJ.xml", //daily hodl altcoin news
    "https://rss.app/feeds/10Q06dv66Q0gcn2S.xml", //daily hodl trading news
    "https://rss.app/feeds/ugrh7RNC7ecjwkfb.xml", //bitcoin news regulations
  ];

  const [stories, setStories] = useState([]);
  const [web3, setWeb3] = useState(null);

  const [loadData, setLoadData] = useState(false);
  const [quickNodeLoaded, setquickNodeLoaded] = useState(false);
  const [loadingOpenAI, setLoadingOpenAI] = useState(false);
  const [tags, setTags] = useState(null);
  const [tagsUpdate, setTagsUpdate] = useState(false);


  const [airstackfetch, { data, loading, error }] = useLazyQuery(airstackQuery, airstackVariables);

  async function getNftData(data) {
    return fetchQuicknodeData(data)
  }

  async function connect() {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      const accounts = await web3Instance.eth.getAccounts();
      if (accounts.length > 0) {
        console.log("Connected wallet address: ", accounts[0]);
        airstackVariables.owner = accounts[0]
        //airstackVariables.owner = "0x0B64179958f7e98C49316119852128130De23dD7"
        airstackfetch();
        console.log(data)

        if (data) {
          setTagsUpdate(false)
          const nftCollectionData = await getNftData(data);

          tagPlaintext = ""
          console.log("output from nft collection data")
          console.log(nftCollectionData)

          tagPlaintext = ""
          console.log("output from nft collection data")
          console.log(nftCollectionData)

          await new Promise(r => setTimeout(r, 3000))
          data.Wallet.poaps.forEach(poap => {
            tagPlaintext += `
                  ID: ${poap.id}
                  Blockchain: ${poap.blockchain}
                  Event Description: ${poap.poapEvent.description}
                  Event Country: ${poap.poapEvent.country}
                  Event City: ${poap.poapEvent.city}
                  Event URL: ${poap.poapEvent.eventURL}
                  `;
          });

          data.Wallet.tokenBalances.forEach(balance => {
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
          setTagsUpdate(true)
        }
      }
    } else {
      console.log("No wallet");
      return null;
    }
  }

  const parser = new Parser({
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
    },
  });

  const getTags = async () => {
    setLoadingOpenAI(true);
    console.log("within tags")
    console.log(tagPlaintext)
    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tagPlaintext)
      });
      const openAIdata = await res.json();
      console.log(eval(openAIdata).tags);
      setTags(eval(openAIdata).tags);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoadingOpenAI(false);
      setTagsUpdate(false)
    }
  };

  if (tagPlaintext.length > 0 && quickNodeLoaded && !loadingOpenAI && tagsUpdate) {
    console.log(getTags());
  }

  async function getRSSFeed(url) {
    const feed = await parser.parseString(
      await fetch("/api/cors-proxy", {
        method: "POST",
        body: JSON.stringify({ url }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.text())
    );
    return feed;
  }

  useEffect(() => {
    if (!tags) return;
    if (stories.length >= 15) return;
    Promise.all(feedUrls.map((url) => getRSSFeed(url))).then((feeds) => {
      const items = feeds.flatMap((feed) => feed.items);

      const sortedItems = items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
      console.log(sortedItems)

      const filterStories = async () => {
        for (const story of sortedItems) {
          if (stories.length >= 10) { // important line of code! number of relevant articles that are loaded
            break;
          }
          const response = await fetch('/api/articleselector', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tags: tags, title: story.title }),
          });

          if (response.ok) {
            let shouldAddStory = await response.json();
            shouldAddStory = eval(shouldAddStory).tags

            if (shouldAddStory == 'true') {

              //add tag logic to specific story before we add it to the array
              let relevantTags = [];
              let tags_js = eval(tags)
              console.log(tags_js)
              let randomStart = Math.floor(Math.random() * 7);
              for (let i = randomStart; i < (randomStart + tags_js.length); i++) {
                const storyTagResponse = await fetch('/api/story-tagger', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ tag: tags_js[i % tags_js.length], title: story.title }),
                });

                let responseText = await storyTagResponse.json();
                responseText = eval(responseText).tags

                // Assuming a relevant tag is determined by non-empty response text.
                if (responseText == tags_js[i % tags_js.length]) {
                  relevantTags.push(responseText);

                  // Breaks the loop when we have 3 relevant tags.
                  if (relevantTags.length === 3) {
                    break;
                  }
                }
              }

              if (relevantTags.length > 0) {
                story.tags = relevantTags;

                setStories((prevStories) => [...prevStories, story]);  // Update the state immediately
                storycounter += 1
              }
            }
          } else {
            console.error('API response was not ok for story', story);
          }
        }
      };

      filterStories();
    });
  }, [tags]);

  console.log({ stories })

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-start items-center text-center flex-col mt-10">
        <span className="text-xl mb-5">
          <b>Personalised</b> crypto news that puts your privacy first,<br />powered by <b>data4builders</b>.
        </span>
        <div onClick={connect} className='bg-black text-white px-4 py-2 hover:bg-gray-800 w-auto'>Connect Wallet</div>
      </div>
      <div className="story-components-wrapper mt-10">
        {stories ? stories.map((story, i) => <Story key={i} story={story} />) : <div>Loading...</div>}
      </div>
    </div>
  )
}