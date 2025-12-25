"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import Loading from "@/components/Loading";
import { FaUserEdit, FaEye, FaSignOutAlt, FaUsers, FaUserPlus, FaMedal, FaBolt, FaCrown, FaFire, FaShareAlt } from "react-icons/fa";
import Link from "next/link";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Papa from 'papaparse';

// Force dynamic rendering to prevent static generation errors
export const dynamic = "force-dynamic";

type User = { id: string; username: string; profile_pic: string };

const milestoneList = [
  { key: "views", value: 1000, label: "1,000 Views", icon: <FaEye className="text-white" /> },
  { key: "followers", value: 100, label: "100 Followers", icon: <FaUsers className="text-gray-300" /> },
  { key: "followers", value: 1000, label: "1,000 Followers", icon: <FaCrown className="text-gray-400" /> },
  { key: "views", value: 10000, label: "10,000 Views", icon: <FaFire className="text-gray-500" /> },
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
  const { data: session, status } = useSession();
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
      if (status === "loading") return;

      if (!session || !session.user) {
        router.push("/signup");
        return;
      }

      const sessionUserId = (session.user as any).id;
      if (sessionUserId !== id) {
        router.push("/");
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok) {
          setError("Error fetching user data");
          return;
        }
        const data = await res.json();
        setUserData(data);
      } catch (e) {
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
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

  // Real-time subscriptions removed (NeonDB does not support Supabase Realtime)
  // Polling could be implemented if necessary, but omitting for now.


  // Real-time viewers polling (every 10s)
  useEffect(() => {
    let interval: any;
    const poll = async () => {
      // Mock or implement backend endpoint for realtime count
      // For now, doing nothing to avoid Supabase calls
    };
    // interval = setInterval(poll, 10000);
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
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: newUsername })
      });
      if (res.ok) {
        setUserData((prev: any) => ({ ...prev, username: newUsername }));
        setNewUsername("");
        alert("Username updated successfully!");
      } else {
        alert("Failed to update username");
      }
    } catch {
      alert("Failed to update username");
    }
  };

  const handleLogout = async () => {
    await signOut();
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

  if (loading) return <Loading fullScreen text="CALIBRATING_SYNERGY" />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className={`flex h-screen overflow-hidden ${theme === 'dark' ? 'bg-[#0e0e0e] text-white' : 'bg-white text-black'}`}>
      <Sidebar username={userData.username} id={userData.id} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
              <p className="text-sm text-gray-500 mt-1">Welcome back, @{userData.username}</p>
            </div>

            <div className="flex items-center gap-3">
              <select
                className="bg-[#121212] border border-white/10 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-white/20 outline-none transition-all"
                value={dateRange}
                onChange={e => setDateRange(e.target.value as any)}
              >
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="all">All Time</option>
              </select>
              <button
                className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
              <button
                onClick={() => router.push(`/account/${userData.id}/customize`)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FaUserEdit /> Customize
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Views", value: analytics.totalViews, icon: FaEye, color: "text-white" },
              { label: "Unique Visitors", value: analytics.uniqueVisitors, icon: FaUsers, color: "text-gray-400" },
              { label: "Followers", value: analytics.followers, icon: FaUserPlus, color: "text-white" },
              { label: "Following", value: analytics.following, icon: FaFire, color: "text-gray-400" }
            ].map((stat, i) => (
              <div key={i} className="p-5 rounded-xl bg-[#121212] border border-white/5 flex flex-col gap-2 transition-all hover:border-white/10">
                <div className="flex justify-between items-start">
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</span>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Milestone Badges */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Milestones</h3>
            <div className="flex flex-wrap gap-3">
              {milestoneList.map(milestone => {
                const achieved = (milestone.key === 'views' && analytics.totalViews >= milestone.value) || (milestone.key === 'followers' && analytics.followers >= milestone.value);
                return (
                  <div
                    key={milestone.label}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${achieved ? 'bg-white/5 border-white/20 text-white' : 'bg-transparent border-white/5 text-gray-600'}`}
                  >
                    {milestone.icon}
                    <span>{milestone.label}</span>
                    {achieved && (
                      <button
                        className="ml-2 p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        onClick={() => handleShareBadge(milestone)}
                        title="Share Badge"
                      >
                        <FaShareAlt />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>


          {/* Charts Toggle */}
          <div className="flex flex-wrap gap-2">
            {defaultWidgets.map(w => (
              <button
                key={w.id}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${widgetVisibility[w.id] ? 'bg-white text-black border-transparent' : 'bg-transparent text-gray-500 border-white/10 hover:border-white/20 hover:text-gray-400'}`}
                onClick={() => toggleWidget(w.id)}
              >
                {w.label}
              </button>
            ))}
          </div>

          {/* Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {defaultWidgets.filter(w => widgetVisibility[w.id]).map(w => (
              <div
                key={w.id}
                className="bg-[#121212] border border-white/5 rounded-xl p-6 flex flex-col"
              >
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-300">{w.label}</h4>
                </div>

                <div className="flex-1 min-h-[220px]">
                  {w.id === 'viewsOverTime' && (
                    <ResponsiveContainer width="100%" height={220}>
                      <LineChart data={viewsOverTime}>
                        <XAxis dataKey="date" stroke="#333" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#333" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Line type="monotone" dataKey="views" stroke="#fff" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                  {w.id === 'followersGrowth' && (
                    <ResponsiveContainer width="100%" height={220}>
                      <LineChart data={followersGrowth}>
                        <XAxis dataKey="date" stroke="#333" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#333" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Line type="monotone" dataKey="followers" stroke="#fff" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                  {w.id === 'topCountries' && (
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={topCountries} dataKey="count" nameKey="country" cx="50%" cy="50%" outerRadius={70}
                          fill="#333" stroke="#121212" strokeWidth={2}
                        >
                          {topCountries.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#fff', '#666', '#333'][index % 3]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px', fontSize: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                  {w.id === 'deviceBreakdown' && (
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={deviceBreakdown} dataKey="count" nameKey="device" cx="50%" cy="50%" outerRadius={70}
                          fill="#333" stroke="#121212" strokeWidth={2}
                        >
                          {deviceBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#fff', '#666', '#333'][index % 3]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px', fontSize: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                  {w.id === 'returningVsNew' && (
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={returningVsNew} dataKey="value" nameKey="type" cx="50%" cy="50%" outerRadius={70}
                          fill="#333" stroke="#121212" strokeWidth={2}
                        >
                          {returningVsNew.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#fff', '#666', '#333'][index % 3]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px', fontSize: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                  {w.id === 'mostClickedLinks' && (
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={mostClickedLinks}>
                        <XAxis dataKey="link" stroke="#333" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#333" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px', fontSize: '12px' }} cursor={{ fill: '#222' }} />
                        <Bar dataKey="clicks" fill="#fff" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
