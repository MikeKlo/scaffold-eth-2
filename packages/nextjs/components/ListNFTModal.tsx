"use client";

import { useState } from "react";
import { useScaffoldWriteContract } from "../hooks/scaffold-eth/useScaffoldWriteContract";
import toast from "react-hot-toast";
import { parseEther } from "viem";

type ListNFTModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tokenId: bigint;
  tokenURI: string;
};

export default function ListNFTModal({ isOpen, onClose, tokenId, tokenURI }: ListNFTModalProps) {
  const [price, setPrice] = useState("");
  const [isListing, setIsListing] = useState(false);

  const { writeContractAsync: listItem } = useScaffoldWriteContract("NFTMarketplace");

  const handleList = async () => {
    if (!price) return toast.error("Enter price in ETH");

    setIsListing(true);
    try {
      await listItem({
        functionName: "listItem",
        args: [
          /* NFTCollection address будет взят из контракта */ "0xYourNFTCollectionAddress",
          tokenId,
          parseEther(price),
        ],
      });

      toast.success("NFT successfully listed for sale!");
      onClose();
      setPrice("");
    } catch (error: any) {
      toast.error(error?.message || "Failed to list NFT");
    } finally {
      setIsListing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-2xl p-8 w-full max-w-md">
        <h3 className="text-2xl font-bold mb-6">List NFT for Sale</h3>
        <p className="text-sm text-gray-500 mb-4">
          Token ID: <span className="font-mono">{tokenId.toString()}</span>
        </p>

        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Price (ETH)</span>
          </label>
          <input
            type="number"
            step="0.001"
            placeholder="0.15"
            className="input input-bordered w-full"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="btn btn-ghost flex-1">
            Cancel
          </button>
          <button onClick={handleList} disabled={isListing || !price} className="btn btn-primary flex-1">
            {isListing ? "Listing..." : "List NFT"}
          </button>
        </div>
      </div>
    </div>
  );
}
