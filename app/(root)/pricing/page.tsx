import { Button } from '@/components/ui/button';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const Page = () => {
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
  ];

  const renderFeatures = (features: string[]) => (
    <ul className="text-left space-y-3 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2">
          <FaCheckCircle className="text-purple-500" />
          {feature}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Unlock more with our exclusive offers
      </h1>
      <p className="text-gray-400 mb-10 text-center">
        Get to a new level of creativity with sward.xd Premium
      </p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Free Plan */}
        <div className="bg-[#121212] p-8 rounded-2xl w-full md:w-80 text-center">
          <h2 className="text-2xl font-semibold mb-4">Free</h2>
          <p className="text-4xl font-bold mb-2">0€<span className="text-lg font-normal"> / Lifetime</span></p>
          <p className="text-gray-400 mb-6">For beginners, link all your socials in one place.</p>
          {renderFeatures(featuresFree)}
          <Button className='bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg w-full'>Get Started</Button>
        </div>

        {/* Premium Plan */}
        <div className="bg-gradient-to-b from-[#221133] to-[#15102d] p-8 rounded-2xl w-full md:w-80 text-center relative">
          <div className="absolute top-4 right-4 bg-purple-800 text-xs text-white py-1 px-3 rounded-full">
            Most Popular
          </div>
          <h2 className="text-2xl font-semibold mb-4">💎 Premium</h2>
          <p className="text-4xl font-bold mb-2">6,99€<span className="text-lg font-normal"> / Lifetime</span></p>
          <p className="text-gray-400 mb-6">Unlock your creativity & access advanced features.</p>
          {renderFeatures(featuresPremium)}
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg w-full">
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
