import { useReadContract } from 'wagmi';
import { useDeployedContractInfo } from './useDeployedContractInfo';
import { ContractName } from '../../utils/scaffold-eth/contract';

export function useScaffoldReadContract<
  TContractName extends ContractName,
  TFunctionName extends string
>({
  contractName,
  functionName,
  args,
}: {
  contractName: TContractName;
  functionName: TFunctionName;
  args?: any[];
}) {
  const { data: deployedContract } = useDeployedContractInfo(contractName);

  return useReadContract({
    address: deployedContract?.address,
    abi: deployedContract?.abi,
    functionName,
    args,
    query: {
      enabled: !!deployedContract?.address,
    },
  });
}