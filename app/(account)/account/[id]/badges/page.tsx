"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import {
  FaUserShield, FaBolt, FaTrophy, FaMedal, FaBug, FaServer,
  FaTree, FaMoon, FaCrown, FaUserSecret, FaGavel, FaLaptopCode,
  FaShieldAlt, FaGamepad, FaUserTie, FaSkullCrossbones, FaHeart,
  FaFire, FaChessQueen, FaGhost, FaRocket, FaCrosshairs, FaStar
} from "react-icons/fa";



const badges = [
  { name: "Owner", description: "Owner of the server.", icon: <FaCrown /> },
  { name: "Co-Owner", description: "Second-in-command.", icon: <FaStar /> },
  { name: "Admin", description: "Manage and moderate the server.", icon: <FaGavel /> },
  { name: "Moderator", description: "Keep the community safe.", icon: <FaUserShield /> },
  { name: "Support Team", description: "Help and assist users.", icon: <FaLaptopCode /> },
  { name: "Bug Hunter", description: "Report bugs and help improve the server.", icon: <FaBug /> },
  { name: "Helper", description: "Assist the community.", icon: <FaUserTie /> },
  { name: "OG", description: "Be an early supporter.", icon: <FaBolt /> },
  { name: "Legendary", description: "Achieve legendary status.", icon: <FaFire /> },
  { name: "Elite", description: "Top-tier player.", icon: <FaChessQueen /> },
  { name: "Veteran", description: "Long-time member.", icon: <FaSkullCrossbones /> },
  { name: "Server Booster", description: "Boost the server.", icon: <FaServer /> },
  { name: "Top Contributor", description: "Contribute the most to the community.", icon: <FaGavel /> },
  { name: "Pro Gamer", description: "Dominate the competition.", icon: <FaGamepad /> },
  { name: "Esports Champion", description: "Win a major event.", icon: <FaTrophy /> },
  { name: "Speedrunner", description: "Break records with speed.", icon: <FaRocket /> },
  { name: "Top Fragger", description: "Get the most kills.", icon: <FaCrosshairs /> },
  { name: "Christmas 2024", description: "Exclusive badge from the 2024 winter event.", icon: <FaTree /> },
  { name: "Ramzan Mubarak", description: "Celebrate the holy month of Ramzan.", icon: <FaMoon /> },
  { name: "Halloween 2024", description: "Spooky Halloween badge.", icon: <FaGhost /> },
  { name: "Valentine's 2025", description: "Spread love during Valentine's.", icon: <FaHeart /> },
  { name: "Winner", description: "Win an event.", icon: <FaTrophy /> },
  { name: "Second Place", description: "Get second place in an event.", icon: <FaMedal /> },
  { name: "Third Place", description: "Get third place in an event.", icon: <FaMedal /> },
  { name: "Beta Tester", description: "Help test new features.", icon: <FaShieldAlt /> },
  { name: "Server OG", description: "Be a part of the community since day one.", icon: <FaUserSecret /> },
];

const BadgesPage = () => {
  const params = useParams();
  const userId = params?.id as string;

  const [username, setUsername] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      const res = await fetch(`/api/users/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setUsername(data.username || "Unknown User");
      }
    } catch (e) {
      console.error("Error fetching user", e);
    }
  };


  useEffect(() => {
    if (userId) fetchUserData();
  }, [userId]);

  return (
    <div className="flex bg-[#0e0e0e] min-h-screen text-white overflow-hidden">
      <Sidebar username={username || "Loading..."} id={userId} />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header */}
          <div className="border-b border-white/5 pb-6">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Badges</h1>
            <p className="text-gray-400 max-w-2xl">
              Achievements and roles available in the community. Unlock badges by participating and contributing to the server.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {badges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="bg-[#121212] border border-white/5 rounded-xl p-6 flex flex-col gap-4 hover:border-white/20 transition-all group hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-white/5 rounded-xl w-fit text-2xl text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-all">
                    {badge.icon}
                  </div>
                  {["Owner", "Co-Owner", "Admin", "Legendary"].includes(badge.name) && (
                    <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 text-[10px] uppercase font-bold tracking-wider rounded border border-yellow-500/20">
                      Rare
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white mb-2 group-hover:text-purple-400 transition-colors">{badge.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed min-h-[40px]">{badge.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BadgesPage;
