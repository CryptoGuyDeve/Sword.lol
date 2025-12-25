"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";

const LoginPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

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
        username: email,
        password,
        redirect: false
      });

      if (res?.error) {
        setError("Invalid email or password.");
      } else if (res?.ok) {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDiscordLogin = async () => {
    setNotice('Feature not available');
  };

  if (status === "loading" || status === "authenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col items-center justify-center p-6">
      {/* Stage 3: Ambient Shading */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/[0.03] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gray-500/[0.03] blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
      </div>

      {/* Global Grain Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Architectural Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Branding */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-8">
            <h2 className="text-2xl font-bold tracking-tighter text-white italic">
              sword<span className="text-gray-500 font-normal">.lol</span>
            </h2>
          </Link>
          <h1 className="text-4xl font-bold tracking-tight mb-3 italic">Welcome Back.</h1>
          <p className="text-gray-400 font-normal italic opacity-80">Enter your credentials to access your identity.</p>
        </div>

        {/* Auth Container */}
        <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
          {/* Subtle Corner Accent */}
          <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
            <div className="absolute top-4 right-4 w-px h-8 bg-white/10" />
            <div className="absolute top-4 right-4 h-px w-8 bg-white/10" />
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            {/* Error Message */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 p-4"
                >
                  <p className="text-red-400 text-xs font-bold uppercase tracking-widest text-center">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Fields */}
            <div className="space-y-6">
              <div className="group">
                <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-500 mb-2 block group-focus-within:text-white transition-colors italic">
                  Email Address
                </label>
                <div className="relative border-b border-white/10 group-focus-within:border-white transition-all duration-500 py-2">
                  <FiMail className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors h-4 w-4" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent pl-8 pr-4 text-white placeholder-gray-700 outline-none text-sm font-normal"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <div className="flex justify-between items-end mb-2">
                  <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-500 group-focus-within:text-white transition-colors italic">
                    Password
                  </label>
                  <button type="button" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors underline underline-offset-4 italic">Forgot?</button>
                </div>
                <div className="relative border-b border-white/10 group-focus-within:border-white transition-all duration-500 py-2">
                  <FiLock className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors h-4 w-4" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent pl-8 pr-12 text-white placeholder-gray-700 outline-none text-sm font-normal"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <IoEyeOutline size={16} /> : <IoEyeOffOutline size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gray-200 transition-all duration-500 flex items-center justify-center gap-4 group/btn overflow-hidden relative"
            >
              <span className="relative z-10">{loading ? "Authenticating..." : "Sign In"}</span>
              <FiArrowRight className="h-4 w-4 relative z-10 transition-transform group-hover/btn:translate-x-2" />
              <div className="absolute inset-x-0 bottom-0 h-0 group-hover/btn:h-full bg-gray-100 transition-all duration-500 -z-0" />
            </button>
          </form>

          {/* Social Auth */}
          <div className="mt-10 pt-10 border-t border-white/5">
            <button
              onClick={handleDiscordLogin}
              className="w-full border border-white/5 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <FaDiscord size={14} /> Continue with Discord
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/signup" className="text-white hover:underline underline-offset-4 decoration-white/20">
              Create one now
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Architectural Accents */}
      <div className="fixed top-12 left-12 hidden lg:block">
        <div className="text-[10px] font-mono font-bold tracking-[0.5em] text-gray-800 uppercase vertical-text">Security / Platform</div>
      </div>
    </div>
  );
};

export default LoginPage;
