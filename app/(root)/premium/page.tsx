"use client";

import React from "react";
import { motion } from "framer-motion";
import { AiOutlineCheckCircle } from "react-icons/ai";

const Premium = () => {
  const features = [
    "Exclusive Premium Badge",
    "Advanced Profile Layouts",
    "Custom Fonts & Colors",
    "Typewriter Animations",
    "Special Profile Effects",
    "Unlimited File Hosting",
    "Priority Support",
    "Custom Domain Support",
    "Advanced Analytics",
    "Exclusive Templates",
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "Lifetime",
      description: "Perfect for getting started",
      bg: "bg-gray-800",
      features: ["Basic Customization", "Social Media Integration", "File Hosting (100MB)", "Analytics Dashboard"],
    },
    {
      name: "Premium",
      price: "$4.00",
      period: "Lifetime",
      description: "Unlock advanced features",
      bg: "bg-white",
      features: features,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute -top-56 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-white opacity-15 blur-[200px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gray-400 opacity-10 blur-[150px]" />
      <div className="absolute bottom-20 right-0 w-[400px] h-[400px] rounded-full bg-gray-500 opacity-8 blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text"
          >
            Unlock Premium Features
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto"
          >
            Take your online presence to the next level with exclusive premium features
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              className={`${plan.bg} ${plan.name === "Premium" ? "text-black" : "text-white"} rounded-2xl p-8 relative overflow-hidden`}
            >
              {plan.name === "Premium" && (
                <div className="absolute top-4 right-4">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={`text-lg ${plan.name === "Premium" ? "text-gray-600" : "text-gray-400"}`}>/{plan.period}</span>
                </div>
                <p className={`${plan.name === "Premium" ? "text-gray-600" : "text-gray-400"}`}>{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <AiOutlineCheckCircle className={`text-lg ${plan.name === "Premium" ? "text-black" : "text-white"}`} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.name === "Premium"
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {plan.name === "Premium" ? "Get Premium" : "Get Started Free"}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Premium Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.slice(0, 6).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AiOutlineCheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">{feature}</h3>
                <p className="text-gray-400 text-sm">
                  Enhance your profile with exclusive premium features
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Premium;
