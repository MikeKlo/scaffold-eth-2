import { Address as AddressType } from "viem";
import { useEnsAvatar, useEnsName } from "wagmi";

type AddressProps = {
  address: AddressType | undefined;
  size?: "sm" | "md";
};

export function Address({ address, size = "md" }: AddressProps) {
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  if (!address) return <span className="text-gray-400">Not connected</span>;

  const displayAddress = ensName || `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="flex items-center gap-2">
      {ensAvatar && <img src={ensAvatar} alt="ENS Avatar" className="w-6 h-6 rounded-full" />}
      <span className={`font-mono text-${size === "sm" ? "sm" : "base"}`}>{displayAddress}</span>
    </div>
  );
}
