"use client"
import { useState, useEffect } from 'react';
import { IoTrashSharp } from "react-icons/io5";
import { useAccount } from 'wagmi'
const Parser = require("rss-parser");
import {
  SismoConnectButton,
  AuthType,
} from "@sismo-core/sismo-connect-react";

const tagColors = ['tag-purple', 'tag-red', 'tag-orange', 'tag-yellow', 'tag-green', 'tag-blue', 'tag-purple', 'tag-red', 'tag-orange', 'tag-yellow', 'tag-green', 'tag-blue'];

export default function Home() {

  const { address, isConnected } = useAccount()

  const [accounts, setAccounts] = useState({
    address: ['loading...',],
    ens: ['loading...'],
    github: ['loading...'],
    worldcoin: ['loading...'],
    twitter: ['loading...'],
  });

  const generateTags = () => {
    fetch(`/api/generate-tags?address=${address}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) window.location.reload(false);
      })
  }

  useEffect(() => {
    if (address) {
      fetch('/api/' + address)
        .then((res) => res.json())
        .then((data) => {
          if (data && data[0])
            setAccounts(data[0]);
        })
    }
  }, [address])

  return (
    <div className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 h-screen flex flex-col lg:flex-row">
        <div className="w-1/2 lg:border-r-2 border-neutral-800 h-screen flex flex-col justify-center">
          <div className="display-font text-5xl mb-1">
            data4.builders
          </div>

          {/* Wallets */}
          <section>
            <div className="mt-3 display-font italic text-2xl">
              Addresses
            </div>
            <div>
              <div className="flex flex-col">
                {[accounts.address].map((a, i) => (
                  <div className="flex items-center" key={i}>
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
            {/* Sismo */}
            <section className="w-1/2">
              <div className="mt-3 display-font italic text-2xl">
                Sismo
              </div>
              <div>
                {accounts.sismo ? (
                  <div>
                    <div className="flex items-center">
                      <div className="bg-neutral-700 mt-2 px-1">{accounts.sismo}</div>
                      <div className="pl-2 mt-2 hover:cursor-pointer"><IoTrashSharp className="" /></div>
                    </div>
                  </div>
                ) : (
                  <SismoConnectButton
                    config={{
                      appId: "0xa860f5fd71c5cf5707d371f589083d5a",
                    }}
                    auths={[{ authType: AuthType.GITHUB }]}
                    callbackUrl={`http://localhost:3000/api/sismo-callback?address=${address}`}
                    signature={{ message: "Connect to Data4Builders" }}
                  />
                )}
              </div>
            </section>


            {/* Discord */}
            <section className="w-1/2">
              <div className="mt-3 display-font italic text-2xl">
                Discord
              </div>
              <div>
                {accounts.discord ? (
                  <div>
                    <div className="flex items-center">
                      <div className="bg-neutral-700 mt-2 px-1">{accounts.discord.handle}</div>
                      <div className="pl-2 mt-2 hover:cursor-pointer"><IoTrashSharp className="" /></div>
                    </div>
                  </div>
                ) : (
                  <div className="connect-button w-min">
                    Connect
                  </div>
                )}
              </div>
            </section>
          </div>

          <div className="flex flex-wrap justify mt-5">
            {/* ENS */}
            <section className="w-1/2">
              <div className="mt-3 display-font italic text-2xl">
                ENS
              </div>
              <div>
                {accounts.ens ? (
                  <div>
                    <div className="flex items-center">
                      <div className="bg-neutral-700 mt-2 px-1">{accounts.ens}</div>
                      <div className="pl-2 mt-2 hover:cursor-pointer"><IoTrashSharp className="" /></div>
                    </div>
                  </div>
                ) : (
                  <div className="connect-button w-min">
                    Connect
                  </div>
                )}
              </div>
            </section>

            {/* Twitter */}
            <section className="w-1/2">
              <div className="mt-3 display-font italic text-2xl">
                Twitter
              </div>
              <div>
                {accounts.twitter ? (
                  <div>
                    <div className="flex items-center">
                      <div className="bg-neutral-700 mt-2 px-1">{accounts.twitter.handle}</div>
                      <div className="pl-2 mt-2 hover:cursor-pointer"><IoTrashSharp className="" /></div>
                    </div>
                  </div>
                ) : (
                  <div className="connect-button w-min">
                    Connect
                  </div>
                )}
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
                {accounts.github ? (
                  <div>
                    <div className="flex items-center">
                      <div className="bg-neutral-700 mt-2 px-1">{accounts.github.handle}</div>
                      <div className="pl-2 mt-2 hover:cursor-pointer"><IoTrashSharp className="" /></div>
                    </div>
                  </div>
                ) : (
                  <div className="connect-button w-min">
                    Connect
                  </div>
                )}
              </div>
            </section>

            {/* WorldCoin */}
            <section className="w-1/2">
              <div className="mt-3 display-font italic text-2xl">
                WorldCoin
              </div>
              <div>
                {accounts.worldcoin ? (
                  <div>
                    <div className="flex items-center">
                      <div className="bg-neutral-700 mt-2 px-1">{accounts.worldcoin}</div>
                      <div className="pl-2 mt-2 hover:cursor-pointer"><IoTrashSharp className="" /></div>
                    </div>
                  </div>
                ) : (
                  <div className="connect-button w-min">
                    Connect
                  </div>
                )}
              </div>
            </section>

            <a href="/">
              <div className='bg-white text-black px-7 py-2 hover:bg-neutral-300 w-auto h-min mt-10'>Back to Feed</div>
            </a>
          </div>


        </div>
        <div className="w-1/2 h-screen flex flex-col justify-center lg:pl-12">
          <div className="display-font text-3xl mb-2">
            Generated Tags
          </div>
          <div className="tags-container flex flex-wrap">
            {
              accounts.tags && accounts.tags.map((t, i) => <div key={i} className={`${tagColors[i]} mr-2 mt-2 px-2 font-semibold`}>{t}</div>)
            }
          </div>
          <div onClick={generateTags} className=' text-white border-2 border-white px-7 py-2 hover:bg-neutral-300 w-min mt-3'>{accounts.tags ? 'Regenerate' : 'Generate'}</div>
        </div>
      </div>
    </div>
  )
}
