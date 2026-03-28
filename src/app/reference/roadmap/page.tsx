import React from "react";

export default function RoadmapPage() {
    return (
        <div className="space-y-6 text-gray-300 leading-relaxed">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-8">
                Roadmap — The Evolution of the Matrix
            </h1>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">From Mainnet Launch to Global Node Dominance</h2>
                <p className="mb-4">
                    AIPCore is a self-scaling protocol designed to expand organically through community participation. Our roadmap focuses on the technical optimization of the Matrix Engine and the global distribution of the Reward Pools.
                </p>
                <p>
                    Following the successful Mainnet deployment on Binance Smart Chain, the protocol is now entering its rapid expansion phase, focusing on Node onboarding and systemic layer scaling.
                </p>
            </section>

            <div className="relative border-l border-white/10 pl-6 ml-4 space-y-12 mb-12 mt-8">
                {/* Phase I */}
                <div className="relative">
                    <div className="absolute w-4 h-4 bg-green-500 rounded-full -left-[33px] top-1 shadow-[0_0_10px_rgba(34,197,94,0.5)] border-4 border-[#050510]" />
                    <h3 className="text-xl font-bold text-white mb-2 text-green-400">Phase I — Genesis Ignition (COMPLETE)</h3>
                    <p className="text-sm mb-4">
                        The foundation of AIPCore has been established with the successful launch of the 0% fee matrix protocol on the BSC Mainnet.
                    </p>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <h4 className="font-bold text-white text-sm mb-2 uppercase tracking-wide">Milestones Reached</h4>
                        <ul className="text-sm space-y-1 text-neural-gold list-disc pl-4">
                            <li>Deployment of the 40/50/10 Distribution Smart Contracts</li>
                            <li>Antigravity AI Security Audit & Logic Verification</li>
                            <li>Integration of real-time BNB/USD Pricing Oracles</li>
                            <li>Mainnet Deployment & Website Launch</li>
                        </ul>
                    </div>
                </div>

                {/* Phase II */}
                <div className="relative">
                    <div className="absolute w-4 h-4 bg-yellow-400 rounded-full -left-[33px] top-1 shadow-[0_0_10px_rgba(250,204,21,0.5)] border-4 border-[#050510]" />
                    <h3 className="text-xl font-bold text-white mb-2 text-yellow-400">Phase II — Acceleration: Global Node Expansion (ACTIVE)</h3>
                    <p className="text-sm mb-4">
                        Focus shifts to scaling the community network. This involves onboarding leaders and activating the tiered reward systems for maximum participation.
                    </p>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <h4 className="font-bold text-white text-sm mb-2 uppercase tracking-wide">Key Objectives</h4>
                        <ul className="text-sm space-y-1 text-neural-gold list-disc pl-4">
                            <li>Activation of Bronze, Silver, and Gold Reward Pools</li>
                            <li>Optimization of the Matrix Optimization Module (MOM) for placement speed</li>
                            <li>Launch of the Global Node Leaderboard and Analytical Dashboard</li>
                            <li>Marketing rollout for the "100% Community Ownership" model</li>
                        </ul>
                    </div>
                </div>

                {/* Phase III */}
                <div className="relative">
                    <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[33px] top-1 shadow-[0_0_10px_rgba(59,130,246,0.5)] border-4 border-[#050510]" />
                    <h3 className="text-xl font-bold text-white mb-2 text-blue-400">Phase III — Ecosystem Maturity: Decentralized Governance</h3>
                    <p className="text-sm mb-4">
                        AIPCore becomes fully community-governed. The protocol's trajectory is determined by the collective voice of the highest-layer Node participants.
                    </p>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <h4 className="font-bold text-white text-sm mb-2 uppercase tracking-wide">Future Milestones</h4>
                        <ul className="text-sm space-y-1 text-neural-gold list-disc pl-4">
                            <li>Establishment of the AIPCore Governance DAO</li>
                            <li>Layer 17 scaling rewards and incentive programs</li>
                            <li>Strategic partnerships with decentralized utility platforms</li>
                            <li>Launch of the AIPCore Academy for Node Leadership</li>
                        </ul>
                    </div>
                </div>

                {/* Phase IV */}
                <div className="relative">
                    <div className="absolute w-4 h-4 bg-purple-500 rounded-full -left-[33px] top-1 shadow-[0_0_10px_rgba(168,85,247,0.5)] border-4 border-[#050510]" />
                    <h3 className="text-xl font-bold text-white mb-2 text-purple-400">Phase IV — Singularity: Perpetual Financial Evolution</h3>
                    <p className="text-sm mb-4">
                        Cross-chain expansion and the integration of advanced AI predictive tools to ensure the infinite sustainability of the Matrix.
                    </p>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <h4 className="font-bold text-white text-sm mb-2 uppercase tracking-wide">Long-term Vision</h4>
                        <ul className="text-sm space-y-1 text-neural-gold list-disc pl-4">
                            <li>Multi-chain compatibility for the Matrix Engine</li>
                            <li>AI-driven network health monitoring and adjustment</li>
                            <li>Global recognition as the gold standard for zero-fee decentralized participation</li>
                        </ul>
                    </div>
                </div>
            </div>

            <section className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-purple-500/20 p-6 rounded-2xl text-center">
                <h2 className="text-2xl font-bold text-white mb-4">The Path Forward</h2>
                <p className="text-sm mb-4">
                    The AIPCore roadmap is a living document, evolving alongside our community. We are committed to absolute transparency and the perpetual growth of the most efficient wealth distribution system on the blockchain.
                </p>
            </section>
        </div>
    );
}
