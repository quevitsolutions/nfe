import React from "react";
import { Twitter, Youtube, Send } from "lucide-react";

export default function SocialMediaPage() {
    return (
        <div className="space-y-6 text-gray-300 leading-relaxed">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-8">
                Official Channels
            </h1>

            <p className="mb-8">
                Connect with the <strong>AIPCore</strong> community and stay updated on the evolution of 100% community-owned finance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Twitter / X */}
                <a
                    href="https://x.com/AIPCore_official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-4 bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-yellow-500/50 transition-all group"
                >
                    <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                        <Twitter className="w-8 h-8 text-white group-hover:text-blue-400" />
                    </div>
                    <span className="font-bold text-lg text-white">X (Twitter)</span>
                    <span className="text-sm text-neural-gold">@AIPCore_official</span>
                </a>

                {/* YouTube */}
                <a
                    href="https://www.youtube.com/@AIPCore_official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-4 bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-yellow-500/50 transition-all group"
                >
                    <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                        <Youtube className="w-8 h-8 text-white group-hover:text-red-500" />
                    </div>
                    <span className="font-bold text-lg text-white">YouTube</span>
                    <span className="text-sm text-neural-gold">@AIPCore_official</span>
                </a>

                {/* Telegram */}
                <a
                    href="https://t.me/AIPCore_official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-4 bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-yellow-500/50 transition-all group"
                >
                    <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                        <Send className="w-8 h-8 text-white group-hover:text-blue-400" />
                    </div>
                    <span className="font-bold text-lg text-white">Telegram</span>
                    <span className="text-sm text-neural-gold">@AIPCore_official</span>
                </a>
            </div>
        </div>
    );
}
