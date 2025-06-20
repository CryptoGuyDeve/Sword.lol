"use client";

import React from "react";
import { motion } from "framer-motion";
import { AiOutlineCheckCircle } from "react-icons/ai";

const plans = [
  {
    title: "Basic",
    price: "Free",
    features: ["Limited Biolinks", "5GB File Hosting", "Basic Support"],
    bg: "bg-gray-800",
  },
  {
    title: "Pro",
    price: "$5/mo",
    features: ["Unlimited Biolinks", "100GB File Hosting", "Priority Support"],
    bg: "bg-blue-600",
  },
  {
    title: "Elite",
    price: "$15/mo",
    features: ["Custom Domains", "1TB File Hosting", "24/7 VIP Support"],
    bg: "bg-purple-600",
  },
];

const Premium = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#1a0033] via-black to-[#00001a] opacity-60 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* Glowing Effects */}
      <div className="absolute -top-56 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-purple-500 opacity-30 blur-[200px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-500 opacity-20 blur-[150px]" />
      <div className="absolute bottom-20 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500 opacity-15 blur-[120px]" />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-3xl relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Upgrade to Premium
        </h1>
        <p className="text-gray-400 mt-4 text-lg">
          Get access to exclusive features, enhanced file hosting, and priority support.
        </p>
      </motion.div>

      {/* Pricing Plans */}
      <div className="mt-10 grid md:grid-cols-3 gap-8 relative z-10">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
            className={`p-8 rounded-2xl shadow-xl text-center ${plan.bg} bg-opacity-90 border border-gray-700 backdrop-blur-md`}
          >
            <h2 className="text-2xl font-bold">{plan.title}</h2>
            <p className="text-3xl font-extrabold mt-2">{plan.price}</p>
            <ul className="mt-4 space-y-2 text-gray-300">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center justify-center gap-2">
                  <AiOutlineCheckCircle className="text-green-400" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="mt-6 bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition">
              Choose Plan
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Premium;
