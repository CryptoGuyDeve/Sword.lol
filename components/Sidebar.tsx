"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaChevronDown, FaDiscord, FaUserCircle } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";
import { IoShareOutline } from "react-icons/io5";
import Link from "next/link";

const Sidebar = ({ username, id }: { username: string; id: string }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyProfileLink = () => {
    const profileUrl = `${window.location.origin}/users/${username}`;
    navigator.clipboard.writeText(profileUrl).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const SidebarContent = () => (
    <div className="bg-[#121212] text-white p-6 rounded-xl h-full">
      <h2 className="text-2xl font-bold mb-6">sward.xd</h2>
      <nav className="space-y-4">
        <div>
          <div
            className="flex justify-between items-center py-3 cursor-pointer hover:text-purple-400 transition-colors duration-200"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>Account</span>
            <motion.div animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <FaChevronDown />
            </motion.div>
          </div>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="pl-6 space-y-2 text-gray-400"
              >
                <Link href={`/account/${id}`} className="block hover:text-white">Overview</Link>
                <Link href={`/account/${id}/badges`} className="block hover:text-white">Badges</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link href={`/account/${id}/customize`} className="block py-3 hover:text-purple-400 transition">
          Customize
        </Link>
        <Link href={`/account/${id}/links`} className="block py-3 hover:text-purple-400 transition">
          Links
        </Link>
        <Link href={`/account/${id}/explore`} className="block py-3 hover:text-purple-400 transition">
          Explore
        </Link>
        <Link href={`/account/getviews`} className="block py-3 hover:text-purple-400 transition">
          Get Views
        </Link>
        <Link href="/leaderboard" className="sidebar-link">
          <span className="inline-flex items-center gap-2">
            <svg width="18" height="18" fill="currentColor" className="text-yellow-400"><use href="#icon-crown" /></svg>
            Leaderboard
          </span>
        </Link>
      </nav>

      {/* Discord Link */}
      <div className="mt-8">
        <a
          href="https://discord.gg/GwFKb9NPvY"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#5865F2] hover:opacity-90 text-white py-2 px-4 rounded-lg transition"
        >
          <FaDiscord size={18} /> Join Discord
        </a>
      </div>

      {/* Profile Link */}
      <div className="mt-6">
        <Link
          href={`/${username}`}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition"
        >
          <HiExternalLink size={18} /> My Page
        </Link>
      </div>

      {/* Copy Profile Link */}
      <button
        onClick={handleCopyProfileLink}
        className="flex items-center gap-2 bg-purple-800 hover:bg-purple-900 text-white py-2 px-4 rounded-lg w-full mt-4 transition"
      >
        <IoShareOutline size={18} /> Share Your Profile
      </button>
      {copySuccess && (
        <p className="mt-2 text-green-400 text-sm text-center">
          Profile link copied to clipboard!
        </p>
      )}

      {/* User Info */}
      <div className="mt-8 flex items-center gap-3 bg-[#1a1a1a] p-4 rounded-lg">
        <FaUserCircle size={32} className="text-gray-500" />
        <div>
          <p className="font-semibold">{username}</p>
          <p className="text-gray-400 text-sm">UID {id}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Navbar Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-white bg-[#1a1a1a] p-3 rounded-lg shadow-md"
        >
          <FaBars size={24} />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar (Only when open) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-64 h-full bg-[#121212] z-50 md:hidden"
          >
            <div className="flex justify-end p-4">
              <button onClick={() => setIsSidebarOpen(false)} className="text-white">
                <FaTimes size={24} />
              </button>
            </div>
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
