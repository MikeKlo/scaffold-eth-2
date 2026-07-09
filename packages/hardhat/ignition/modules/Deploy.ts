import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DeployModule = buildModule("NFTBazaarDeploy", m => {
  const deployer = m.getAccount(0);

  // Деплой коллекции NFT
  const nftCollection = m.contract("NFTCollection", [
    deployer,
    "https://ipfs.io/ipfs/QmYourCIDHere/", // Замените на свой base URI
  ]);

  // Деплой маркетплейса
  const nftMarketplace = m.contract("NFTMarketplace", [deployer]);

  return { nftCollection, nftMarketplace };
});

export default DeployModule;
