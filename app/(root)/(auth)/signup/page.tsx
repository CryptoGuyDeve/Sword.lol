"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { GiPistolGun } from "react-icons/gi";
import { FiMail, FiLock, FiUser, FiArrowRight, FiCheck } from "react-icons/fi";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password || !username) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        // Redirect to the user's account page after successful signup
        router.push(`/account/${data.user.id}`);
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gray-400/5 rounded-full blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, -60, 0],
            scale: [1, 0.7, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/2 w-64 h-64 bg-white/3 rounded-full blur-2xl"
          animate={{
            x: [0, -120, 0],
            y: [0, 120, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 7,
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -150, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Glassmorphism Card */}
          <div className="relative">
            {/* Card Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-gray-400/10 rounded-3xl blur-xl" />
            
            {/* Main Card */}
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              {/* Logo Section */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="text-center mb-8"
              >
                <div className="relative inline-block">
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-full blur-xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <GiPistolGun size={60} className="relative text-white mx-auto mb-4" />
                </div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2"
                >
                  Join the Community
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-gray-400 text-lg"
                >
                  Create your account
                </motion.p>
              </motion.div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm"
                  >
                    <p className="text-red-400 text-sm text-center font-medium">
                      {error}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Signup Form */}
              <form onSubmit={handleEmailSignup} className="space-y-6">
                {/* Username Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="relative"
                >
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Username
                  </label>
                  <div className={`relative transition-all duration-300 ${
                    focusedField === 'username' ? 'scale-105' : ''
                  }`}>
                    <div className={`absolute inset-0 bg-gradient-to-r from-white/10 to-gray-400/10 rounded-xl blur-sm transition-opacity ${
                      focusedField === 'username' ? 'opacity-100' : 'opacity-50'
                    }`} />
                    <div className="relative flex items-center bg-black/20 border border-white/20 rounded-xl px-4 py-3 focus-within:border-white/40 focus-within:bg-white/5 transition-all duration-300">
                      <FiUser className="text-gray-400 mr-3 text-lg" />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={() => setFocusedField('username')}
                        onBlur={() => setFocusedField(null)}
                        className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-lg"
                        placeholder="Choose a username"
                        required
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="relative"
                >
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Email Address
                  </label>
                  <div className={`relative transition-all duration-300 ${
                    focusedField === 'email' ? 'scale-105' : ''
                  }`}>
                    <div className={`absolute inset-0 bg-gradient-to-r from-white/10 to-gray-400/10 rounded-xl blur-sm transition-opacity ${
                      focusedField === 'email' ? 'opacity-100' : 'opacity-50'
                    }`} />
                    <div className="relative flex items-center bg-black/20 border border-white/20 rounded-xl px-4 py-3 focus-within:border-white/40 focus-within:bg-white/5 transition-all duration-300">
                      <FiMail className="text-gray-400 mr-3 text-lg" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-lg"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="relative"
                >
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Password
                  </label>
                  <div className={`relative transition-all duration-300 ${
                    focusedField === 'password' ? 'scale-105' : ''
                  }`}>
                    <div className={`absolute inset-0 bg-gradient-to-r from-white/10 to-gray-400/10 rounded-xl blur-sm transition-opacity ${
                      focusedField === 'password' ? 'opacity-100' : 'opacity-50'
                    }`} />
                    <div className="relative flex items-center bg-black/20 border border-white/20 rounded-xl px-4 py-3 focus-within:border-white/40 focus-within:bg-white/5 transition-all duration-300">
                      <FiLock className="text-gray-400 mr-3 text-lg" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-lg"
                        placeholder="Create a password"
                        required
                      />
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {showPassword ? <FiCheck size={20} /> : <FiLock size={20} />}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                  className="pt-4"
                >
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full relative group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Button Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-300 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                    
                    {/* Button Content */}
                    <div className="relative bg-gradient-to-r from-white to-gray-300 text-black font-bold py-4 px-6 rounded-xl flex items-center justify-center text-lg shadow-xl">
                      <span className="mr-2">
                        {loading ? "Creating account..." : "Create Account"}
                      </span>
                      <motion.div
                        animate={{ x: loading ? [0, 5, 0] : 0 }}
                        transition={{ duration: 1, repeat: loading ? Infinity : 0 }}
                      >
                        <FiArrowRight size={20} />
                      </motion.div>
                    </div>
                  </motion.button>
                </motion.div>
              </form>

              {/* Terms and Login Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="text-center mt-8 pt-6 border-t border-white/10 space-y-4"
              >
                <p className="text-xs text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link href="/tos" className="text-white hover:text-gray-300 font-semibold transition-colors duration-300 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-white hover:text-gray-300 font-semibold transition-colors duration-300 hover:underline">
                    Privacy Policy
                  </Link>
                </p>
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <Link 
                    href="/login" 
                    className="text-white hover:text-gray-300 font-semibold transition-colors duration-300 hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
