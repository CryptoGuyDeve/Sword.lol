"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineUser, AiOutlineArrowRight } from "react-icons/ai";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Sparkles, Zap, Shield, Globe, ArrowRight, Star } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ThirdHero = () => {
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser({ id: data.user.id });
    };
    fetchUser();
  }, []);

  const features = [
    {
      icon: Sparkles,
      title: "Custom Bio Links",
      description: "Create stunning bio pages with unlimited customization options",
      color: "text-purple-400",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Blazing-fast performance with global CDN and edge caching",
      color: "text-blue-400",
    },
    {
      icon: Shield,
      title: "Secure Hosting",
      description: "Enterprise-grade security with encrypted file storage",
      color: "text-green-400",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Reach your audience worldwide with our global infrastructure",
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          background: [
            "linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(0, 0, 0, 1) 50%, rgba(59, 130, 246, 0.1) 100%)",
            "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 1) 50%, rgba(147, 51, 234, 0.1) 100%)",
            "linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(0, 0, 0, 1) 50%, rgba(59, 130, 246, 0.1) 100%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
            animate={{
              x: [0, Math.random() * 800 - 400],
              y: [0, Math.random() * 800 - 400],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
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
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
            >
              <Star className="w-5 h-5 text-yellow-400 animate-spin" />
              <span className="text-sm font-medium text-gray-300">
                All-in-One Platform
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold mb-6"
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
                Your Complete
              </span>
              <br />
              <span className="text-white">Digital Solution</span>
            </motion.h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              <span className="text-white font-semibold">sword.lol</span> delivers{" "}
              <span className="text-white font-semibold">modern biolinks</span>,{" "}
              <span className="text-white font-semibold">blazing-fast file hosting</span>, and{" "}
              <span className="text-white font-semibold">advanced analytics</span> in one sleek platform.
            </motion.p>

            {/* Username Claim */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <div className="flex-1 relative">
                <div className="flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 focus-within:border-purple-500 transition-colors">
                  <AiOutlineUser className="text-gray-400 text-lg mr-3" />
                  <input
                    type="text"
                    className="bg-transparent flex-1 outline-none text-white placeholder-gray-400"
                    placeholder="sword.lol/username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <Link href={user ? `/account/${user.id}` : "/login"}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-purple-500/25 flex items-center justify-center space-x-2"
                >
                  <span>Claim Now</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-6"
            >
              {[
                { value: "99.9%", label: "Uptime" },
                { value: "<100ms", label: "Response Time" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className={`${feature.color} mb-4`}>
                  <feature.icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of creators who trust sword.lol for their digital presence. 
              Start building your online empire today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  Start Building Free
                </motion.button>
              </Link>
              <Link href="/pricing">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 rounded-xl font-semibold text-white transition-all duration-300"
                >
                  View Pricing
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThirdHero;
