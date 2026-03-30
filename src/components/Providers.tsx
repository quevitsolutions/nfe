'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { bscTestnet, bsc } from 'wagmi/chains';
import { useState } from 'react';
import { CurrencyProvider } from '@/lib/CurrencyContext';

const defaultChainId = Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN || 56);
const defaultChain = defaultChainId === 97 ? bscTestnet : bsc;

// Always include both in wagmi transports (for RPC connectivity),
// but only show BSC Mainnet in the UI — testnet is hidden from users.
const chains = [bsc, bscTestnet] as [typeof bsc, ...typeof bsc[]];

// Only the chains we want visible in RainbowKit's network picker
const visibleChains = [bsc] as [typeof bsc, ...typeof bsc[]];

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

const { connectors } = getDefaultWallets({
    appName: 'AIPCore',
    projectId,
});

const config = createConfig({
    chains,
    connectors,
    transports: {
        [bsc.id]: http('https://bsc-dataseed.binance.org'),
        [bscTestnet.id]: http('https://data-seed-prebsc-1-s1.binance.org:8545'),
    },
    ssr: true,
});

import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
    // QueryClient must be inside component to avoid SSR/hydration issues with React 19
    const [queryClient] = useState(() => new QueryClient());

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider initialChain={defaultChain} chains={visibleChains as any}>
                    <CurrencyProvider>
                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                            {children}
                        </ThemeProvider>
                    </CurrencyProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

