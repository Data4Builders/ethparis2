"use client"
import { useState, useEffect } from 'react';
import Story from '../components/Story'
import Web3 from 'web3';
const Parser = require("rss-parser");

export default function Home() {
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

  async function connect() {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      const accounts = await web3Instance.eth.getAccounts();
      if (accounts.length > 0) {
        console.log("Connected wallet address: ", accounts[0]);
      }
    } else {
      console.log("No wallet");
    }
  }

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

      console.log(items)
      setStories(items)
    });
  }, [])


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
