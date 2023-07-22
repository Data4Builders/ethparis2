"use client"
import { useState, useEffect } from 'react';
import { IoTrashSharp } from "react-icons/io5";
const Parser = require("rss-parser");

export default function Home() {

  const [accounts, setAccounts] = useState({
    address: ['0xa8109bA28CFDD0E38Dfd178C13bC8eCdb56662E4',
      '0xa8109bA28CFDD0E38Dfd178C13bC8eCdb56662E4',
      '0xa8109bA28CFDD0E38Dfd178C13bC8eCdb56662E4'],
    ens: ['luca.eth'],
    github: ['@codeluca'],
    worldcoin: [],
    twitter: ['@lucadev'],
  });

  const [tags, setTags] = useState([{
    name: "USDD",
    color: "red"
  }, {
    name: "Huboi",
    color: "blue"
  }, {
    name: "Paris",
    color: "green"
  }, {
    name: "Soccer",
    color: "purple"
  }, {
    name: "Human",
    color: "orange"
  }]);


  return (
    <div className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 h-screen flex flex-col lg:flex-row">
        <div className="w-1/2 lg:border-r-2 border-neutral-800 h-screen flex flex-col justify-center">
          <div className="display-font text-5xl mb-1">
            Accounts
          </div>

          {/* Wallets */}
          <section>
            <div className="mt-3 display-font italic text-2xl">
              Addresses
            </div>
            <div>
              <div>
                {accounts.address.map((a) => (
                  <div className="flex items-center">
                    <div className="bg-neutral-700 mt-2 px-1">{a}</div>
                    <div className="pl-2 mt-2 hover:cursor-pointer"><IoTrashSharp className="" /></div>
                  </div>
                ))}
              </div>
              <div className="border px-2 w-min mt-3 hover:bg-white hover:text-black hover:cursor-pointer">
                +
              </div>
            </div>
          </section>

          <div className="flex flex-wrap justify mt-5">
            {/* ENS */}
            <section className="w-1/2">
              <div className="mt-3 display-font italic text-2xl">
                ENS
              </div>
              <div>
                <div>
                  {accounts.ens.map((a) => (
                    <div className="flex items-center">
                      <div className="bg-neutral-700 mt-2 px-1">{a}</div>
                      <div className="pl-2 mt-2 hover:cursor-pointer"><IoTrashSharp className="" /></div>
                    </div>
                  ))}
                </div>
                <div className="border px-2 w-min mt-3 hover:bg-white hover:text-black hover:cursor-pointer">
                  +
                </div>
              </div>
            </section>

            {/* Twitter */}
            <section className="w-1/2">
              <div className="mt-3 display-font italic text-2xl">
                Twitter
              </div>
              <div>
                <div>
                  {accounts.twitter.map((a) => (
                    <div className="flex items-center">
                      <div className="bg-neutral-700 mt-2 px-1">{a}</div>
                      <div className="pl-2 mt-2 hover:cursor-pointer"><IoTrashSharp className="" /></div>
                    </div>
                  ))}
                </div>
                <div className="border px-2 w-min mt-3 hover:bg-white hover:text-black hover:cursor-pointer">
                  +
                </div>
              </div>
            </section>
          </div>

          <div className="flex flex-wrap justify mt-5">
            {/* GitHub */}
            <section className="w-1/2">
              <div className="mt-3 display-font italic text-2xl">
                GitHub
              </div>
              <div>
                <div>
                  {accounts.github.map((a) => (
                    <div className="flex items-center">
                      <div className="bg-neutral-700 mt-2 px-1">{a}</div>
                      <div className="pl-2 mt-2 hover:cursor-pointer"><IoTrashSharp className="" /></div>
                    </div>
                  ))}
                </div>
                <div className="border px-2 w-min mt-3 hover:bg-white hover:text-black hover:cursor-pointer">
                  +
                </div>
              </div>
            </section>

            {/* WorldCoin */}
            <section className="w-1/2">
              <div className="mt-3 display-font italic text-2xl">
                WorldCoin
              </div>
              <div>
                <div>
                  {accounts.worldcoin.map((a) => (
                    <div className="flex items-center">
                      <div className="bg-neutral-700 mt-2 px-1">{a}</div>
                      <div className="pl-2 mt-2 hover:cursor-pointer"><IoTrashSharp className="" /></div>
                    </div>
                  ))}
                </div>
                <div className="border px-2 w-min mt-3 hover:bg-white hover:text-black hover:cursor-pointer">
                  +
                </div>
              </div>
            </section>
          </div>


        </div>
        <div className="w-1/2 h-screen flex flex-col justify-center lg:pl-12">
          <div className="display-font text-5xl mb-2">
            Generated Tags
          </div>
          <div className="tags-container flex flex-wrap">
            {
              tags.map((t, i) => <div key={i} className={`tag-${t.color} mr-2 mt-2 px-2 font-semibold`}>{t.name}</div>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}
