'use client'
import React, { useState } from "react";

const GetViews = () => {
  const [adWatched, setAdWatched] = useState(false);

  // Function to handle ad completion
  const handleAdCompletion = () => {
    setAdWatched(true);
    alert("✅ Ad Watched! You earned a reward.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      {/* Page Header */}
      <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 to-red-500 text-transparent bg-clip-text">
        🎥 Watch Ads & Earn Rewards
      </h1>

      {/* Video Ad Section */}
      <div className="relative w-full max-w-xl bg-gray-800 rounded-lg p-4 shadow-lg">
        <h2 className="text-xl font-semibold mb-3 text-center">Watch This Ad</h2>

        {/* Example Video Ad */}
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0"
            title="Ad Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            onLoad={handleAdCompletion} // Mark as watched when the ad loads
          ></iframe>
        </div>

        {!adWatched ? (
          <p className="text-sm text-center mt-3 opacity-80">Watch the full ad to claim your reward.</p>
        ) : (
          <p className="text-sm text-center mt-3 text-green-400">🎉 Reward Earned!</p>
        )}
      </div>

      {/* Google AdSense Banner */}
      <div className="mt-6 w-full max-w-xl bg-gray-800 p-3 rounded-lg shadow-lg text-center">
        <p className="text-lg font-semibold mb-3">Sponsored Ad</p>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></script>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-4258781057309417"
          data-ad-slot="1234567890"
          data-ad-format="auto"
        ></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </div>

      {/* Call to Action */}
      <div className="mt-8">
        <button
          className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg shadow-md hover:bg-yellow-400 transition"
          onClick={() => alert("🔄 More ads coming soon!")}
        >
          Watch Another Ad
        </button>
      </div>
    </div>
  );
};

export default GetViews;
