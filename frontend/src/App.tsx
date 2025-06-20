import React from "react";
import {
  getDefaultWallets,
  RainbowKitProvider,
  ConnectButton,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import Vesting from "./components/Vesting";

const { chains, provider } = configureChains([sepolia], [publicProvider()]);
const { connectors } = getDefaultWallets({
  appName: "Vesting Dashboard",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div style={{ padding: "1rem" }}>
          <ConnectButton />
          <Vesting />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
