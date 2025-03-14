"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { MdEmail, MdLock } from "react-icons/md";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { GiPistolGun } from "react-icons/gi"; // Gun Icon

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError(""); // Reset error message
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password.");
    } else if (data.user) {
      router.push(`/account/${data.user.id}`); // Redirect to user's account page
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-[#121212] text-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-800 relative"
      >
        {/* 🔥 Neon Blur Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-800/20 via-transparent to-black blur-[120px]" />

        {/* 🔫 Gun Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex justify-center mb-6 relative z-10"
        >
          <GiPistolGun size={55} className="text-purple-500" />
        </motion.div>

        {/* 📝 Form Title */}
        <h2 className="text-center text-xl font-semibold relative z-10">
          Access the Chamber
        </h2>

        {/* 🔥 Error Message */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-3 relative z-10">
            {error}
          </p>
        )}

        {/* 📧 Email Input */}
        <div className="mb-6 mt-4 relative z-10">
          <label className="text-sm text-gray-400">Email</label>
          <div className="flex items-center bg-black rounded-lg mt-2 border border-gray-700 px-3 py-2 focus-within:border-purple-500">
            <MdEmail size={20} className="text-gray-500" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent py-1 px-2 focus:outline-none text-gray-300 placeholder-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* 🔒 Password Input */}
        <div className="mb-6 relative z-10">
          <label className="text-sm text-gray-400">Password</label>
          <div className="flex items-center bg-black rounded-lg mt-2 border border-gray-700 px-3 py-2 focus-within:border-purple-500">
            <MdLock size={20} className="text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full bg-transparent py-1 px-2 focus:outline-none text-gray-300 placeholder-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-gray-400"
            >
              {showPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
            </button>
          </div>
          <Link href="/forgot-password" className="text-xs text-gray-400 hover:text-gray-300 mt-2 block text-right">
            Forgot password?
          </Link>
        {/* 🔥 Login Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-medium py-3 rounded-lg"
          onClick={handleLogin}
        >
          Enter the Vault
        </motion.button>
         {/* Sign Up Link */}
         <p className="text-sm text-center text-gray-400 mt-6">
          Are you new to <span className="text-purple-400">sward.xd</span>?{" "}
          <Link href="/signup" className="text-purple-500 hover:text-purple-400">
            Create an account
          </Link>
        </p>
        </div>


      </motion.div>
    </div>
  );
};

export default LoginPage;
