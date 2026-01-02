"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { FaUserEdit, FaEye, FaSignOutAlt, FaUsers, FaUserPlus, FaMedal, FaBolt, FaCrown, FaFire, FaShareAlt, FaLaptopCode, FaGamepad } from "react-icons/fa";
import Link from "next/link";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type User = { id: string; username: string; profile_pic: string };

const milestoneList = [
    { key: "views", value: 1000, label: "1,000 Views", icon: <FaEye className="text-white" /> },
    { key: "followers", value: 100, label: "100 Followers", icon: <FaUsers className="text-gray-300" /> },
    { key: "followers", value: 1000, label: "1,000 Followers", icon: <FaCrown className="text-gray-400" /> },
    { key: "views", value: 10000, label: "10,000 Views", icon: <FaFire className="text-gray-500" /> },
];

const DashboardPage = () => {
    const params = useParams();
    const usernameParams = params?.username as string;
    const router = useRouter();
    const { data: session, status } = useSession();
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

    // Charts State
    const [viewsOverTime, setViewsOverTime] = useState<{ date: string; views: number }[]>([]);
    const [followersGrowth, setFollowersGrowth] = useState<{ date: string; followers: number }[]>([]);
    const [topCountries, setTopCountries] = useState<{ country: string; count: number }[]>([]);
    const [deviceBreakdown, setDeviceBreakdown] = useState<{ device: string; count: number }[]>([]);
    const [returningVsNew, setReturningVsNew] = useState<{ type: string; value: number }[]>([]);
    const [mostClickedLinks, setMostClickedLinks] = useState<{ link: string; clicks: number }[]>([]);

    const [dateRange, setDateRange] = useState<'7' | '30' | 'all'>('30');
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

    const toggleWidget = (id: string) => {
        setWidgetVisibility(v => ({ ...v, [id]: !v[id] }));
    };

    useEffect(() => {
        const checkAuth = async () => {
            if (status === "loading") return;

            if (!session || !session.user) {
                router.push("/login");
                return;
            }

            // Check if session user matches the requested dashboard username
            if (session.user.name !== usernameParams) {
                const currentUser = session.user.name;
                if (currentUser) {
                    router.push(`/dashboard/${currentUser}`);
                } else {
                    router.push("/");
                }
                return;
            }

            if (!userData) {
                setLoading(true);
                try {
                    const res = await fetch(`/api/users/${usernameParams}`);
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
            }
        };
        checkAuth();
    }, [usernameParams, router, session, status, userData]);

    // Separate effect for polling analytics
    useEffect(() => {
        if (!userData?.id) return;

        const fetchAnalytics = async () => {
            try {
                const analyticsRes = await fetch(`/api/analytics?userId=${userData.id}&dateRange=${dateRange}`, { cache: 'no-store' });
                if (analyticsRes.ok) {
                    const analyticsData = await analyticsRes.json();
                    setAnalytics(analyticsData.analytics);
                    setViewsOverTime(analyticsData.viewsOverTime);
                    setFollowersGrowth(analyticsData.followersGrowth);
                    setTopCountries(analyticsData.topCountries);
                    setDeviceBreakdown(analyticsData.deviceBreakdown);
                }
            } catch (e) {
                console.error("Error fetching analytics", e);
            }
        };

        fetchAnalytics(); // Initial fetch
        const interval = setInterval(fetchAnalytics, 10000); // Poll every 10s

        return () => clearInterval(interval);
    }, [userData?.id, dateRange]);


    const handleLogout = async () => {
        await signOut({ callbackUrl: '/' });
    };

    const handleShareBadge = (milestone: any) => {
        const url = typeof window !== 'undefined' ? window.location.origin + `/${userData?.username}` : '';
        const text = `🏅 I just unlocked the "${milestone.label}" badge on SwordXD! Check out my profile: ${url}`;
        navigator.clipboard.writeText(text).then(() => {
            setShareSuccess(milestone.label);
            setTimeout(() => setShareSuccess(null), 2000);
        });
    };

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-[#0e0e0e] text-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <p className="text-sm text-gray-400 font-medium tracking-wide">LOADING...</p>
            </div>
        </div>
    );

    if (error) return <div className="flex h-screen items-center justify-center bg-[#0e0e0e] text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-[#0e0e0e] text-white flex">
            <Sidebar username={userData?.username} id={userData?.id} />

            <motion.main
                className="flex-1 p-8 md:p-12 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-white/5 pb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Overview</h2>
                        <p className="text-gray-500">Welcome back, @{userData?.username}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-[#121212] flex items-center p-1 rounded-lg border border-white/5">
                            {(['7', '30', 'all'] as const).map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setDateRange(range)}
                                    className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${dateRange === range
                                        ? 'bg-white text-black shadow-sm'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {range === 'all' ? 'All Time' : `${range} Days`}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Views', value: analytics.totalViews, icon: FaEye, change: "+12%" },
                        { label: 'Unique Visitors', value: analytics.uniqueVisitors, icon: FaUsers, change: "+5%" },
                        { label: 'Followers', value: analytics.followers, icon: FaUserPlus, change: "+8%" },
                        { label: 'Following', value: analytics.following, icon: FaFire, change: "0%" },
                    ].map((stat, i) => (
                        <div key={stat.label} className="bg-[#121212] p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                                    <stat.icon />
                                </div>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stat.change.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-gray-100/5 text-gray-500'}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">{stat.value.toLocaleString()}</h3>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Live Indicator */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] font-mono text-green-500 uppercase tracking-wider">Live</span>
                    </div>

                    {/* Widget Toggles */}
                    <div className="flex gap-2">
                        {defaultWidgets.map(w => (
                            <button
                                key={w.id}
                                onClick={() => toggleWidget(w.id)}
                                className={`w-2 h-2 rounded-full transition-all ${widgetVisibility[w.id] ? 'bg-indigo-500' : 'bg-gray-700 hover:bg-gray-600'}`}
                                title={`Toggle ${w.label}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Main Chart - Spans 2 Cols */}
                    {widgetVisibility['viewsOverTime'] && (
                        <div className="lg:col-span-2 bg-[#121212] p-6 rounded-xl border border-white/5">
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="font-semibold text-white">Views Trend</h4>
                            </div>
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={viewsOverTime}>
                                        <XAxis dataKey="date" stroke="#333" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#333" fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#000', border: '1px solid #222', borderRadius: '8px' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Line type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#fff' }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}

                    {/* Top Countries */}
                    {widgetVisibility['topCountries'] && (
                        <div className="bg-[#121212] p-6 rounded-xl border border-white/5">
                            <h4 className="font-semibold text-white mb-6">Top Locations</h4>
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={topCountries} dataKey="count" nameKey="country" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2}>
                                            {topCountries.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe'][index % 4]} stroke="none" />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #222', borderRadius: '8px' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}
                </div>

                {/* Secondary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {widgetVisibility['deviceBreakdown'] && (
                        <div className="bg-[#121212] p-6 rounded-xl border border-white/5">
                            <h4 className="font-semibold text-white mb-6">Device Usage</h4>
                            <div className="space-y-4">
                                {deviceBreakdown.map((item, i) => (
                                    <div key={item.device} className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                                            {i === 0 ? <FaLaptopCode /> : <FaGamepad />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-300">{item.device}</span>
                                                <span className="text-white font-medium">{item.count}</span>
                                            </div>
                                            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-indigo-500 rounded-full"
                                                    style={{ width: `${(item.count / analytics.totalViews) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {widgetVisibility['mostClickedLinks'] && (
                        <div className="bg-[#121212] p-6 rounded-xl border border-white/5">
                            <h4 className="font-semibold text-white mb-6">Top Links</h4>
                            {mostClickedLinks.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-500 text-sm">
                                    No click data yet
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {mostClickedLinks.map((link, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                            <span className="text-sm text-gray-300 truncate max-w-[200px]">{link.link}</span>
                                            <span className="text-xs font-mono text-indigo-400">{link.clicks} clicks</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Milestones */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-4">Milestones</h3>
                    <div className="flex flex-wrap gap-3">
                        {milestoneList.map((milestone, i) => {
                            const achieved = (milestone.key === 'views' && analytics.totalViews >= milestone.value) || (milestone.key === 'followers' && analytics.followers >= milestone.value);
                            return (
                                <div
                                    key={i}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${achieved ? 'bg-[#1a1a1a] border-yellow-500/20' : 'bg-[#121212] border-white/5 opacity-50'}`}
                                >
                                    <div className={`p-2 rounded-lg ${achieved ? 'bg-yellow-500/10 text-yellow-500' : 'bg-gray-800 text-gray-600'}`}>
                                        {milestone.icon}
                                    </div>
                                    <div>
                                        <p className={`text-sm font-semibold ${achieved ? 'text-white' : 'text-gray-500'}`}>{milestone.label}</p>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">{achieved ? 'Unlocked' : 'Locked'}</p>
                                    </div>
                                    {achieved && (
                                        <button onClick={() => handleShareBadge(milestone)} className="text-gray-400 hover:text-white ml-2">
                                            <FaShareAlt size={12} />
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

            </motion.main>
        </div>
    );
};

export default DashboardPage;

