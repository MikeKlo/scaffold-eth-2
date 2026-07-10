'use client';

import { useAccount, useBalance } from 'wagmi';
import { parseEther } from 'viem';
import { useScaffoldWriteContract } from '../../hooks/scaffold-eth/useScaffoldWriteContract';
import toast from 'react-hot-toast';

export function FaucetButton() {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

  const { writeContractAsync } = useScaffoldWriteContract("NFTCollection");

  const requestETH = async () => {
    try {
      await writeContractAsync({
        functionName: "withdraw", // Используем withdraw из контракта как faucet (в dev)
        args: [],
      });
      toast.success("0.1 ETH received from faucet!");
    } catch (error) {
      toast.error("Faucet request failed. Try running local chain.");
    }
  };

  if (!address || balance?.value && balance.value > parseEther("0.1")) {
    return null;
  }

  return (
    <button onClick={requestETH} className="btn btn-sm btn-accent">
      💰 Faucet
    </button>
  );
}