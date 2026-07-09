"use client";

import Link from "next/link";
import { FaucetButton } from "./scaffold-eth/FaucetButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTheme } from "next-themes";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-base-100 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="text-4xl">🛍️</div>
          <div>
            <h1 className="text-2xl font-bold text-primary">NFT Bazaar</h1>
            <p className="text-xs text-base-content/60 -mt-1">Decentralized Marketplace</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="btn btn-ghost btn-circle text-xl"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <FaucetButton />
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
