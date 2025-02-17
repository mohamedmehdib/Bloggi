"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface Article {
  title: string;
  topic: string;
  content: string;
  image_url: string;
  created_at: string;
  writer: string;
}

export default function HomeBlog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch articles from Supabase
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from("articles")
          .select("title, topic, content, image_url, created_at, writer");

        if (error) {
          throw error;
        }

        setArticles(data || []);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Function to truncate content
  const truncateContent = (content: string, maxWords: number) => {
    return content.split(" ").slice(0, maxWords).join(" ") + "...";
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Loading and error states
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="py-10">
      <Head>
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
      </Head>

      {/* Articles Section */}
      <div className="mt-10 space-y-8">
        {articles.map((article, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-6 p-4 border-b-2 border-black/60 mx-16">
            {/* Article Image */}
            <div className="w-full md:w-96 relative">
              <span className="absolute top-2 left-2 bg-white/40 font-medium p-2 rounded-lg text-sm">
                {article.topic}
              </span>
              <Image
                src={article.image_url}
                alt="Article"
                height={500}
                width={500}
                className="rounded-xl object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="flex-1">
              <div className="font-medium">
                <span>{article.writer}</span> on{" "}
                <span className="text-zinc-700">{formatDate(article.created_at)}</span>
              </div>
              <h2 className="text-3xl font-semibold mt-2">{article.title}</h2>
              <p className="mt-4 text-gray-700">
                {truncateContent(article.content, 50)}
              </p>
              <div className="my-3 w-fit text-white bg-black/80 p-3 rounded-lg font-semibold">
                <Link href={`/articles/${encodeURIComponent(article.title)}`}>
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}