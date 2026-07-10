'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { parseEther } from 'viem';
import { useScaffoldWriteContract } from '../hooks/scaffold-eth/useScaffoldWriteContract';
import toast from 'react-hot-toast';

export default function MintNFT() {
  const { address } = useAccount();
  const [tokenURI, setTokenURI] = useState('');
  const [isMinting, setIsMinting] = useState(false);

  const { writeContractAsync: mintNFT } = useScaffoldWriteContract("NFTCollection");

  const handleMint = async () => {
    if (!tokenURI || !address) {
      toast.error("Please enter token URI and connect wallet");
      return;
    }

    setIsMinting(true);
    try {
      await mintNFT({
        functionName: "mint",
        args: [tokenURI],
        value: parseEther("0.01"),
      });

      toast.success("NFT successfully minted!");
      setTokenURI('');
    } catch (error: any) {
      toast.error(error?.message || "Minting failed");
      console.error(error);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl mb-6">Mint New NFT</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg">Token URI (IPFS or HTTP link)</span>
            </label>
            <input
              type="text"
              placeholder="https://ipfs.io/ipfs/Qm... или ipfs://Qm..."
              className="input input-bordered w-full text-lg"
              value={tokenURI}
              onChange={(e) => setTokenURI(e.target.value)}
            />
            <label className="label">
              <span className="label-text-alt text-warning">
                Minting price: 0.01 ETH
              </span>
            </label>
          </div>

          <button
            onClick={handleMint}
            disabled={isMinting || !tokenURI}
            className="btn btn-primary btn-lg mt-6"
          >
            {isMinting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              'Mint NFT (0.01 ETH)'
            )}
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            After minting, you can list your NFT for sale in the "My Listings" tab.
          </p>
        </div>
      </div>
    </div>
  );
}