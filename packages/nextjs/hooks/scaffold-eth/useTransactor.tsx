import { useCallback } from 'react';
import { Hash } from 'viem';
import { usePublicClient, useWaitForTransactionReceipt } from 'wagmi';
import toast from 'react-hot-toast';

export function useTransactor() {
  const publicClient = usePublicClient();
  const { waitForTransactionReceipt } = useWaitForTransactionReceipt();

  const transactor = useCallback(
    async (tx: Promise<Hash>, options?: { blockConfirmations?: number }) => {
      const hash = await tx;
      toast.loading("Transaction sent...", { id: hash });

      await waitForTransactionReceipt({ hash, confirmations: options?.blockConfirmations || 1 });
      
      toast.success("Transaction confirmed!", { id: hash });
      return hash;
    },
    [waitForTransactionReceipt]
  );

  return transactor;
}