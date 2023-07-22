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
    github: [],
    worldcoin: [],
    twitter: [],
  });


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

          {/* Wallets */}
          <section className="mt-4">
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


        </div>
        <div className="w-1/2 h-screen flex flex-col justify-center lg:pl-12">
          <div className="display-font text-5xl">
            Generated Tags
          </div>
        </div>
      </div>
    </div>
  )
}
