"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ✅ Import useParams
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import Sidebar from "@/components/Sidebar";
import {    FaUserShield, FaBolt, FaTrophy, FaMedal, FaBug, FaServer, 
  FaTree, FaMoon, FaCrown, FaUserSecret, FaGavel, FaLaptopCode,
  FaShieldAlt, FaGamepad, FaUserTie, FaSkullCrossbones, FaHeart,
  FaFire, FaChessQueen, FaGhost, FaRocket, FaCrosshairs, FaStar } from "react-icons/fa";

// ✅ Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const badges = [
  // Staff Roles
  { name: "Owner", description: "Owner of the server.", icon: <FaCrown /> },
  { name: "Co-Owner", description: "Second-in-command.", icon: <FaStar /> },
  { name: "Admin", description: "Manage and moderate the server.", icon: <FaGavel /> },
  { name: "Moderator", description: "Keep the community safe.", icon: <FaUserShield /> },
  { name: "Support Team", description: "Help and assist users.", icon: <FaLaptopCode /> },
  { name: "Bug Hunter", description: "Report bugs and help improve the server.", icon: <FaBug /> },
  { name: "Helper", description: "Assist the community.", icon: <FaUserTie /> },

  // Rank Roles
  { name: "OG", description: "Be an early supporter.", icon: <FaBolt /> },
  { name: "Legendary", description: "Achieve legendary status.", icon: <FaFire /> },
  { name: "Elite", description: "Top-tier player.", icon: <FaChessQueen /> },
  { name: "Veteran", description: "Long-time member.", icon: <FaSkullCrossbones /> },
  { name: "Server Booster", description: "Boost the server.", icon: <FaServer /> },
  { name: "Top Contributor", description: "Contribute the most to the community.", icon: <FaGavel /> },

  // Gaming Roles
  { name: "Pro Gamer", description: "Dominate the competition.", icon: <FaGamepad /> },
  { name: "Esports Champion", description: "Win a major event.", icon: <FaTrophy /> },
  { name: "Speedrunner", description: "Break records with speed.", icon: <FaRocket /> },
  { name: "Top Fragger", description: "Get the most kills.", icon: <FaCrosshairs /> },

  // Event-Specific Badges
  { name: "Christmas 2024", description: "Exclusive badge from the 2024 winter event.", icon: <FaTree /> },
  { name: "Ramzan Mubarak", description: "Celebrate the holy month of Ramzan.", icon: <FaMoon /> },
  { name: "Halloween 2024", description: "Spooky Halloween badge.", icon: <FaGhost /> },
  { name: "Valentine's 2025", description: "Spread love during Valentine's.", icon: <FaHeart /> },

  // Achievement Badges
  { name: "Winner", description: "Win an event.", icon: <FaTrophy /> },
  { name: "Second Place", description: "Get second place in an event.", icon: <FaMedal /> },
  { name: "Third Place", description: "Get third place in an event.", icon: <FaMedal /> },
  { name: "Beta Tester", description: "Help test new features.", icon: <FaShieldAlt /> },
  { name: "Server OG", description: "Be a part of the community since day one.", icon: <FaUserSecret /> },
];


const BadgesPage = () => {
  const params = useParams(); // ✅ Access params
  const userId = params?.id as string; // ✅ Typecast to string
  
  const [username, setUsername] = useState<string | null>(null);

  // ✅ Fetch user function
  const fetchUserData = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("username")
      .eq("id", userId)
      .single();

    if (data) {
      setUsername(data.username || "Unknown User");
    }

    if (error) {
      console.error("Error fetching user:", error);
    }
  };

  // ✅ Fetch user on component mount
  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#121212] to-[#1a1a1a] text-white">
      <Sidebar username={username || "Loading..."} id={userId} />
      <div className="ml-0 md:ml-64 p-8 w-full mt-15">
        <motion.h1
          className="text-4xl font-bold mb-10 text-center"
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex items-center gap-4 p-6 bg-[#1e1e1e] hover:bg-[#292929] rounded-lg shadow-lg transition-all duration-300"
            >
              <div className="text-4xl text-purple-400">{badge.icon}</div>
              <div>
                <h2 className="text-xl font-semibold">{badge.name}</h2>
                <p className="text-gray-400">{badge.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BadgesPage;
