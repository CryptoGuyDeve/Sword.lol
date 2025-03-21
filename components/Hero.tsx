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
  const [username, setUsername] = useState("");
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
    <div className="relative h-screen w-full bg-black flex flex-col items-center justify-center text-white text-center overflow-hidden">
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

      {/* Heading Text */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-[#b517ff] via-[#6200ea] to-[#00bcd4] text-transparent bg-clip-text drop-shadow-xl relative z-10"
      >
        Own Your Digital Identity
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="mt-5 text-lg md:text-2xl max-w-2xl text-gray-300 relative z-10"
      >
        sward.lol is your ultimate platform for biolinks, custom profiles, and seamless file hosting.  
        Take control of your online presence now.
      </motion.p>

      {/* Input and Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-8 flex flex-col md:flex-row items-center gap-4 relative z-10"
      >
        <input
          type="text"
          placeholder="sward.lol/username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-6 py-4 w-72 md:w-96 rounded-full bg-[#121025] text-white outline-none border border-gray-700 focus:border-purple-500 transition duration-300 placeholder-gray-500 shadow-md"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-8 py-4 rounded-full font-semibold text-white transition-all shadow-lg hover:shadow-purple-500/50"
        >
          {loading ? "Loading..." : "Claim Now"}
        </motion.button>
      </motion.div>

      {/* Animated Lines and Blur Effects */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-gradient-to-b from-purple-500 to-transparent opacity-20 blur-[100px] rotate-45" />
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-gradient-to-b from-blue-500 to-transparent opacity-25 blur-[100px] rotate-45" />
      <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-b from-transparent to-black blur-2xl pointer-events-none" />
    </div>
  );
};

export default Hero;
