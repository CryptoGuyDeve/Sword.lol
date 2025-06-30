"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight, CheckCircle } from "lucide-react";

const features = [
  {
    title: "Custom Bio Links",
    description: "Create stunning bio link pages with your unique style and branding.",
    color: "text-white",
  },
  {
    title: "Lightning Fast",
    description: "Blazing-fast file hosting and link generation for optimal performance.",
    color: "text-gray-300",
  },
  {
    title: "Premium Features",
    description: "Unlock advanced customization options and exclusive layouts.",
    color: "text-gray-400",
  },
  {
    title: "Analytics Dashboard",
    description: "Track your performance with detailed analytics and insights.",
    color: "text-gray-500",
  },
];

const ThirdHero = () => {
  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-black to-gray-800/20"
        animate={{ 
          background: [
            "linear-gradient(45deg, rgba(75, 75, 75, 0.1) 0%, rgba(0, 0, 0, 1) 50%, rgba(100, 100, 100, 0.1) 100%)",
            "linear-gradient(45deg, rgba(100, 100, 100, 0.1) 0%, rgba(0, 0, 0, 1) 50%, rgba(75, 75, 75, 0.1) 100%)",
            "linear-gradient(45deg, rgba(75, 75, 75, 0.1) 0%, rgba(0, 0, 0, 1) 50%, rgba(100, 100, 100, 0.1) 100%)",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            animate={{
              x: [0, Math.random() * 1000 - 500],
              y: [0, Math.random() * 1000 - 500],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              delay: Math.random() * 10,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-400/15 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-white/10 to-gray-400/10 border border-white/20 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
            >
              <Star className="w-5 h-5 text-white animate-spin" />
              <span className="text-sm font-medium text-gray-300">
                The Ultimate Digital Solution
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl md:text-6xl font-extrabold mb-6"
            >
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 text-transparent bg-clip-text">
                Your Complete
              </span>
              <br />
              <span className="text-white">Digital Solution</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              <span className="text-white font-semibold">sword.lol</span> delivers{" "}
              <span className="text-white font-semibold">modern biolinks</span>,{" "}
              <span className="text-white font-semibold">blazing-fast file hosting</span>, and{" "}
              <span className="text-white font-semibold">advanced analytics</span> in one sleek platform.
            </motion.p>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-4 mb-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className={`w-6 h-6 ${feature.color} mt-0.5 flex-shrink-0`} />
                  <div>
                    <h3 className={`text-lg font-semibold ${feature.color} mb-1`}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-white to-gray-300 hover:from-gray-200 hover:to-gray-400 rounded-full font-semibold text-black transition-all duration-300 shadow-2xl hover:shadow-white/25 overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Get Started Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 rounded-full font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-white/10"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Mockup Container */}
            <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-white/20 rounded-2xl p-8 backdrop-blur-sm">
              {/* Mockup Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                </div>
                <div className="text-white text-sm font-medium">sword.lol</div>
              </div>

              {/* Mockup Content */}
              <div className="space-y-4">
                <div className="h-4 bg-white/20 rounded animate-pulse"></div>
                <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-white/15 rounded w-1/2 animate-pulse"></div>
                
                {/* Feature Cards */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full mb-3"></div>
                    <div className="h-3 bg-white/20 rounded w-full mb-2"></div>
                    <div className="h-2 bg-white/10 rounded w-2/3"></div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full mb-3"></div>
                    <div className="h-3 bg-white/20 rounded w-full mb-2"></div>
                    <div className="h-2 bg-white/10 rounded w-2/3"></div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between mt-6 pt-6 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">50K+</div>
                    <div className="text-sm text-gray-400">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">1.7K+</div>
                    <div className="text-sm text-gray-400">Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">99.9%</div>
                    <div className="text-sm text-gray-400">Uptime</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"
            />
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-gray-400/10 rounded-full blur-xl"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ThirdHero;
