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
  slug: string;
}

export default function HomeBlog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [disabledButtons, setDisabledButtons] = useState<{ [key: string]: boolean }>({});

  const [topics, setTopics] = useState([
    { name: "All", icon: "uil uil-list-ul", selected: true },
    { name: "Technology", icon: "uil uil-robot", selected: false },
    { name: "Travel", icon: "uil uil-plane-departure", selected: false },
    { name: "Sport", icon: "uil uil-basketball", selected: false },
    { name: "Business", icon: "uil uil-dollar-alt", selected: false },
    { name: "Trends", icon: "uil uil-fire", selected: false },
    { name: "News", icon: "uil uil-newspaper", selected: false },
  ]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async (topic = "All") => {
    setLoading(true);
    try {
      let query = supabase.from("articles").select("title, topic, content, image_url, created_at, writer, slug");

      if (topic !== "All") {
        query = query.eq("topic", topic);
      }

      const { data, error } = await query;

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

  const handleTopicClick = (topicName: string) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) => ({
        ...topic,
        selected: topic.name === topicName,
      }))
    );

    fetchArticles(topicName);
  };

  const truncateContent = (content: string, maxWords: number) => {
    return content.split(" ").slice(0, maxWords).join(" ") + "...";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleButtonClick = (slug: string) => {
    setDisabledButtons((prev) => ({ ...prev, [slug]: true }));
  };

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

      <div className="text-center">
        <h3 className="text-2xl sm:text-3xl font-medium py-6 sm:py-10">Explore trending topics</h3>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4 sm:px-0 sm:w-3/4 lg:w-1/2 mx-auto">
          {topics.map((item, index) => (
            <button
              key={index}
              onClick={() => handleTopicClick(item.name)}
              className={`w-fit border-2 border-black p-2 sm:p-3 rounded-full space-x-2 hover:bg-black hover:text-white duration-300 ${
                item.selected ? "bg-black text-white" : ""
              }`}
            >
              <i className={`${item.icon} text-xl sm:text-2xl`}></i>
              <span className="text-sm sm:text-lg font-semibold">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-8 px-4 sm:px-16">
        {articles.length === 0 ? (
          <div className="text-center text-gray-500 text-xl">
            No articles found for this topic.
          </div>
        ) : (
          articles.map((article, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 p-4 border-b-2 border-black/60 mx-4 sm:mx-16">
              <div className="w-full md:w-96 h-48 sm:h-64 relative">
                <span className="absolute top-2 left-2 bg-white/40 font-medium p-2 rounded-lg text-sm">
                  {article.topic}
                </span>
                <Image
                  src={article.image_url}
                  alt="Article"
                  fill
                  className="rounded-xl object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="font-medium">
                  <span>{article.writer}</span> on{" "}
                  <span className="text-zinc-700">{formatDate(article.created_at)}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold mt-2">{article.title}</h2>
                <p className="mt-4 text-gray-700">
                  {truncateContent(article.content, 50)}
                </p>
                <div className="my-3 w-fit text-white bg-black/80 p-2 sm:p-3 rounded-lg font-semibold">
                  <Link href={`/articles/${article.slug}`}>
                    <button
                      onClick={() => handleButtonClick(article.slug)}
                      disabled={disabledButtons[article.slug]}
                    >
                      {disabledButtons[article.slug] ? "Loading..." : "Read More"}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}