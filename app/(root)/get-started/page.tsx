"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaCheckCircle, FaHome } from "react-icons/fa";

const GetStarted = () => {
  const router = useRouter();

  const handleReturnToHome = () => {
    router.push("/");
  };

  const features = [
    "Access to advanced UI customization",
    "Background YouTube Video Player",
    "Live Discord Game Status",
    "Exclusive Badges & Themes",
    "Priority Support",
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0e0e0e] to-[#1b1228] text-white p-6">
      {/* Animated Header */}
      <motion.h1
        className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Basic Package Activated!
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className="text-gray-400 mb-10 text-lg text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        All <span className="text-purple-400 font-semibold">Premium Features</span> are unlocked while the premium package is under maintenance.
      </motion.p>

      {/* Feature List with React Icons */}
      <motion.ul
        className="space-y-6 mb-12 text-lg"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.5,
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {features.map((feature, index) => (
          <motion.li
            key={index}
            className="flex items-center gap-4 text-green-400"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <FaCheckCircle size={24} />
            {feature}
          </motion.li>
        ))}
      </motion.ul>

      {/* Return Button with Icon */}
      <motion.button
        onClick={handleReturnToHome}
        className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 px-8 py-3 rounded-lg text-white font-semibold shadow-lg transition-transform hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaHome size={20} />
        Return to Homepage
      </motion.button>
    </div>
  );
};

export default GetStarted;
