"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { GiPistolGun } from "react-icons/gi";
import { createClient } from "@supabase/supabase-js";

// Supabase Initialization
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const SignupPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (!email || !password || !username) {
      setError("All fields are required!");
      return;
    }
    if (!agree) {
      setError("You must agree to the terms!");
      return;
    }

    setLoading(true);
    setError("");

    // Check if username is already taken
    const { data: existingUser, error: userCheckError } = await supabase
      .from("users")
      .select("username")
      .eq("username", username)
      .single();

    if (userCheckError && userCheckError.code !== "PGRST116") {
      setError("Error checking username!");
      setLoading(false);
      return;
    }

    if (existingUser) {
      setError("Username is already taken!");
      setLoading(false);
      return;
    }

    // Create user in Supabase Authentication
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Insert user into the "users" table
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: data.user?.id,
        email,
        username: `${username}`,
        bio: "",
        profile_pic: "",
        theme: "default",
        background_video: "",
        location: "",
        profile_views: 0,
        social_links: {},
        badges: [],
        created_at: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      setError("Error saving user data!");
      setLoading(false);
      return;
    }

    // Redirect to the user’s account page after successful signup
    router.push(`/account/${data.user?.id}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="bg-[#121212] text-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-800">
        <div className="flex justify-center mb-6">
          <GiPistolGun size={55} className="text-purple-500" />
        </div>

        <h2 className="text-center text-xl font-semibold mb-6">
          Create a sward.lol account
        </h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label className="text-sm text-gray-400">Email</label>
          <div className="flex items-center bg-black rounded-lg mt-2 border border-gray-700 px-3 py-2">
            <MdEmail size={20} className="text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent py-1 px-2 focus:outline-none text-gray-300 placeholder-gray-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-400">Password</label>
          <div className="flex items-center bg-black rounded-lg mt-2 border border-gray-700 px-3 py-2">
            <MdLock size={20} className="text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent py-1 px-2 focus:outline-none text-gray-300 placeholder-gray-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-gray-400"
            >
              {showPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-400">Username</label>
          <div className="flex items-center bg-black rounded-lg mt-2 border border-gray-700 px-3 py-2">
            <MdPerson size={20} className="text-gray-500" />
            <span className="text-gray-500">sward.lol/</span>
            <input
              type="text"
              placeholder="your-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent py-1 px-2 focus:outline-none text-gray-300 placeholder-gray-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
          <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} />
          <span>
            I agree to{" "}
            <Link href="/tos" className="text-purple-500 hover:text-purple-400">
              ToS & Privacy Policy
            </Link>
          </span>
        </div>

        <button
          onClick={handleSignup}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-500 hover:text-purple-400">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
