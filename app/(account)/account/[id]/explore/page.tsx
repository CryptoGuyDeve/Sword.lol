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

// Force dynamic rendering to prevent static generation errors
export const dynamic = "force-dynamic";

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
          // Use real data from API, but keep category mocking for now as it's not in DB yet
          const usersWithRealStats = (data || []).map((user: any) => ({
            ...user,
            followers_count: parseInt(user.followers_count || "0"),
            views_count: parseInt(user.views_count || "0"),
            category: categories[Math.floor(Math.random() * categories.length)].id,
          }));
          setUsers(usersWithRealStats);
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
    <div className="flex bg-[#0e0e0e] min-h-screen text-white overflow-hidden">
      <Sidebar username={currentUser?.username || "Guest"} id={currentUser?.id || "0"} />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Explore</h1>
              <p className="text-gray-400 text-sm">Discover creators, connect with like-minded people, and find inspiration.</p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative group flex-1 md:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search creators..."
                  className="w-full md:w-80 pl-10 pr-4 py-2 h-10 bg-[#121212] border border-white/10 text-white rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-600"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="h-10 border-l border-white/10 mx-2 hidden md:block"></div>
              <div className="flex bg-[#121212] rounded-lg p-1 border border-white/10">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md transition-all ${viewMode === "grid" ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-md transition-all ${viewMode === "list" ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${selectedCategory === category.id
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-gray-400 border-white/10 hover:border-white/20 hover:text-white'
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 uppercase font-medium">Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#121212] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer hover:bg-[#1a1a1a] transition-colors"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* User Grid/List */}
          {loading ? (
            <div className={`grid gap-5 ${viewMode === "grid" ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" : "grid-cols-1"}`}>
              {Array(10).fill(0).map((_, i) => (
                <Skeleton key={i} className={`bg-[#121212] rounded-xl border border-white/5 ${viewMode === "grid" ? "h-64" : "h-20"}`} />
              ))}
            </div>
          ) : (
            <div className={`grid gap-5 ${viewMode === "grid" ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" : "grid-cols-1"}`}>
              {sortedUsers.length > 0 ? (
                sortedUsers.map((user) => (
                  <Link href={`/${user.username}`} target="_blank" key={user.id} className="group block h-full">
                    {viewMode === "grid" ? (
                      <div className="bg-[#121212] border border-white/5 rounded-xl p-6 h-full hover:border-white/20 transition-all flex flex-col items-center text-center relative overflow-hidden group-hover:-translate-y-1">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="relative mb-4">
                          <img src={user.profile_pic} alt={user.username} className="w-20 h-20 rounded-full object-cover border-2 border-white/5 group-hover:border-white/20 transition-colors" />
                          <div className="absolute -bottom-1 -right-1 bg-[#1a1a1a] p-1 rounded-full border border-white/10">
                            {React.createElement(getCategoryIcon(user.category || "all"), { className: "w-3 h-3 text-gray-400" })}
                          </div>
                        </div>

                        <h3 className="font-bold text-white mb-1 truncate w-full">@{user.username}</h3>
                        <p className="text-xs text-gray-500 line-clamp-2 mb-4 h-8">{user.bio || "No bio available"}</p>

                        <div className="mt-auto flex items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {formatNumber(user.followers_count || 0)}</span>
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {formatNumber(user.views_count || 0)}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-[#121212] border border-white/5 rounded-xl p-4 flex items-center gap-4 hover:border-white/20 transition-all group-hover:bg-[#151515]">
                        <img src={user.profile_pic} alt={user.username} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="font-bold text-white truncate">@{user.username}</h3>
                            {user.category && <span className="text-[10px] uppercase tracking-wider text-gray-500 border border-white/5 px-1.5 rounded">{categories.find(c => c.id === user.category)?.name}</span>}
                          </div>
                          <p className="text-xs text-gray-500 truncate">{user.bio || "No bio available"}</p>
                        </div>
                        <div className="flex items-center gap-4 px-4 text-xs text-gray-500">
                          <span className="flex flex-col items-center">
                            <span className="font-bold text-white">{formatNumber(user.followers_count || 0)}</span>
                            <span>followers</span>
                          </span>
                          <span className="flex flex-col items-center">
                            <span className="font-bold text-white">{formatNumber(user.views_count || 0)}</span>
                            <span>views</span>
                          </span>
                        </div>
                      </div>
                    )}
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-500">
                  <Search className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-lg font-medium text-gray-400">No users found</p>
                  <p className="text-sm">Try adjusting your filters</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExplorePage;
