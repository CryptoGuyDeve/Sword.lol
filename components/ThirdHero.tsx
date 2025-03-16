"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineUser, AiOutlineArrowRight } from "react-icons/ai";
import Link from "next/link";

const ThirdHero = () => {
  const [user, setUser] = useState<{ id: string } | null>(null); // Updated the type for clarity

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <motion.div
          className="w-[800px] h-[800px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-[150px] animate-pulse"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 360],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-[#0d0d0d] text-white p-10 md:p-14 text-center max-w-4xl w-full mx-4 md:mx-auto rounded-2xl shadow-2xl border border-gray-800"
      >
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="text-3xl md:text-4xl font-extrabold"
        >
          Your All-in-One Platform.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="text-gray-400 mt-4 leading-relaxed"
        >
          sword.lol delivers <span className="text-white font-medium">modern biolinks</span> and{" "}
          <span className="text-white font-medium">blazing-fast file hosting</span> in one sleek platform.
        </motion.p>

        {/* Claim Username Input */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="flex justify-center mt-6"
        >
          <div className="flex items-center bg-[#1a1a1a] text-gray-300 px-5 py-3 rounded-l-lg border border-gray-700">
            <AiOutlineUser className="text-gray-400 text-lg" />
            <input
              type="text"
              className="bg-transparent ml-3 outline-none w-64 placeholder-gray-500"
              placeholder="sword.lol/username"
            />
          </div>
          <Link href={user ? `/account/${user.id}` : "/login"}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-r-lg flex items-center gap-2 transition-all duration-300">
              Claim Now <AiOutlineArrowRight />
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ThirdHero;
