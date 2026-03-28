import { useReadContract, useReadContracts, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { AIPCORE_ABI, REWARD_POOL_ABI, getContractAddress, getRewardPoolAddress } from '@/lib/contract';
import { useChainId } from 'wagmi';

// Hook to read user info
export function useUserInfo(userId: number) {
    const chainId = useChainId();

    return useReadContract({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: AIPCORE_ABI,
        functionName: 'getPoolQualificationData',
        args: [BigInt(userId)],
    });
}

// Hook to get user ID from connected wallet address
export function useUserIdByAddress(address: string | undefined) {
    const chainId = useChainId();

    return useReadContract({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: AIPCORE_ABI,
        functionName: 'nodeId',  // mapping(address=>uint) public nodeId
        args: address ? [address as `0x${string}`] : undefined,
        query: {
            enabled: !!address,
        },
    });
}

// Hook to get config
export function useContractConfig() {
    const chainId = useChainId();

    return useReadContract({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: AIPCORE_ABI,
        functionName: 'getConfig',
    });
}

// Hook to get current BNB price
export function useBnbPrice() {
    const chainId = useChainId();

    return useReadContract({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: AIPCORE_ABI,
        functionName: 'bnbPrice',
    });
}


// Hook to get all tier costs (used in IncomeStructure and register page)
export function useLevelCosts() {
    const chainId = useChainId();

    const contracts = Array.from({ length: 18 }, (_, i) => ({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: AIPCORE_ABI,
        functionName: 'getTierCost',
        args: [BigInt(i)],
    }));

    const { data, ...rest } = useReadContracts({
        contracts,
    });

    return {
        data: data ? data.map(d => (d.result !== undefined ? (d.result as bigint) : BigInt(0))) : undefined,
        ...rest
    };
}

// Hook to get income breakdown
export function useIncomeBreakdown(userId: number) {
    const chainId = useChainId();

    return useReadContract({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: AIPCORE_ABI,
        functionName: 'getIncomeBreakdown',
        args: [BigInt(userId)],
    });
}

// Hook to register
export function useRegister() {
    const { writeContract, data: hash, isPending, error } = useWriteContract();
    const chainId = useChainId();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const register = async (referrerId: number, value: bigint) => {
        // Add 5% slippage buffer to prevent reverting if oracle updates mid-transaction
        // The contract automatically refunds any excess BNB sent.
        const slippageValue = (value * 105n) / 100n;
        
        writeContract({
            address: getContractAddress(chainId) as `0x${string}`,
            abi: AIPCORE_ABI,
            functionName: 'createNode',
            args: [BigInt(referrerId)],
            value: slippageValue,
        });
    };

    return {
        register,
        isPending,
        isConfirming,
        isSuccess,
        error,
        hash,
    };
}

// Hook to upgrade
export function useUpgrade() {
    const { writeContract, data: hash, isPending, error } = useWriteContract();
    const chainId = useChainId();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const upgrade = async (userId: number, toLevel: number, value: bigint) => {
        // Add 5% slippage buffer to prevent reverting if oracle updates mid-transaction
        // The contract automatically refunds any excess BNB sent.
        const slippageValue = (value * 105n) / 100n;

        writeContract({
            address: getContractAddress(chainId) as `0x${string}`,
            abi: AIPCORE_ABI,
            functionName: 'unlockTier',
            args: [BigInt(userId), BigInt(toLevel)],
            value: slippageValue,
        });
    };

    return {
        upgrade,
        isPending,
        isConfirming,
        isSuccess,
        error,
        hash,
    };
}

// Hook to get income history
export function useIncomeHistory(userId: number, length: number = 50) {
    const chainId = useChainId();

    return useReadContract({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: AIPCORE_ABI,
        functionName: 'getIncome',
        args: [BigInt(userId), BigInt(length)],
        query: {
            enabled: userId > 0,
        },
    });
}

// Hook to get matrix users
export function useMatrixUsers(userId: number, layer: number, startIndex: number = 0, num: number = 10) {
    const chainId = useChainId();

    return useReadContract({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: AIPCORE_ABI,
        functionName: 'getMatrixUsers',
        args: [BigInt(userId), BigInt(layer), BigInt(startIndex), BigInt(num)],
        query: {
            enabled: userId > 0,
        },
    });
}

// Hook to get team users (network tree)
export function useTeamUsers(userId: number, layer: number, num: number = 50) {
    const chainId = useChainId();

    return useReadContract({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: AIPCORE_ABI,
        functionName: 'getNetworkNodes', // Changed from getNetworkAgents
        args: [BigInt(userId), BigInt(layer), BigInt(num)],
        query: {
            enabled: userId > 0,
        },
    });
}

// Hook to get team users with missed income stats (for downline BNB loss column)
export function useTeamUsersWithStats(userId: number, layer: number, num: number = 50) {
    const chainId = useChainId();

    return useReadContract({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: AIPCORE_ABI,
        functionName: 'getNetworkNodesWithStats',
        args: [BigInt(userId), BigInt(layer), BigInt(num)],
        query: {
            enabled: userId > 0,
        },
    });
}

// Hook to check if address is registered
export function useIsRegistered(address: string | undefined) {
    const chainId = useChainId();

    return useReadContract({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: AIPCORE_ABI,
        functionName: 'nodeId',  // mapping(address=>uint) — returns 0 if unregistered
        args: address ? [address as `0x${string}`] : undefined,
        query: {
            enabled: !!address,
        },
    });
}

// Hook to get user stats (mapped to getPoolQualificationData)
export function useUserStats(userId: number) {
    const chainId = useChainId();

    return useReadContract({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: AIPCORE_ABI,
        functionName: 'getPoolQualificationData', // Matches IAIPCore
        args: [BigInt(userId)],
        query: {
            enabled: userId > 0,
        },
    });
}

// Hook to get matrix position
export function useMatrixPosition(userId: number) {
    const chainId = useChainId();

    return useReadContract({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: AIPCORE_ABI,
        functionName: 'getMatrixPosition',
        args: [BigInt(userId)],
        query: {
            enabled: userId > 0,
        },
    });
}

// Hook to get detailed node info (sponsor, wallet, tier etc.) via nodes() mapping
export function useContractUserInfo(userId: number) {
    const chainId = useChainId();

    return useReadContract({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: AIPCORE_ABI,
        functionName: 'nodes',   // mapping(uint=>Node) public nodes
        args: [BigInt(userId)],
        query: {
            enabled: userId > 0,
        },
    });
}

// ======================================
// REWARD POOL HOOKS
// ======================================

// Hook to get node reward info from RewardPool
export function useNodeInfo(userId: number) {
    return useReadContract({
        address: getRewardPoolAddress() as `0x${string}`,
        abi: REWARD_POOL_ABI,
        functionName: 'getNodeInfo',
        args: [BigInt(userId)],
        query: {
            enabled: userId > 0,
        },
    });
}

// Unified view helper for the Pool Dashboard
export function usePoolViewHelper(userId: number) {
    return useReadContract({
        address: getRewardPoolAddress() as `0x${string}`,
        abi: REWARD_POOL_ABI,
        functionName: 'getPoolViewHelper',
        args: [BigInt(userId)],
        query: {
            enabled: userId > 0,
        },
    });
}

// Hook to get all 9 dynamic pool requirements from RewardPool
export function usePoolRequirements() {
    const address = getRewardPoolAddress() as `0x${string}`;
    const abi = REWARD_POOL_ABI;

    return useReadContracts({
        contracts: [
            { address, abi, functionName: 'BRONZE_MIN_TIER' },
            { address, abi, functionName: 'BRONZE_MIN_DIRECT' },
            { address, abi, functionName: 'BRONZE_MIN_TEAM' },
            { address, abi, functionName: 'SILVER_MIN_TIER' },
            { address, abi, functionName: 'SILVER_MIN_DIRECT' },
            { address, abi, functionName: 'SILVER_MIN_TEAM' },
            { address, abi, functionName: 'GOLD_MIN_TIER' },
            { address, abi, functionName: 'GOLD_MIN_DIRECT' },
            { address, abi, functionName: 'GOLD_MIN_TEAM' },
        ],
    });
}

// Hook to get global contract info from RewardPool
export function useContractInfo() {
    return useReadContract({
        address: getRewardPoolAddress() as `0x${string}`,
        abi: REWARD_POOL_ABI,
        functionName: 'getContractInfo',
    });
}

// Hook to claim rewards
export function useClaim() {
    const { writeContract, data: hash, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const claim = async (userId: number) => {
        writeContract({
            address: getRewardPoolAddress() as `0x${string}`,
            abi: REWARD_POOL_ABI,
            functionName: 'claim',
            args: [BigInt(userId)],
        });
    };

    return {
        claim,
        isPending,
        isConfirming,
        isSuccess,
        error,
        hash,
    };
}
// Hook to get detailed pool qualification status
export function useQualificationStatus(userId: number) {
    return useReadContract({
        address: getRewardPoolAddress() as `0x${string}`,
        abi: REWARD_POOL_ABI,
        functionName: 'getQualificationStatus',
        args: [BigInt(userId)],
        query: {
            enabled: userId > 0,
        },
    });
}

// Hook to register or update pool membership
export function useRegisterPoolNode() {
    const { writeContract, data: hash, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const registerPoolNode = async (userId: number) => {
        writeContract({
            address: getRewardPoolAddress() as `0x${string}`,
            abi: REWARD_POOL_ABI,
            functionName: 'registerNode',
            args: [BigInt(userId)],
        });
    };

    return {
        registerPoolNode,
        isPending,
        isConfirming,
        isSuccess,
        error,
        hash,
    };
}
