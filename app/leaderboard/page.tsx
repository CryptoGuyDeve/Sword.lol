"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FiEye,
  FiUsers,
  FiZap,
  FiArrowRight,
  FiTrendingUp,
  FiChevronRight,
  FiAward,
  FiActivity
} from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import {
  FaCrown,
  FaStar,
  FaGavel,
  FaUserShield,
  FaLaptopCode,
  FaBug,
  FaUserTie,
  FaBolt,
  FaFire,
  FaChessQueen,
  FaSkullCrossbones,
  FaServer,
  FaGamepad,
  FaTrophy,
  FaRocket,
  FaCrosshairs,
  FaTree,
  FaMoon,
  FaGhost,
  FaHeart,
  FaMedal,
  FaShieldAlt,
  FaUserSecret,
  FaUserFriends,
  FaHandshake
} from "react-icons/fa";

const badgeIcons: Record<string, React.JSX.Element> = {
  Owner: <FaCrown />,
  "Co-Owner": <FaStar />,
  Admin: <FaGavel />,
  Moderator: <FaUserShield />,
  "Support Team": <FaLaptopCode />,
  "Bug Hunter": <FaBug />,
  Helper: <FaUserTie />,
  OG: <FaBolt />,
  Legendary: <FaFire />,
  Elite: <FaChessQueen />,
  Veteran: <FaSkullCrossbones />,
  "Server Booster": <FaServer />,
  "Top Contributor": <FaGavel />,
  "Pro Gamer": <FaGamepad />,
  "Esports Champion": <FaTrophy />,
  Speedrunner: <FaRocket />,
  "Top Fragger": <FaCrosshairs />,
  "Christmas 2024": <FaTree />,
  "Ramzan Mubarak": <FaMoon />,
  "Halloween 2024": <FaGhost />,
  "Valentine's 2025": <FaHeart />,
  Winner: <FaTrophy />,
  "Second Place": <FaMedal />,
  "Third Place": <FaMedal />,
  "Beta Tester": <FaShieldAlt />,
  "Server OG": <FaUserSecret />,
  "Owners Friend": <FaUserFriends />,
  "Close Owner Friend": <FaHandshake />,
};

const leaderboardTabs = [
  { id: "views", label: "Top Views", icon: <FiEye />, desc: "Highest reach indicators" },
  { id: "followers", label: "Top Followers", icon: <FiUsers />, desc: "Largest community reach" },
  { id: "engagement", label: "Engagement", icon: <FiActivity />, desc: "Aggregated performance" },
];

export default function LeaderboardPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("views");
  const [creators, setCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    if (session?.user) {
      setCurrentUser({
        id: (session.user as any).id,
        username: (session.user as any).username || session.user.name || "User"
      });
    }
  }, [session]);

  const fetchLeaderboard = async (type: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/leaderboard?type=${type}`);
      if (res.ok) {
        const data = await res.json();
        setCreators(data);
      }
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard(activeTab);
  }, [activeTab]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="flex bg-black min-h-screen text-white overflow-hidden">
      <Sidebar
        username={currentUser?.username || "Guest"}
        id={currentUser?.id || "0"}
      />

      <main className="flex-1 relative overflow-y-auto h-screen selection:bg-white selection:text-black font-sans">
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

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24 border-b border-white/5 pb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl"
            >
              <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 italic">
                Leaderboard<span className="text-gray-600 font-normal">.</span>
              </h1>
              <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-gray-500 leading-relaxed max-w-md">
                Architectural ranking of the platform's most influential entities. Real-time data sync with the Sword network.
              </p>
            </motion.div>

            <div className="flex flex-col gap-8 w-full md:w-auto">
              <div className="flex bg-white/[0.03] border border-white/5 p-1 backdrop-blur-3xl">
                {leaderboardTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-8 py-3 text-[10px] uppercase font-bold tracking-[0.2em] transition-all duration-700 overflow-hidden
                                        ${activeTab === tab.id ? "text-black" : "text-gray-500 hover:text-white"}`}
                  >
                    <span className="relative z-10">{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white"
                        transition={{ type: "spring", bounce: 0.1, duration: 0.6 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main List */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-4"
                >
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="h-20 bg-white/[0.02] border border-white/5 animate-pulse" />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col"
                >
                  {creators.map((creator, index) => (
                    <Link
                      key={creator.id}
                      href={`/${creator.username}`}
                      className="group relative flex items-center gap-8 py-8 px-6 border-b border-white/5 hover:bg-white/[0.02] transition-all duration-700 overflow-hidden"
                    >
                      {/* Rank Indicator */}
                      <div className="w-12 text-center">
                        <span className={`text-sm font-mono font-bold ${index < 3 ? "text-white" : "text-gray-700 group-hover:text-gray-400"}`}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Avatar Frame */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/5 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-1000" />
                        <img
                          src={creator.profile_pic}
                          className="relative w-12 h-12 transition-all duration-700 border border-white/10 p-1 bg-black object-cover"
                          alt={creator.username}
                        />
                      </div>

                      {/* Identity */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-4 mb-1">
                          <h3 className="text-lg font-bold tracking-tight italic flex items-center gap-1.5">
                            @{creator.username}
                            {creator.is_verified && (
                              <MdVerified className="text-blue-500 text-base" />
                            )}
                          </h3>
                          {/* Mini Badges */}
                          <div className="flex gap-2">
                            {creator.badges?.slice(0, 2).map((badge: string, i: number) => (
                              <span key={i} className="text-gray-600 group-hover:text-white transition-colors">
                                {badgeIcons[badge] || <FiAward />}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-700">
                          Active Platform Entity
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="flex gap-12 text-right hidden md:flex">
                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-gray-600 italic">Reach</span>
                          <span className="text-lg font-bold">{formatNumber(creator.views_count)}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-gray-600 italic">Network</span>
                          <span className="text-lg font-bold">{formatNumber(creator.followers_count)}</span>
                        </div>
                      </div>

                      {/* Action Icon */}
                      <div className="ml-8 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-700">
                        <FiChevronRight className="text-white text-xl" />
                      </div>

                      {/* Architectural Accents */}
                      <div className="absolute top-0 right-0 w-12 h-[1px] bg-white/0 group-hover:bg-white/20 transition-all duration-700" />
                      <div className="absolute bottom-0 left-0 w-12 h-[1px] bg-white/0 group-hover:bg-white/20 transition-all duration-700" />
                    </Link>
                  ))}

                  {creators.length === 0 && (
                    <div className="py-24 text-center">
                      <p className="text-[10px] uppercase font-bold tracking-[0.5em] text-gray-600 italic">No rankings available for this cycle.</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Floating Meta Details */}
        <div className="fixed bottom-12 left-12 hidden lg:block z-[2]">
          <div className="text-[10px] font-mono font-bold tracking-[0.5em] text-gray-800 uppercase vertical-text italic">
            Ranking Cycle / 0C4
          </div>
        </div>
        <div className="fixed bottom-12 right-12 hidden lg:block z-[2]">
          <div className="text-[10px] font-mono font-bold tracking-[0.5em] text-gray-800 uppercase vertical-text italic">
            Core Network / Live
          </div>
        </div>

        <style jsx global>{`
                .vertical-text {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                }
            `}</style>
      </main>
    </div>
  );
}