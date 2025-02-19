"use client";

import { useAuth } from "@/lib/useAuth";
import SignOut from "./signout";
import Navbar from "../Navbar";
import Link from "next/link";
import FormPage from "./Form";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Footer from "../Footer";

const Dashboard = () => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from("users")
            .select("name")
            .eq("email", user.email)
            .single();

          if (error) {
            console.error("Error fetching user data:", error.message);
            return;
          }

          if (data?.name) {
            const nameParts = data.name.split(" ");
            setFirstName(nameParts[0]);
          }
        } catch (err) {
          console.error("Error fetching user name:", err);
        }
      }
    };

    fetchUserName();
  }, [user]);

  const bgStyle = {
    backgroundImage: "url(/book.jpeg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div style={bgStyle} className="min-h-screen">
      <Navbar />
      <div className="min-h-screen bg-white/50 backdrop-blur-3xl">
        <div className="h-[40vh] sm:h-[50vh]">
          <div className="w-full h-full flex justify-center items-center">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold">
                My Account
              </h1>
              <hr className="w-1/2 sm:w-1/4 mx-auto border-2 border-black mt-4" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="w-full sm:w-3/4 md:w-1/2 mx-auto p-4 sm:p-6">
          {user ? (
            <div className="bg-white/30 border-2 border-black p-4 sm:p-8 rounded-lg shadow-md">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">
                  Welcome, {firstName || "User"}!
                </h2>
                <SignOut />
              </div>
              <div>
                <FormPage />
              </div>
            </div>
          ) : (
            <div className="bg-white/30 border-2 border-black p-6 sm:p-8 rounded-lg text-center">
              <p className="text-lg mb-4">
                Please log in to access your account.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/SignIn"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/SignUp"
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;