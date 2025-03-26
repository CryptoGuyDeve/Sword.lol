"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

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

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <motion.nav
      className="bg-[#0e0e0e] text-white py-4 px-8 fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-7xl z-50 shadow-2xl rounded-2xl border border-gray-800 backdrop-blur-lg"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/"
            className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          >
            sword.lol
          </Link>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-gray-400">
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link href="https://discord.gg/pwQaFQuRpN" target="_blank" className="hover:text-white transition duration-300 text-lg">
              Discord
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link href="/pricing" className="hover:text-white transition duration-300 text-lg">
              Pricing
            </Link>
          </motion.div>
        </div>

        {/* Right Side Buttons */}
        <div className="hidden md:flex gap-6">
          {user ? (
            <>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href={`/account/${user.id}`}
                  className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 text-lg"
                >
                  Account
                </Link>
              </motion.div>
              <motion.button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/login"
                  className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 text-lg"
                >
                  Login
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/signup"
                  className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 text-lg"
                >
                  Sign Up Free
                </Link>
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden flex flex-col items-center gap-6 py-4 bg-[#0e0e0e] text-white rounded-2xl mt-4 border border-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <Link href="https://discord.gg/pwQaFQuRpN" target="_blank" className="text-lg">
              Discord
            </Link>
            <Link href="/pricing" className="text-lg">
              Pricing
            </Link>
            {user ? (
              <>
                <Link
                  href={`/account/${user.id}`}
                  className="text-lg"
                >
                  Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-lg"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-lg"
                >
                  Sign Up Free
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
