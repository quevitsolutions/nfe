import React from "react";

export default function RoadmapPage() {
    return (
        <div className="space-y-6 text-slate-600 leading-relaxed">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-green mb-8">
                Roadmap — The Evolution of the Matrix
            </h1>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-brand-green mb-4 border-b border-brand-green/10 pb-2">From Mainnet Launch to Global Node Dominance</h2>
                <p className="mb-4">
                    AIPCore is a self-scaling protocol designed to expand organically through community participation. Our roadmap focuses on the technical optimization of the Matrix Engine and the global distribution of the Reward Pools.
                </p>
                <p>
                    Following the successful Mainnet deployment on Binance Smart Chain, the protocol is now entering its rapid expansion phase, focusing on Node onboarding and systemic layer scaling.
                </p>
            </section>

            <div className="relative border-l border-brand-green/20 pl-6 ml-4 space-y-12 mb-12 mt-8">
                {/* Phase I */}
                <div className="relative">
                    <div className="absolute w-4 h-4 bg-brand-green rounded-full -left-[33px] top-1 shadow-[0_0_10px_rgba(var(--brand-green-rgb),0.5)] border-4 border-white" />
                    <h3 className="text-xl font-bold text-brand-green mb-2">Phase I — Genesis Ignition (COMPLETE)</h3>
                    <p className="text-sm mb-4">
                        The foundation of AIPCore has been established with the successful launch of the 0% fee matrix protocol on the BSC Mainnet.
                    </p>
                    <div className="bg-brand-mint p-4 rounded-xl border border-brand-green/10">
                        <h4 className="font-bold text-slate-800 text-sm mb-2 uppercase tracking-wide">Milestones Reached</h4>
                        <ul className="text-sm space-y-1 text-slate-600 list-disc pl-4 font-medium">
                            <li>Deployment of the 40/50/10 Distribution Smart Contracts</li>
                            <li>Antigravity AI Security Audit & Logic Verification</li>
                            <li>Integration of real-time BNB/USD Pricing Oracles</li>
                            <li>Mainnet Deployment & Website Launch</li>
                        </ul>
                    </div>
                </div>

                {/* Phase II */}
                <div className="relative">
                    <div className="absolute w-4 h-4 bg-brand-red rounded-full -left-[33px] top-1 shadow-[0_0_10px_rgba(var(--brand-red-rgb),0.5)] border-4 border-white" />
                    <h3 className="text-xl font-bold text-brand-red mb-2">Phase II — Acceleration: Global Node Expansion (ACTIVE)</h3>
                    <p className="text-sm mb-4">
                        Focus shifts to scaling the community network. This involves onboarding leaders and activating the tiered reward systems for maximum participation.
                    </p>
                    <div className="bg-brand-mint p-4 rounded-xl border border-brand-green/10">
                        <h4 className="font-bold text-slate-800 text-sm mb-2 uppercase tracking-wide">Key Objectives</h4>
                        <ul className="text-sm space-y-1 text-slate-600 list-disc pl-4 font-medium">
                            <li>Activation of Bronze, Silver, and Gold Reward Pools</li>
                            <li>Optimization of the Matrix Optimization Module (MOM) for placement speed</li>
                            <li>Launch of the Global Node Leaderboard and Analytical Dashboard</li>
                            <li>Marketing rollout for the "100% Community Ownership" model</li>
                        </ul>
                    </div>
                </div>

                {/* Phase III */}
                <div className="relative">
                    <div className="absolute w-4 h-4 bg-slate-400 rounded-full -left-[33px] top-1 border-4 border-white" />
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Phase III — Ecosystem Maturity: Decentralized Governance</h3>
                    <p className="text-sm mb-4">
                        AIPCore becomes fully community-governed. The protocol's trajectory is determined by the collective voice of the highest-layer Node participants.
                    </p>
                    <div className="bg-brand-mint p-4 rounded-xl border border-brand-green/10">
                        <h4 className="font-bold text-slate-800 text-sm mb-2 uppercase tracking-wide">Future Milestones</h4>
                        <ul className="text-sm space-y-1 text-slate-600 list-disc pl-4 font-medium">
                            <li>Establishment of the AIPCore Governance DAO</li>
                            <li>Layer 17 scaling rewards and incentive programs</li>
                            <li>Strategic partnerships with decentralized utility platforms</li>
                            <li>Launch of the AIPCore Academy for Node Leadership</li>
                        </ul>
                    </div>
                </div>

                {/* Phase IV */}
                <div className="relative">
                    <div className="absolute w-4 h-4 bg-slate-300 rounded-full -left-[33px] top-1 border-4 border-white" />
                    <h3 className="text-xl font-bold text-slate-500 mb-2">Phase IV — Singularity: Perpetual Financial Evolution</h3>
                    <p className="text-sm mb-4">
                        Cross-chain expansion and the integration of advanced AI predictive tools to ensure the infinite sustainability of the Matrix.
                    </p>
                    <div className="bg-brand-mint p-4 rounded-xl border border-brand-green/10">
                        <h4 className="font-bold text-slate-800 text-sm mb-2 uppercase tracking-wide">Long-term Vision</h4>
                        <ul className="text-sm space-y-1 text-slate-600 list-disc pl-4 font-medium">
                            <li>Multi-chain compatibility for the Matrix Engine</li>
                            <li>AI-driven network health monitoring and adjustment</li>
                            <li>Global recognition as the gold standard for zero-fee decentralized participation</li>
                        </ul>
                    </div>
                </div>
            </div>

            <section className="bg-brand-mint border border-brand-green/20 p-8 rounded-3xl text-center">
                <h2 className="text-2xl font-bold text-brand-green mb-4 italic uppercase tracking-tight">The Path Forward</h2>
                <p className="text-sm mb-4 text-slate-600 font-medium">
                    The AIPCore roadmap is a living document, evolving alongside our community. We are committed to absolute transparency and the perpetual growth of the most efficient wealth distribution system on the blockchain.
                </p>
            </section>
        </div>
    );
}



