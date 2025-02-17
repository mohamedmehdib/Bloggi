import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="sm:h-[75vh] pt-20 flex flex-col justify-end items-center text-center px-4">
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"></link>

      <div className="space-y-6 md:space-y-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium w-full sm:w-2/3 mx-auto">
          Heartfelt Reflections: Stories of Love, Loss, and Growth
        </h1>
        <h3 className="text-lg sm:text-xl md:text-2xl w-full sm:w-1/2 mx-auto">
          &quot;Welcome to the ultimate source for fresh perspectives! Explore curated
          content to enlighten, entertain, and engage global readers.&quot;
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 py-6">
        <p className="text-gray-600 text-base sm:text-lg md:text-xl font-light italic">
          Share your ideas with the world!
        </p>
        <Link
          href="/Add-new-article"
          className="bg-black text-white border-2 border-black px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg rounded-lg hover:bg-transparent hover:text-black transition-all flex items-center space-x-2"
        >
          <span>Add new article</span>
          <i className="uil uil-arrow-up-right text-base sm:text-lg"></i>
        </Link>
      </div>

      <hr className="border border-black w-1/2 sm:w-1/3 mt-8" />
    </div>
  );
}