"use client";

import Navbar from "../Navbar";
import { useAuth } from "@/lib/useAuth";
import Link from "next/link";
import Footer from "../Footer";
import AddNewArticle from "./AddNewArticle";

export default function Home() {
  const { user } = useAuth();

  const bgStyle = {
    backgroundImage: "url(/book.jpeg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div style={bgStyle} className="overflow-x-hidden">
      <Navbar />
      <div className="min-h-screen bg-white/50 backdrop-blur-3xl">
        {user ? (
          <div className="pt-20">
            <AddNewArticle />
          </div>
        ) : (
          <div className="h-[80vh] flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-3xl md:text-5xl font-bold">
                You are not logged in!
              </h1>
              <div className="space-x-4 mx-auto w-fit py-10">
                <Link
                  href="/SignIn"
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/SignUp"
                  className="px-4 py-2 bg-white rounded hover:bg-gray-100 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}