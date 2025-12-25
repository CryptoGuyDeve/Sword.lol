"use client";

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { FaCheckCircle, FaCrown, FaRocket, FaStar, FaExclamationTriangle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiTarget, FiZap, FiLayout, FiType, FiLayers, FiSearch, FiServer, FiShield, FiStar, FiActivity, FiArrowLeft, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (plan: 'basic' | 'premium') => {
    if (!session || !session.user) {
      router.push('/signup');
      return;
    }
    const user = session.user as any;

    setLoading(true);
    setError(null);

    try {
      const storeId = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID;
      const variantId = plan === 'premium'
        ? process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PREMIUM_VARIANT_ID
        : process.env.NEXT_PUBLIC_LEMON_SQUEEZY_BASIC_VARIANT_ID;

      if (!storeId || !variantId) {
        setError('Configuration Node Error: System variables not found.');
        return;
      }

      const checkoutUrl = `https://checkout.lemonsqueezy.com/checkout/buy/${variantId}?store=${storeId}&checkout[email]=${encodeURIComponent(user.email)}&checkout[custom][user_id]=${user.id}&checkout[custom][plan_name]=${plan}&checkout[redirect_url]=${encodeURIComponent(window.location.origin + '/account/' + user.id)}`;

      window.location.href = checkoutUrl;
    } catch (err) {
      console.error('Subscription error:', err);
      setError('Connection Protocol Failed. Please retry calibration.');
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
      name: "Standard",
      price: "0",
      description: "Essential synchronization tools for baseline network presence.",
      icon: <FiTarget />,
      features: [
        { name: "Basic Calibration", icon: <FiZap /> },
        { name: "Visual Effects V1", icon: <FiLayers /> },
        { name: "Link Aggregation", icon: <FiLayout /> },
      ],
      cta: "Initialize Node",
      popular: false
    },
    {
      name: "Architect",
      price: "5",
      description: "Advanced broadcast capabilities with high-density customization.",
      icon: <FiShield />,
      features: [
        { name: "Exclusive Network Badge", icon: <FiStar /> },
        { name: "Dynamic Layout Modules", icon: <FiLayout /> },
        { name: "Custom Typographic Sets", icon: <FiType /> },
        { name: "Typewriter Simulation", icon: <FiActivity /> },
        { name: "Advanced Metadata & SEO", icon: <FiSearch /> },
        { name: "Unlimited Asset Hosting", icon: <FiServer /> },
        { name: "Priority Link Calibration", icon: <FiArrowLeft className="rotate-180" /> },
      ],
      cta: "Upgrade Protocol",
      popular: true
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#0E0E0E] text-white selection:bg-white selection:text-black font-sans overflow-x-hidden">

      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-[1]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }}
      />

      {/* Ambient Shading */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[150px] rounded-full" />
      </div>

      {/* Global Grain Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-[2] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-32 md:py-48">

        {/* Header Section */}
        <div className="mb-32 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-white/30 uppercase">
                COMMERCIAL_PROTOCOLS / MODULE_07
              </span>
              <div className="h-px w-12 bg-white/10" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter italic mb-8">
              Pricing<span className="text-gray-600 font-normal">.</span>
            </h1>
            <p className="text-zinc-500 font-medium italic tracking-tight text-xl max-w-2xl mx-auto leading-relaxed">
              Equip your architectural identity with superior broadcast capabilities. One-time calibration for lifetime synchronization.
            </p>
          </motion.div>
        </div>

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-16 max-w-2xl mx-auto"
            >
              <div className="bg-red-500/10 border border-red-500/20 p-8 flex items-center gap-6">
                <FiAlertCircle className="text-red-500 text-2xl flex-shrink-0" />
                <p className="text-[11px] font-mono tracking-widest text-red-500 uppercase">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pricing Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 overflow-hidden shadow-2xl mb-32">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 1 }}
              className={`bg-black/40 p-16 hover:bg-white group transition-all duration-700 relative flex flex-col justify-between min-h-[700px] ${plan.popular ? 'border-l md:border-l-0 md:border-t-0' : ''}`}
            >
              <div className="space-y-12">
                <div className="flex justify-between items-start">
                  <div className="text-5xl text-gray-700 group-hover:text-black transition-colors duration-700">
                    {plan.icon}
                  </div>
                  {plan.popular && (
                    <div className="px-4 py-1 border border-white/10 group-hover:border-black/20 text-[8px] font-mono font-bold tracking-[0.4em] uppercase text-white/40 group-hover:text-black">
                      RECOMMENDED_NODE
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-4xl font-bold tracking-tighter italic text-zinc-300 group-hover:text-black transition-colors uppercase">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-bold tracking-tighter italic group-hover:text-black transition-colors">${plan.price}</span>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-600 group-hover:text-black/40 uppercase">/Lifetime Protocol</span>
                  </div>
                </div>

                <p className="text-sm font-medium italic leading-relaxed text-zinc-500 group-hover:text-zinc-800 transition-colors max-w-xs">
                  {plan.description}
                </p>

                <ul className="space-y-4 pt-12 border-t border-white/5 group-hover:border-black/5">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-4 text-[11px] font-mono tracking-widest text-zinc-600 group-hover:text-zinc-900 transition-all group/feat">
                      <div className="text-lg opacity-40 group-hover/feat:opacity-100 transition-opacity">
                        {feature.icon || <FiCheckCircle />}
                      </div>
                      {feature.name.toUpperCase()}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-16 pt-12 border-t border-white/5 group-hover:border-black/5">
                <button
                  onClick={() => plan.price === "0" ? router.push('/signup') : handleSubscribe(plan.name.toLowerCase() as any)}
                  disabled={loading}
                  className="w-full py-6 bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-white hover:text-black group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-700"
                >
                  {loading ? "INITIALIZING..." : plan.cta}
                </button>
              </div>

              {/* Corner Accents on Hover */}
              <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-white/5 group-hover:border-black/20 transition-all duration-700" />
              <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-white/5 group-hover:border-black/20 transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Global Statistics node */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5 border border-white/5 opacity-40 hover:opacity-100 transition-opacity duration-700">
          {[
            { label: "Cancel Architecture", value: "Anytime" },
            { label: "Setup Protocol", value: "Zero Fees" },
            { label: "Synchronization", value: "Instant" },
            { label: "Recovery Layer", value: "30-Day Policy" }
          ].map((stat, i) => (
            <div key={i} className="bg-black/40 p-12 space-y-2">
              <span className="text-[8px] font-mono font-bold tracking-widest text-zinc-700 uppercase">{stat.label}</span>
              <div className="text-xs font-bold italic tracking-widest uppercase">{stat.value}</div>
            </div>
          ))}
        </div>

      </main>

      {/* Vertical Meta Layers */}
      <div className="fixed bottom-12 left-6 hidden 2xl:block opacity-20 pointer-events-none">
        <div className="text-[8px] font-mono font-bold tracking-[0.5em] text-gray-800 uppercase vertical-text">COMMERCE_ARCH_v2.7</div>
      </div>

      <style jsx global>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </div>
  );
};

export default Page;
