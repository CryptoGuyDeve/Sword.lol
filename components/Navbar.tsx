"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  // Transform values for floating effect
  const width = useTransform(scrollY, [0, 50], ["100%", "90%"]);
  const top = useTransform(scrollY, [0, 50], ["0px", "20px"]);
  const borderRadius = useTransform(scrollY, [0, 50], ["0px", "100px"]);
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 1]);

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  const navLinks = [
    { name: "Discord", href: "https://discord.gg/FhECf5pQQH", target: "_blank" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <>
      <motion.nav
        style={{
          width,
          top,
          borderRadius,
        }}
        className={`fixed left-1/2 -translate-x-1/2 z-[100] transition-colors duration-500 overflow-hidden
          ${isOpen ? "bg-[#0E0E0E]/95" : "bg-[#0E0E0E]/20 backdrop-blur-2xl"}
          border border-white/5 shadow-2xl`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center"
            >
              <Link
                href="/"
                className="text-xl font-bold tracking-tighter text-white italic"
              >
                sword<span className="text-gray-500 font-normal">.lol</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    target={link.target}
                    className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 hover:text-white transition-all duration-300 italic"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-8">
              {user ? (
                <>
                  <Link
                    href={`/account/${(user as any).id}`}
                    className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-300 hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2.5 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    Start Free
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-2"
              >
                {isOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/5 bg-[#0E0E0E]/95 px-6 py-12"
            >
              <div className="flex flex-col space-y-8">
                {navLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    target={link.target}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-6 group"
                  >
                    <span className="text-[10px] text-gray-600 font-mono">0{i + 1}</span>
                    <span className="text-2xl font-bold uppercase tracking-tighter text-white group-hover:pl-2 transition-all">
                      {link.name}
                    </span>
                  </Link>
                ))}

                <div className="pt-12 border-t border-white/5 space-y-6">
                  {user ? (
                    <>
                      <Link
                        href={`/account/${(user as any).id}`}
                        onClick={() => setIsOpen(false)}
                        className="block text-sm uppercase tracking-widest font-bold text-white text-center"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full py-4 bg-white text-black text-xs font-bold uppercase tracking-widest"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="block text-sm uppercase tracking-widest font-bold text-gray-400 text-center"
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setIsOpen(false)}
                        className="block w-full py-4 bg-white text-black text-xs font-bold uppercase tracking-widest text-center"
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Global Grain Texture Overlay (Specific to Navbar area if needed, but usually Layout level) */}
      <style jsx global>{`
        .navbar-grain {
          pointer-events: none;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
    </>
  );
};

export default Navbar;
