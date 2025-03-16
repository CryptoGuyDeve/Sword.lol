"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const Hero = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUserId(data.user.id);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleClick = () => {
    if (userId) {
      router.push(`/account/${userId}`);
    } else {
      router.push("/signup");
    }
  };

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center text-white text-center">

      {/* Subtle Animated Background */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-900 via-black to-[#060012] opacity-50 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      {/* Glowing Light Rings */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-purple-500 opacity-20 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-500 opacity-10 blur-[120px] pointer-events-none" />

      {/* Heading Text */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text tracking-tight drop-shadow-xl"
      >
        Everything you want,<br /> right here.
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="mt-5 text-lg md:text-2xl max-w-2xl text-gray-300"
      >
        sword.lol is your go-to for modern biolinks, custom profiles, and fast file hosting.
        Unlock your digital identity now.
      </motion.p>

      {/* Input and Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-8 flex flex-col md:flex-row items-center gap-4"
      >
        <input
          type="text"
          placeholder="sword.lol/username"
          className="px-6 py-4 w-72 md:w-96 rounded-full bg-[#121025] text-white outline-none border border-transparent focus:border-purple-500 transition duration-300 placeholder-gray-500"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-full font-semibold text-white transition-shadow shadow-md hover:shadow-purple-500/50"
        >
          {loading ? "Loading..." : "Claim Now"}
        </motion.button>
      </motion.div>

      {/* Smooth Blur Merge Effect */}
      <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-b from-transparent to-black blur-2xl pointer-events-none" />
    </div>
  );
};

export default Hero;
