"use client";

import React from "react";
import { motion } from "framer-motion";

const Terms = () => {
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
          Terms & Conditions
        </motion.h1>

        {/* Content */}
        <div className="mt-6 space-y-6 text-gray-300 text-sm md:text-base leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            Welcome to **sward.lol**. By accessing or using our platform, you
            agree to be bound by these Terms & Conditions.
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-lg font-semibold text-purple-400"
          >
            1. Acceptance of Terms
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            By using **sward.lol**, you agree to comply with all applicable laws
            and our policies. If you do not agree, please refrain from using our
            services.
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg font-semibold text-purple-400"
          >
            2. User Conduct
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Users must not engage in **illegal activities, spamming, hacking, or
            any malicious behavior** on our platform.
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-lg font-semibold text-purple-400"
          >
            3. Account Responsibility
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            You are responsible for maintaining the **security of your account**.
            Any unauthorized activity should be reported immediately.
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="text-lg font-semibold text-purple-400"
          >
            4. Privacy Policy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            We respect your privacy. For more details, please refer to our
            **Privacy Policy**.
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="text-lg font-semibold text-purple-400"
          >
            5. Updates to Terms
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            We reserve the right to update these terms at any time. Changes will
            be posted on this page.
          </motion.p>
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1 }}
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

export default Terms;
