"use client";

import { useEffect, useState, useRef, JSX } from "react";
import { useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { FiVolumeX, FiVolume2, FiMapPin, FiEye, FiArrowRight, FiMaximize2, FiMaximize } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { FaUserPlus, FaUserCheck, FaUsers, FaCrown, FaStar, FaGavel, FaUserShield, FaLaptopCode, FaBug, FaUserTie, FaBolt, FaFire, FaChessQueen, FaSkullCrossbones, FaServer, FaGamepad, FaTrophy, FaRocket, FaCrosshairs, FaTree, FaMoon, FaGhost, FaHeart, FaMedal, FaShieldAlt, FaUserSecret, FaYoutube, FaInstagram, FaTwitter, FaSnapchatGhost, FaGithub, FaTiktok, FaTelegram, FaDiscord, FaKickstarter, FaSpotify, FaSoundcloud, FaTwitch, FaLinkedin, FaSteam, FaPinterest, FaPatreon, FaBitcoin, FaEthereum, FaMonero, FaAddressCard, FaUserFriends, FaHandshake, FaGem, FaCertificate } from "react-icons/fa";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import CursorEffects from "@/components/CursorEffects";
import Link from "next/link";
import Bowser from "bowser";
import { useSession } from "next-auth/react";

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

const badgeIcons: Record<string, JSX.Element> = {
    Owner: <FaCrown />,
    "Co-Owner": <FaStar />,
    Admin: <FaGavel />,
    Moderator: <FaUserShield />,
    "Support Team": <FaLaptopCode />,
    "Bug Hunter": <FaBug />,
    Helper: <FaUserTie />,
    OG: <FaBolt />,
    Legendary: <FaFire />,
    Elite: <FaChessQueen />,
    Veteran: <FaSkullCrossbones />,
    "Server Booster": <FaServer />,
    "Top Contributor": <FaGavel />,
    "Pro Gamer": <FaGamepad />,
    "Esports Champion": <FaTrophy />,
    Speedrunner: <FaRocket />,
    "Top Fragger": <FaCrosshairs />,
    "Christmas 2024": <FaTree />,
    "Ramzan Mubarak": <FaMoon />,
    "Halloween 2024": <FaGhost />,
    "Valentine's 2025": <FaHeart />,
    Winner: <FaTrophy />,
    "Second Place": <FaMedal />,
    "Third Place": <FaMedal />,
    "Beta Tester": <FaShieldAlt />,
    "Server OG": <FaUserSecret />,
    "Owners Friend": <FaUserFriends />,
    "Close Owner Friend": <FaHandshake />,
};

const socialIcons = {
    youtube: <FaYoutube />,
    instagram: <FaInstagram />,
    twitter: <FaTwitter />,
    snapchat: <FaSnapchatGhost />,
    github: <FaGithub />,
    tiktok: <FaTiktok />,
    telegram: <FaTelegram />,
    discord: <FaDiscord />,
    kick: <FaKickstarter />,
    spotify: <FaSpotify />,
    soundcloud: <FaSoundcloud />,
    twitch: <FaTwitch />,
    linkedin: <FaLinkedin />,
    steam: <FaSteam />,
    pinterest: <FaPinterest />,
    patreon: <FaPatreon />,
    bitcoin: <FaBitcoin />,
    ethereum: <FaEthereum />,
    monero: <FaMonero />,
    customurl: <FaAddressCard />,
};

const UserPage = () => {
    const { username } = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const [userData, setUserData] = useState<any>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(50);
    const [isBlurred, setIsBlurred] = useState(true);
    const [views, setViews] = useState(0);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [followersModal, setFollowersModal] = useState(false);
    const [followingModal, setFollowingModal] = useState(false);
    const [followersList, setFollowersList] = useState<any[]>([]);
    const [followingList, setFollowingList] = useState<any[]>([]);
    const [followLoading, setFollowLoading] = useState(false);


    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left - width / 2);
        y.set(clientY - top - height / 2);
    }

    const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
    const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);
    const rotateXSpring = useSpring(rotateX, { stiffness: 300, damping: 30 });
    const rotateYSpring = useSpring(rotateY, { stiffness: 300, damping: 30 });

    // Rare Border Logic
    let borderColor = "border-white/5"; // Default
    let shadowColor = "shadow-[0_0_100px_rgba(0,0,0,0.5)]";

    if (userData?.is_verified || userData?.is_admin || userData?.badges?.includes("Owner")) {
        borderColor = "border-cyan-500/30";
        shadowColor = "shadow-[0_0_80px_rgba(6,182,212,0.15)]";
    } else if ((userData?.views_count || 0) > 1000) {
        borderColor = "border-yellow-500/30";
        shadowColor = "shadow-[0_0_80px_rgba(234,179,8,0.15)]";
    } else if (userData?.badges?.includes("OG")) {
        borderColor = "border-purple-500/30";
        shadowColor = "shadow-[0_0_80px_rgba(168,85,247,0.15)]";
    }

    const playerRef = useRef<any>(null);

    useEffect(() => {
        if (!username) return;
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/users/${username}`, { cache: 'no-store' });
                if (!res.ok) {
                    router.push("/404");
                    return;
                }
                const data = await res.json();
                setUserData(data);
                setViews(data.views_count || 0);
                setFollowersCount(data.followers_count || 0);
                setFollowingCount(data.following_count || 0);
                setIsFollowing(data.isFollowing || false);

                // Log view
                const browserInfo = Bowser.getParser(window.navigator.userAgent);
                await fetch("/api/profile-view", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: data.id,
                        viewerId: session?.user ? (session.user as any).id : null,
                        country: "Unknown", // Can be enhanced with IP API if needed
                        device: browserInfo.getPlatformType(),
                        browser: browserInfo.getBrowserName(),
                    }),
                });
            } catch (error) {
                console.error("Error fetching user or logging view:", error);
                router.push("/404");
            }
        };
        fetchUser();
    }, [username, router, session]);

    useEffect(() => {
        if (!userData?.background_video) return;
        const loadYouTubeAPI = () => {
            if (window.YT && window.YT.Player) {
                createPlayer();
            } else {
                const script = document.createElement("script");
                script.src = "https://www.youtube.com/iframe_api";
                script.async = true;
                document.body.appendChild(script);
                window.onYouTubeIframeAPIReady = createPlayer;
            }
        };
        const createPlayer = () => {
            const match = userData.background_video.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/v\/|.*\/embed\/|.*\/shorts\/))([\w-]{11})/);
            const videoId = match ? match[1] : null;
            if (!videoId) return;
            playerRef.current = new window.YT.Player("youtube-player", {
                videoId,
                playerVars: {
                    autoplay: 1, loop: 1, playlist: videoId, mute: isMuted ? 1 : 0,
                    controls: 0, disablekb: 1, modestbranding: 1, rel: 0, showinfo: 0, iv_load_policy: 3, playsinline: 1
                },
                events: {
                    onReady: (event: any) => { event.target.setVolume(volume); }
                }
            });
        };
        loadYouTubeAPI();
    }, [userData?.background_video]);

    useEffect(() => {
        if (session?.user) setCurrentUser({ id: (session.user as any).id, username: session.user.name });
    }, [session]);

    const toggleMute = () => {
        if (playerRef.current) {
            if (isMuted) playerRef.current.unMute();
            else playerRef.current.mute();
            setIsMuted(!isMuted);
        }
    };

    const handleFollow = async () => {
        if (!currentUser?.id || !userData?.id) return;
        setFollowLoading(true);
        try {
            const response = await fetch('/api/follow', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ followerId: currentUser.id, followingId: userData.id, action: isFollowing ? 'unfollow' : 'follow' }),
            });
            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    setIsFollowing(result.action === 'followed');
                    setFollowersCount((c) => result.action === 'followed' ? c + 1 : c - 1);
                }
            }
        } catch { } finally { setFollowLoading(false); }
    };

    const fetchFollowersList = async () => {
        if (!userData?.id) return;
        try {
            const response = await fetch(`/api/follow?userId=${userData.id}&type=followers`);
            if (response.ok) {
                const result = await response.json();
                setFollowersList(result.users || []);
            }
        } catch (error) {
            console.error('Failed to fetch followers:', error);
        }
    };

    const fetchFollowingList = async () => {
        if (!userData?.id) return;
        try {
            const response = await fetch(`/api/follow?userId=${userData.id}&type=following`);
            if (response.ok) {
                const result = await response.json();
                setFollowingList(result.users || []);
            }
        } catch (error) {
            console.error('Failed to fetch following:', error);
        }
    };

    return (
        <div className={`relative w-full min-h-screen flex items-center justify-center bg-black text-white selection:bg-white selection:text-black`}>
            <CursorEffects effect={userData?.cursor_effect || "none"} />

            {/* Background Video Layer */}
            {userData?.background_video && (
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
                    <div id="youtube-player" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[100vw] min-h-[100vh] scale-110 blur-[1px]" />
                </div>
            )}

            {/* Stage 3: Ambient Shading */}
            <div className="absolute inset-0 pointer-events-none z-[1]">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/[0.03] blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.03] blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
            </div>

            {/* Global Grain Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay z-[2] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-[1]"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }}
            />

            <AnimatePresence>
                {isBlurred && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black backdrop-blur-3xl flex items-center justify-center cursor-pointer overflow-hidden"
                        onClick={() => setIsBlurred(false)}
                    >
                        {/* Background Scanning Line */}
                        <motion.div
                            animate={{ y: ["0%", "100%", "0%"] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-x-0 h-px bg-white/[0.05] z-[1] shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        />

                        {/* Top Left Meta Data */}
                        <div className="absolute top-12 left-12 space-y-2 opacity-30 hidden md:block">
                            <p className="text-[8px] font-mono tracking-[0.4em] font-bold">INIT_SEQUENCE / SWORD_CORE</p>
                            <div className="h-px w-8 bg-white/40" />
                            <p className="text-[8px] font-mono tracking-[0.3em]">ENCRYPTION / RSA_4096</p>
                        </div>

                        {/* Bottom Right Meta Data */}
                        <div className="absolute bottom-12 right-12 space-y-2 opacity-30 text-right hidden md:block">
                            <p className="text-[8px] font-mono tracking-[0.4em] font-bold uppercase">LOC / {userData?.location || "GLOBAL"}</p>
                            <div className="h-px w-8 bg-white/40 ml-auto" />
                            <p className="text-[8px] font-mono tracking-[0.3em]">ESTABLISHING_DATALINK</p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative z-10 flex flex-col items-center gap-12 group"
                        >
                            {/* Central Heartbeat Hub */}
                            <div className="relative flex items-center justify-center">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute w-24 h-24 bg-white/10 rounded-full blur-xl"
                                />
                                <div className="w-12 h-12 border border-white/20 flex items-center justify-center text-[10px] font-bold tracking-tighter transition-all duration-700 group-hover:bg-white group-hover:text-black">
                                    S
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-6">
                                <span className="text-[10px] uppercase font-bold tracking-[0.6em] text-gray-400 group-hover:text-white transition-colors italic">Enter Architecture</span>
                                <div className="flex items-center gap-3">
                                    <div className="h-px w-8 bg-white/5 group-hover:w-16 transition-all duration-700" />
                                    <span className="text-[8px] font-mono text-gray-600 tracking-widest uppercase animate-pulse">Waiting for synchronization</span>
                                    <div className="h-px w-8 bg-white/5 group-hover:w-16 transition-all duration-700" />
                                </div>
                            </div>

                            {/* Corner Guards */}
                            <div className="absolute -inset-16 pointer-events-none">
                                <div className="absolute top-0 left-0 w-4 h-[1px] bg-white/10" />
                                <div className="absolute top-0 left-0 w-[1px] h-4 bg-white/10" />
                                <div className="absolute bottom-0 right-0 w-4 h-[1px] bg-white/10" />
                                <div className="absolute bottom-0 right-0 w-[1px] h-4 bg-white/10" />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Audio Control */}
            <motion.button
                onClick={toggleMute}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed top-10 left-10 z-[60] p-4 bg-black/20 border border-white/5 backdrop-blur-xl group hover:border-white/20 transition-all rounded-full"
            >
                {isMuted ? <FiVolumeX className="text-gray-500 group-hover:text-white transition-colors" /> : <FiVolume2 className="text-white" />}
            </motion.button>

            {/* Main Profile Frame */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    rotateX: rotateXSpring,
                    rotateY: rotateYSpring,
                    transformStyle: "preserve-3d",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => {
                    x.set(0);
                    y.set(0);
                }}
                className={`relative z-10 w-full max-w-xl my-8 p-8 md:p-12 bg-white/[0.02] backdrop-blur-3xl rounded-none transition-colors duration-500 border ${borderColor} ${shadowColor}`}
            >
                {/* Subtle Architectural Accents */}
                <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
                    <div className="absolute top-6 right-6 w-[1px] h-12 bg-white/10" />
                    <div className="absolute top-6 right-6 h-[1px] w-12 bg-white/10" />
                </div>
                <div className="absolute bottom-0 left-0 w-24 h-24 pointer-events-none">
                    <div className="absolute bottom-6 left-6 w-[1px] h-12 bg-white/10" />
                    <div className="absolute bottom-6 left-6 h-[1px] w-12 bg-white/10" />
                </div>

                {/* Profile Header */}
                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-10 group">
                        <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full scale-110 group-hover:scale-150 transition-transform duration-1000" />
                        <img
                            src={userData?.profile_pic}
                            alt="Entity"
                            className="relative w-32 h-32 md:w-40 md:h-40 transition-all duration-700 rounded-none border border-white/10 p-2 bg-black object-cover"
                        />
                    </div>

                    <h1 className={`text-4xl md:text-5xl font-bold tracking-tighter mb-4 italic flex items-center justify-center gap-2 
                        ${userData?.is_verified ? "bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent" : "text-white"}
                        ${userData?.views_count > 5000 ? "bg-gradient-to-r from-yellow-100 via-yellow-400 to-yellow-100 bg-clip-text text-transparent" : ""}
                    `}>
                        {userData?.username}
                        {userData?.is_verified && (
                            <MdVerified className="text-blue-500 text-2xl md:text-3xl" />
                        )}
                        <span className="text-gray-600 font-normal">.</span>
                    </h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-wrap justify-center gap-4 items-center mb-10"
                    >
                        {/* OG Badge Logic: auto-inject for demonstration or if in data */}
                        {userData?.created_at && new Date(userData.created_at).getFullYear() < 2024 && !userData.badges?.includes("OG") && (
                            <div className="px-5 py-2.5 bg-yellow-500/10 border border-yellow-500/20 text-[10px] uppercase font-bold tracking-[0.25em] text-yellow-500 flex items-center gap-2">
                                <FaBolt /> OG_MEMBER
                            </div>
                        )}

                        {userData?.badges?.map((badge: string, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 1 + (i * 0.15),
                                    duration: 1.2,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                className="group relative"
                            >
                                {/* Floating Container */}
                                <motion.div
                                    animate={{
                                        y: [0, -6, 0],
                                        rotateZ: [0, 1, 0, -1, 0]
                                    }}
                                    transition={{
                                        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
                                        rotateZ: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }
                                    }}
                                    className="flex items-center gap-3 px-5 py-2.5 bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-none hover:border-white/40 hover:bg-white/[0.06] transition-all duration-700 relative overflow-hidden"
                                >
                                    {/* Luminous Glow Background */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                    <div className="text-white/60 group-hover:text-white transition-colors duration-500 text-sm relative z-10">
                                        {badgeIcons[badge] || badgeIcons["Winner"]}
                                    </div>
                                    <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-gray-500 group-hover:text-white transition-all duration-500 italic relative z-10">
                                        {badge}
                                    </span>

                                    {/* Architectural Corners */}
                                    <div className="absolute top-0 left-0 w-1 h-[1px] bg-white/20 group-hover:w-full transition-all duration-700" />
                                    <div className="absolute bottom-0 right-0 w-1 h-[1px] bg-white/20 group-hover:w-full transition-all duration-700" />
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <p className="text-gray-400 font-normal leading-relaxed mb-12 italic text-lg max-w-sm">
                        "{userData?.bio || "No description provided."}"
                    </p>

                    {/* Widgets & Integrations Section */}
                    <div className="w-full space-y-8 mb-12">
                        {/* Discord Profile Card */}
                        {userData?.discord_id && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="relative group overflow-hidden"
                            >
                                {/* Animated Gradient Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />

                                <div className="relative z-10 bg-white/[0.02] border border-white/5 backdrop-blur-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-blue-500/20 transition-all duration-700">
                                    <div className="flex items-center gap-6 w-full md:w-auto">
                                        <div className="relative flex-shrink-0">
                                            {/* Avatar Glow */}
                                            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                            <img
                                                src={`https://cdn.discordapp.com/avatars/${userData.discord_id}/${userData.discord_avatar}.png`}
                                                className="relative w-16 h-16 border border-white/10 p-1.5 bg-black/40 backdrop-blur-md transform transition-transform duration-700 group-hover:scale-105"
                                                alt="Discord Entity"
                                            />

                                            {/* Platform Icon Overlay */}
                                            <div className="absolute -bottom-2 -right-2 bg-[#5865F2] p-1.5 shadow-xl border border-white/10 flex items-center justify-center">
                                                <FaDiscord className="text-[10px] text-white" />
                                            </div>
                                        </div>

                                        <div className="text-left space-y-1.5">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <p className="text-lg font-bold italic tracking-tight text-white/90 group-hover:text-white transition-colors">
                                                    {userData.discord_username}
                                                </p>

                                                {/* Discord Badges Container */}
                                                <div className="flex items-center gap-1.5 bg-white/[0.03] px-2 py-1 border border-white/5 backdrop-blur-sm">
                                                    {(() => {
                                                        const badges = [];
                                                        const flags = userData.discord_public_flags || 0;
                                                        const premium = userData.discord_premium_type || 0;

                                                        if (flags & (1 << 0)) badges.push(<FaCrown className="text-yellow-500" title="Discord Staff" key="staff" />);
                                                        if (flags & (1 << 1)) badges.push(<FaStar className="text-yellow-400" title="Partner" key="partner" />);
                                                        if (flags & (1 << 2)) badges.push(<FaBolt className="text-yellow-300" title="HypeSquad Events" key="h-events" />);
                                                        if (flags & (1 << 3)) badges.push(<FaBug className="text-green-500" title="Bug Hunter L1" key="bug1" />);
                                                        if (flags & (1 << 6)) badges.push(<FaBolt className="text-blue-400" title="Bravery" key="bravery" />);
                                                        if (flags & (1 << 7)) badges.push(<FaBolt className="text-red-400" title="Brilliance" key="brilliance" />);
                                                        if (flags & (1 << 8)) badges.push(<FaBolt className="text-pink-400" title="Balance" key="balance" />);
                                                        if (flags & (1 << 9)) badges.push(<FaStar className="text-blue-300" title="Early Supporter" key="early" />);
                                                        if (flags & (1 << 14)) badges.push(<FaBug className="text-yellow-600" title="Bug Hunter L2" key="bug2" />);
                                                        if (flags & (1 << 17)) badges.push(<FaCertificate className="text-blue-500" title="Verified Developer" key="vdev" />);
                                                        if (flags & (1 << 18)) badges.push(<FaUserShield className="text-gray-400" title="Certified Mod" key="mod" />);
                                                        if (flags & (1 << 22)) badges.push(<FaLaptopCode className="text-white" title="Active Developer" key="adev" />);
                                                        if (premium > 0) badges.push(<FaGem className="text-pink-500 animate-pulse" title="Nitro" key="nitro" />);

                                                        return badges.map((Icon: any, idx) => (
                                                            <span key={idx} className="text-[12px] transform hover:scale-125 transition-transform duration-300 cursor-help hover:brightness-125">
                                                                {Icon}
                                                            </span>
                                                        ));
                                                    })()}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                                                <p className="text-[9px] uppercase font-bold tracking-[0.3em] text-blue-400/80 group-hover:text-blue-400 transition-colors">Discord Sync Active</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Architectural Accents */}
                                    <div className="hidden md:block absolute top-0 left-0 w-8 h-[1px] bg-white/10 group-hover:w-16 transition-all duration-700" />
                                    <div className="hidden md:block absolute bottom-0 right-0 w-8 h-[1px] bg-white/10 group-hover:w-16 transition-all duration-700" />
                                </div>
                            </motion.div>
                        )}

                        {/* Custom Widgets */}
                        {userData?.widgets?.map((widget: any, i: number) => (
                            <div key={i} className="w-full">
                                {widget.type === "spotify" && (
                                    <div className="bg-green-500/5 border border-green-500/10 p-1 group hover:bg-green-500/10 transition-all duration-500">
                                        <iframe
                                            style={{ borderRadius: "0px" }}
                                            src={`https://open.spotify.com/embed${new URL(widget.url).pathname}`}
                                            width="100%"
                                            height="152"
                                            frameBorder="0"
                                            allowFullScreen
                                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                            loading="lazy"
                                        />
                                    </div>
                                )}

                                {widget.type === "github" && (
                                    <div className="bg-white/5 border border-white/10 p-6 flex flex-col gap-4 group hover:bg-white/10 transition-all duration-500">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <FaGithub className="text-xl" />
                                                <span className="text-xs font-bold italic tracking-tight">@{widget.username}</span>
                                            </div>
                                            <a
                                                href={`https://github.com/${widget.username}`}
                                                target="_blank"
                                                className="text-[9px] uppercase font-bold tracking-widest text-gray-500 hover:text-white transition-colors"
                                            >
                                                View Source
                                            </a>
                                        </div>
                                        {/* Simple visualization for GitHub contributions or similar could go here */}
                                        <div className="flex gap-px opacity-20">
                                            {Array.from({ length: 24 }).map((_, j) => (
                                                <div key={j} className={`flex-1 h-3 ${Math.random() > 0.5 ? 'bg-green-500' : 'bg-white/10'}`} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Stats Bar */}
                    <div className="grid grid-cols-3 gap-px bg-white/5 border border-white/5 w-full mb-12 overflow-hidden">
                        <div className="bg-black/40 p-6 flex flex-col gap-1 items-center">
                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-600 italic">Views</span>
                            <span className="text-lg font-bold">{views}</span>
                        </div>
                        <button onClick={() => { setFollowersModal(true); fetchFollowersList(); }} className="bg-black/40 p-6 flex flex-col gap-1 items-center hover:bg-white/5 transition-colors">
                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-600 italic">Followers</span>
                            <span className="text-lg font-bold">{followersCount}</span>
                        </button>
                        <button onClick={() => { setFollowingModal(true); fetchFollowingList(); }} className="bg-black/40 p-6 flex flex-col gap-1 items-center hover:bg-white/5 transition-colors">
                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-600 italic">Following</span>
                            <span className="text-lg font-bold">{followingCount}</span>
                        </button>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-wrap justify-center gap-8 mb-12">
                        {Object.entries(userData?.social_links || {}).map(([platform, url]) => (
                            <a
                                key={platform}
                                href={url as string}
                                target="_blank"
                                className="text-gray-500 hover:text-white hover:scale-125 transition-all text-xl"
                            >
                                {socialIcons[platform as keyof typeof socialIcons]}
                            </a>
                        ))}
                    </div>

                    {/* Primary Action */}
                    {currentUser && currentUser.id !== userData?.id ? (
                        <button
                            disabled={followLoading}
                            onClick={handleFollow}
                            className={`w-full py-5 text-[10px] uppercase font-bold tracking-[0.4em] transition-all duration-700 flex items-center justify-center gap-4 group/btn overflow-hidden relative
                 ${isFollowing
                                    ? "bg-transparent border border-white/10 text-white hover:border-white/30"
                                    : "bg-white text-black hover:bg-gray-200"
                                }`}
                        >
                            <span className="relative z-10">{followLoading ? "Processing..." : isFollowing ? "Verified Identity" : "Follow Entity"}</span>
                            {!isFollowing && <FiArrowRight className="transition-transform group-hover/btn:translate-x-2" />}
                        </button>
                    ) : (
                        <div className="w-full flex justify-center py-4 text-[10px] uppercase font-bold tracking-[0.5em] text-gray-800">
                            Authenticated Entity
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Floating Meta Details */}
            <div className="fixed bottom-12 left-12 hidden lg:block z-[2]">
                <div className="text-[10px] font-mono font-bold tracking-[0.5em] text-gray-800 uppercase vertical-text">Profile ID / {userData?.id?.slice(0, 8)}</div>
            </div>
            <div className="fixed bottom-12 right-12 hidden lg:block z-[2]">
                <div className="text-[10px] font-mono font-bold tracking-[0.5em] text-gray-800 uppercase vertical-text">
                    {userData?.location ? `LOC / ${userData.location.toUpperCase()}` : "LOC / GLOBAL"}
                </div>
            </div>

            {/* Platform Promotion Mark */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-2">
                <Link href="/" className="group flex flex-col items-center gap-3">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 px-6 py-2 bg-black/40 border border-white/10 backdrop-blur-xl group-hover:border-white/40 transition-all duration-700"
                    >
                        <div className="w-6 h-6 bg-white text-black flex items-center justify-center font-bold text-xs">S</div>
                        <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-white/60 group-hover:text-white transition-colors uppercase">
                            SWORD.LOL
                        </span>
                    </motion.div>
                    <div className="h-px w-12 bg-white/20 group-hover:w-24 transition-all duration-1000" />
                </Link>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {(followersModal || followingModal) && (
                    <AlertDialog open={true} onOpenChange={() => { setFollowersModal(false); setFollowingModal(false); }}>
                        <AlertDialogContent className="bg-black border border-white/5 rounded-none p-12 max-w-lg backdrop-blur-3xl">
                            <h3 className="text-[10px] uppercase font-bold tracking-[0.4em] text-gray-500 mb-10 italic">
                                {followersModal ? "Network / Followers" : "Network / Following"}
                            </h3>
                            <div className="max-h-[40vh] overflow-y-auto space-y-6 pr-4 custom-scrollbar">
                                {(followersModal ? followersList : followingList).map((user) => (
                                    <Link
                                        href={`/${user.username}`}
                                        key={user.id}
                                        className="flex items-center justify-between group"
                                        onClick={() => { setFollowersModal(false); setFollowingModal(false); }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <img src={user.profile_pic} className="w-8 h-8 rounded-none border border-white/10 transition-all object-cover" />
                                            <span className="text-sm font-bold tracking-tight italic">{user.username}</span>
                                        </div>
                                        <FiArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-gray-500" />
                                    </Link>
                                ))}
                                {(followersModal ? followersList : followingList).length === 0 && (
                                    <div className="text-gray-700 text-[10px] uppercase tracking-widest italic">No entities found.</div>
                                )}
                            </div>
                            <button
                                onClick={() => { setFollowersModal(false); setFollowingModal(false); }}
                                className="mt-12 w-full py-4 border border-white/5 text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-white hover:border-white/20 transition-all"
                            >
                                Return
                            </button>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </AnimatePresence>

            <style jsx global>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
        </div>
    );
};

export default UserPage;