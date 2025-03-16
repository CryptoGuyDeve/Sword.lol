"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Fetch user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    // Listen to auth state changes in real-time
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user); // User is logged in
      } else {
        setUser(null); // User is logged out
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
    <nav className="bg-[#0e0e0e] text-white py-4 px-8 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          sword.lol
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-gray-400">
          <Link href="https://discord.gg/pwQaFQuRpN" target="_blank" className="hover:text-white transition duration-300">
            Discord
          </Link>
          <Link href="/pricing" className="hover:text-white transition duration-300">
            Pricing
          </Link>
        </div>

        {/* Right Side Buttons */}
        <div className="hidden md:flex gap-6">
          {user ? (
            <>
              <Link
                href={`/account/${user.id}`}
                className="bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
              >
                Account
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Sign Up Free
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-gray-300" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-black/90 backdrop-blur-lg p-4 rounded-lg space-y-4">
          <Link href="https://discord.gg/pwQaFQuRpN" target="_blank" className="block text-gray-300 hover:text-white transition duration-300">
            Discord
          </Link>
          <Link href="/pricing" className="block text-gray-300 hover:text-white transition duration-300">
            Pricing
          </Link>
          <hr className="border-gray-700" />
          {user ? (
            <>
              <Link href={`/account/${user.id}`} className="block text-gray-300 hover:text-white transition duration-300">
                Account
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-red-400 hover:text-red-500 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block text-gray-300 hover:text-white transition duration-300">
                Login
              </Link>
              <Link href="/signup" className="block text-blue-400 hover:text-blue-500 transition duration-300">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
