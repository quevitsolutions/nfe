import contractABI from './GreatIncomeClub.json';
import contractConfig from '../config/contracts.json';

// Contract ABI
export const GREAT_INCOME_CLUB_ABI = contractABI.abi;

// Contract addresses
export const CONTRACT_ADDRESSES = {
    97: contractConfig.contractAddresses.bscTestnet,  // BSC Testnet
    56: contractConfig.contractAddresses.bscMainnet,  // BSC Mainnet
} as const;

// Network configurations
export const SUPPORTED_CHAINS = {
    bscTestnet: {
        id: 97,
        name: 'BSC Testnet',
        network: 'bsc-testnet',
        nativeCurrency: {
            decimals: 18,
            name: 'BNB',
            symbol: 'tBNB',
        },
        rpcUrls: {
            default: { http: [contractConfig.rpcUrls.bscTestnet] },
            public: { http: [contractConfig.rpcUrls.bscTestnet] },
        },
        blockExplorers: {
            etherscan: { name: 'BscScan', url: contractConfig.blockExplorers.bscTestnet },
            default: { name: 'BscScan', url: contractConfig.blockExplorers.bscTestnet },
        },
        testnet: true,
    },
    bscMainnet: {
        id: 56,
        name: 'BSC Mainnet',
        network: 'bsc',
        nativeCurrency: {
            decimals: 18,
            name: 'BNB',
            symbol: 'BNB',
        },
        rpcUrls: {
            default: { http: [contractConfig.rpcUrls.bscMainnet] },
            public: { http: [contractConfig.rpcUrls.bscMainnet] },
        },
        blockExplorers: {
            etherscan: { name: 'BscScan', url: contractConfig.blockExplorers.bscMainnet },
            default: { name: 'BscScan', url: contractConfig.blockExplorers.bscMainnet },
        },
    },
};

// Genesis user ID
export const GENESIS_USER_ID = 36999;

// Income types
export const INCOME_TYPES = {
    0: 'Referral',
    1: 'Direct',
    2: 'Level',
    3: 'Binary',
} as const;

// Level costs (in USD)
export const LEVEL_COSTS_USD = [
    5, 10, 20, 40, 80, 150, 250, 500, 1000, 2000,
    4000, 8000, 15000, 25000, 50000, 100000, 200000,
    400000, 800000, 1500000, 3000000, 6000000, 12500000,
    25000000, 62500000
];

// Helper to get contract address for current chain
export function getContractAddress(chainId: number): string {
    return CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES] || CONTRACT_ADDRESSES[97];
}

// Helper to format BNB
export function formatBNB(wei: bigint | string): string {
    const value = typeof wei === 'string' ? BigInt(wei) : wei;
    return (Number(value) / 1e18).toFixed(6);
}

// Helper to format currency
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount);
}

// Helper to get income type name
export function getIncomeTypeName(type: number): string {
    return INCOME_TYPES[type as keyof typeof INCOME_TYPES] || 'Unknown';
}
