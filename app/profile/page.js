"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react';
import Story from '../../components/Story'
const Parser = require("rss-parser");

export default function Home() {
  const feedUrls = [
    "https://rss.app/feeds/EsnHA9U6TsdCtbfa.xml/", //cointelegraph Bitcoin
    "https://rss.app/feeds/zQQ7PRR5jF0MzvzI.xml/", //cointelegraph altcoins
    "https://rss.app/feeds/2eVzGXasvz2StDp2.xml/", //Ethereum World News Ethereum
    "https://rss.app/feeds/ULUmy2B29MFNOZux.xml/", //Ethereum World News Bitcoin
    "https://rss.app/feeds/MAhv4PGaoU8DISSY.xml/", //cryptodaily blockchain
    "https://rss.app/feeds/9baKck3TUNaq4lva.xml/", //daily hodl bitcoin news
    "https://rss.app/feeds/FmltiNWiD6HIqnaS.xml/", //daily hodl Ethereum news
    "https://rss.app/feeds/ePrOHijY6YRgeZlJ.xml/", //daily hodl altcoin news
    "https://rss.app/feeds/10Q06dv66Q0gcn2S.xml/", //daily hodl trading news
    "https://rss.app/feeds/ugrh7RNC7ecjwkfb.xml/", //bitcoin news regulations
  ];

  const [stories, setStories] = useState([]);

  const parser = new Parser({
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
    },
  });

  async function getRSSFeed(url) {
    const feed = await parser.parseURL(url);
    return feed;
  }

  useEffect(() => {
    Promise.all(feedUrls.map((url) => getRSSFeed(url))).then((feeds) => {
      const items = feeds.flatMap((feed) => feed.items);

      console.log(items)
      setStories(items)
    });
  }, [])

  console.log({ stories })

  return (
    <div className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 h-screen">
      </div>
    </div>
  )
}
