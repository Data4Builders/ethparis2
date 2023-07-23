"use client"
import { useState, useEffect } from 'react';
import { IoTrashSharp } from "react-icons/io5";
import { useAccount } from 'wagmi'

const {
  SismoConnectButton,
  AuthType,
  SismoConnectResponse,
  ClaimType,
} = require("@sismo-core/sismo-connect-react");


const Parser = require("rss-parser");

export default function Home() {
  const { address, isConnected } = useAccount()

  const [accounts, setAccounts] = useState({
    address: ['loading...',],
    ens: ['loading...'],
    github: ['loading...'],
    worldcoin: ['loading...'],
    twitter: ['loading...'],
    sismo: ['loading...'],
  });

  const [tags, setTags] = useState([]);

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

  const handleSismoResponse = async (response) => {
    const res = await fetch("/api/verify", {
      method: "POST",
      body: JSON.stringify(response),
    });
    console.log(await res.json());
  }

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
              <div className="flex flex-col">
                {[accounts.address].map((a) => (
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
                {accounts.ens ? (
                  <div>
                    <div className="flex items-center">
                      <div className="bg-neutral-700 mt-2 px-1">{accounts.ens}</div>
                      <div className="pl-2 mt-2 hover:cursor-pointer"><IoTrashSharp className="" /></div>
                    </div>
                  </div>
                ) : (
                  <div className="border px-2 w-min mt-3 hover:bg-white hover:text-black hover:cursor-pointer text-xs">
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
                  <div className="border px-2 w-min mt-3 hover:bg-white hover:text-black hover:cursor-pointer text-xs">
                    Connect
                  </div>
                )}
              </div>
            </section>
          </div>

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
                    vault: {
                      impersonate: [
                      ],
                    },
                  }}
                  auths={[{ authType: AuthType.GITHUB }]}
                  claims={[
                    { groupId: "0x1cde61966decb8600dfd0749bd371f12" }, 
                    { groupId: "0x1cde61966decb8600dfd0749bd371f12", value: 15, claimType: ClaimType.GTE }
                  ]}
                  signature={{ message: "Connect to Data4Builders" }}
                  onResponse={handleSismoResponse}
                />
              )}
            </div>
          </section>

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
                  <div className="border px-2 w-min mt-3 text-xs hover:bg-white hover:text-black hover:cursor-pointer">
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
                  <div className="border px-2 w-min mt-3 hover:bg-white hover:text-black hover:cursor-pointer text-xs">
                    Connect
                  </div>
                )}
              </div>
            </section>

            <a href="/new_home">
              <div className='bg-white text-black px-7 py-2 hover:bg-neutral-300 w-auto h-min mt-10'>Back to Feed</div>
            </a>
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
