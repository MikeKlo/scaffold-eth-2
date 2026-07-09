import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import hre from "hardhat";
import { parseEther, getAddress } from "viem";

describe("NFT Bazaar", function () {
  async function deployFixture() {
    const [owner, seller, buyer] = await hre.viem.getWalletClients();
    const publicClient = await hre.viem.getPublicClient();

    const nftCollection = await hre.viem.deployContract("NFTCollection", [
      owner.account.address,
      "https://ipfs.io/ipfs/",
    ]);

    const marketplace = await hre.viem.deployContract("NFTMarketplace", [owner.account.address]);

    return {
      nftCollection,
      marketplace,
      owner,
      seller,
      buyer,
      publicClient,
    };
  }

  describe("NFTCollection", function () {
    it("Должен минтить NFT за правильную цену", async function () {
      const { nftCollection, seller } = await loadFixture(deployFixture);

      await nftCollection.write.mint(["https://example.com/nft/1.json"], {
        account: seller.account,
        value: parseEther("0.01"),
      });

      expect(await nftCollection.read.totalSupply()).to.equal(1n);
      expect(await nftCollection.read.ownerOf([0n])).to.equal(getAddress(seller.account.address));
    });
  });

  describe("NFTMarketplace", function () {
    it("Должен успешно размещать NFT на продажу", async function () {
      const { nftCollection, marketplace, seller } = await loadFixture(deployFixture);

      await nftCollection.write.mint(["https://test.com/1.json"], {
        account: seller.account,
        value: parseEther("0.01"),
      });

      await nftCollection.write.setApprovalForAll([marketplace.address, true], {
        account: seller.account,
      });

      await expect(
        marketplace.write.listItem([nftCollection.address, 0n, parseEther("0.15")], { account: seller.account }),
      ).to.emit(marketplace, "Listed");
    });

    it("Должен позволять покупку NFT", async function () {
      const { nftCollection, marketplace, seller, buyer, publicClient } = await loadFixture(deployFixture);

      // Mint
      await nftCollection.write.mint(["https://test.com/1.json"], {
        account: seller.account,
        value: parseEther("0.01"),
      });

      await nftCollection.write.setApprovalForAll([marketplace.address, true], {
        account: seller.account,
      });

      // List
      await marketplace.write.listItem([nftCollection.address, 0n, parseEther("0.2")], { account: seller.account });

      // Buy
      const hash = await marketplace.write.buyItem([0n], {
        account: buyer.account,
        value: parseEther("0.2"),
      });

      await publicClient.waitForTransactionReceipt({ hash });

      expect(await nftCollection.read.ownerOf([0n])).to.equal(getAddress(buyer.account.address));
    });

    it("Должен правильно рассчитывать комиссию платформы", async function () {
      const { marketplace } = await loadFixture(deployFixture);
      expect(await marketplace.read.platformFee()).to.equal(250n);
    });
  });
});
