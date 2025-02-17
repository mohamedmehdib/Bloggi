import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { generateSlug } from '@/lib/utils'; // Import the slug utility

export default function HomeBlog() {
  const [articles, setArticles] = useState<{ 
    id: string; 
    title: string; 
    topic: string; 
    content: string; 
    image_url: string; 
    created_at: string; 
    writer: string 
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch articles from Supabase
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from("articles")
          .select("id, title, topic, content, image_url, created_at, writer");

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

  // Topics data
  const topics = [
    { icon: "uil uil-robot", name: "Technology" },
    { icon: "uil uil-plane-departure", name: "Travel" },
    { icon: "uil uil-basketball", name: "Sport" },
    { icon: "uil uil-dollar-alt", name: "Business" },
    { icon: "uil uil-fire", name: "Trends" },
    { icon: "uil uil-newspaper", name: "News" },
  ];

  // Function to truncate content
  const truncateContent = (content: string, maxWords: number) => {
    const words = content.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return content;
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
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
      {/* Include Unicons CSS */}
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />

      {/* Trending Topics Section */}
      <div className="text-center">
        <h3 className="font-semibold py-5">Explore Trending Topics</h3>
        <div className="w-full md:w-1/2 mx-auto flex flex-wrap justify-center gap-5 py-4">
          {topics.map((item, index) => (
            <Link 
              key={index} 
              href="#" 
              className="p-3 rounded-full border-2 border-black hover:bg-black hover:text-white duration-300 flex items-center space-x-2"
            >
              <i className={`${item.icon} text-xl`}></i>
              <span className="font-semibold text-lg">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Articles Section */}
      <div className="mt-10 space-y-8">
        {articles.map((item, index) => {
          const slug = generateSlug(item.title); // Generate slug from the title
          return (
            <div key={index} className="flex flex-col md:flex-row gap-6 p-4 border-b-2 border-black/60 mx-16">
              {/* Article Image */}
              <div className="w-full md:w-96 relative">
                <span className="absolute top-2 left-2 bg-white/40 font-medium p-2 rounded-lg text-sm">
                  {item.topic}
                </span>
                <Image 
                  src={item.image_url} 
                  alt="Article" 
                  height={500} 
                  width={500} 
                  className="rounded-xl object-cover"
                />
              </div>

              {/* Article Content */}
              <div className="flex-1">
                <div className="font-medium">
                  <span>{item.writer}</span> on <span className="text-zinc-700">{formatDate(item.created_at)}</span>
                </div>
                <h2 className="text-3xl font-semibold mt-2">
                  {item.title}
                </h2>
                <p className="mt-4 text-gray-700">
                  {truncateContent(item.content, 50)} {/* Show truncated content */}
                </p>
                <div className="my-3 w-fit text-white bg-black/80 p-3 rounded-lg font-semibold">
                  {item.content.split(" ").length > 50 && (
                    <Link href={`/articles/${slug}`}> {/* Use the slug in the URL */}
                      Read More
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}