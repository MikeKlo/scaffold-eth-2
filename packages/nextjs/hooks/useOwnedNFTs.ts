import { useAccount } from 'wagmi';
import { useScaffoldReadContract } from './scaffold-eth/useScaffoldReadContract';
import { useEffect, useState } from 'react';

export function useOwnedNFTs() {
  const { address } = useAccount();
  const [ownedNFTs, setOwnedNFTs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { data: balance } = useScaffoldReadContract({
    contractName: "NFTCollection",
    functionName: "balanceOf",
    args: [address!],
  });

  useEffect(() => {
    if (!address || !balance) {
      setOwnedNFTs([]);
      return;
    }
    // Здесь можно добавить логику получения токенов пользователя
    setOwnedNFTs([]);
    setIsLoading(false);
  }, [address, balance]);

  return { ownedNFTs, isLoading };
}