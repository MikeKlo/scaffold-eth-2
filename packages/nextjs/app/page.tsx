'use client';

import { useState } from 'react';
import Header from '../components/Header';
import NFTGrid from '../components/NFTGrid';
import MintNFT from '../components/MintNFT';
import MyListings from '../components/MyListings';

type Tab = 'market' | 'mint' | 'mylistings';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('market');

  return (
    <div className="min-h-screen bg-base-200">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h1 className="text-6xl font-bold text-primary mb-3">NFT Bazaar</h1>
          <p className="text-xl text-base-content/70">Decentralized NFT Marketplace</p>
        </div>

        <div className="tabs tabs-boxed bg-base-100 p-2 mb-10 justify-center max-w-md mx-auto">
          <button
            className={`tab text-lg ${activeTab === 'market' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('market')}
          >
            🛒 Marketplace
          </button>
          <button
            className={`tab text-lg ${activeTab === 'mint' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('mint')}
          >
            ✨ Mint NFT
          </button>
          <button
            className={`tab text-lg ${activeTab === 'mylistings' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('mylistings')}
          >
            📋 My NFTs
          </button>
        </div>

        {activeTab === 'market' && <NFTGrid />}
        {activeTab === 'mint' && <MintNFT />}
        {activeTab === 'mylistings' && <MyListings />}
      </div>
    </div>
  );
}