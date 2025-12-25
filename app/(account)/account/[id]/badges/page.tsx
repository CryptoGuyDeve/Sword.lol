"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Loading from "@/components/Loading";
import {
  FaUserShield, FaBolt, FaTrophy, FaMedal, FaBug, FaServer,
  FaTree, FaMoon, FaCrown, FaUserSecret, FaGavel, FaLaptopCode,
  FaShieldAlt, FaGamepad, FaUserTie, FaSkullCrossbones, FaHeart,
  FaFire, FaChessQueen, FaGhost, FaRocket, FaCrosshairs, FaStar
} from "react-icons/fa";
import { FiAward, FiShield, FiCpu, FiActivity } from "react-icons/fi";

// Force dynamic rendering to prevent static generation errors
export const dynamic = "force-dynamic";

const badges = [
  { name: "Owner", description: "The architectural overseer. Complete system authority.", icon: <FaCrown /> },
  { name: "Co-Owner", description: "Secondary authority node. High-level system access.", icon: <FaStar /> },
  { name: "Admin", description: "System administrators. Managing network integrity.", icon: <FaGavel /> },
  { name: "Moderator", description: "Network guardians. Ensuring protocol adherence.", icon: <FaUserShield /> },
  { name: "Support Team", description: "Technical assistance unit for broadcast nodes.", icon: <FaLaptopCode /> },
  { name: "Bug Hunter", description: "Identifying core vulnerabilities in the network.", icon: <FaBug /> },
  { name: "Helper", description: "Assisting new entities with system calibration.", icon: <FaUserTie /> },
  { name: "OG", description: "Early broadcast node. Established legacy status.", icon: <FaBolt /> },
  { name: "Legendary", description: "Acquired through extreme network influence.", icon: <FaFire /> },
  { name: "Elite", description: "High-performance entity within the system.", icon: <FaChessQueen /> },
  { name: "Veteran", description: "Long-term synchronization with Sword core.", icon: <FaSkullCrossbones /> },
  { name: "Server Booster", description: "Injecting additional energy into the grid.", icon: <FaServer /> },
  { name: "Top Contributor", description: "Massive contributions to core development.", icon: <FaGavel /> },
  { name: "Pro Gamer", description: "Superior competitive performance markers.", icon: <FaGamepad /> },
  { name: "Esports Champion", description: "Global victory in synchronized events.", icon: <FaTrophy /> },
  { name: "Speedrunner", description: "Optimized temporal performance achievements.", icon: <FaRocket /> },
  { name: "Top Fragger", description: "High-density combat markers and stats.", icon: <FaCrosshairs /> },
  { name: "Christmas 2024", description: "Temporal achievement from the winter cycle.", icon: <FaTree /> },
  { name: "Ramzan Mubarak", description: "Celebrating the sacred synchronization month.", icon: <FaMoon /> },
  { name: "Halloween 2024", description: "Exclusive marker from the shadow cycle.", icon: <FaGhost /> },
  { name: "Valentine's 2025", description: "Emotional resonance achievement protocol.", icon: <FaHeart /> },
  { name: "Winner", description: "Primary victory in system-wide events.", icon: <FaTrophy /> },
  { name: "Second Place", description: "Secondary performance tier in events.", icon: <FaMedal /> },
  { name: "Third Place", description: "Tertiary performance tier in events.", icon: <FaMedal /> },
  { name: "Beta Tester", description: "Testing experimental network prototypes.", icon: <FaShieldAlt /> },
  { name: "Server OG", description: "Initial entity from the genesis block.", icon: <FaUserSecret /> },
];

const BadgesPage = () => {
  const params = useParams();
  const userId = params?.id as string;

  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/users/${userId}`);
        if (res.ok) {
          const data = await res.json();
          setUsername(data.username || "Unknown User");
        }
      } catch (e) {
        console.error("Error fetching user", e);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserData();
  }, [userId]);

  if (loading) return <Loading fullScreen text="CALIBRATING_BADGES" />;

  return (
    <div className="flex bg-[#0E0E0E] min-h-screen text-white overflow-hidden selection:bg-white selection:text-black font-sans">
      <Sidebar username={username || "User"} id={userId} />

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

          {/* Header Section */}
          <div className="mb-24 relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-white/30 uppercase">
                  ACHIEVEMENT_DATABANK / MODULE_04
                </span>
                <div className="h-px w-12 bg-white/10" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter italic mb-4">
                Badges<span className="text-gray-600 font-normal">.</span>
              </h1>
              <p className="text-zinc-400 font-medium italic tracking-tight text-lg">
                Achievements and identifiers established within the Sword broadcast network.
              </p>
            </motion.div>
          </div>

          {/* Badge Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/5 border border-white/5 overflow-hidden shadow-2xl">
            {badges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.02, duration: 0.8 }}
                className="bg-black/40 p-8 hover:bg-white group transition-all duration-700 relative flex flex-col gap-8 aspect-square"
              >
                <div className="flex justify-between items-start">
                  <div className="text-4xl text-gray-700 group-hover:text-black transition-colors duration-700">
                    {badge.icon}
                  </div>
                  {["Owner", "Co-Owner", "Admin", "Legendary"].includes(badge.name) && (
                    <div className="h-2 w-2 rounded-full bg-white group-hover:bg-black transition-colors shadow-[0_0_10px_rgba(255,255,255,0.5)] group-hover:shadow-none" />
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-zinc-500 group-hover:text-black uppercase transition-colors">
                      {badge.name}
                    </span>
                  </div>
                  <p className="text-[11px] font-medium italic leading-relaxed text-zinc-600 group-hover:text-zinc-800 transition-colors">
                    {badge.description}
                  </p>
                </div>

                {/* Corner Accents on Hover */}
                <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/10 group-hover:border-black/20 transition-all duration-700" />
                <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/10 group-hover:border-black/20 transition-all duration-700" />

                {/* Meta Detail on Hover */}
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                  <span className="text-[40px] font-bold italic">0{index + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Info */}
          <div className="mt-24 p-12 border-l border-white/10 bg-white/[0.02] max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <FiActivity className="text-gray-600" />
              <h3 className="text-[10px] uppercase font-bold tracking-[0.4em] text-zinc-400 italic">Network Statistics</h3>
            </div>
            <p className="text-[11px] font-mono tracking-widest text-zinc-500 leading-relaxed uppercase">
              Badges are cryptographically secured and verified on the Sword network. Rare markers require manual calibration by system authorities.
            </p>
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
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 255, 255, 0.1);
          }
        `}</style>
      </main>
    </div>
  );
};

export default BadgesPage;
