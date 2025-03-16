import React from "react";
import Link from "next/link";
import { FaTiktok, FaDiscord, FaTelegramPlane } from "react-icons/fa";
import { Gamepad } from "lucide-react"; // Keeping Lucide for Gamepad icon

const Footer = () => {
  return (
    <footer className="relative bg-[#0b0813] text-white py-14 px-6 md:px-12 overflow-hidden">

      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-black opacity-60 blur-[200px]" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
        {/* Left Section */}
        <div className="mb-10 md:mb-0">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            ⚔️ <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">sword.lol</span>
          </h2>
          <p className="text-gray-400 mt-2 max-w-xs leading-relaxed">
            Build customizable, feature-rich bio pages & host files securely with sword.lol.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-gray-400">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Gamepad className="hover:text-white transition-all duration-300" size={22} />
            </a>
            <a href="https://www.tiktok.com/@yourprofile" target="_blank" rel="noopener noreferrer">
              <FaTiktok className="hover:text-white transition-all duration-300" size={22} />
            </a>
            <a href="https://discord.gg/yourserver" target="_blank" rel="noopener noreferrer">
              <FaDiscord className="hover:text-white transition-all duration-300" size={22} />
            </a>
            <a href="https://t.me/yourchannel" target="_blank" rel="noopener noreferrer">
              <FaTelegramPlane className="hover:text-white transition-all duration-300" size={22} />
            </a>
          </div>

          <p className="text-gray-500 text-xs mt-5">
            © 2025 sword.lol | All Rights Reserved.
          </p>
        </div>

        {/* Right Section - Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-400">
          {/* General Links */}
          <div>
            <h3 className="font-semibold text-white mb-3">General</h3>
            <ul className="space-y-2">
              <li><Link href="/login" className="hover:text-purple-400 transition-all">Login</Link></li>
              <li><Link href="/signup" className="hover:text-purple-400 transition-all">Sign Up</Link></li>
              <li><Link href="/pricing" className="hover:text-purple-400 transition-all">Pricing</Link></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-white mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/docs" className="hover:text-purple-400 transition-all">Documentation</Link></li>
            </ul>
          </div>

          {/* Contact Links */}
          <div>
            <h3 className="font-semibold text-white mb-3">Contact</h3>
            <ul className="space-y-2">
              <li><a href="https://discord.gg/yourserver" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-all">Discord Server</a></li>
              <li><a href="mailto:codeandmotion.business@gmail.com" className="hover:text-purple-400 transition-all">Support Email</a></li>
              <li><a href="mailto:m.faizurrehman.business@gmail.com" className="hover:text-purple-400 transition-all">Business Email</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-white mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="hover:text-purple-400 transition-all">Terms of Service</Link></li>
              <li><Link href="/copyright" className="hover:text-purple-400 transition-all">Copyright Policy</Link></li>
              <li><Link href="/privacy" className="hover:text-purple-400 transition-all">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
