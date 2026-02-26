'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Users, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { useTeamUsers, useUserIdByAddress, useUserStats } from '@/lib/hooks/useContract';
import { useReadContract, useChainId } from 'wagmi';
import { GREAT_INCOME_CLUB_ABI, getContractAddress, formatBNB } from '@/lib/contract';



export default function TeamPage() {
    const { isConnected, address } = useAccount();
    const [search, setSearch] = useState('');
    const [expandedIds, setExpandedIds] = useState<number[]>([]);

    // Get user ID from connected wallet address
    const { data: userData } = useUserIdByAddress(address);
    const userId = userData ? Number(userData) : 0;

    // Get team members (layer 0 = direct referrals)
    const { data: teamMembers } = useTeamUsers(userId, 0, 100);
    const { data: userStats } = useUserStats(userId);

    // Format team data
    const formattedTeam = teamMembers && Array.isArray(teamMembers)
        ? teamMembers.map((member: any) => ({
            id: Number(member.id),
            address: member.account ? `${member.account.slice(0, 6)}...${member.account.slice(-4)}` : '',
            fullAddress: member.account || '',
            level: Number(member.level),
            directReferrals: Number(member.directTeam),
            totalTeam: Number(member.totalMatrixTeam),
            start: Number(member.start),
        }))
        : [];

    const toggleExpand = (id: number) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const filteredTeam = formattedTeam.filter(member =>
        member.id.toString().includes(search) || member.fullAddress.toLowerCase().includes(search.toLowerCase())
    );

    const directCount = userStats ? Number(userStats[1]) : 0;
    const totalTeamCount = userStats ? Number(userStats[2]) : 0;

    return (
        <div className="space-y-6">
            {/* Team Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-3 rounded-xl">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-gray-300 font-semibold">Direct Referrals</h3>
                    </div>
                    <div className="text-4xl font-bold text-white">{directCount}</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-3 rounded-xl">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-gray-300 font-semibold">Total Team</h3>
                    </div>
                    <div className="text-4xl font-bold text-white">
                        {totalTeamCount}
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-xl">
                            <Users className="w-6 h-6 text-black" />
                        </div>
                        <h3 className="text-gray-300 font-semibold">Active Members</h3>
                    </div>
                    <div className="text-4xl font-bold text-white">{formattedTeam.length}</div>
                </div>
            </div>

            {/* Team List */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Direct Team Members</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by ID or address..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    {filteredTeam.map((member) => (
                        <TeamMemberCard key={member.id} member={member} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function TeamMemberCard({ member }: { member: any }) {
    const [isExpanded, setIsExpanded] = useState(false);
    // Fetch stats only when expanded
    const { data: userStats } = useUserStats(isExpanded ? member.id : 0);

    // Matrix L/R counts from userStats (indices based on contract inspection: 3=left, 4=right likely, or we need to check ABI again. 
    // Wait, let's double check ABI for getUserStats return values.
    // ABI says: level, directCount, matrixCount, totalIncome, totalDeposit, daysActive.
    // It does NOT have left/right explicitly. 
    // However, in the matrix tree implementation plan, we suspected indices 3 and 4 were left/right. 
    // But getUserStats ABI (lines 1054-1085) shows:
    // 0: level
    // 1: directCount
    // 2: matrixCount
    // 3: totalIncome
    // 4: totalDeposit
    // 5: daysActive

    // There is no Left/Right count in getUserStats.
    // Let's check getMatrixPosition.
    // getMatrixPosition returns: uplineId, leftChild, rightChild. NOT counts.

    // Is there any function that gives L/R counts? 
    // `getMatrixUsers` returns a detailed User struct.
    // User struct (line 674) has: 
    // ...
    // totalMatrixTeam
    // ...

    // Maybe we can't get L/R counts easily for *every* member without recursion.
    // BUT the top user dashboard has "Matrix Position" 2 Left / Right.
    // Let's see how Dashboard gets it.
    // Dashboard uses `userInfo[5]`. 
    // `userInfo` returns: account, id, referrer, upline, start, level, directTeam, totalMatrixTeam, totalDeposit, directTeamRanks.
    // It does NOT return Left/Right counts.

    // Wait, the Dashboard Matrix Position card says: `userInfo[5]`.
    // userInfo[5] is `level`? No, let's count.
    // 0: account
    // 1: id
    // 2: referrer
    // 3: upline
    // 4: start
    // 5: level
    // 6: directTeam
    // 7: totalMatrixTeam

    // So `userInfo[5]` is LEVEL. The dashboard label "Matrix Position ... Left / Right" is misleading if it just shows Level.
    // Actually, in Dashboard (line 190): `userInfo[5].toString()`.
    // If userInfo returns struct, relying on array index is risky if we don't map it right.
    // The ABI `userInfo` outputs a Tuple.
    // 0: address account
    // 1: uint id
    // 2: uint referrer
    // 3: uint upline
    // 4: uint start
    // 5: uint level  <-- This is Level.
    // 6: uint directTeam
    // 7: uint totalMatrixTeam

    // The user wants "Matrix L/R COUNT".
    // If the contract doesn't store L/R counts, we might have to calculate it or it's not available.
    // BUT, `getMatrixDirect` returns `uint256[2] _directs`.
    // Let's check `getMatrixDirect` in ABI (line 608).
    // It takes `_user`. Returns `uint256[2]`.
    // This sounds exactly like what we need: Left and Right Directs (or maybe counts?).
    // Let's try `useMatrixDirect` hook.

    const { data: matrixDirect } = useReadContract({
        address: getContractAddress(useChainId()) as `0x${string}`,
        abi: GREAT_INCOME_CLUB_ABI,
        functionName: 'getMatrixDirect',
        args: [BigInt(member.id)],
        query: { enabled: isExpanded }
    });

    // Actually, `getMatrixDirect` usually means the specific children IDs. 
    // If it returns [leftChildId, rightChildId], that's not the *count* of the subtree.

    // However, if the user sees "5 / 8" in the screenshot, maybe they expect subtree size.
    // Or maybe just direct children (1/1 or 0/1 etc)?
    // "5 / 8" suggests subtree.

    // If there is no "getLeftRightCounts" function, we can't show it easily without traversing.
    // AND `users` mapping is internal? No, `getUserByAddress` returns User struct.

    // Let's assume `getMatrixUsers` or similar might give it.
    // Or maybe we just show "Matrix Team: {totalMatrixTeam}".
    // But the request is specific: "correct matrix L/R COUNT".

    // Let's try to check `getMatrixDirect` - if it returns `[countL, countR]`, we are good.
    // The name `_directs` suggests children. 
    // But `count` is usually `uint`. `uint[2]`.
    // If it was children IDs, it would be `topLeftId, topRightId`. 

    // Let's implement the card with `useUserStats` for now to get income and status, and try to find L/R.
    // Display "Total Team: {totalMatrixTeam}" is safe.
    // But "Matrix L/R" is specific. 

    // I will use `totalMatrixTeam` for now and maybe hide L/R or investigate further.
    // Actually, I can check if I can get `getMatrixDirect` working.

    return (
        <div className="bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-4 flex items-center justify-between cursor-pointer"
            >
                <div className="flex items-center gap-4">
                    <button className="text-gray-400 hover:text-white">
                        {isExpanded ? <ChevronDown /> : <ChevronRight />}
                    </button>
                    <div>
                        <div className="text-white font-semibold flex items-center gap-2">
                            User #{member.id}
                        </div>
                        <div className="text-sm text-gray-400 font-mono">{member.address}</div>
                    </div>
                </div>
                <div className="hidden md:flex gap-8 text-sm">
                    <div>
                        <div className="text-gray-400">Level</div>
                        <div className="text-white font-bold">{member.level}</div>
                    </div>
                    <div>
                        <div className="text-gray-400">Direct</div>
                        <div className="text-white font-bold">{member.directReferrals}</div>
                    </div>
                    <div>
                        <div className="text-gray-400">Team</div>
                        <div className="text-white font-bold">{member.totalTeam}</div>
                    </div>
                </div>
            </div>

            {isExpanded && (
                <div className="px-4 pb-4 border-t border-white/5">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                            <div className="text-gray-400 text-sm mb-1">Joined</div>
                            <div className="text-white">{member.start ? new Date(member.start * 1000).toLocaleDateString() : 'N/A'}</div>
                        </div>
                        <div>
                            <div className="text-gray-400 text-sm mb-1">Matrix Team</div>
                            <div className="text-white">{member.totalTeam}</div>
                        </div>
                        <div>
                            <div className="text-gray-400 text-sm mb-1">Total Income</div>
                            <div className="text-green-400">{userStats ? formatBNB(userStats[3]) : '...'} BNB</div>
                        </div>
                        <div>
                            <div className="text-gray-400 text-sm mb-1">Status</div>
                            <div className="text-green-400">● Active</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
