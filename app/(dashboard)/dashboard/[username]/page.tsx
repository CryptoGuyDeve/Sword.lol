"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { FaUserEdit, FaEye, FaSignOutAlt, FaUsers, FaUserPlus, FaMedal, FaBolt, FaCrown, FaFire, FaShareAlt } from "react-icons/fa";
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

    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
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
        <div className="flex h-screen items-center justify-center bg-black text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 animate-pulse" />
            <div className="z-10 text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-bounce">
                LOADING DASHBOARD...
            </div>
        </div>
    );

    if (error) return <div className="flex h-screen items-center justify-center bg-black text-red-500">{error}</div>;

    return (
        <div className={`flex min-h-screen text-white relative overflow-x-hidden ${theme === 'dark' ? 'bg-[#0e0e0e]' : 'bg-gray-50 text-black'}`}>
            {/* Animated Background */}
            <motion.div
                className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900/10 via-black/5 to-blue-900/10 blur-3xl opacity-50"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 10, repeat: Infinity }}
            />
            <Sidebar username={userData?.username} id={userData?.id} />

            {/* Floating Action Button */}
            <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:shadow-[0_0_30px_rgba(124,58,237,0.8)] transition-all flex items-center justify-center"
                onClick={() => router.push(`/account/${userData?.id}/customize`)}
                title="Quick Customize"
            >
                <FaUserEdit className="text-white text-xl" />
            </motion.button>

            {/* Main Content */}
            <motion.main
                className="flex-1 p-6 md:p-12 relative z-10 min-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <motion.h2
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="text-3xl md:text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-gray-400 text-transparent bg-clip-text drop-shadow-sm"
                        >
                            Overview
                        </motion.h2>
                        <p className="text-gray-400 text-sm mt-1">Welcome back, {userData?.username}</p>
                    </div>

                    {/* Filter Controls & Dark/Light Toggle */}
                    <div className="flex flex-wrap gap-3 items-center bg-white/5 backdrop-blur-md p-1.5 rounded-full border border-white/10">
                        <select className="bg-transparent border-none text-white text-sm focus:ring-0 cursor-pointer outline-none px-2" value={dateRange} onChange={e => setDateRange(e.target.value as any)}>
                            <option value="7" className="bg-black">Last 7 Days</option>
                            <option value="30" className="bg-black">Last 30 Days</option>
                            <option value="all" className="bg-black">All Time</option>
                        </select>
                        <div className="w-px h-4 bg-white/20"></div>
                        <button className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 transition text-white" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    </div>
                </div>

                {/* Live Indicator */}
                <div className="mb-8 flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-mono text-green-400 tracking-wider">LIVE UPDATES ACTIVE</span>
                </div>

                {/* Profile Banner / Card */}
                <motion.div
                    className="w-full mb-12 relative overflow-hidden rounded-3xl group"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/80 backdrop-blur-3xl z-0" />
                    {userData?.background_video && (
                        <div className="absolute inset-0 opacity-20 z-0 mix-blend-overlay">
                            {/* Insert image/video logic here if available, for now just a nice gradient */}
                        </div>
                    )}

                    <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-8 border border-white/10 rounded-3xl bg-white/5 shadow-2xl">
                        <div className="relative">
                            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-70 blur-md group-hover:opacity-100 transition duration-500"></div>
                            {userData?.profile_pic && <img src={userData.profile_pic} alt={userData.username} className="relative w-28 h-28 rounded-full border-4 border-black shadow-2xl object-cover" />}
                            <div className="absolute bottom-0 right-0 bg-green-500 border-4 border-black w-6 h-6 rounded-full"></div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-3xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-2">
                                @{userData?.username}
                                {userData?.badges?.includes('Verified') && <FaMedal className="text-blue-400" />}
                            </h3>
                            <p className="text-gray-300 max-w-lg mx-auto md:mx-0 mb-6 text-sm leading-relaxed">{userData?.bio || "No bio yet."}</p>

                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <div className="flex flex-col px-4 py-2 bg-black/30 rounded-xl border border-white/5 backdrop-blur-sm">
                                    <span className="text-xs text-gray-400 uppercase tracking-widest">Followers</span>
                                    <span className="text-xl font-bold text-white">{analytics.followers.toLocaleString()}</span>
                                </div>
                                <div className="flex flex-col px-4 py-2 bg-black/30 rounded-xl border border-white/5 backdrop-blur-sm">
                                    <span className="text-xs text-gray-400 uppercase tracking-widest">Views</span>
                                    <span className="text-xl font-bold text-white">{analytics.totalViews.toLocaleString()}</span>
                                </div>
                                <div className="flex flex-col px-4 py-2 bg-black/30 rounded-xl border border-white/5 backdrop-blur-sm">
                                    <span className="text-xs text-gray-400 uppercase tracking-widest">Unique</span>
                                    <span className="text-xl font-bold text-white">{analytics.uniqueVisitors.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition"
                            title="Logout"
                        >
                            <FaSignOutAlt />
                        </button>
                    </div>
                </motion.div>

                {/* Premium Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Total Views', value: analytics.totalViews, icon: FaEye, color: 'from-purple-500 to-indigo-500', sub: 'Lifetime views' },
                        { label: 'Unique Visitors', value: analytics.uniqueVisitors, icon: FaUsers, color: 'from-blue-500 to-cyan-500', sub: 'Distinct users' },
                        { label: 'Total Followers', value: analytics.followers, icon: FaUserPlus, color: 'from-emerald-500 to-teal-500', sub: 'Growing community' },
                        { label: 'Following', value: analytics.following, icon: FaFire, color: 'from-pink-500 to-rose-500', sub: 'People you follow' },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 + (i * 0.1) }}
                            whileHover={{ y: -5 }}
                            className="relative overflow-hidden p-6 rounded-2xl bg-[#121212] border border-white/5 shadow-xl group"
                        >
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 blur-2xl rounded-bl-full transition-all group-hover:opacity-20`} />

                            <div className="relative z-10">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white text-xl shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                                    <stat.icon />
                                </div>
                                <h4 className="text-3xl font-bold text-white mb-1 tracking-tight">{stat.value.toLocaleString()}</h4>
                                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                                <p className="text-gray-600 text-xs mt-2">{stat.sub}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Milestone Badges */}
                <div className="mb-12">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <FaCrown className="text-yellow-500" /> Milestones
                    </h3>
                    <div className="flex flex-wrap gap-4">
                        {milestoneList.map((milestone, i) => {
                            const achieved = (milestone.key === 'views' && analytics.totalViews >= milestone.value) || (milestone.key === 'followers' && analytics.followers >= milestone.value);
                            return (
                                <motion.div
                                    key={milestone.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + (i * 0.05) }}
                                    whileHover={{ scale: 1.05 }}
                                    className={`relative group px-6 py-3 rounded-2xl border flex items-center gap-3 transition-all duration-300 ${achieved ? 'bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-yellow-500/30 hover:border-yellow-500/60 shadow-[0_0_15px_rgba(234,179,8,0.1)]' : 'bg-black/40 border-gray-800 opacity-50 grayscale'}`}
                                >
                                    <div className={`p-2 rounded-lg ${achieved ? 'bg-yellow-500/20 text-yellow-500' : 'bg-gray-700/20 text-gray-500'}`}>
                                        {milestone.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-sm font-bold ${achieved ? 'text-white' : 'text-gray-400'}`}>{milestone.label}</span>
                                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">{achieved ? 'Unlocked' : 'Locked'}</span>
                                    </div>

                                    {achieved && (
                                        <button
                                            className="ml-2 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition"
                                            onClick={() => handleShareBadge(milestone)}
                                            title="Share Achievement"
                                        >
                                            <FaShareAlt size={12} />
                                        </button>
                                    )}
                                    {shareSuccess === milestone.label && (
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded shadow-lg">Copied!</div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Widget Picker */}
                <div className="flex flex-wrap gap-2 mb-8 items-center">
                    <span className="text-gray-500 text-xs uppercase font-bold tracking-wider mr-2">Widgets:</span>
                    {defaultWidgets.map(w => (
                        <button
                            key={w.id}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${widgetVisibility[w.id] ? 'bg-purple-500/10 border-purple-500/50 text-purple-300' : 'bg-black/20 border-gray-800 text-gray-600 hover:border-gray-600'}`}
                            onClick={() => toggleWidget(w.id)}
                        >
                            {w.label}
                        </button>
                    ))}
                </div>

                {/* Analytics Charts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {defaultWidgets.filter(w => widgetVisibility[w.id]).map((w, i) => (
                        <motion.div
                            key={w.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 + (i * 0.05) }}
                            className="bg-[#121212] border border-white/5 rounded-3xl p-6 shadow-xl overflow-hidden hover:border-white/10 transition-colors"
                        >
                            {w.id === 'viewsOverTime' && (
                                <>
                                    <h4 className="text-sm font-semibold text-gray-400 mb-6 uppercase tracking-wider">Views Trend</h4>
                                    <ResponsiveContainer width="100%" height={220}>
                                        {viewsOverTime.length === 0 ? (
                                            <div className="text-center text-gray-600 text-sm py-10">No data available yet</div>
                                        ) : (
                                            <LineChart data={viewsOverTime}>
                                                <defs>
                                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey="date" stroke="#333" fontSize={10} tickLine={false} axisLine={false} />
                                                <YAxis stroke="#333" fontSize={10} tickLine={false} axisLine={false} />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                                                    itemStyle={{ color: '#fff' }}
                                                />
                                                <Line type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 0 }} activeDot={{ r: 6 }} fill="url(#colorViews)" />
                                            </LineChart>
                                        )}
                                    </ResponsiveContainer>
                                </>
                            )}
                            {w.id === 'followersGrowth' && (
                                <>
                                    <h4 className="text-sm font-semibold text-gray-400 mb-6 uppercase tracking-wider">Follower Growth</h4>
                                    <ResponsiveContainer width="100%" height={220}>
                                        {followersGrowth.length === 0 ? (
                                            <div className="text-center text-gray-600 text-sm py-10">No data available yet</div>
                                        ) : (
                                            <LineChart data={followersGrowth}>
                                                <XAxis dataKey="date" stroke="#333" fontSize={10} tickLine={false} axisLine={false} />
                                                <YAxis stroke="#333" fontSize={10} tickLine={false} axisLine={false} />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                                                    itemStyle={{ color: '#fff' }}
                                                />
                                                <Line type="monotone" dataKey="followers" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }} />
                                            </LineChart>
                                        )}
                                    </ResponsiveContainer>
                                </>
                            )}
                            {/* ... (Other charts with similar premium styling updates) ... */}
                            {w.id === 'topCountries' && (
                                <>
                                    <h4 className="text-sm font-semibold text-gray-400 mb-6 uppercase tracking-wider">Top Countries</h4>
                                    <ResponsiveContainer width="100%" height={220}>
                                        <PieChart>
                                            <Pie data={topCountries} dataKey="count" nameKey="country" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                                                {topCountries.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={['#f472b6', '#a78bfa', '#60a5fa', '#34d399'][index % 4]} stroke="none" />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }} />
                                            <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10px', color: '#888' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </>
                            )}
                            {w.id === 'deviceBreakdown' && (
                                <>
                                    <h4 className="text-sm font-semibold text-gray-400 mb-6 uppercase tracking-wider">Devices</h4>
                                    <ResponsiveContainer width="100%" height={220}>
                                        <PieChart>
                                            <Pie data={deviceBreakdown} dataKey="count" nameKey="device" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                                                {deviceBreakdown.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={['#60a5fa', '#fbbf24', '#f87171'][index % 3]} stroke="none" />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }} />
                                            <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10px', color: '#888' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </>
                            )}
                            {w.id === 'returningVsNew' && (
                                <>
                                    <h4 className="text-sm font-semibold text-gray-400 mb-6 uppercase tracking-wider">Retention</h4>
                                    <ResponsiveContainer width="100%" height={220}>
                                        <PieChart>
                                            <Pie data={returningVsNew} dataKey="value" nameKey="type" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                                                {returningVsNew.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={['#fbbf24', '#34d399'][index % 2]} stroke="none" />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }} />
                                            <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10px', color: '#888' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </>
                            )}
                            {w.id === 'mostClickedLinks' && (
                                <>
                                    <h4 className="text-sm font-semibold text-gray-400 mb-6 uppercase tracking-wider">Top Links</h4>
                                    <ResponsiveContainer width="100%" height={220}>
                                        {mostClickedLinks.length === 0 ? (
                                            <div className="text-center text-gray-600 text-sm py-10">No data available yet</div>
                                        ) : (
                                            <BarChart data={mostClickedLinks}>
                                                <XAxis dataKey="link" stroke="#333" fontSize={10} tickLine={false} axisLine={false} />
                                                <YAxis stroke="#333" fontSize={10} tickLine={false} axisLine={false} />
                                                <Tooltip cursor={{ fill: '#ffffff10' }} contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }} />
                                                <Bar dataKey="clicks" fill="#a3e635" radius={[4, 4, 0, 0]} />
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

export default DashboardPage;

