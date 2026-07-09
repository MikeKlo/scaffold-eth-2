"use client";

import { useState } from "react";
import { Address } from "./scaffold-eth/Address";
import { formatEther } from "viem";

type NFTCardProps = {
  tokenId: bigint;
  tokenURI: string;
  price?: bigint;
  seller?: string;
  isListed?: boolean;
  onBuy?: () => void;
  onList?: () => void;
};

export default function NFTCard({ tokenId, tokenURI, price, seller, isListed = false, onBuy, onList }: NFTCardProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");

  return (
    <div className="card bg-base-100 shadow-xl overflow-hidden">
      <figure className="relative h-64 bg-base-200">
        {imageError ? (
          <div className="text-7xl flex items-center justify-center h-full">🖼️</div>
        ) : (
          <img
            src={imageUrl}
            alt={`NFT #${tokenId}`}
            className="object-cover w-full h-full"
            onError={() => setImageError(true)}
          />
        )}

        {isListed && price && (
          <div className="absolute top-4 right-4 badge badge-primary badge-lg font-bold">{formatEther(price)} ETH</div>
        )}
      </figure>

      <div className="card-body">
        <h3 className="card-title">NFT #{tokenId.toString()}</h3>

        {seller && (
          <p className="text-sm text-gray-500">
            Seller: <Address address={seller as `0x${string}`} />
          </p>
        )}

        <div className="card-actions mt-4">
          {isListed && onBuy && (
            <button onClick={onBuy} className="btn btn-primary btn-block">
              Buy Now
            </button>
          )}
          {!isListed && onList && (
            <button onClick={onList} className="btn btn-secondary btn-block">
              List for Sale
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
