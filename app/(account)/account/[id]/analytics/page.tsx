"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { FaEye, FaUsers, FaUserPlus, FaFire, FaChartLine, FaGlobe, FaMobile, FaDesktop } from "react-icons/fa";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

import { useSession } from "next-auth/react";

// Force dynamic rendering to prevent static generation errors
export const dynamic = "force-dynamic";

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
    <div className="flex bg-[#0e0e0e] min-h-screen text-white overflow-hidden">
      <Sidebar id={id} username={userData.username} />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Analytics</h1>
              <p className="text-gray-400 text-sm">Track your performance, audience growth, and engagement metrics.</p>
            </div>

            <div className="flex bg-[#121212] border border-white/10 rounded-lg p-1 w-full md:w-auto">
              {[{ v: '7', l: '7 Days' }, { v: '30', l: '30 Days' }, { v: 'all', l: 'All Time' }].map(opt => (
                <button
                  key={opt.v}
                  onClick={() => setDateRange(opt.v as any)}
                  className={`flex-1 md:flex-none px-4 py-1.5 text-xs font-medium rounded-md transition-all ${dateRange === opt.v ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-white'}`}
                >
                  {opt.l}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Views', value: analytics.totalViews, icon: FaEye, color: 'text-purple-400' },
              { label: 'Unique Visitors', value: analytics.uniqueVisitors, icon: FaUsers, color: 'text-blue-400' },
              { label: 'New Followers', value: analytics.followers, icon: FaUserPlus, color: 'text-emerald-400' },
              { label: 'Following', value: analytics.following, icon: FaChartLine, color: 'text-pink-400' }
            ].map((stat, i) => (
              <div key={i} className="bg-[#121212] border border-white/5 rounded-xl p-6 hover:border-white/20 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">{stat.label}</span>
                  <stat.icon className={`${stat.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                </div>
                <div className="text-3xl font-bold">{stat.value.toLocaleString()}</div>
              </div>
            ))}
          </div>

          {/* Main Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Views Chart */}
            <div className="bg-[#121212] border border-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-8">Views Over Time</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={viewsOverTime}>
                    <XAxis
                      dataKey="date"
                      stroke="#333"
                      tick={{ fill: '#666', fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis
                      stroke="#333"
                      tick={{ fill: '#666', fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      dx={-10}
                      tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                      itemStyle={{ color: '#fff', fontSize: '12px' }}
                      labelStyle={{ color: '#888', marginBottom: '4px' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="#a855f7"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6, fill: '#a855f7', strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Growth Chart */}
            <div className="bg-[#121212] border border-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-8">Followers Growth</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={followersGrowth}>
                    <XAxis
                      dataKey="date"
                      stroke="#333"
                      tick={{ fill: '#666', fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis
                      stroke="#333"
                      tick={{ fill: '#666', fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      dx={-10}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                      itemStyle={{ color: '#fff', fontSize: '12px' }}
                      labelStyle={{ color: '#888', marginBottom: '4px' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="followers"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6, fill: '#10b981', strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Secondary Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Countries */}
            <div className="bg-[#121212] border border-white/5 rounded-xl p-6 flex flex-col">
              <h3 className="text-lg font-semibold mb-4">Top Countries</h3>
              <div className="flex-1 min-h-[250px] relative">
                {topCountries.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={topCountries}
                        dataKey="count"
                        nameKey="country"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                      >
                        {topCountries.map((e, i) => <Cell key={i} fill={['#a855f7', '#ec4899', '#3b82f6', '#10b981'][i % 4]} stroke="rgba(0,0,0,0)" />)}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        formatter={(value) => <span style={{ color: '#9ca3af', fontSize: '12px' }}>{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm">
                    No data available
                  </div>
                )}
              </div>
            </div>

            {/* Device Breakdown */}
            <div className="bg-[#121212] border border-white/5 rounded-xl p-6 flex flex-col">
              <h3 className="text-lg font-semibold mb-4">Device Breakdown</h3>
              <div className="flex-1 min-h-[250px] relative">
                {deviceBreakdown.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceBreakdown}
                        dataKey="count"
                        nameKey="device"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                      >
                        {deviceBreakdown.map((e, i) => <Cell key={i} fill={['#3b82f6', '#f59e0b', '#ef4444'][i % 3]} stroke="rgba(0,0,0,0)" />)}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        formatter={(value) => <span style={{ color: '#9ca3af', fontSize: '12px' }}>{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm">
                    No data available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;
