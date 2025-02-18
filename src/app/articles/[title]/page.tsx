"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import Loading from "@/app/Loading";

interface Article {
  title: string;
  topic: string;
  content: string;
  image_url: string;
  created_at: string;
  writer: string;
  slug: string;
}

export default function ArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const bgStyle = {
    backgroundImage: "url(/book.jpeg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("slug", params.title)
          .single();

        if (error || !data) {
          throw new Error("Article not found");
        }

        setArticle(data);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.title]);

  if (loading) {
    return <div className="h-screen"><Loading/></div>;
  }

  if (error) {
    return notFound();
  }

  if (!article) {
    return notFound();
  }

  return (
    <div style={bgStyle} className="overflow-x-hidden">
      <Navbar />
      <div className="min-h-screen bg-white/50 backdrop-blur-3xl pt-20 md:pt-36">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center px-4">
          {article.title}
        </h1>
        <div className="text-gray-600 mb-4 text-center px-4">
          <span>{article.writer}</span> on{" "}
          <span>{new Date(article.created_at).toLocaleDateString()}</span>
        </div>
        <div className="w-full px-4 md:px-0">
          <Image
            src={article.image_url}
            alt={article.title}
            width={1200}
            height={400}
            className="w-full md:w-3/4 lg:w-1/2 h-64 md:h-96 mx-auto object-cover rounded-lg mb-6"
          />
        </div>
        <p className="text-base md:text-lg text-gray-700 p-4 md:p-8 lg:p-12 mx-auto max-w-4xl">
          {article.content}
        </p>
        <Footer />
      </div>
    </div>
  );
}