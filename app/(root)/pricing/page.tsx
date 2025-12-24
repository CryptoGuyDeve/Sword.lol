"use client";

import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaCrown, FaRocket, FaStar, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);


  const handleSubscribe = async (plan: 'basic' | 'premium') => {
    if (!session || !session.user) {
      router.push('/signup');
      return;
    }
    const user = session.user as any;


    setLoading(true);
    setError(null);

    try {
      // First, let's check our configuration
      const configResponse = await fetch('/api/test-subscription');
      const config = await configResponse.json();
      setDebugInfo(config);

      if (config.status === 'missing_variables') {
        setError(`Configuration error: ${config.message}`);
        return;
      }

      const storeId = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID;
      const variantId = plan === 'premium'
        ? process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PREMIUM_VARIANT_ID
        : process.env.NEXT_PUBLIC_LEMON_SQUEEZY_BASIC_VARIANT_ID;

      if (!storeId || !variantId) {
        setError('Missing environment variables. Please check your configuration.');
        return;
      }

      const checkoutUrl = `https://checkout.lemonsqueezy.com/checkout/buy/${variantId}?store=${storeId}&checkout[email]=${encodeURIComponent(user.email)}&checkout[custom][user_id]=${user.id}&checkout[custom][plan_name]=${plan}&checkout[redirect_url]=${encodeURIComponent(window.location.origin + '/account/' + user.id)}`;

      console.log('Redirecting to:', checkoutUrl);
      window.location.href = checkoutUrl;

    } catch (err) {
      console.error('Subscription error:', err);
      setError('Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const featuresFree = [
    'Basic Customization',
    'Basic Effects',
    'Add Your Socials',
  ];

  const featuresPremium = [
    'Exclusive Badge',
    'Profile Layouts',
    'Profile Fonts',
    'Typewriter Animation',
    'Special Profile Effects',
    'Advanced Customization',
    'Metadata & SEO Customization',
    'Unlimited File Hosting',
    'Priority Support',
  ];

  const renderFeatures = (features: string[]) => (
    <ul className="text-left space-y-3 mb-8">
      {features.map((feature, index) => (
        <motion.li
          key={index}
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <FaCheckCircle className="text-white text-lg flex-shrink-0" />
          <span className="text-gray-300">{feature}</span>
        </motion.li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gray-400/5 rounded-full blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, -60, 0],
            scale: [1, 0.7, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Unlock powerful features to grow your online presence
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 w-full max-w-2xl"
          >
            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-center">
              <FaExclamationTriangle className="text-red-400 text-2xl mx-auto mb-2" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl w-full">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/50 flex-1 relative"
          >
            <div className="absolute top-4 right-4">
              <FaRocket className="text-2xl text-gray-400" />
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-white">Free</h2>
              <div className="mb-2">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-gray-400 ml-2">/lifetime</span>
              </div>
            </div>

            <p className="text-gray-400 mb-8 text-center">
              Perfect for getting started with essential features
            </p>

            {renderFeatures(featuresFree)}

            <Button
              onClick={() => window.location.href = '/signup'}
              className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </Button>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-white/10 to-gray-900/80 backdrop-blur-xl p-8 rounded-3xl border border-white/30 flex-1 relative transform scale-105"
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                <FaCrown />
                Most Popular
              </div>
            </div>

            <div className="absolute top-4 right-4">
              <FaStar className="text-2xl text-yellow-400" />
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Premium
              </h2>
              <div className="mb-2">
                <span className="text-4xl font-bold text-white">$5</span>
                <span className="text-gray-400 ml-2">/lifetime</span>
              </div>
              <div className="bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 inline-block">
                <span className="text-purple-400 text-sm font-semibold">All Features Included</span>
              </div>
            </div>

            <p className="text-gray-400 mb-8 text-center">
              Unlock everything and take your profile to the next level
            </p>

            {renderFeatures(featuresPremium)}

            <Button
              onClick={() => handleSubscribe('premium')}
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Get Premium'}
            </Button>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4">
            All plans include secure payment processing and 24/7 support
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span>✓ Cancel anytime</span>
            <span>✓ No setup fees</span>
            <span>✓ Instant access</span>
            <span>✓ 30-day money back</span>
          </div>
        </motion.div>

        {/* Debug Information */}
        {debugInfo && (
          <div className="mt-8 p-4 bg-gray-900 border border-gray-700 rounded-lg">
            <h4 className="font-bold text-gray-300 mb-2">Debug Info:</h4>
            <pre className="text-sm text-gray-400 overflow-auto">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>
        )}

        {/* Setup Instructions */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">Need Help?</h3>
          <div className="max-w-2xl mx-auto text-left bg-gray-900 p-6 rounded-lg">
            <p className="text-gray-300 mb-4">
              If you're seeing a 404 error, make sure you have:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Created products in your Lemon Squeezy dashboard</li>
              <li>Set the correct environment variables in your .env.local file</li>
              <li>Published your products (not in draft mode)</li>
              <li>Used the correct Store ID and Variant IDs</li>
            </ol>
            <p className="text-gray-300 mt-4">
              Check the debug info above to see your current configuration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
