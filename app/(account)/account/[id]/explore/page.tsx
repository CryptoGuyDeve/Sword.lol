"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
// import { createClient } from "@supabase/supabase-js"; // removed

import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Users,
  Star,
  TrendingUp,
  Filter,
  Grid,
  List,
  MapPin,
  Calendar,
  Heart,
  Eye,
  MessageCircle,
  Sparkles,
  Zap,
  Crown,
  Trophy,
  Flame,
  Globe,
  Music,
  Camera,
  Code,
  Palette,
  Gamepad2,
  BookOpen,
  Coffee,
  Plane
} from "lucide-react";

// Supabase client setup
import { useSession } from "next-auth/react";


interface User {
  id: string;
  username: string;
  profile_pic: string;
  bio: string;
  location?: string;
  followers_count?: number;
  views_count?: number;
  created_at?: string;
  category?: string;
}

const ExplorePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ id: string; username: string } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("recent");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: "all", name: "All Users", icon: Users, color: "from-blue-500 to-cyan-500" },
    { id: "trending", name: "Trending", icon: TrendingUp, color: "from-orange-500 to-red-500" },
    { id: "creators", name: "Creators", icon: Sparkles, color: "from-purple-500 to-pink-500" },
    { id: "developers", name: "Developers", icon: Code, color: "from-green-500 to-emerald-500" },
    { id: "artists", name: "Artists", icon: Palette, color: "from-pink-500 to-rose-500" },
    { id: "gamers", name: "Gamers", icon: Gamepad2, color: "from-indigo-500 to-purple-500" },
    { id: "travelers", name: "Travelers", icon: Plane, color: "from-teal-500 to-blue-500" },
    { id: "musicians", name: "Musicians", icon: Music, color: "from-yellow-500 to-orange-500" },
  ];

  const sortOptions = [
    { value: "recent", label: "Most Recent", icon: Calendar },
    { value: "popular", label: "Most Popular", icon: Heart },
    { value: "views", label: "Most Views", icon: Eye },
    { value: "followers", label: "Most Followers", icon: Users },
  ];

  const { data: session } = useSession();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/explore?search=${encodeURIComponent(search)}`);
        if (res.ok) {
          const data = await res.json();
          // Add mock data for demonstration
          const usersWithMockData = (data || []).map((user: any) => ({
            ...user,
            followers_count: Math.floor(Math.random() * 10000) + 100,
            views_count: Math.floor(Math.random() * 50000) + 1000,
            category: categories[Math.floor(Math.random() * categories.length)].id,
          }));
          setUsers(usersWithMockData);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [search]); // Re-fetch when search changes, or local filter

  useEffect(() => {
    if (session?.user) {
      const u = session.user as any;
      setCurrentUser({ id: u.id, username: u.username || u.name || "User" });
    }
  }, [session]);


  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.bio?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || user.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return (b.followers_count || 0) - (a.followers_count || 0);
      case "views":
        return (b.views_count || 0) - (a.views_count || 0);
      case "followers":
        return (b.followers_count || 0) - (a.followers_count || 0);
      default:
        return new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime();
    }
  });

  const trendingUsers = sortedUsers.slice(0, 3);

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.icon || Users;
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || "from-gray-500 to-gray-600";
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="flex bg-[#0e0e0e] min-h-screen text-white relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 blur-3xl"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
            animate={{
              x: [0, Math.random() * 300 - 150],
              y: [0, Math.random() * 300 - 150],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <Sidebar username={currentUser?.username || "Guest"} id={currentUser?.id || "0"} />

      <motion.div
        className="flex-1 p-6 md:p-8 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
              Explore Creators
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover amazing creators, connect with like-minded people, and find inspiration
            </p>
          </motion.div>

          {/* Trending Section */}
          {trendingUsers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Trending Now</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trendingUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="relative"
                  >
                    <Link href={`/${user.username}`} target="_blank">
                      <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 backdrop-blur-xl rounded-3xl p-6 border border-orange-500/20 shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:-translate-y-2">
                        {index === 0 && (
                          <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                            <Crown className="w-4 h-4 text-white" />
                          </div>
                        )}

                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={user.profile_pic}
                              alt={user.username}
                              className="w-16 h-16 rounded-full border-4 border-orange-500/50 shadow-lg"
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                              <TrendingUp className="w-3 h-3 text-white" />
                            </div>
                          </div>

                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-white">{user.username}</h3>
                            <p className="text-sm text-gray-300 line-clamp-2">{user.bio}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                              <span className="flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                {formatNumber(user.followers_count || 0)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {formatNumber(user.views_count || 0)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-xl rounded-3xl p-6 border border-gray-500/20 shadow-2xl">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search creators, bios, or categories..."
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-gray-500/30 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-4">
                {/* Categories */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Categories:</span>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <motion.button
                        key={category.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${selectedCategory === category.id
                            ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                          }`}
                      >
                        {category.name}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Sort Options */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1 bg-white/10 border border-gray-500/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Mode */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? 'bg-purple-500/20 text-purple-400' : 'bg-white/10 text-gray-400 hover:bg-white/20'
                      }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all ${viewMode === "list" ? 'bg-purple-500/20 text-purple-400' : 'bg-white/10 text-gray-400 hover:bg-white/20'
                      }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* User Grid/List */}
          {loading ? (
            <div className={`grid gap-6 ${viewMode === "grid"
                ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                : "grid-cols-1"
              }`}>
              {Array(12).fill(0).map((_, i) => (
                <Skeleton
                  key={i}
                  className={`bg-gray-800/50 rounded-2xl ${viewMode === "grid" ? "h-64" : "h-24"
                    }`}
                />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${viewMode}-${selectedCategory}-${sortBy}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`grid gap-6 ${viewMode === "grid"
                    ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                    : "grid-cols-1"
                  }`}
              >
                {sortedUsers.length > 0 ? (
                  sortedUsers.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      <Link href={`/${user.username}`} target="_blank">
                        {viewMode === "grid" ? (
                          <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-xl rounded-3xl p-6 border border-gray-500/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group">
                            <div className="text-center">
                              <div className="relative inline-block mb-4">
                                <img
                                  src={user.profile_pic}
                                  alt={user.username}
                                  className="w-20 h-20 rounded-full border-4 border-purple-500/50 shadow-lg group-hover:border-purple-400 transition-all"
                                />
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                                  {(() => {
                                    const IconComponent = getCategoryIcon(user.category || "all");
                                    return <IconComponent className="w-3 h-3 text-white" />;
                                  })()}
                                </div>
                              </div>

                              <h3 className="font-bold text-lg text-white mb-2 group-hover:text-purple-400 transition-colors">
                                @{user.username}
                              </h3>

                              <p className="text-sm text-gray-300 line-clamp-3 mb-4">
                                {user.bio || "No bio available"}
                              </p>

                              <div className="flex justify-center items-center gap-4 text-xs text-gray-400">
                                <span className="flex items-center gap-1">
                                  <Heart className="w-3 h-3" />
                                  {formatNumber(user.followers_count || 0)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {formatNumber(user.views_count || 0)}
                                </span>
                              </div>

                              {user.location && (
                                <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-2">
                                  <MapPin className="w-3 h-3" />
                                  {user.location}
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-500/20 shadow-xl hover:shadow-purple-500/25 transition-all duration-300 group">
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <img
                                  src={user.profile_pic}
                                  alt={user.username}
                                  className="w-16 h-16 rounded-full border-4 border-purple-500/50 shadow-lg group-hover:border-purple-400 transition-all"
                                />
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                                  {(() => {
                                    const IconComponent = getCategoryIcon(user.category || "all");
                                    return <IconComponent className="w-2.5 h-2.5 text-white" />;
                                  })()}
                                </div>
                              </div>

                              <div className="flex-1">
                                <h3 className="font-bold text-lg text-white group-hover:text-purple-400 transition-colors">
                                  @{user.username}
                                </h3>
                                <p className="text-sm text-gray-300 line-clamp-2 mb-2">
                                  {user.bio || "No bio available"}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-gray-400">
                                  <span className="flex items-center gap-1">
                                    <Heart className="w-3 h-3" />
                                    {formatNumber(user.followers_count || 0)} followers
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    {formatNumber(user.views_count || 0)} views
                                  </span>
                                  {user.location && (
                                    <span className="flex items-center gap-1">
                                      <MapPin className="w-3 h-3" />
                                      {user.location}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="text-right">
                                <div className="text-xs text-gray-500 mb-1">
                                  {user.created_at ? new Date(user.created_at).toLocaleDateString() : "Recently joined"}
                                </div>
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                                  <Zap className="w-4 h-4 text-white" />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full text-center py-12"
                  >
                    <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-xl rounded-3xl p-12 border border-gray-500/20">
                      <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-300 mb-2">No users found</h3>
                      <p className="text-gray-500">Try adjusting your search or filters</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ExplorePage;
