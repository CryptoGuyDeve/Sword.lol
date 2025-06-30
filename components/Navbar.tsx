"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Crown } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      authListener?.subscription.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2"
          >
            <div className="relative">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
              <div className="absolute inset-0 bg-white/20 rounded-full blur-lg animate-ping" />
            </div>
            <Link
              href="/"
              className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500"
            >
              sword.lol
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.div whileHover={{ scale: 1.05 }} className="relative group">
              <Link 
                href="https://discord.gg/pwQaFQuRpN" 
                target="_blank" 
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 group-hover:text-white"
              >
                <Zap className="w-4 h-4" />
                <span className="font-medium">Discord</span>
              </Link>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-white to-gray-400 transition-all duration-300 group-hover:w-full" />
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} className="relative group">
              <Link 
                href="/pricing" 
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 group-hover:text-white"
              >
                <Crown className="w-4 h-4" />
                <span className="font-medium">Pricing</span>
              </Link>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-white to-gray-400 transition-all duration-300 group-hover:w-full" />
            </motion.div>
          </div>

          {/* Right Side Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/account/${user.id}`}
                    className="px-6 py-2.5 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 rounded-full font-medium text-white transition-all duration-300 shadow-lg hover:shadow-gray-500/25 border border-gray-600/50"
                  >
                    Dashboard
                  </Link>
                </motion.div>
                <motion.button
                  onClick={handleLogout}
                  className="px-6 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-full font-medium text-white transition-all duration-300 shadow-lg hover:shadow-gray-500/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/login"
                    className="px-6 py-2.5 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 rounded-full font-medium text-white transition-all duration-300 shadow-lg hover:shadow-gray-500/25 border border-gray-600/50"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/signup"
                    className="px-6 py-2.5 bg-gradient-to-r from-white to-gray-300 hover:from-gray-200 hover:to-gray-400 rounded-full font-medium text-black transition-all duration-300 shadow-lg hover:shadow-white/25 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Get Started Free</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            <div className="px-4 py-6 space-y-4">
              <Link 
                href="https://discord.gg/pwQaFQuRpN" 
                target="_blank" 
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 py-2"
              >
                <Zap className="w-5 h-5" />
                <span className="font-medium">Discord</span>
              </Link>
              <Link 
                href="/pricing" 
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 py-2"
              >
                <Crown className="w-5 h-5" />
                <span className="font-medium">Pricing</span>
              </Link>
              
              <div className="pt-4 border-t border-gray-700/50">
                {user ? (
                  <div className="space-y-3">
                    <Link
                      href={`/account/${user.id}`}
                      className="block w-full px-4 py-3 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg font-medium text-white text-center transition-all duration-300"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg font-medium text-white transition-all duration-300"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      href="/login"
                      className="block w-full px-4 py-3 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg font-medium text-white text-center transition-all duration-300"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="block w-full px-4 py-3 bg-gradient-to-r from-white to-gray-300 rounded-lg font-medium text-black text-center transition-all duration-300"
                    >
                      Get Started Free
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
