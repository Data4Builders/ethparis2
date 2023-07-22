"use client"
import { useState, useEffect, useRef } from 'react';
import Story from '../../components/Story'
const Parser = require("rss-parser");
import { useWeb3Modal } from "@web3modal/react"
import { useAccount, useConnect, useDisconnect } from 'wagmi'

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

export default function Home() {
  const { open, close } = useWeb3Modal()
  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, onSuccess } = useConnect()

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }


  const prevAddress = usePrevious(address);
  const [stories, setStories] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (address && !prevAddress) {
      fetch('/api/connect-wallet?address=' + address)
        .then((res) => res.json())
        .then((data) => {
          console.log({ data }, 123)
        })
    }
  }, [address])

  const parser = new Parser({
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
    },
  });

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
    Promise.all(feedUrls.map((url) => getRSSFeed(url))).then((feeds) => {
      const items = feeds.flatMap((feed) => feed.items);

      // Sort items by pubDate in descending order
      const sortedItems = items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

      console.log(sortedItems)
      setStories(sortedItems)
    });
  }, [])

  if (!isClient) {
    return <div className="w-full h-screen flex justify-center align-center m-5">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-start items-center text-center flex-col mt-10">
        <span className="text-xl mb-5">
          <b>Personalised</b> crypto news that puts your privacy first,<br />powered by <b>data4builders</b>.
        </span>
        {
          isConnected && !isLoading ? (
            <>
              <div className='text-neutral-800 px-4 py-2  w-auto'>{address} Connected</div>
              <div onClick={disconnect} className='bg-black text-white px-4 py-2 hover:bg-gray-800 w-auto'>Disconnect</div>
            </>
          ) :
            <div onClick={() => open()} className='bg-black text-white px-4 py-2 hover:bg-gray-800 w-auto'>Connect Wallet</div>
        }
      </div>
      <div className="story-components-wrapper mt-10">
        {stories ? stories.map((story, i) => <Story key={i} story={story} />) : <div>Loading...</div>}
      </div>
    </div>
  )
}
