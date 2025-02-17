"use client"; // Mark this as a Client Component

import React from 'react';
import Image from 'next/image';

interface Article {
  id: string;
  title: string;
  topic: string;
  content: string;
  image_url: string;
  created_at: string;
  writer: string;
}

export default function ArticleContent({ article }: { article: Article }) {
  return (
    <div className="py-10 px-4 md:px-16">
      {/* Article Image */}
      <div className="w-full relative">
        <span className="absolute top-2 left-2 bg-white/40 font-medium p-2 rounded-lg text-sm">
          {article.topic}
        </span>
        <Image 
          src={article.image_url} 
          alt="Article" 
          height={500} 
          width={1000} 
          className="rounded-xl object-cover w-full"
        />
      </div>

      {/* Article Content */}
      <div className="mt-8">
        <div className="font-medium">
          <span>{article.writer}</span> on <span className="text-zinc-700">{new Date(article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <h1 className="text-4xl font-semibold mt-4">
          {article.title}
        </h1>
        <p className="mt-6 text-gray-700 whitespace-pre-line">
          {article.content}
        </p>
      </div>
    </div>
  );
}