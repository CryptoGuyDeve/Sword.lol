"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const stats = [
  { label: "Profile Views", value: "50,623+" },
  { label: "Users", value: "1,745+" },
  { label: "File Uploads", value: "32,868+" },
  { label: "Subscribers", value: "254+" },
];

const plans = [
  {
    title: "Free",
    price: "0$ / Lifetime",
    description: "For beginners, link all your socials in one place.",
    features: ["Basic Customization", "Basic Effects", "Add Your Socials"],
    link: "/get-started",
    button: "Get Started",
    bgColor: "bg-[#1b1228]",
    border: "",
  },
  {
    title: "Premium",
    price: "4,00$ / Lifetime",
    description: "Unlock full customization & exclusive features.",
    features: [
      "Exclusive Badge",
      "Profile Layouts",
      "Profile Fonts",
      "Typewriter Animation",
      "Special Profile Effects",
      "Advanced Customization",
      "Metadata & SEO Customization",
    ],
    link: "/premium",
    button: "Get Started",
    bgColor: "bg-[#2b1a3a]",
    border: "border border-purple-500 relative",
    badge: "Most Popular",
  },
];

const SecondHero = () => {
  return (
    <div className="relative bg-black text-white py-20 px-6 text-center overflow-hidden">

      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-800/10 via-transparent to-black opacity-50 blur-[200px]" />

      {/* Animated Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text"
      >
        Over <span className="text-purple-400">1,000+</span> users trust sword.lol 🚀
      </motion.h2>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-300"
      >
        Build your modern biolink page, unlock exclusive profile layouts, and host files securely, all with sword.lol.
      </motion.p>

      {/* Stats Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { delay: 0.5, duration: 0.8 } },
        }}
        className="mt-10 flex flex-wrap justify-center gap-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className="bg-[#1b1228] px-8 py-5 rounded-2xl shadow-lg text-center min-w-[180px] transition-all"
          >
            <h3 className="text-3xl font-bold text-purple-400">{stat.value}</h3>
            <p className="text-sm text-gray-400 mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Claim Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4"
      >
        <input
          type="text"
          placeholder="sword.lol/username"
          className="px-5 py-4 w-72 md:w-96 rounded-full bg-[#121025] text-white outline-none border-2 border-transparent focus:border-purple-500 transition"
        />
        <Link href="/claim">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-full font-semibold text-white transition-shadow shadow-md hover:shadow-purple-500/50"
          >
            Claim Now
          </motion.button>
        </Link>
      </motion.div>

      {/* Pricing Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="mt-16 text-4xl font-bold"
      >
        Choose your <span className="text-purple-400">perfect plan.</span>
      </motion.h2>

      {/* Pricing Cards */}
      <div className="mt-10 flex flex-wrap justify-center gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`${plan.bgColor} p-8 rounded-2xl shadow-lg text-left w-80 ${plan.border} transition-all relative`}
          >
            {plan.badge && (
              <motion.span
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute -top-3 right-3 bg-purple-600 text-white text-xs px-3 py-1 rounded-full animate-pulse"
              >
                {plan.badge}
              </motion.span>
            )}
            <h3 className="text-2xl font-bold text-white">{plan.title}</h3>
            <p className="mt-2 text-lg font-semibold text-purple-400">{plan.price}</p>
            <p className="mt-2 text-sm opacity-75">{plan.description}</p>
            <ul className="mt-4 text-sm space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  ✅ {feature}
                </li>
              ))}
            </ul>
            <Link href={plan.link}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full bg-purple-700 hover:bg-purple-800 px-6 py-3 rounded-full font-semibold transition"
              >
                {plan.button}
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SecondHero;
