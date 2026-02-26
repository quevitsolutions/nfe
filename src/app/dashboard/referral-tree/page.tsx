'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ChevronRight, ChevronDown, User, Users, Search, Loader2 } from 'lucide-react';
import { useTeamUsers, useUserIdByAddress, useUserStats, useUserInfo } from '@/lib/hooks/useContract';

// Recursive Node Component that fetches its own children when expanded
function RecursiveTeamNode({ userId, address, level, directReferrals, depth = 0 }: { userId: number; address: string; level: number; directReferrals: number; depth?: number }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Fetch children only when expanded
    const { data: teamMembers, isLoading } = useTeamUsers(userId, 0, 100);

    // Toggle expansion
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="ml-4 md:ml-8 border-l border-white/10 pl-4 md:pl-0 border-none md:border-none">
            <div
                className="flex flex-col md:flex-row md:items-center gap-3 p-4 mb-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer border border-white/5"
                onClick={handleToggle}
            >
                <div className="flex items-center gap-3">
                    {directReferrals > 0 && (
                        isExpanded ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                    {directReferrals === 0 && <div className="w-5" />}

                    <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-2 rounded-lg">
                        <User className="w-5 h-5 text-white" />
                    </div>

                    <div>
                        <div className="text-white font-semibold flex items-center gap-2">
                            User #{userId}
                            {depth === 0 && <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs border border-yellow-500/30">Root</span>}
                        </div>
                        <div className="text-sm text-gray-400 font-mono">{address}</div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 md:flex md:gap-6 text-sm md:ml-auto mt-3 md:mt-0 border-t border-white/5 md:border-none pt-3 md:pt-0">
                    <div>
                        <div className="text-gray-400 text-xs uppercase tracking-wider">Level</div>
                        <div className={`font-bold ${level >= 15 ? 'text-yellow-400' :
                            level >= 9 ? 'text-green-400' :
                                'text-blue-400'
                            }`}>{level}</div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-xs uppercase tracking-wider">Direct</div>
                        <div className="text-white font-bold">{directReferrals}</div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-xs uppercase tracking-wider">Team</div>
                        <div className="text-white font-bold">
                            {/* Note: Total Team isn't directly available on node but we show Directs here */}
                            {directReferrals > 0 ? `${directReferrals}+` : '0'}
                        </div>
                    </div>
                </div>
            </div>

            {isExpanded && (
                <div className="mt-2">
                    {isLoading ? (
                        <div className="flex items-center gap-2 text-gray-400 py-2 ml-8">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">Loading team...</span>
                        </div>
                    ) : teamMembers && Array.isArray(teamMembers) && teamMembers.length > 0 ? (
                        teamMembers.map((member: any) => (
                            <RecursiveTeamNode
                                key={Number(member.nodeId)}
                                userId={Number(member.nodeId)}
                                address={member.wallet ? `${member.wallet.slice(0, 6)}...${member.wallet.slice(-4)}` : '...'}
                                level={Number(member.tier)}
                                directReferrals={Number(member.directNodes)}
                                depth={depth + 1}
                            />
                        ))
                    ) : (
                        <div className="text-gray-500 text-sm py-2 ml-8 italic">No direct referrals found.</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function ReferralTreePage() {
    const { isConnected, address } = useAccount();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResultId, setSearchResultId] = useState<number | null>(null);

    // Get current user ID
    const { data: userData } = useUserIdByAddress(address);
    const myUserId = userData ? Number(userData) : 0;

    const { data: myUserStats } = useUserStats(myUserId);
    const { data: myUserInfo } = useUserInfo(myUserId);

    // Search Logic
    const { data: searchUserData } = useUserIdByAddress(searchQuery.startsWith('0x') ? searchQuery : undefined);
    const { data: searchUserInfo } = useUserInfo(searchQuery.length < 10 && !isNaN(Number(searchQuery)) ? Number(searchQuery) : 0);

    const handleSearch = () => {
        if (!searchQuery) {
            setSearchResultId(null);
            return;
        }

        // If searching by address
        if (searchQuery.startsWith('0x') && searchUserData) {
            const id = searchUserData ? Number(searchUserData) : 0;
            if (id > 0) setSearchResultId(id);
        }
        // If searching by ID
        else if (!isNaN(Number(searchQuery))) {
            setSearchResultId(Number(searchQuery));
        }
    };

    // Clear search
    const clearSearch = () => {
        setSearchQuery('');
        setSearchResultId(null);
    }

    const rootId = searchResultId || myUserId;

    // We need to fetch root stats dynamically if it's a search result
    const { data: rootStats } = useUserStats(rootId);
    const { data: rootInfo } = useUserInfo(rootId);

    // Determine root data to display
    const currentRootAddress = rootId === myUserId
        ? (address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '')
        : `User #${rootId}`;

    const currentRootLevel = rootStats ? Number(rootStats[3]) : (myUserStats ? Number(myUserStats[3]) : 0);
    const currentRootDirects = rootStats ? Number(rootStats[1]) : (myUserStats ? Number(myUserStats[1]) : 0);

    return (
        <div className="space-y-6">
            {/* Header & Search */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Referral Tree</h2>
                        <p className="text-gray-400">View and basic search your entire team structure</p>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <input
                                type="text"
                                placeholder="Search ID or Address..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500"
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                        </div>
                        <button
                            onClick={handleSearch}
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-colors"
                        >
                            Go
                        </button>
                        {searchResultId && (
                            <button
                                onClick={clearSearch}
                                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg font-semibold transition-colors"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Tree Container */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 min-h-[400px]">
                {rootId > 0 ? (
                    <RecursiveTeamNode
                        userId={rootId}
                        address={currentRootAddress}
                        level={currentRootLevel}
                        directReferrals={currentRootDirects}
                        depth={0}
                    />
                ) : (
                    <div className="text-center py-12">
                        <div className="animate-spin w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-400">Loading tree...</p>
                    </div>
                )}
            </div>

            {/* Legend */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-4">Level Color Guide</h3>
                <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-blue-400"></div>
                        <span className="text-gray-400">Level 1-8</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-green-400"></div>
                        <span className="text-gray-400">Level 9-14</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-yellow-400"></div>
                        <span className="text-gray-400">Level 15-18</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
