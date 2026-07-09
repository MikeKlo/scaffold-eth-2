"use client";

import { wagmiConfig } from "../services/web3/wagmiConfig";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

export function ScaffoldEthAppWithProviders({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={resolvedTheme === "dark" ? undefined : undefined} modalSize="compact">
          {children}
          <Toaster position="top-right" />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
