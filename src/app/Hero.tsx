import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="h-[75vh] flex flex-col justify-end items-center text-center">
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"></link>
      <div className="space-y-8">
        <h1 className="text-5xl font-medium w-2/3 mx-auto">
          Heartfelt Reflections: Stories of Love, Loss, and Growth
        </h1>
        <h3 className="text-2xl w-1/2 mx-auto">
          &quot;Welcome to the ultimate source for fresh perspectives! Explore curated
          content to enlighten, entertain, and engage global readers.&quot;
        </h3>
      </div>

      {/* Add New Article Section */}
      <div className="flex items-center justify-center space-x-4 py-6">
        <p className="text-gray-600 text-xl font-light italic">
          Share your ideas with the world!
        </p>
        <Link
          href="/Add-new-article"
          target='_blank'
          className="bg-black text-white border-2 border-black px-6 py-3 text-lg rounded-lg hover:bg-transparent hover:text-black transition-all space-x-2"
        >
          <span>Add new article</span>
          <i className="uil uil-arrow-up-right text-xl"></i>
        </Link>
      </div>

      <hr className="border border-black w-1/3 mt-10" />
    </div>
  );
}