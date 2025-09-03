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
    {
      title: "Overview",
      href: `/account/${id}`,
      icon: Home,
      badge: null,
      color: "from-white to-gray-300"
    },
    {
      title: "Customize",
      href: `/account/${id}/customize`,
      icon: Palette,
      badge: null,
      color: "from-gray-300 to-gray-400"
    },
    {
      title: "Links",
      href: `/account/${id}/links`,
      icon: LinkIcon,
      badge: null,
      color: "from-gray-400 to-gray-500"
    },
    {
      title: "Explore",
      href: `/account/${id}/explore`,
      icon: Search,
      badge: null,
      color: "from-gray-500 to-gray-600"
    },
    {
      title: "Badges",
      href: `/account/${id}/badges`,
      icon: Trophy,
      badge: "New",
      color: "from-white to-gray-300"
    },
    {
      title: "Analytics",
      href: `/account/${id}/analytics`,
      icon: BarChart3,
      badge: null,
      color: "from-gray-300 to-gray-400"
    }
  ];

  const quickActions = [
    {
      title: "Get Views",
      href: "/account/getviews",
      icon: Target,
      color: "from-white to-gray-300"
    },
    {
      title: "Leaderboard",
      href: "/leaderboard",
      icon: Crown,
      color: "from-gray-300 to-gray-400"
    }
  ];

  const SidebarContent = () => (
    <div className="bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-xl text-white p-6 rounded-3xl h-screen border border-gray-500/20 shadow-2xl relative overflow-hidden">
      {/* Animated Background - Fixed z-index and pointer-events */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-900/20 via-transparent to-gray-800/20 pointer-events-none"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Content Container with proper z-index */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-white to-gray-300 rounded-xl shadow-lg">
              <Sparkles className="w-6 h-6 text-black" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
                Sword.lol
              </h2>
              <p className="text-xs text-gray-400">Creator Dashboard</p>
            </div>
          </div>

        </motion.div>

        {/* Navigation */}
        <nav className="space-y-2 mb-8 flex-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="flex justify-between items-center py-3 px-4 cursor-pointer hover:bg-white/5 rounded-xl transition-all duration-200 group"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg group-hover:from-white group-hover:to-gray-300 transition-all duration-200">
                  <User className="w-4 h-4 text-white group-hover:text-black" />
                </div>
                <span className="font-medium">Account</span>
              </div>
              <motion.div 
                animate={{ rotate: dropdownOpen ? 180 : 0 }} 
                transition={{ duration: 0.3 }}
                className="text-gray-400 group-hover:text-white transition-colors"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </div>
            
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-8 space-y-1 mt-2"
                >
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link 
                        href={item.href}
                        className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-200 group ${
                          currentPath === item.href
                            ? 'bg-gradient-to-r from-white/20 to-gray-400/20 border border-white/30 text-white'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg transition-all duration-200 ${
                          currentPath === item.href
                            ? `bg-gradient-to-r ${item.color}`
                            : 'bg-gray-600/50 group-hover:bg-gray-500/50'
                        }`}>
                          <item.icon className={`w-3.5 h-3.5 ${currentPath === item.href ? 'text-black' : 'text-white'}`} />
                        </div>
                        <span className="text-sm font-medium">{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto px-2 py-0.5 bg-gradient-to-r from-white to-gray-300 text-xs text-black rounded-full font-bold">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-2"
          >
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-3">
              Quick Actions
            </h3>
            {quickActions.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              >
                <Link 
                  href={item.href}
                  className="flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 group hover:bg-white/5"
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color} shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                    <item.icon className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    {item.title}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </nav>

        {/* Profile Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-3 mb-6"
        >
          <Link
            href={`/${username}`}
            className="flex items-center gap-3 bg-gradient-to-r from-white to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-white/25 group"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="font-medium">View My Page</span>
            <Zap className="w-4 h-4 ml-auto group-hover:scale-110 transition-transform" />
          </Link>

          <button
            onClick={handleCopyProfileLink}
            className="flex items-center gap-3 bg-gradient-to-r from-white to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-white/25 group"
          >
            <Share2 className="w-4 h-4" />
            <span className="font-medium">Share Profile</span>
            <motion.div
              animate={copySuccess ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart className="w-4 h-4 ml-auto group-hover:scale-110 transition-transform" />
            </motion.div>
          </button>

          <AnimatePresence>
            {copySuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3 bg-gradient-to-r from-white to-gray-300/20 border border-white/30 rounded-xl text-white text-sm text-center"
              >
                ✨ Profile link copied to clipboard!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* User Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-to-br from-gray-800/60 to-black/60 backdrop-blur-xl rounded-2xl p-4 border border-gray-500/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-white to-gray-300 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-black" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-gray-800"></div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-black truncate">@{username}</h3>
              <p className="text-xs text-gray-400">UID: {id.slice(0, 8)}...</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white/5 rounded-lg p-2">
              <div className="text-lg font-bold text-black">1.2K</div>
              <div className="text-xs text-gray-400">Views</div>
            </div>
            <div className="bg-white/5 rounded-lg p-2">
              <div className="text-lg font-bold text-black">456</div>
              <div className="text-xs text-gray-400">Followers</div>
            </div>
            <div className="bg-white/5 rounded-lg p-2">
              <div className="text-lg font-bold text-black">89</div>
              <div className="text-xs text-gray-400">Links</div>
            </div>
          </div>

          {/* Discord Button */}
          <a
            href="https://discord.gg/GwFKb9NPvY"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-white to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black py-2 px-3 rounded-lg mt-4 transition-all duration-200 shadow-lg hover:shadow-white/25 group"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Join Discord</span>
            <Globe className="w-3 h-3 ml-auto group-hover:scale-110 transition-transform" />
          </a>
        </motion.div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Navbar Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsSidebarOpen(true)}
          className="text-black bg-gradient-to-r from-white to-gray-300 p-3 rounded-xl shadow-lg border border-white/30"
        >
          <Menu className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-80 p-4 relative z-30 h-screen">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-80 h-screen z-50 md:hidden p-4"
          >
            <div className="flex justify-end mb-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSidebarOpen(false)} 
                className="text-black bg-gradient-to-r from-gray-700 to-gray-800 p-2 rounded-lg shadow-lg"
              >
                <X className="w-5 h-5" />
              </motion.button>
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
