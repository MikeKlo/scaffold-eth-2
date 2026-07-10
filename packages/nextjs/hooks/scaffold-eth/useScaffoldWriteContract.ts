import { useWriteContract } from 'wagmi';
import { useDeployedContractInfo } from './useDeployedContractInfo';
import { useTransactor } from './useTransactor';
import { ContractName } from '../../utils/scaffold-eth/contract';
import { toast } from 'react-hot-toast';

export function useScaffoldWriteContract<TContractName extends ContractName>(
  contractName: TContractName
) {
  const { data: deployedContract } = useDeployedContractInfo(contractName);
  const { writeContractAsync } = useWriteContract();
  const writeTx = useTransactor();

  const writeContractAsyncWithParams = async ({
    functionName,
    args,
    value,
  }: {
    functionName: string;
    args?: any[];
    value?: bigint;
  }) => {
    if (!deployedContract?.address) {
      toast.error("Contract not deployed");
      throw new Error("Contract not deployed");
    }

    return writeTx(() =>
      writeContractAsync({
        address: deployedContract.address,
        abi: deployedContract.abi,
        functionName,
        args,
        value,
      })
    );
  };

  return {
    writeContractAsync: writeContractAsyncWithParams,
  };
}