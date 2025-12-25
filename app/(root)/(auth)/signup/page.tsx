"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiUser, FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { status } = useSession();

  React.useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password || !username) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    const valid = /^[a-zA-Z0-9_]{3,20}$/.test(username);
    if (!valid) {
      setError("Username must be 3-20 chars.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username }),
      });

      const result = await res.json();
      if (!res.ok) {
        setError(result.error || 'Failed to sign up');
        setLoading(false);
        return;
      }

      await signIn("credentials", {
        username,
        password,
        redirect: false
      });

      window.location.href = "/onboarding";
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || status === "authenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col items-center justify-center p-6">
      {/* Stage 3: Ambient Shading */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/[0.03] blur-[120px] rounded-full" />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-gray-500/[0.03] blur-[120px] rounded-full" />
      </div>

      {/* Global Grain Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Background Grid */}
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
          <h1 className="text-4xl font-bold tracking-tight mb-3 italic">Join the Club.</h1>
          <p className="text-gray-400 font-normal italic opacity-80">Shape your identity in the architectural *age*.</p>
        </div>

        {/* Auth Container */}
        <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          {/* Subtle Corner Accent */}
          <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
            <div className="absolute top-4 right-4 w-px h-8 bg-white/10" />
            <div className="absolute top-4 right-4 h-px w-8 bg-white/10" />
          </div>

          <form onSubmit={handleEmailSignup} className="space-y-8">
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
            <div className="space-y-10">
              <div className="group">
                <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-500 mb-2 block group-focus-within:text-white transition-colors italic">
                  Choose Handle
                </label>
                <div className="relative border-b border-white/10 group-focus-within:border-white transition-all duration-500 py-2">
                  <FiUser className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors h-4 w-4" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-transparent pl-8 pr-4 text-white placeholder-gray-700 outline-none text-sm font-normal"
                    placeholder="username"
                    required
                  />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] font-mono text-gray-600">.sword.lol</div>
                </div>
              </div>

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
                <label className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-500 mb-2 block group-focus-within:text-white transition-colors italic">
                  Set Password
                </label>
                <div className="relative border-b border-white/10 group-focus-within:border-white transition-all duration-500 py-2">
                  <FiLock className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors h-4 w-4" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent pl-8 pr-4 text-white placeholder-gray-700 outline-none text-sm font-normal"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gray-200 transition-all duration-500 flex items-center justify-center gap-4 group/btn overflow-hidden relative"
            >
              <span className="relative z-10">{loading ? "Establishing..." : "Create Account"}</span>
              <FiArrowRight className="h-4 w-4 relative z-10 transition-transform group-hover/btn:translate-x-2" />
              <div className="absolute inset-x-0 bottom-0 h-0 group-hover/btn:h-full bg-gray-100 transition-all duration-500 -z-0" />
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed px-12">
            By joining, you agree to our architectural <Link href="/tos" className="text-white hover:underline underline-offset-4">ToS</Link> and <Link href="/privacy" className="text-white hover:underline underline-offset-4">Privacy</Link>.
          </p>
          <p className="text-sm text-gray-500">
            Already registered?{" "}
            <Link href="/login" className="text-white hover:underline underline-offset-4 decoration-white/20">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Architectural Accents */}
      <div className="fixed top-12 right-12 hidden lg:block">
        <div className="text-[10px] font-mono font-bold tracking-[0.5em] text-gray-800 uppercase vertical-text">Join / Network</div>
      </div>
    </div>
  );
};

export default Signup;
