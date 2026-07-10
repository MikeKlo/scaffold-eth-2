import { useState, useEffect } from 'react';
import { useScaffoldReadContract } from './scaffold-eth/useScaffoldReadContract';

export function useListedNFTs() {
  const [listedNFTs, setListedNFTs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: totalListings } = useScaffoldReadContract({
    contractName: "NFTMarketplace",
    functionName: "totalListings",
  });

  useEffect(() => {
    // Здесь можно добавить логику получения всех активных листингов
    // Для упрощения сейчас возвращаем пустой массив
    setListedNFTs([]);
    setIsLoading(false);
  }, [totalListings]);

  return { listedNFTs, isLoading };
}