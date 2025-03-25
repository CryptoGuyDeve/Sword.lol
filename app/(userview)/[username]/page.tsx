"use client";

import { useEffect, useState, useRef, JSX } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { AnimatePresence, motion } from "framer-motion";
import { FiVolumeX, FiVolume2, FiMapPin, FiEye } from "react-icons/fi";

import {
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaSnapchatGhost,
  FaGithub,
  FaTiktok,
  FaTelegram,
  FaDiscord,
  FaSpotify,
  FaSoundcloud,
  FaFacebook,
  FaUserShield, FaBolt, FaTrophy, FaMedal, FaBug, FaServer,
  FaTree, FaMoon, FaCrown, FaUserSecret, FaGavel, FaLaptopCode,
  FaShieldAlt, FaGamepad, FaUserTie, FaSkullCrossbones, FaHeart,
  FaFire, FaChessQueen, FaGhost, FaRocket, FaCrosshairs, FaStar,
  FaKickstarter,
  FaTwitch,
  FaLinkedin,
  FaSteam,
  FaPinterest,
  FaPatreon,
  FaBitcoin,
  FaEthereum,
  FaMonero,
  FaAddressCard
} from "react-icons/fa";
import Views from "@/components/views";


declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const badgeIcons: Record<string, JSX.Element> = {
  // Staff Roles
  "Owner": <FaCrown />,
  "Co-Owner": <FaStar />, // Replaced with a star icon
  "Admin": <FaGavel />, // Using gavel as admin authority
  "Moderator": <FaUserShield />,
  "Support Team": <FaLaptopCode />,
  "Bug Hunter": <FaBug />,
  "Helper": <FaUserTie />,

  // Rank Roles
  "OG": <FaBolt />,
  "Legendary": <FaFire />,
  "Elite": <FaChessQueen />,
  "Veteran": <FaSkullCrossbones />,
  "Server Booster": <FaServer />,
  "Top Contributor": <FaGavel />,

  // Gaming Roles
  "Pro Gamer": <FaGamepad />,
  "Esports Champion": <FaTrophy />,
  "Speedrunner": <FaRocket />, // Replaced with rocket icon
  "Top Fragger": <FaCrosshairs />, // Now using the correct icon from Fa

  // Event-Specific Badges
  "Christmas 2024": <FaTree />,
  "Ramzan Mubarak": <FaMoon />,
  "Halloween 2024": <FaGhost />,
  "Valentine's 2025": <FaHeart />,

  // Achievement Badges
  "Winner": <FaTrophy />,
  "Second Place": <FaMedal />,
  "Third Place": <FaMedal />,
  "Beta Tester": <FaShieldAlt />,
  "Server OG": <FaUserSecret />,
};


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const UserPage = () => {
  const { username } = useParams();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(50);
  const [showControls, setShowControls] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isBlurred, setIsBlurred] = useState(true);
  const [views, setViews] = useState(0);
  type SocialPlatform = keyof typeof socialIcons;

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


  useEffect(() => {
    if (!username) return;

    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select(
          "id, username, profile_pic, bio, theme, background_video, location, profile_views, social_links, badges"
        )
        .eq("username", username)
        .single();

      if (error || !data) {
        router.push("/404");
        return;
      }

      setUserData(data);
      await incrementProfileViews(data.id);
    };

    fetchUser();
  }, [username]);

  const incrementProfileViews = async (userId: string) => {
    await supabase
      .from("users")
      .update({ profile_views: (userData?.profile_views || 0) + 1 })
      .eq("id", userId);
  };

  const getVideoId = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/v\/|.*\/embed\/|.*\/shorts\/))([\w-]{11})/
    );
    return match ? match[1] : null;
  };

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
      const videoId = getVideoId(userData.background_video);
      if (!videoId) return;

      playerRef.current = new window.YT.Player("youtube-player", {
        videoId,
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: videoId, // Required for proper looping
          mute: 0, // Start with sound
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          playsinline: 1,
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(volume);
            event.target.unMute();
          },
        },
      });
    };

    loadYouTubeAPI();
  }, [userData?.background_video]);

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (!userData?.id) return; // Ensure user has a valid ID

    const storageKey = `page_views_${userData.id}`; // Unique key for each user
    let count = parseInt(localStorage.getItem(storageKey) || "0");

    count += 1; // Increment the count

    localStorage.setItem(storageKey, count.toString()); // Save new count
    setViews(count); // Update state
  }, [userData?.id]);



  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();

    const x = (e.clientX - (left + width / 2)) / (width / 2);
    const y = (e.clientY - (top + height / 2)) / (height / 2);

    const rotateXValue = y * -20;
    const rotateYValue = x * 20;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const renderSocialIcons = (socialLinks: any) => {
    return Object.entries(socialLinks || {}).map(([platform, url]) => (
      <a
        key={platform}
        href={url as string}
        target="_blank"
        rel="noopener noreferrer"
        className="text-4xl m-2 hover:scale-110 transition-all duration-200"
        style={{
          color: "white",
          textShadow: "0 0 15px rgba(255, 255, 255, 0.8)",
        }}
      >
        {socialIcons[platform as SocialPlatform]}
      </a>
    ));
  };

  const handleScreenClick = () => {
    setIsBlurred(false);
  };

  return (
    <div
      className={`relative w-full min-h-screen flex items-center justify-center ${userData?.theme === "light" ? "bg-white text-black" : "bg-black text-white"
        }`}
      onClick={handleScreenClick}
    >
      {userData?.background_video && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* YouTube Video Fullscreen */}
          <div
            id="youtube-player"
            className="absolute inset-0 w-full h-full"
            style={{
              width: "100vw",
              height: "56.25vw", // 16:9 Aspect Ratio
              minHeight: "100vh",
              minWidth: "177.78vh", // Ensures Full Coverage
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>
      )}

      <AnimatePresence>
        {isBlurred && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center text-white text-4xl cursor-pointer z-20"
          >
            [Click Here]
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-4 left-4 z-10 bg-black/50 p-3 rounded-lg">
        <button onClick={toggleMute} className="text-white text-3xl">
          {!isMuted ? <FiVolume2 /> : <FiVolumeX />}
        </button>
      </div>

      <motion.div
        className="absolute top-4 left-4 flex flex-col items-center bg-black/50 p-3 rounded-lg z-10"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <button onClick={toggleMute} className="text-white text-3xl">
          {isMuted ? <FiVolumeX /> : <FiVolume2 />}
        </button>
      </motion.div>

      <div className="relative w-full min-h-screen flex items-center justify-center" style={{ perspective: "1000px" }}>
        {/* Background Video */}
        {userData?.background_video && (
          <div className="absolute top-0 left-0 w-full h-full z-0">
            <div
              id="youtube-player"
              className="w-full h-full absolute top-0 left-0 blur-[6px] opacity-50 sm:blur-[4px]"
            ></div>
          </div>
        )}

        {/* Profile Card */}
        <motion.div
          ref={cardRef}
          className="relative z-10 p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-3xl 
             shadow-[0_4px_40px_rgba(255,255,255,0.3)] border border-white/20 
             text-center transition-all duration-500 hover:scale-105 
             w-[95%] max-w-[380px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[600px]"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Floating Soft Glow */}
          <div className="absolute inset-0 w-full h-full rounded-3xl bg-white/10 blur-[120px] opacity-30"></div>

          {/* Profile Picture with 3D Glow */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 w-32 h-32 sm:w-36 sm:h-36 bg-white/20 blur-3xl opacity-50 rounded-full animate-pulse"></div>
            <img
              src={userData?.profile_pic}
              alt="Profile"
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full border-[5px] border-white/50 
                 shadow-lg transition-transform duration-300 
                 hover:scale-110 hover:border-white/70"
            />
          </div>

          {/* Username with Elegant Glow */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-5 bg-gradient-to-r from-white to-gray-300 
                 text-transparent bg-clip-text tracking-wide drop-shadow-2xl leading-tight">
            {userData?.username}
          </h2>

          {/* Badges Section with Hover Effects */}
          <div className="flex flex-wrap justify-center mt-3 gap-2 sm:gap-3">
            {userData?.badges?.map((badge: string, index: number) => (
              <span
                key={index}
                className="flex items-center gap-2 text-xs sm:text-sm md:text-md font-semibold px-4 py-1 sm:px-5 sm:py-2 
                 bg-white/10 border border-white/30 rounded-full text-white shadow-lg 
                 transition-all duration-500 hover:bg-white/20 hover:shadow-xl hover:scale-105"
              >
                {badgeIcons[badge]} {badge}
              </span>
            ))}
          </div>

          {/* Bio Section - Emotional & Engaging */}
          <p className="text-white text-sm sm:text-lg md:text-xl mt-3 opacity-90 tracking-wide leading-relaxed italic">
            "{userData?.bio}"
          </p>

          {/* Location with Floating Glow Effect */}
          {userData?.location && (
            <div className="mt-5 flex items-center justify-center text-gray-300">
              <FiMapPin className="mr-2 text-lg sm:text-xl md:text-2xl text-red-400 animate-bounce" />
              <span className="text-sm sm:text-lg md:text-xl font-medium">{userData.location}</span>
            </div>
          )}

          {/* Social Icons with Smooth Glow & Tap Effects */}
          <div className="flex items-center justify-center gap-5 sm:gap-6 mt-6">
            {renderSocialIcons(userData?.social_links)}
          </div>

          <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white/70 text-sm sm:text-md md:text-lg font-semibold">
            <FiEye className="text-white text-lg sm:text-xl md:text-2xl animate-pulse" />
            <span>{views}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserPage;
