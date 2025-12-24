"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  User,
  Settings,
  Palette,
  Link as LinkIcon,
  Search,
  TrendingUp,
  Crown,
  Share2,
  ExternalLink,
  Home,
  Bell,
  Zap,
  Sparkles,
  Heart,
  Eye,
  Users,
  MessageCircle,
  Globe,
  Star,
  Trophy,
  Target,
  BarChart3,
  Gift,
  Settings2,
  LogOut
} from "lucide-react";

const Sidebar = ({ username, id }: { username: string; id: string }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const handleCopyProfileLink = () => {
    const profileUrl = `${window.location.origin}/${username}`;
    navigator.clipboard.writeText(profileUrl).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    });
  };

  const navigationItems = [
    { title: "Overview", href: `/account/${id}`, icon: Home },
    { title: "Customize", href: `/account/${id}/customize`, icon: Palette },
    { title: "Links", href: `/account/${id}/links`, icon: LinkIcon },
    { title: "Explore", href: `/account/${id}/explore`, icon: Search },
    { title: "Badges", href: `/account/${id}/badges`, icon: Trophy, badge: "New" },
    { title: "Analytics", href: `/account/${id}/analytics`, icon: BarChart3 },
  ];

  const quickActions = [
    { title: "Get Views", href: "/account/getviews", icon: Target },
    { title: "Leaderboard", href: "/leaderboard", icon: Crown },
  ];

  const SidebarContent = () => (
    <div className="bg-[#121212] flex flex-col h-full border-r border-white/5 relative z-10 w-full md:w-80">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <span className="font-bold text-black text-xl">S</span>
          </div>
          <div>
            <h2 className="font-bold text-lg text-white tracking-tight">Sword.lol</h2>
            <p className="text-xs text-gray-500 font-medium">Creator Dashboard</p>
          </div>
        </div>

        <nav className="space-y-1">
          <div className="space-y-1">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-3">
                <User className="w-4 h-4" />
                <span>Account</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence initial={false}>
              {dropdownOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pl-4 py-2 space-y-1">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all ${currentPath === item.href
                            ? "bg-white text-black shadow-sm"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                          }`}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.title}
                        {item.badge && (
                          <span className="ml-auto text-[10px] bg-indigo-500 text-white px-1.5 py-0.5 rounded-full font-bold">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="pt-4 pb-2">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tools</p>
            {quickActions.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <item.icon className="w-4 h-4" />
                {item.title}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-white/5 bg-[#0e0e0e]/50">
        <div className="flex flex-col gap-2">
          <Link
            href={`/${username}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
          >
            <ExternalLink className="w-4 h-4" />
            View Page
          </Link>
          <button
            onClick={handleCopyProfileLink}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#1a1a1a] text-white border border-white/10 text-sm font-semibold rounded-lg hover:bg-[#252525] transition-colors"
          >
            {copySuccess ? <Sparkles className="w-4 h-4 text-yellow-400" /> : <Share2 className="w-4 h-4" />}
            {copySuccess ? "Copied!" : "Share Profile"}
          </button>
        </div>

        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/5">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {username?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">@{username}</p>
            <p className="text-xs text-gray-500 truncate">Pro Plan</p>
          </div>
          <Settings2 className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2.5 bg-[#121212] text-white border border-white/10 rounded-lg shadow-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block h-screen w-80 fixed left-0 top-0 z-40">
        <SidebarContent />
      </div>

      {/* Spacer for Desktop Content */}
      <div className="hidden md:block w-80 flex-shrink-0" />

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-[#121212] z-50 md:hidden border-r border-white/10"
            >
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
