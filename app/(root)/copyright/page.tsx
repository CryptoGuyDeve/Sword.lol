"use client";

import React from "react";
import { motion } from "framer-motion";

const Copyright = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1a1a1a] text-white flex items-center justify-center px-6">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-500 opacity-20 blur-[200px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500 opacity-10 blur-[150px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-3xl w-full bg-[#181818]/80 p-8 md:p-12 rounded-xl shadow-lg backdrop-blur-lg"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text text-center"
        >
          Copyright Notice
        </motion.h1>

        {/* Content */}
        <div className="mt-6 space-y-6 text-gray-300 text-sm md:text-base leading-relaxed">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            © {new Date().getFullYear()} sward.lol. All rights reserved.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            All content, trademarks, logos, and materials displayed on this
            website are the property of sward.lol and are protected by
            international copyright laws.
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-lg font-semibold text-purple-400"
          >
            1. Restrictions on Use
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            No part of this website may be reproduced, distributed, or modified
            without prior written permission from sward.lol.
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-lg font-semibold text-purple-400"
          >
            2. Fair Use Policy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            You may share and reference content from sward.lol only if
            proper credit and backlink to our website is provided.
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-lg font-semibold text-purple-400"
          >
            3. DMCA Policy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            If you believe any content infringes your copyright, please contact
            us at m.faizurrehman.business@gmail.com for prompt removal.
          </motion.p>
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 flex justify-center"
        >
          <button
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold text-white transition-shadow shadow-md hover:shadow-purple-500/50"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Copyright;
