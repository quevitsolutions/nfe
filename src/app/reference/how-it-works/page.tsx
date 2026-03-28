import React from "react";

export default function HowItWorksPage() {
    return (
        <div className="space-y-6 text-gray-300 leading-relaxed">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-8">
                How It Works — Participation Guide
            </h1>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">The Path to Participation</h2>
                <p className="mb-6">
                    Joining the AIPCore community is a simple 3-step process. Our protocol is designed to be accessible to everyone, requiring only a compatible Web3 wallet and a small amount of BNB for registration.
                </p>

                <div className="space-y-8">
                    {/* Step 1 */}
                    <div className="flex gap-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-black text-xl shadow-[0_0_20px_rgba(250,204,21,0.3)]">1</div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Connect Your Wallet</h3>
                            <p className="text-sm">
                                Download a Web3 wallet like <strong>MetaMask</strong>, <strong>Trust Wallet</strong>, or <strong>Rainbow</strong>. Ensure you are connected to the <strong>Binance Smart Chain (BSC)</strong> network and have a small amount of BNB for registration and gas fees.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex gap-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-black text-xl shadow-[0_0_20px_rgba(250,204,21,0.3)]">2</div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Node Registration</h3>
                            <p className="text-sm">
                                Use a referral link from an existing community member or the default protocol ID (36999). Click "Join the Matrix" on the home page. The Layer 1 registration cost is $5 (payable in BNB), which creates your unique Node ID in the global network.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex gap-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-black text-xl shadow-[0_0_20px_rgba(250,204,21,0.3)]">3</div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Ascend Your Layer</h3>
                            <p className="text-sm">
                                Navigate to your dashboard and unlock higher Layers (L1–L17). Each Layer doubled in value and unlocks more profound matrix rewards and larger participation shares in the Global Reward Pools.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-10 bg-white/5 border border-white/10 p-6 rounded-2xl">
                <h2 className="text-xl font-bold text-white mb-4">The Layer System</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="text-white border-b border-white/10">
                                <th className="pb-4 font-bold">Layer</th>
                                <th className="pb-4 font-bold">Cost (USD)</th>
                                <th className="pb-4 font-bold">Earning Potential</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <tr>
                                <td className="py-4">Layer 1 (Base)</td>
                                <td className="py-4">$5</td>
                                <td className="py-4">Entry level rewards across 17 layers.</td>
                            </tr>
                            <tr>
                                <td className="py-4">Layer 6 (Bronze)</td>
                                <td className="py-4">$160</td>
                                <td className="py-4">Unlocks Global Bronze Reward Pool.</td>
                            </tr>
                            <tr>
                                <td className="py-4">Layer 10 (Silver)</td>
                                <td className="py-4">$2,560</td>
                                <td className="py-4">Unlocks Global Silver Reward Pool.</td>
                            </tr>
                            <tr>
                                <td className="py-4">Layer 14 (Gold)</td>
                                <td className="py-4">$40,960</td>
                                <td className="py-4">Unlocks Global Gold Reward Pool (Max).</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="mt-4 text-[10px] italic text-white/50">* All prices are indexed in real-time by the decentralized BNB Oracle.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">Why Upgrade?</h2>
                <p className="mb-4">
                    Upgrading isn't just about qualification; it's about <strong>Efficiency</strong>. Higher Layers allow your Node to capture more value from the "Spillover" generated by the AI Intelligence Engine. If you remain at a lower Layer than your matrix depth requires, a portion of the rewards may "miss" your node and flow to the next qualified upline.
                </p>
                <div className="p-4 bg-orange-900/20 border border-orange-500/20 rounded-xl text-orange-200 text-xs">
                    <strong>Tip:</strong> Most successful leaders aim for Layer 6 (Bronze) as quickly as possible to begin capturing a share of the daily global volume.
                </div>
            </section>
        </div>
    );
}
