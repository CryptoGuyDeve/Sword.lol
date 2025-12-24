"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { FaEye, FaUsers, FaUserPlus, FaFire, FaChartLine, FaGlobe, FaMobile, FaDesktop } from "react-icons/fa";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

import { useSession } from "next-auth/react";



type User = { id: string; username: string; profile_pic: string };

const AnalyticsPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
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
  const [dateRange, setDateRange] = useState<'7' | '30' | 'all'>('30');

  /* 
    The checkAuth function specifically checked creating a supabase client.
    We can replace this with useSession. 
    However, useEffect relies on checking if user matches ID.
  */
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (!session || !session.user) {
      router.push("/signup");
      return;
    }

    // Check if session.user.id == id or authorized
    // Note: session.user.id is not typed by default in NextAuth unless extended. 
    // We cast it.
    const currentUserId = (session.user as any).id;
    if (currentUserId !== id) {
      // router.push("/"); // Uncomment to enforce restriction
      // For now, analytics might be public or protected? 
      // Original code enforced match.
      router.push("/");
      return;
    }

    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Using existing API which now handles ID lookup
        const res = await fetch(`/api/users/${id}`);
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        } else {
          setError("Error fetching user data");
        }
      } catch (e) {
        setError("Error fetching user data");
      }
      setLoading(false);
    };

    fetchUserData();
  }, [id, router, session, status]);


  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`/api/analytics?userId=${id}&dateRange=${dateRange}`);
        if (response.ok) {
          const data = await response.json();
          setAnalytics(data.analytics);
          setViewsOverTime(data.viewsOverTime);
          setFollowersGrowth(data.followersGrowth);
          setTopCountries(data.topCountries);
          setDeviceBreakdown(data.deviceBreakdown);
        }
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      }
    };
    fetchAnalytics();
  }, [id, dateRange]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex bg-[#0e0e0e] min-h-screen text-white relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 blur-3xl"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <Sidebar id={id} username={userData.username} />

      <motion.main
        className="flex-1 p-8 md:p-12 relative z-10 min-h-screen overflow-y-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-10 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text drop-shadow-lg">
          Analytics Dashboard
        </h2>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 mb-10 items-center">
          <select
            className="bg-white/10 border border-purple-500/30 rounded-full px-5 py-2 text-white focus:ring-2 focus:ring-purple-500 transition"
            value={dateRange}
            onChange={e => setDateRange(e.target.value as any)}
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>

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

        {/* Analytics Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-12">
          {/* Views Over Time */}
          <motion.div
            className="bg-gradient-to-br from-black/40 to-purple-900/30 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all"
            whileHover={{ scale: 1.03 }}
          >
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaChartLine className="text-purple-400" />
              Views Over Time
            </h4>
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
          </motion.div>

          {/* Followers Growth */}
          <motion.div
            className="bg-gradient-to-br from-black/40 to-green-900/30 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all"
            whileHover={{ scale: 1.03 }}
          >
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaUserPlus className="text-green-400" />
              Followers Growth
            </h4>
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
          </motion.div>

          {/* Top Countries */}
          <motion.div
            className="bg-gradient-to-br from-black/40 to-pink-900/30 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all"
            whileHover={{ scale: 1.03 }}
          >
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaGlobe className="text-pink-400" />
              Top Countries
            </h4>
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
          </motion.div>

          {/* Device Breakdown */}
          <motion.div
            className="bg-gradient-to-br from-black/40 to-blue-900/30 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all"
            whileHover={{ scale: 1.03 }}
          >
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaMobile className="text-blue-400" />
              Device Breakdown
            </h4>
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
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default AnalyticsPage;
