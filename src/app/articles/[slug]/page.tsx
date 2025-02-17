import React from 'react';
import { supabase } from '@/lib/supabase';
import ArticleContent from './ArticleContent'; // Ensure this component exists
import { generateSlug } from '@/lib/utils';


interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ArticlePage({ params }: PageProps) {
  // Decode the slug from the URL
  const currentSlug = decodeURIComponent(params.slug);

  // Debug: Log the current slug from the URL
  console.log("Current Slug:", currentSlug);

  // Fetch the article directly using the slug
  const { data: articles, error } = await supabase
    .from("articles")
    .select("*")
    .ilike("title", `%${currentSlug}%`); // Use ILIKE for case-insensitive search

  if (error) {
    return <div className="text-center py-10 text-red-500">Failed to load articles.</div>;
  }

  if (!articles || articles.length === 0) {
    return <div className="text-center py-10">Article not found.</div>;
  }

  // Debug: Log the slugs generated from article titles
  console.log("Article Slugs:", articles.map((article) => generateSlug(article.title)));

  // Find the article with a matching slug
  const article = articles.find((article) => {
    const articleSlug = generateSlug(article.title); // Generate slug for each article
    return articleSlug === currentSlug; // Compare with the slug from the URL
  });

  if (!article) {
    return <div className="text-center py-10">Article not found.</div>;
  }

  // Pass the article data to the Client Component
  return <ArticleContent article={article} />;
}