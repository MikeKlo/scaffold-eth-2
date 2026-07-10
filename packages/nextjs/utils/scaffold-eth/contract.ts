import { contracts } from '../../contracts/deployedContracts';
import scaffoldConfig from '../../scaffold.config';

export type ContractName = keyof (typeof contracts)[number];

export function getContract(contractName: ContractName) {
  const chainId = scaffoldConfig.targetNetworks[0].id;
  return contracts[chainId]?.[contractName];
}