"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { GiPistolGun } from "react-icons/gi";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";


const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Check for error messages from OAuth callback
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        username: email, // we allow email as username
        password,
        redirect: false
      });

      if (res?.error) {
        setError("Invalid email or password.");
      } else if (res?.ok) {
        // Redirect to /dashboard, the middleware or page will handle the specific user route
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const resendConfirmation = async () => {
    // Not implemented in this demo
    setNotice('Feature not available');
  };

  const handleResetPassword = async () => {
    // Not implemented in this demo
    setNotice('Feature not available');
  };

  const handleDiscordLogin = async () => {
    // Not implemented in this demo
    setNotice('Feature not available');
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-400/5 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/3 rounded-full blur-2xl"
          animate={{
            x: [0, 120, 0],
            y: [0, -120, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
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
                  Welcome Back
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-gray-400 text-lg"
                >
                  Sign in to your account
                </motion.p>
              </motion.div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="mb-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm"
                  >
                    <p className="text-red-400 text-sm text-center font-medium">
                      {error}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              {notice && (
                <div className="mb-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-sm text-center">
                  {notice}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="relative"
                >
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Email Address
                  </label>
                  <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'scale-105' : ''
                    }`}>
                    <div className={`absolute inset-0 bg-gradient-to-r from-white/10 to-gray-400/10 rounded-xl blur-sm transition-opacity ${focusedField === 'email' ? 'opacity-100' : 'opacity-50'
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
                  transition={{ delay: 1 }}
                  className="relative"
                >
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Password
                  </label>
                  <div className={`relative transition-all duration-300 ${focusedField === 'password' ? 'scale-105' : ''
                    }`}>
                    <div className={`absolute inset-0 bg-gradient-to-r from-white/10 to-gray-400/10 rounded-xl blur-sm transition-opacity ${focusedField === 'password' ? 'opacity-100' : 'opacity-50'
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
                        placeholder="Enter your password"
                        required
                      />
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {showPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Actions */}
                <div className="flex items-center justify-between -mt-2">
                  <button type="button" onClick={handleResetPassword} className="text-xs text-gray-400 hover:text-gray-200 underline">
                    Forgot password?
                  </button>
                  <button type="button" onClick={resendConfirmation} className="text-xs text-gray-400 hover:text-gray-200 underline">
                    Resend verification email
                  </button>
                </div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
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
                        {loading ? "Signing in..." : "Sign In"}
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

              {/* OAuth Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-xs text-gray-400">or</span>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              {/* Discord OAuth */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="pt-2"
              >
                <button
                  type="button"
                  onClick={handleDiscordLogin}
                  className="w-full flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  <FaDiscord size={18} /> Continue with Discord
                </button>
              </motion.div>

              {/* Sign Up Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="text-center mt-8 pt-6 border-t border-white/10"
              >
                <p className="text-gray-400">
                  New to <span className="text-white font-semibold">sward.xd</span>?{" "}
                  <Link
                    href="/signup"
                    className="text-white hover:text-gray-300 font-semibold transition-colors duration-300 hover:underline"
                  >
                    Create an account
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

export default LoginPage;
