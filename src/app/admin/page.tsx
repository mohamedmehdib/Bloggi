"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import ArticleEdit from "./ArticleEdit";

const AdminDashboard = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      const { data: adminData, error: adminError } = await supabase
        .from("admin")
        .select("*")
        .eq("email", email)
        .single();

      if (adminError || !adminData) {
        setError("Admin account does not exist");
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const bgStyle = {
    backgroundImage: "url(/book.jpeg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  if (!isLoggedIn) {
    return (
      <div style={bgStyle}>
        <div className="flex justify-center items-center min-h-screen bg-white/50 backdrop-blur-3xl">
          <div className="p-4 sm:p-8 bg-white/50 shadow-xl rounded-lg w-full sm:w-96 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-4">Admin Sign In</h2>
            {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleSignIn}
              className={`w-full py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-lg transition-opacity duration-300 ${loading ? "opacity-50" : ""}`}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={bgStyle} className="overflow-x-hidden">
      <div className="min-h-screen bg-white/50 backdrop-blur-3xl">
        <ArticleEdit />
      </div>
    </div>
  );
};

export default AdminDashboard;