"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";

export default function ArticlePage() {
  const params = useParams(); // Get params from the URL
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Decode the title from the URL
        const decodedTitle = decodeURIComponent(params.title as string);

        // Fetch the article from Supabase
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("title", decodedTitle)
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
    return <div>Loading...</div>;
  }

  if (error) {
    return notFound();
  }

  if (!article) {
    return notFound();
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <div className="text-gray-600 mb-4">
        <span>{article.writer}</span> on{" "}
        <span>{new Date(article.created_at).toLocaleDateString()}</span>
      </div>
      <Image
        src={article.image_url}
        alt={article.title}
        width={1200} // Set appropriate width
        height={400} // Set appropriate height
        className="w-full h-96 object-cover rounded-lg mb-6"
      />
      <p className="text-lg text-gray-700">{article.content}</p>
    </div>
  );
}