'use client';

import NFTCard from './NFTCard';
import { useOwnedNFTs } from '../hooks/useOwnedNFTs';
import { useState } from 'react';
import ListNFTModal from './ListNFTModal';

export default function MyListings() {
  const { ownedNFTs, isLoading } = useOwnedNFTs();
  const [selectedNFT, setSelectedNFT] = useState<any>(null);

  if (isLoading) return <div className="text-center py-20">Loading your NFTs...</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">My NFTs</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {ownedNFTs.map((nft) => (
          <NFTCard
            key={nft.tokenId.toString()}
            tokenId={nft.tokenId}
            tokenURI={nft.tokenURI}
            isListed={false}
            onList={() => setSelectedNFT(nft)}
          />
        ))}
      </div>

      {ownedNFTs.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          You don't own any NFTs yet. Mint some in the "Mint NFT" tab.
        </div>
      )}

      {selectedNFT && (
        <ListNFTModal
          isOpen={!!selectedNFT}
          onClose={() => setSelectedNFT(null)}
          tokenId={selectedNFT.tokenId}
          tokenURI={selectedNFT.tokenURI}
        />
      )}
    </div>
  );
}