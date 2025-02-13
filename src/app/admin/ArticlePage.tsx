import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

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
  articleId?: string; // Optional if you want to pass it dynamically
  onSave?: () => void; // Optional callback
  onCancel?: () => void; // Optional callback
}

const ArticleEdit: React.FC<ArticleEditProps> = ({ articleId, onSave, onCancel }) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [title, setTitle] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [writer, setWriter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) return;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!articleId) return;

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

      onSave?.();
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