"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // Ensure you have a UI button component or use `<button>`

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PremiumPage = () => {
  const handleCheckout = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
    });

    const { sessionId } = await res.json();
    const stripe = await stripePromise;
    if (stripe) {
      await stripe.redirectToCheckout({ sessionId });
    }
  };

  return (
    <div className="relative h-screen w-full bg-black flex flex-col items-center justify-center text-white text-center overflow-hidden">
      {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#1a0033] via-black to-[#00001a] opacity-60 blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 12, repeat: Infinity }}
            />
      
            {/* Glowing Effects */}
            <div className="absolute -top-56 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-purple-500 opacity-30 blur-[200px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-500 opacity-20 blur-[150px]" />
            <div className="absolute bottom-20 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500 opacity-15 blur-[120px]" />
      
      {/* Header */}
      <motion.h1
        className="text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Go Premium
      </motion.h1>

      <motion.p
        className="text-lg mb-6 text-gray-400 max-w-lg text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Unlock exclusive features, premium tools, and priority support.
      </motion.p>

      {/* Pricing Card */}
      <motion.div
        className="bg-gray-800 rounded-2xl shadow-xl p-8 text-center border border-gray-700"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold mb-2">Premium Access</h2>
        <p className="text-gray-400 mb-6">Full access for only</p>
        <span className="text-4xl font-bold text-blue-500">$0.50</span>
        <p className="text-gray-500 mb-6">One-time payment</p>

        {/* Checkout Button */}
        <motion.button
          onClick={handleCheckout}
          className="px-6 py-3 w-full bg-blue-600 hover:bg-blue-500 rounded-lg text-lg font-semibold transition shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Buy Now
        </motion.button>
      </motion.div>

      {/* Secure Payment Badge */}
      <motion.p
        className="text-sm text-gray-500 mt-6 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        🔒 Secure payment via Stripe
      </motion.p>
    </div>
  );
};

export default PremiumPage;
