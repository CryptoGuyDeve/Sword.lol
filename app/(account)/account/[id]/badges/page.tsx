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
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      <Sidebar username={username || "Loading..."} id={userId} />
      <div className="ml-0 md:ml-64 p-8 w-full mt-15">
        <motion.h1
          className="text-5xl font-extrabold text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          All Badges
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center gap-6 p-6 rounded-xl bg-[#121212] bg-opacity-70 backdrop-blur-md shadow-[0_4px_20px_rgba(255,0,255,0.1)] hover:shadow-purple-500 transition-all duration-300"
            >
              <div className="text-5xl text-purple-400">{badge.icon}</div>
              <div>
                <h2 className="text-xl font-semibold text-gray-100">
                  {badge.name}
                </h2>
                <p className="text-gray-400 text-sm">{badge.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BadgesPage;
