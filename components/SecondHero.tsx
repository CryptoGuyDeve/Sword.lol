"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Eye, Upload, Star, CheckCircle, ArrowRight, Zap } from "lucide-react";

const stats = [
  { icon: Eye, label: "Profile Views", value: "50,623+", color: "text-white" },
  { icon: Users, label: "Active Users", value: "1,745+", color: "text-gray-300" },
  { icon: Upload, label: "File Uploads", value: "32,868+", color: "text-gray-400" },
  { icon: Star, label: "Premium Users", value: "254+", color: "text-gray-500" },
];

const plans = [
  {
    title: "Free",
    price: "$0",
    period: "Lifetime",
    description: "Perfect for getting started with your online presence.",
    features: [
      "Custom Bio Links",
      "Basic Customization",
      "Social Media Integration",
      "File Hosting (100MB)",
      "Analytics Dashboard",
    ],
    link: "/get-started",
    button: "Get Started Free",
    bgColor: "bg-gradient-to-br from-gray-900 to-gray-800",
    border: "border border-gray-700",
    popular: false,
  },
  {
    title: "Premium",
    price: "$4.00",
    period: "Lifetime",
    description: "Unlock advanced features and unlimited possibilities.",
    features: [
      "Everything in Free",
      "Exclusive Premium Badge",
      "Advanced Profile Layouts",
      "Custom Fonts & Colors",
      "Typewriter Animations",
      "Special Profile Effects",
      "Unlimited File Hosting",
      "Priority Support",
      "Custom Domain Support",
    ],
    link: "/premium",
    button: "Get Premium",
    bgColor: "bg-gradient-to-br from-gray-800/50 to-gray-900/50",
    border: "border border-white/50",
    popular: true,
  },
];

const SecondHero = () => {
  return (
    <div className="relative bg-black text-white py-20 px-6 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900/10 via-black to-gray-800/10"
        animate={{ 
          background: [
            "linear-gradient(45deg, rgba(75, 75, 75, 0.05) 0%, rgba(0, 0, 0, 1) 50%, rgba(100, 100, 100, 0.05) 100%)",
            "linear-gradient(45deg, rgba(100, 100, 100, 0.05) 0%, rgba(0, 0, 0, 1) 50%, rgba(75, 75, 75, 0.05) 100%)",
            "linear-gradient(45deg, rgba(75, 75, 75, 0.05) 0%, rgba(0, 0, 0, 1) 50%, rgba(100, 100, 100, 0.05) 100%)",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Glowing Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gray-400/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-white/10 to-gray-400/10 border border-white/20 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
          >
            <Zap className="w-5 h-5 text-white" />
            <span className="text-sm font-medium text-gray-300">
              Trusted by creators worldwide
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold mb-6"
          >
            <span className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
              Join 1,000+
            </span>
            <br />
            <span className="text-white">creators already using sword.lol</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Build your modern biolink page, unlock exclusive profile layouts, and host files securely, 
            all with the power of sword.lol.
          </motion.p>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center group hover:bg-white/10 transition-all duration-300"
            >
              <div className={`${stat.color} mb-3 flex justify-center`}>
                <stat.icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Username Claim Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-white/10 to-gray-400/10 border border-white/20 rounded-2xl p-8 mb-20 backdrop-blur-sm"
        >
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Claim Your Username
            </h3>
            <p className="text-gray-300 mb-8 max-w-md mx-auto">
              Secure your unique username and start building your online presence today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="sword.lol/username"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors backdrop-blur-sm"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-white to-gray-300 hover:from-gray-200 hover:to-gray-400 rounded-xl font-semibold text-black transition-all duration-300 shadow-lg hover:shadow-white/25 flex items-center justify-center space-x-2"
              >
                <span>Claim Now</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Pricing Section */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Choose Your <span className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">Perfect Plan</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Start free and upgrade when you're ready to unlock advanced features.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative ${plan.bgColor} ${plan.border} rounded-2xl p-8 backdrop-blur-sm ${
                plan.popular ? 'ring-2 ring-white/50' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.title}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">/{plan.period}</span>
                </div>
                <p className="text-gray-300">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.link}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-white to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  {plan.button}
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecondHero;
