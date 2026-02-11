import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { GREAT_INCOME_CLUB_ABI, getContractAddress } from '@/lib/contract';
import { useChainId } from 'wagmi';

// Hook to read user info
export function useUserInfo(userId: number) {
    const chainId = useChainId();

    return useReadContract({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: GREAT_INCOME_CLUB_ABI,
        functionName: 'getPoolQualificationData',
        args: [BigInt(userId)],
    });
}

// Hook to get user ID from wallet address
export function useUserIdByAddress(address: string | undefined) {
    const chainId = useChainId();

    return useReadContract({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: GREAT_INCOME_CLUB_ABI,
        functionName: 'getUserByAddress',
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
        abi: GREAT_INCOME_CLUB_ABI,
        functionName: 'getConfig',
    });
}

// Hook to get current BNB price
export function useBnbPrice() {
    const chainId = useChainId();

    return useReadContract({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: GREAT_INCOME_CLUB_ABI,
        functionName: 'bnbPrice',
    });
}

// Hook to get level costs
export function useLevelCosts() {
    const chainId = useChainId();

    return useReadContract({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: GREAT_INCOME_CLUB_ABI,
        functionName: 'getLevels',
    });
}

// Hook to get income breakdown
export function useIncomeBreakdown(userId: number) {
    const chainId = useChainId();

    return useReadContract({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: GREAT_INCOME_CLUB_ABI,
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
        writeContract({
            address: getContractAddress(chainId) as `0x${string}`,
            abi: GREAT_INCOME_CLUB_ABI,
            functionName: 'register',
            args: [BigInt(referrerId)],
            value,
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
        writeContract({
            address: getContractAddress(chainId) as `0x${string}`,
            abi: GREAT_INCOME_CLUB_ABI,
            functionName: 'upgrade',
            args: [BigInt(userId), BigInt(toLevel)],
            value,
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
        abi: GREAT_INCOME_CLUB_ABI,
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
        abi: GREAT_INCOME_CLUB_ABI,
        functionName: 'getMatrixUsers',
        args: [BigInt(userId), BigInt(layer), BigInt(startIndex), BigInt(num)],
        query: {
            enabled: userId > 0,
        },
    });
}

// Hook to get team users
export function useTeamUsers(userId: number, layer: number, num: number = 50) {
    const chainId = useChainId();

    return useReadContract({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: GREAT_INCOME_CLUB_ABI,
        functionName: 'getTeamUsers',
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
        abi: GREAT_INCOME_CLUB_ABI,
        functionName: 'isUserAddressExists',
        args: address ? [address as `0x${string}`] : undefined,
        query: {
            enabled: !!address,
        },
    });
}

// Hook to get user stats
export function useUserStats(userId: number) {
    const chainId = useChainId();

    return useReadContract({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: GREAT_INCOME_CLUB_ABI,
        functionName: 'getUserStats',
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
        abi: GREAT_INCOME_CLUB_ABI,
        functionName: 'getMatrixPosition',
        args: [BigInt(userId)],
        query: {
            enabled: userId > 0,
        },
    });
}

// Hook to get detailed user info (including referrer)
export function useContractUserInfo(userId: number) {
    const chainId = useChainId();

    return useReadContract({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: GREAT_INCOME_CLUB_ABI,
        functionName: 'userInfo',
        args: [BigInt(userId)],
        query: {
            enabled: userId > 0,
        },
    });
}
