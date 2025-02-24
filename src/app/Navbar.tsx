"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { Caveat } from "next/font/google";
const rancho = Caveat({ subsets: ["latin"], weight: "400" });

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full flex items-center justify-between z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-lg shadow-md h-16 md:h-20 px-4 sm:px-6 md:px-8"
          : "backdrop-blur-none bg-transparent shadow-none h-20 md:h-24 px-6 sm:px-8 md:px-12"
      }`}
    >
      <div className="flex items-center">
        <Link
          href="/"
          className={`text-2xl sm:text-3xl md:text-4xl font-bold ${rancho.className}`}
        >
          Bloggi
        </Link>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <Link
          href="/Account"
          className="p-2 sm:p-3 border-2 border-black rounded-lg font-medium hover:bg-black hover:text-white transition-colors duration-300 text-sm sm:text-base"
        >
          Account
        </Link>
      </div>
    </nav>
  );
}