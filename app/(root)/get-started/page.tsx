"use client";

import React from "react";
import { motion } from "framer-motion";
import { AiOutlineCheckCircle } from "react-icons/ai";

const GetStarted = () => {
  const features = [
    "Custom Bio Links",
    "File Hosting",
    "Analytics Dashboard",
    "Social Media Integration",
    "Custom Domain Support",
    "Priority Support",
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 
            className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-8"
          >
            Get Started Today
          </h1>
          <p className="text-xl text-gray-400 mb-6">
            Join thousands of creators building their online presence with sword.lol
          </p>
          <p className="text-lg text-gray-300">
            All <span className="text-white font-semibold">Premium Features</span> are unlocked while the premium package is under maintenance.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-4 text-white"
            >
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <AiOutlineCheckCircle className="w-5 h-5" />
              </div>
              <span className="text-lg font-medium">{feature}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-gradient-to-r from-white to-gray-300 hover:from-gray-200 hover:to-gray-400 px-8 py-3 rounded-lg text-black font-semibold shadow-lg transition-transform hover:scale-105"
          >
            <span>Create Your Profile</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default GetStarted;
