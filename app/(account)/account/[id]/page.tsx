"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { FaUserEdit, FaEye, FaSignOutAlt, FaUsers, FaUserPlus, FaMedal, FaBolt, FaCrown, FaFire, FaShareAlt } from "react-icons/fa";
import Link from "next/link";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Papa from 'papaparse';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type User = { id: string; username: string; profile_pic: string };

const milestoneList = [
  { key: "views", value: 1000, label: "1,000 Views", icon: <FaEye className="text-purple-400" /> },
  { key: "followers", value: 100, label: "100 Followers", icon: <FaUsers className="text-green-400" /> },
  { key: "followers", value: 1000, label: "1,000 Followers", icon: <FaCrown className="text-yellow-400" /> },
  { key: "views", value: 10000, label: "10,000 Views", icon: <FaFire className="text-pink-400" /> },
];

function getHealthScore(analytics: any) {
  // Simple formula: 50% views, 30% followers, 20% engagement (unique visitors)
  const v = Math.min(analytics.totalViews / 10000, 1);
  const f = Math.min(analytics.followers / 1000, 1);
  const u = Math.min(analytics.uniqueVisitors / 5000, 1);
  return Math.round((v * 0.5 + f * 0.3 + u * 0.2) * 100);
}

const AccountPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [newUsername, setNewUsername] = useState<string>("");
  const [analytics, setAnalytics] = useState<{
    totalViews: number;
    uniqueVisitors: number;
    followers: number;
    following: number;
    recentFollowers: User[];
    recentViewers: User[];
  }>({
    totalViews: 0,
    uniqueVisitors: 0,
    followers: 0,
    following: 0,
    recentFollowers: [],
    recentViewers: [],
  });
  const [viewsOverTime, setViewsOverTime] = useState<{ date: string; views: number }[]>([]);
  const [followersGrowth, setFollowersGrowth] = useState<{ date: string; followers: number }[]>([]);
  const [topCountries, setTopCountries] = useState<{ country: string; count: number }[]>([]);
  const [deviceBreakdown, setDeviceBreakdown] = useState<{ device: string; count: number }[]>([]);
  const [returningVsNew, setReturningVsNew] = useState<{ type: string; value: number }[]>([]);
  const [mostClickedLinks, setMostClickedLinks] = useState<{ link: string; clicks: number }[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>(typeof window !== 'undefined' && window.localStorage.getItem('theme') === 'light' ? 'light' : 'dark');
  const [dateRange, setDateRange] = useState<'7' | '30' | 'all'>('30');
  const [realTimeViewers, setRealTimeViewers] = useState(0);
  const analyticsRef = useRef<any>(null);
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);

  // Widget system state
  const defaultWidgets = [
    { id: 'viewsOverTime', label: 'Views Over Time' },
    { id: 'followersGrowth', label: 'Followers Growth' },
    { id: 'topCountries', label: 'Top Countries' },
    { id: 'deviceBreakdown', label: 'Device Breakdown' },
    { id: 'returningVsNew', label: 'Returning vs. New Visitors' },
    { id: 'mostClickedLinks', label: 'Most Clicked Links' },
  ];
  const [widgetVisibility, setWidgetVisibility] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('analyticsWidgetVisibility');
      if (saved) return JSON.parse(saved);
    }
    return Object.fromEntries(defaultWidgets.map(w => [w.id, true]));
  });

  // Persist widget visibility
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('analyticsWidgetVisibility', JSON.stringify(widgetVisibility));
    }
  }, [widgetVisibility]);

  // Widget picker
  const toggleWidget = (id: string) => {
    setWidgetVisibility(v => ({ ...v, [id]: !v[id] }));
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.push("/signup");
        return;
      }
      if (data.user.id !== id) {
        router.push("/");
        return;
      }
      setLoading(true);
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("username, id, profile_views, profile_pic")
        .eq("id", id)
        .single();

      if (userError) {
        setError("Error fetching user data");
      } else {
        setUserData(userData);
      }
      setLoading(false);
    };

    checkAuth();
  }, [id, router]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      // Total profile views
      const { count: totalViews } = await supabase
        .from("profile_views")
        .select("id", { count: "exact", head: true })
        .eq("user_id", id);
      // Unique visitors
      const { data: uniqueVisitorsData } = await supabase
        .from("profile_views")
        .select("viewer_id")
        .eq("user_id", id);
      const uniqueVisitors = new Set((uniqueVisitorsData || []).map((v) => v.viewer_id)).size;
      // Followers count
      const { count: followers } = await supabase
        .from("follows")
        .select("id", { count: "exact", head: true })
        .eq("following_id", id);
      // Following count
      const { count: following } = await supabase
        .from("follows")
        .select("id", { count: "exact", head: true })
        .eq("follower_id", id);
      // Recent followers (last 5)
      const { data: recentFollowersData } = await supabase
        .from("follows")
        .select("follower_id, users:follower_id(id, username, profile_pic)")
        .eq("following_id", id)
        .order("created_at", { ascending: false })
        .limit(5);
      const recentFollowers = ((recentFollowersData || []).flatMap((f) => Array.isArray(f.users) ? f.users : [f.users]) as User[]).filter(Boolean);
      // Recent viewers (last 5, skip null viewers)
      const { data: recentViewersData } = await supabase
        .from("profile_views")
        .select("viewer_id, users:viewer_id(id, username, profile_pic)")
        .eq("user_id", id)
        .order("viewed_at", { ascending: false })
        .limit(10);
      const recentViewers = ((recentViewersData || [])
        .flatMap((v) => Array.isArray(v.users) ? v.users : [v.users]) as User[])
        .filter((u) => u && u.id)
        .slice(0, 5);
      setAnalytics({
        totalViews: totalViews || 0,
        uniqueVisitors: uniqueVisitors || 0,
        followers: followers || 0,
        following: following || 0,
        recentFollowers,
        recentViewers,
      });
    };
    fetchAnalytics();
  }, [id]);

  useEffect(() => {
    // Helper to get since date
    const getSince = () => {
      if (dateRange === 'all') return null;
      const since = new Date();
      since.setDate(since.getDate() - (dateRange === '7' ? 6 : 29));
      since.setHours(0, 0, 0, 0);
      return since;
    };
    // Fetch views over time
    const fetchViewsOverTime = async () => {
      const since = getSince();
      let query = supabase
        .from("profile_views")
        .select("viewed_at")
        .eq("user_id", id);
      if (since) query = query.gte("viewed_at", since.toISOString());
      const { data } = await query;
      // Group by date
      const days = dateRange === '7' ? 7 : 30;
      const counts: Record<string, number> = {};
      for (let i = 0; i < days; i++) {
        const d = since ? new Date(since) : new Date();
        if (since) d.setDate(since.getDate() + i);
        else d.setDate(d.getDate() - (days - 1 - i));
        const key = d.toISOString().slice(0, 10);
        counts[key] = 0;
      }
      (data || []).forEach((row: any) => {
        const key = row.viewed_at.slice(0, 10);
        if (counts[key] !== undefined) counts[key]++;
      });
      setViewsOverTime(Object.entries(counts).map(([date, views]) => ({ date, views })));
    };
    // Fetch followers growth
    const fetchFollowersGrowth = async () => {
      const since = getSince();
      let query = supabase
        .from("follows")
        .select("created_at")
        .eq("following_id", id);
      if (since) query = query.gte("created_at", since.toISOString());
      const { data } = await query;
      const days = dateRange === '7' ? 7 : 30;
      const counts: Record<string, number> = {};
      for (let i = 0; i < days; i++) {
        const d = since ? new Date(since) : new Date();
        if (since) d.setDate(since.getDate() + i);
        else d.setDate(d.getDate() - (days - 1 - i));
        const key = d.toISOString().slice(0, 10);
        counts[key] = 0;
      }
      (data || []).forEach((row: any) => {
        const key = row.created_at.slice(0, 10);
        if (counts[key] !== undefined) counts[key]++;
      });
      // Cumulative sum for growth
      let total = 0;
      const growth = Object.entries(counts).map(([date, followers]) => {
        total += followers as number;
        return { date, followers: total };
      });
      setFollowersGrowth(growth);
    };
    // Fetch top countries
    const fetchTopCountries = async () => {
      const since = getSince();
      let query = supabase
        .from("profile_views")
        .select("country")
        .eq("user_id", id);
      if (since) query = query.gte("viewed_at", since.toISOString());
      const { data } = await query;
      const counts: Record<string, number> = {};
      (data || []).forEach((row: any) => {
        const country = row.country || "Unknown";
        counts[country] = (counts[country] || 0) + 1;
      });
      const arr = Object.entries(counts)
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8);
      setTopCountries(arr);
    };
    // Fetch device breakdown
    const fetchDeviceBreakdown = async () => {
      const since = getSince();
      let query = supabase
        .from("profile_views")
        .select("device")
        .eq("user_id", id);
      if (since) query = query.gte("viewed_at", since.toISOString());
      const { data } = await query;
      const counts: Record<string, number> = {};
      (data || []).forEach((row: any) => {
        const device = row.device || "Unknown";
        counts[device] = (counts[device] || 0) + 1;
      });
      const arr = Object.entries(counts)
        .map(([device, count]) => ({ device, count }))
        .sort((a, b) => b.count - a.count);
      setDeviceBreakdown(arr);
    };
    // Fetch returning vs new visitors
    const fetchReturningVsNew = async () => {
      const since = getSince();
      let query = supabase
        .from("profile_views")
        .select("viewer_id, viewed_at")
        .eq("user_id", id);
      if (since) query = query.gte("viewed_at", since.toISOString());
      const { data } = await query;
      const seen: Record<string, number> = {};
      let returning = 0, fresh = 0;
      (data || []).forEach((row: any) => {
        if (!row.viewer_id) return;
        if (seen[row.viewer_id]) returning++;
        else {
          seen[row.viewer_id] = 1;
          fresh++;
        }
      });
      setReturningVsNew([
        { type: "Returning", value: returning },
        { type: "New", value: fresh },
      ]);
    };
    // Fetch most clicked links
    const fetchMostClickedLinks = async () => {
      const since = getSince();
      let query = supabase
        .from("clicked_links")
        .select("link, clicked_at")
        .eq("user_id", id);
      if (since) query = query.gte("clicked_at", since.toISOString());
      const { data } = await query;
      const counts: Record<string, number> = {};
      (data || []).forEach((row: any) => {
        const link = row.link || "Unknown";
        counts[link] = (counts[link] || 0) + 1;
      });
      const arr = Object.entries(counts)
        .map(([link, clicks]) => ({ link, clicks }))
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 8);
      setMostClickedLinks(arr);
    };
    // Save fetch function for real-time use
    analyticsRef.current = () => {
      fetchViewsOverTime();
      fetchFollowersGrowth();
      fetchTopCountries();
      fetchDeviceBreakdown();
      fetchReturningVsNew();
      fetchMostClickedLinks();
    };
  }, [id, dateRange]);

  // Real-time subscriptions for analytics
  useEffect(() => {
    if (!id) return;
    // Helper to refetch all analytics
    const refetch = () => {
      if (analyticsRef.current) analyticsRef.current();
    };
    // Subscribe to profile_views
    const profileViewsSub = supabase
      .channel('profile_views-rt')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profile_views', filter: `user_id=eq.${id}` }, refetch)
      .subscribe();
    // Subscribe to follows
    const followsSub = supabase
      .channel('follows-rt')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'follows', filter: `following_id=eq.${id}` }, refetch)
      .subscribe();
    // Subscribe to clicked_links
    const clickedLinksSub = supabase
      .channel('clicked_links-rt')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'clicked_links', filter: `user_id=eq.${id}` }, refetch)
      .subscribe();
    return () => {
      supabase.removeChannel(profileViewsSub);
      supabase.removeChannel(followsSub);
      supabase.removeChannel(clickedLinksSub);
    };
  }, [id, dateRange]);

  // Real-time viewers polling (every 10s)
  useEffect(() => {
    let interval: any;
    const poll = async () => {
      const since = new Date(Date.now() - 2 * 60 * 1000); // last 2 minutes
      const { count } = await supabase
        .from("profile_views")
        .select("id", { count: "exact", head: true })
        .eq("user_id", id)
        .gte("viewed_at", since.toISOString());
      setRealTimeViewers(count || 0);
    };
    poll();
    interval = setInterval(poll, 10000);
    return () => clearInterval(interval);
  }, [id]);

  // Theme toggle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.classList.toggle('light', theme === 'light');
      window.localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const handleUsernameChange = async () => {
    if (!newUsername.trim()) return;
    const { error } = await supabase
      .from("users")
      .update({ username: newUsername })
      .eq("id", id);
    if (error) {
      alert("Failed to update username");
    } else {
      setUserData((prev: any) => ({ ...prev, username: newUsername }));
      setNewUsername("");
      alert("Username updated successfully!");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  // Share badge handler
  const handleShareBadge = (milestone: any) => {
    const url = typeof window !== 'undefined' ? window.location.origin + `/account/${userData?.id}` : '';
    const text = `🏅 I just unlocked the "${milestone.label}" badge on SwordXD! Check out my profile: ${url}`;
    navigator.clipboard.writeText(text).then(() => {
      setShareSuccess(milestone.label);
      setTimeout(() => setShareSuccess(null), 2000);
    });
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className={`flex min-h-screen text-white relative overflow-x-hidden ${theme === 'dark' ? 'bg-[#0e0e0e]' : 'bg-white text-black'}`}>
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30 blur-2xl opacity-80 animate-pulse"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <Sidebar username={userData.username} id={userData.id} />

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-5 rounded-full shadow-2xl hover:shadow-purple-500/30 transition-all flex items-center gap-2 text-lg font-bold"
        onClick={() => router.push(`/account/${userData.id}/customize`)}
        title="Quick Customize"
      >
        <FaUserEdit className="text-white text-2xl" />
      </motion.button>

      {/* Main Content */}
      <motion.main
        className="flex-1 p-8 md:p-14 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-10 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text drop-shadow-lg">
          Dashboard Overview
        </h2>

        {/* Filter Controls & Dark/Light Toggle */}
        <div className="flex flex-wrap gap-4 mb-10 items-center">
          <select className="bg-white/10 border border-purple-500/30 rounded-full px-5 py-2 text-white focus:ring-2 focus:ring-purple-500 transition" value={dateRange} onChange={e => setDateRange(e.target.value as any)}>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
          <select className="bg-white/10 border border-purple-500/30 rounded-full px-5 py-2 text-white focus:ring-2 focus:ring-purple-500 transition">
            <option>All Devices</option>
            <option>Desktop</option>
            <option>Mobile</option>
          </select>
          <select className="bg-white/10 border border-purple-500/30 rounded-full px-5 py-2 text-white focus:ring-2 focus:ring-purple-500 transition">
            <option>All Countries</option>
          </select>
          <button className="ml-auto bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-2 rounded-full text-white font-semibold shadow-lg hover:from-purple-600 hover:to-blue-600 transition" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            Toggle {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <button className="bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-2 rounded-full text-white font-semibold shadow-lg hover:from-pink-600 hover:to-purple-600 transition" onClick={() => {/* CSV Export logic */}}>Export CSV</button>
        </div>

        {/* Profile Card */}
        <motion.div
          className="w-full max-w-3xl mx-auto mb-12 p-8 rounded-3xl bg-gradient-to-br from-purple-900/60 via-black/60 to-blue-900/60 shadow-2xl flex flex-col md:flex-row items-center gap-8 backdrop-blur-xl border border-purple-500/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img src={userData.profile_pic} alt={userData.username} className="w-28 h-28 rounded-full border-4 border-purple-500 shadow-lg object-cover" />
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text mb-2">
              @{userData.username}
            </h3>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-2">
              <span className="px-4 py-2 rounded-full bg-white/10 text-purple-300 font-semibold text-sm shadow">{analytics.followers} Followers</span>
              <span className="px-4 py-2 rounded-full bg-white/10 text-blue-300 font-semibold text-sm shadow">{analytics.totalViews} Views</span>
              <span className="px-4 py-2 rounded-full bg-white/10 text-pink-300 font-semibold text-sm shadow">{analytics.uniqueVisitors} Unique</span>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow hover:from-red-600 hover:to-pink-600 transition"
            >
              <FaSignOutAlt className="inline-block mr-2" /> Logout
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
          <motion.div whileHover={{ scale: 1.04 }} className="p-6 rounded-2xl bg-gradient-to-br from-purple-700/40 to-purple-900/40 shadow-xl flex flex-col items-center gap-2">
            <FaEye className="text-3xl text-purple-400 mb-2 animate-pulse" />
            <span className="text-3xl font-bold text-purple-200">{analytics.totalViews}</span>
            <span className="text-xs text-gray-300">Total Views</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} className="p-6 rounded-2xl bg-gradient-to-br from-blue-700/40 to-blue-900/40 shadow-xl flex flex-col items-center gap-2">
            <FaUsers className="text-3xl text-blue-400 mb-2 animate-pulse" />
            <span className="text-3xl font-bold text-blue-200">{analytics.uniqueVisitors}</span>
            <span className="text-xs text-gray-300">Unique Visitors</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} className="p-6 rounded-2xl bg-gradient-to-br from-green-700/40 to-green-900/40 shadow-xl flex flex-col items-center gap-2">
            <FaUserPlus className="text-3xl text-green-400 mb-2 animate-pulse" />
            <span className="text-3xl font-bold text-green-200">{analytics.followers}</span>
            <span className="text-xs text-gray-300">Followers</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} className="p-6 rounded-2xl bg-gradient-to-br from-pink-700/40 to-pink-900/40 shadow-xl flex flex-col items-center gap-2">
            <FaFire className="text-3xl text-pink-400 mb-2 animate-pulse" />
            <span className="text-3xl font-bold text-pink-200">{analytics.following}</span>
            <span className="text-xs text-gray-300">Following</span>
          </motion.div>
        </div>

        {/* Milestone Badges */}
        <div className="flex flex-wrap gap-3 items-center mb-12">
          {milestoneList.map(milestone => {
            const achieved = (milestone.key === 'views' && analytics.totalViews >= milestone.value) || (milestone.key === 'followers' && analytics.followers >= milestone.value);
            return (
              <motion.span
                key={milestone.label}
                whileHover={{ scale: 1.08 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border shadow transition-all ${achieved ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none shadow-lg' : 'bg-black/20 text-gray-400 border-gray-600'}`}
              >
                {milestone.icon} {milestone.label}
                {achieved && (
                  <>
                    <FaMedal className="ml-1 text-yellow-400 animate-bounce" />
                    <button
                      className="ml-2 px-2 py-1 rounded-full bg-purple-700 hover:bg-purple-800 text-white text-xs flex items-center gap-1 shadow"
                      onClick={() => handleShareBadge(milestone)}
                    >
                      <FaShareAlt /> Share
                    </button>
                    {shareSuccess === milestone.label && (
                      <span className="ml-2 text-green-300 animate-pulse">Copied!</span>
                    )}
                  </>
                )}
              </motion.span>
            );
          })}
        </div>

        {/* Widget Picker */}
        <div className="flex flex-wrap gap-2 mb-8">
          {defaultWidgets.map(w => (
            <button
              key={w.id}
              className={`px-4 py-2 rounded-full text-xs font-semibold border shadow transition-all ${widgetVisibility[w.id] ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none' : 'bg-black/20 text-gray-400 border-gray-600'}`}
              onClick={() => toggleWidget(w.id)}
            >
              {widgetVisibility[w.id] ? 'Hide' : 'Show'} {w.label}
            </button>
          ))}
        </div>

        {/* Analytics Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-12">
          {defaultWidgets.filter(w => widgetVisibility[w.id]).map(w => (
            <motion.div
              key={w.id}
              className="bg-gradient-to-br from-black/40 to-purple-900/30 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.03 }}
            >
              {w.id === 'viewsOverTime' && (
                <>
                  <h4 className="text-lg font-semibold mb-4">Views Over Time</h4>
                  <pre className="text-xs text-gray-400 mb-2 overflow-x-auto">{JSON.stringify(viewsOverTime, null, 2)}</pre>
                  <ResponsiveContainer width="100%" height={220}>
                    {viewsOverTime.length === 0 ? (
                      <div className="text-center text-gray-400">No data available</div>
                    ) : (
                      <LineChart data={viewsOverTime} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
                        <XAxis dataKey="date" stroke="#a78bfa" />
                        <YAxis stroke="#a78bfa" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="views" stroke="#a78bfa" strokeWidth={3} dot={false} />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </>
              )}
              {w.id === 'followersGrowth' && (
                <>
                  <h4 className="text-lg font-semibold mb-4">Followers Growth</h4>
                  <pre className="text-xs text-gray-400 mb-2 overflow-x-auto">{JSON.stringify(followersGrowth, null, 2)}</pre>
                  <ResponsiveContainer width="100%" height={220}>
                    {followersGrowth.length === 0 ? (
                      <div className="text-center text-gray-400">No data available</div>
                    ) : (
                      <LineChart data={followersGrowth} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
                        <XAxis dataKey="date" stroke="#34d399" />
                        <YAxis stroke="#34d399" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="followers" stroke="#34d399" strokeWidth={3} dot={false} />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </>
              )}
              {w.id === 'topCountries' && (
                <>
                  <h4 className="text-lg font-semibold mb-4">Top Countries</h4>
                  <pre className="text-xs text-gray-400 mb-2 overflow-x-auto">{JSON.stringify(topCountries, null, 2)}</pre>
                  <ResponsiveContainer width="100%" height={220}>
                    {topCountries.length === 0 ? (
                      <div className="text-center text-gray-400">No data available</div>
                    ) : (
                      <PieChart>
                        <Pie data={topCountries} dataKey="count" nameKey="country" cx="50%" cy="50%" outerRadius={80} fill="#f472b6" label />
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    )}
                  </ResponsiveContainer>
                </>
              )}
              {w.id === 'deviceBreakdown' && (
                <>
                  <h4 className="text-lg font-semibold mb-4">Device Breakdown</h4>
                  <pre className="text-xs text-gray-400 mb-2 overflow-x-auto">{JSON.stringify(deviceBreakdown, null, 2)}</pre>
                  <ResponsiveContainer width="100%" height={220}>
                    {deviceBreakdown.length === 0 ? (
                      <div className="text-center text-gray-400">No data available</div>
                    ) : (
                      <PieChart>
                        <Pie data={deviceBreakdown} dataKey="count" nameKey="device" cx="50%" cy="50%" outerRadius={80} fill="#60a5fa" label />
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    )}
                  </ResponsiveContainer>
                </>
              )}
              {w.id === 'returningVsNew' && (
                <>
                  <h4 className="text-lg font-semibold mb-4">Returning vs. New Visitors</h4>
                  <pre className="text-xs text-gray-400 mb-2 overflow-x-auto">{JSON.stringify(returningVsNew, null, 2)}</pre>
                  <ResponsiveContainer width="100%" height={220}>
                    {returningVsNew.length === 0 ? (
                      <div className="text-center text-gray-400">No data available</div>
                    ) : (
                      <PieChart>
                        <Pie data={returningVsNew} dataKey="value" nameKey="type" cx="50%" cy="50%" outerRadius={80} fill="#fbbf24" label />
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    )}
                  </ResponsiveContainer>
                </>
              )}
              {w.id === 'mostClickedLinks' && (
                <>
                  <h4 className="text-lg font-semibold mb-4">Most Clicked Links</h4>
                  <pre className="text-xs text-gray-400 mb-2 overflow-x-auto">{JSON.stringify(mostClickedLinks, null, 2)}</pre>
                  <ResponsiveContainer width="100%" height={220}>
                    {mostClickedLinks.length === 0 ? (
                      <div className="text-center text-gray-400">No data available</div>
                    ) : (
                      <BarChart data={mostClickedLinks}>
                        <XAxis dataKey="link" stroke="#a3e635" />
                        <YAxis stroke="#a3e635" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="clicks" fill="#a3e635" />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </motion.main>
    </div>
  );
};

export default AccountPage;
