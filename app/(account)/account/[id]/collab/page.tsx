"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import {
    FiUsers, FiDollarSign, FiAward, FiArrowRight,
    FiMessageSquare, FiGlobe, FiInfo, FiCode, FiZap
} from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import Loading from "@/components/Loading";

// Force dynamic rendering
export const dynamic = "force-dynamic";

const CollabPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/users/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setUsername(data.username);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    const collabTiers = [
        { target: "5+ Users", reward: "$3", detail: "Bronze Partner", id: "C_01" },
        { target: "10+ Users", reward: "$6", detail: "Silver Partner", id: "C_02" },
        { target: "25+ Users", reward: "$15", detail: "Gold Partner", id: "C_03" },
        { target: "50+ Users", reward: "$35", detail: "Platinum Partner", id: "C_04" },
        { target: "100+ Users", reward: "$75", detail: "Elite Affiliate", id: "C_05" },
        { target: "250+ Users", reward: "$200", detail: "Global Node", id: "C_06" },
    ];

    if (loading) return <Loading fullScreen text="SYNCING_PARTNERSHIP_NODE" />;

    return (
        <div className="flex bg-[#0E0E0E] min-h-screen text-white overflow-hidden selection:bg-white selection:text-black font-sans">
            <Sidebar username={username || "Entity"} id={id as string} />

            <main className="flex-1 relative overflow-y-auto h-screen custom-scrollbar">
                {/* Stage 3: Ambient Shading */}
                <div className="absolute inset-0 pointer-events-none z-[1]">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[150px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[150px] rounded-full" />
                </div>

                {/* Global Grain Texture */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-[2] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                {/* Background Grid */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-[1]"
                    style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }}
                />

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">

                    {/* Header */}
                    <div className="mb-24 flex flex-col lg:flex-row justify-between items-end gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-zinc-400 uppercase">
                                    PARTNERSHIP_ENGINE / v1.0
                                </span>
                                <div className="h-px w-12 bg-white/10" />
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter italic mb-8">
                                Collab<span className="text-gray-600 font-normal">.</span>
                            </h1>
                            <p className="max-w-xl text-zinc-400 font-medium italic tracking-tight text-lg">
                                Scale the Sword network with us. Refer active creators and unlock high-yield financial rewards.
                            </p>
                        </motion.div>

                        <motion.a
                            href="https://discord.gg/yourlink"
                            target="_blank"
                            className="px-10 py-5 bg-white text-black font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-zinc-200 transition-all flex items-center gap-4"
                        >
                            <FaDiscord className="text-lg" /> Connect Discord
                        </motion.a>
                    </div>

                    {/* Collab Matrix Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 mb-24 overflow-hidden">
                        {collabTiers.map((tier, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i }}
                                className="bg-black/40 p-12 group hover:bg-white/[0.02] transition-all duration-700 relative"
                            >
                                <div className="flex justify-between items-start mb-10">
                                    <span className="text-[9px] font-mono text-zinc-600 tracking-widest">{tier.id}</span>
                                    <FiAward className="text-zinc-600 group-hover:text-white transition-colors duration-500" />
                                </div>
                                <div className="space-y-2 mb-8">
                                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-500 italic">{tier.target}</span>
                                    <h3 className="text-4xl font-bold tracking-tighter">{tier.reward}</h3>
                                </div>
                                <p className="text-[9px] uppercase font-bold tracking-[0.4em] text-zinc-600">{tier.detail}</p>

                                {/* Corner Accent */}
                                <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                    <div className="absolute top-4 right-4 w-px h-2 bg-white/20" />
                                    <div className="absolute top-4 right-4 h-px w-2 bg-white/20" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Owner & Company Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        <div className="lg:col-span-2 space-y-12">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="bg-white/[0.02] border border-white/5 p-12 md:p-16 relative overflow-hidden group"
                            >
                                <div className="flex items-center gap-8 mb-12">
                                    <div className="w-20 h-20 bg-white shadow-[0_0_40px_rgba(255,255,255,0.1)] rounded-none shrink-0 flex items-center justify-center">
                                        <span className="text-black font-bold text-3xl italic">F</span>
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold italic tracking-tight mb-1">Faizurrehman</h4>
                                        <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-600 italic">Founder & Lead Engineer</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 border-y border-white/5 py-8">
                                    <div>
                                        <span className="block text-[8px] text-zinc-600 uppercase tracking-widest mb-1">Age</span>
                                        <span className="text-xs font-bold font-mono">16_YRS</span>
                                    </div>
                                    <div>
                                        <span className="block text-[8px] text-zinc-600 uppercase tracking-widest mb-1">Origin</span>
                                        <span className="text-xs font-bold font-mono text-zinc-400">PAKISTAN</span>
                                    </div>
                                    <div>
                                        <span className="block text-[8px] text-zinc-600 uppercase tracking-widest mb-1">Status</span>
                                        <span className="text-xs font-bold font-mono text-zinc-400">MATRIC_LUX</span>
                                    </div>
                                    <div>
                                        <span className="block text-[8px] text-zinc-600 uppercase tracking-widest mb-1">Domain</span>
                                        <span className="text-xs font-bold font-mono text-zinc-400">SWORD_DOT_LOL</span>
                                    </div>
                                </div>
                                <p className="text-sm text-zinc-400 leading-relaxed italic font-medium">
                                    Building the future of digital identity. Sword.lol is a startup focused on decentralizing creator reach and providing a premium architectural home for the next generation of online entities.
                                </p>
                            </motion.div>
                        </div>

                        <div className="space-y-8">
                            <div className="p-12 bg-zinc-900/50 border border-white/5 relative group">
                                <FiInfo className="text-zinc-600 text-xl mb-6 group-hover:text-white transition-colors" />
                                <h5 className="text-[10px] uppercase font-bold tracking-[0.4em] mb-4 italic text-zinc-500">How to Collab</h5>
                                <p className="text-xs text-zinc-400 leading-relaxed italic font-medium">
                                    1. Connect via Discord node.<br />
                                    2. Receive your unique affiliate vector.<br />
                                    3. Inject 5+ users into the network.<br />
                                    4. Withdraw rewards to your digital wallet.
                                </p>
                            </div>

                            <div className="p-12 bg-white text-black group hover:bg-zinc-200 transition-all cursor-pointer">
                                <h5 className="text-[10px] uppercase font-bold tracking-[0.5em] mb-4">Inquiry Line</h5>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold italic">Message Founder</span>
                                    <FiArrowRight />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
              width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.05);
          }
        `}</style>
            </main>
        </div>
    );
};

export default CollabPage;
