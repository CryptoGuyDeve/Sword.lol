"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserEdit, FaEye, FaSignOutAlt, FaUsers, FaUserPlus,
  FaMedal, FaBolt, FaCrown, FaFire, FaShareAlt,
  FaChartLine, FaInfoCircle, FaChevronRight
} from "react-icons/fa";
import {
  FiActivity, FiArrowRight, FiMaximize2, FiCpu,
  FiTarget, FiGlobe, FiSmartphone, FiMonitor
} from "react-icons/fi";
import Link from "next/link";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import Loading from "@/components/Loading";

// Force dynamic rendering
export const dynamic = "force-dynamic";

type User = { id: string; username: string; profile_pic: string };

const AccountPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [dateRange, setDateRange] = useState<'7' | '30' | 'all'>('30');
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  const [analytics, setAnalytics] = useState<{
    totalViews: number;
    uniqueVisitors: number;
    followers: number;
    following: number;
  }>({
    totalViews: 0,
    uniqueVisitors: 0,
    followers: 0,
    following: 0,
  });

  const [viewsOverTime, setViewsOverTime] = useState<{ date: string; views: number }[]>([]);

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
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        }
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
        }
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      }
    };
    fetchAnalytics();
  }, [id, dateRange]);

  const tutorialSteps = [
    {
      title: "Dashboard Overview",
      description: "Welcome to your home base. Track your stats, manage your profile, and see how you're growing.",
      target: "header"
    },
    {
      title: "Real-time Stats",
      description: "A live view of your progress. Every visit and follower is tracked here.",
      target: "stats"
    },
    {
      title: "Quick Actions",
      description: "Use these buttons to quickly update your profile or learn how things work.",
      target: "actions"
    }
  ];

  if (loading) return <Loading fullScreen text="LOADING_DASHBOARD" />;
  if (error) return <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center text-red-500 font-mono tracking-widest">{error}</div>;

  return (
    <div className="flex bg-[#0E0E0E] min-h-screen text-white overflow-hidden selection:bg-white selection:text-black font-sans">
      <Sidebar username={userData?.username || "Entity"} id={userData?.id || ""} />

      <main className="flex-1 relative overflow-y-auto h-screen custom-scrollbar">
        {/* Stage 3: Ambient Shading */}
        <div className="absolute inset-0 pointer-events-none z-[1]">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[150px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[150px] rounded-full" />
        </div>

        {/* Global Grain Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-[2] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-[1]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">

          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24 border-b border-white/5 pb-16 relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-white/30 uppercase">
                  SWORD_DASHBOARD / 001
                </span>
                <div className="h-px w-12 bg-white/10" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 italic">
                Dashboard<span className="text-gray-600 font-normal">.</span>
              </h1>
              <div className="flex items-center gap-6">
                <img
                  src={userData?.profile_pic}
                  className="w-12 h-12 grayscale border border-white/10 p-1 object-cover"
                  alt="PFP"
                />
                <div>
                  <p className="text-sm font-bold tracking-tight text-white mb-0.5 uppercase italic">
                    User / {userData?.username}
                  </p>
                  <p className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">
                    Status: Online
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 w-full lg:w-auto"
            >
              <button
                onClick={() => setShowTutorial(true)}
                className="px-6 py-4 bg-white/[0.03] border border-white/5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white/[0.07] transition-all flex items-center gap-3"
              >
                <FiCpu className="text-xs" /> Feature Guide
              </button>
              <button
                onClick={() => router.push(`/account/${id}/customize`)}
                className="px-8 py-4 bg-white text-black text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-gray-200 transition-all flex items-center gap-3"
              >
                <FaUserEdit /> Edit Profile
              </button>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 mb-24 overflow-hidden shadow-2xl">
            {[
              { label: "Total Views", value: analytics.totalViews, icon: FaEye, technical: "TOTAL_VIEWS" },
              { label: "Visitors", value: analytics.uniqueVisitors, icon: FaUsers, technical: "UNIQUE_VISITORS" },
              { label: "Followers", value: analytics.followers, icon: FaUserPlus, technical: "FOLLOWER_COUNT" },
              { label: "Following", value: analytics.following, icon: FiActivity, technical: "FOLLOWING_COUNT" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="bg-[#0E0E0E]/40 p-10 flex flex-col gap-6 relative group hover:bg-white/[0.02] transition-all duration-700"
              >
                <div className="flex justify-between items-start text-gray-600 group-hover:text-white transition-colors duration-500">
                  <stat.icon className="text-lg" />
                  <span className="text-[9px] font-mono tracking-widest uppercase opacity-40">{stat.technical}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold tracking-[0.3em] text-gray-500 mb-2 italic">
                    {stat.label}
                  </span>
                  <span className="text-4xl font-bold tracking-tighter">
                    {stat.value.toLocaleString()}
                  </span>
                </div>
                {/* Architectural Corner */}
                <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-4 right-4 w-px h-2 bg-white/20" />
                  <div className="absolute top-4 right-4 h-px w-2 bg-white/20" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Primary Graph */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="lg:col-span-2 bg-white/[0.02] border border-white/5 p-10 md:p-16 relative overflow-hidden group"
            >
              <div className="flex justify-between items-end mb-16">
                <div>
                  <h3 className="text-2xl font-bold italic mb-2">Growth Chart<span className="text-gray-600">.</span></h3>
                  <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-gray-600">Visualizing your views over time</p>
                </div>
                <div className="flex bg-white/[0.03] p-1 border border-white/5">
                  {['7', '30'].map((r) => (
                    <button
                      key={r}
                      onClick={() => setDateRange(r as any)}
                      className={`px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all ${dateRange === r ? "bg-white text-black" : "text-gray-500 hover:text-white"}`}
                    >
                      {r}D
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-[400px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={viewsOverTime}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="white" stopOpacity={0.05} />
                        <stop offset="95%" stopColor="white" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                    <XAxis
                      dataKey="date"
                      stroke="#222"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#444' }}
                    />
                    <YAxis
                      stroke="#222"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#444' }}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em' }}
                      itemStyle={{ color: '#fff' }}
                      cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                    />
                    <Area type="monotone" dataKey="views" stroke="white" strokeWidth={1} fillOpacity={1} fill="url(#colorViews)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Geometric Accents */}
              <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-20">
                <div className="absolute top-10 right-10 w-px h-16 bg-white/10" />
                <div className="absolute top-10 right-10 h-px w-16 bg-white/10" />
              </div>
            </motion.div>

            {/* Quick Actions / Status */}
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="bg-white/[0.03] border border-white/5 p-12 relative overflow-hidden group"
              >
                <h4 className="text-[10px] uppercase font-bold tracking-[0.4em] text-gray-600 mb-8 italic">System Status</h4>
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold italic text-gray-400">Account Security</span>
                    <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest">SECURE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold italic text-gray-400">Platform Ping</span>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">24ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold italic text-gray-400">Data Sync</span>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">UPDATED</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="p-12 bg-white text-black flex flex-col gap-8 group cursor-pointer hover:bg-gray-200 transition-all duration-700"
                onClick={() => router.push(`/dashboard/${userData?.username}`)}
              >
                <h4 className="text-[10px] uppercase font-bold tracking-[0.5em] mb-2">View Your Page</h4>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold tracking-tighter italic whitespace-nowrap overflow-hidden">sword.lol/{userData?.username}</span>
                  <FiArrowRight className="text-2xl group-hover:translate-x-2 transition-transform duration-700 flex-shrink-0" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Floating Meta Details */}
        <div className="fixed bottom-12 left-12 hidden lg:block z-[2]">
          <div className="text-[10px] font-mono font-bold tracking-[0.5em] text-gray-800 uppercase vertical-text italic">
            Dashboard / {new Date().getFullYear()}
          </div>
        </div>
        <div className="fixed bottom-12 right-12 hidden lg:block z-[2]">
          <div className="text-[10px] font-mono font-bold tracking-[0.5em] text-gray-800 uppercase vertical-text italic">
            Connection / Secure_SSL
          </div>
        </div>

        {/* Tutorial Overlay */}
        <AnimatePresence>
          {showTutorial && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-[#0E0E0E]/90 backdrop-blur-2xl flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-xl w-full bg-white/[0.02] border border-white/10 p-12 md:p-20 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
                  <div className="absolute top-10 right-10 w-px h-16 bg-white/20" />
                  <div className="absolute top-10 right-10 h-px w-16 bg-white/20" />
                </div>

                <span className="text-[10px] font-mono font-bold tracking-[0.5em] text-gray-500 uppercase mb-4 block italic">
                  Step / 0{tutorialStep + 1}
                </span>

                <h2 className="text-4xl font-bold italic mb-8 tracking-tighter">
                  {tutorialSteps[tutorialStep].title}<span className="text-gray-600 font-normal">.</span>
                </h2>

                <p className="text-gray-400 text-lg leading-relaxed mb-16 italic font-medium">
                  "{tutorialSteps[tutorialStep].description}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {tutorialSteps.map((_, i) => (
                      <div key={i} className={`h-1 w-8 transition-colors ${i === tutorialStep ? "bg-white" : "bg-white/10"}`} />
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      if (tutorialStep < tutorialSteps.length - 1) {
                        setTutorialStep(tutorialStep + 1);
                      } else {
                        setShowTutorial(false);
                        setTutorialStep(0);
                      }
                    }}
                    className="group flex items-center gap-6 px-10 py-5 bg-white text-black font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-gray-200 transition-all duration-700 shadow-xl"
                  >
                    {tutorialStep === tutorialSteps.length - 1 ? "Start Now" : "Continue"}
                    <FiArrowRight className="text-xs group-hover:translate-x-2 transition-transform duration-700" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <style jsx global>{`
                .vertical-text {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.05);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
            `}</style>
      </main>
    </div>
  );
};

export default AccountPage;
