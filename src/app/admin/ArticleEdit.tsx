import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // Adjust the import path to your Supabase client

interface Article {
  id: string;
  title: string;
  topic: string;
  content: string;
  image_url: string;
  writer: string;
  created_at: string;
}

interface ArticleEditProps {
  articleId: string; // Pass the article ID to fetch and edit
  onSave: () => void; // Callback after saving
  onCancel: () => void; // Callback to cancel editing
}

const ArticleEdit: React.FC<ArticleEditProps> = ({ articleId, onSave, onCancel }) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [writer, setWriter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the article data from Supabase
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("id", articleId)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setArticle(data);
          setTitle(data.title);
          setTopic(data.topic);
          setContent(data.content);
          setImageUrl(data.image_url);
          setWriter(data.writer);
        }
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Failed to load article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  // Handle form submission to update the article in Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from("articles")
        .update({
          title,
          topic,
          content,
          image_url: imageUrl,
          writer,
        })
        .eq("id", articleId);

      if (error) {
        throw error;
      }

      // Call the onSave callback to notify the parent component
      onSave();
    } catch (err) {
      console.error("Error updating article:", err);
      setError("Failed to update article.");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!article) {
    return <div className="text-center py-10">Article not found.</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Edit Article</h2>
      <form onSubmit={handleSubmit}>
        {/* Title Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Topic Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Content Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            rows={6}
            required
          />
        </div>

        {/* Image URL Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Writer Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Writer</label>
          <input
            type="text"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleEdit;