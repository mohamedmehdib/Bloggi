"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function UploadArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");
  const [writer, setWriter] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const topics = [
    "Technology",
    "Travel",
    "Sport",
    "Business",
    "Trends",
    "News",
  ];

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          throw new Error("User not authenticated.");
        }

        const userEmail = user.email;

        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("name")
          .eq("email", userEmail)
          .single();

        if (userError || !userData) {
          throw new Error("Failed to fetch user name.");
        }

        setWriter(userData.name);
      } catch (err) {
        console.error("Error fetching user name:", err);
        setError("Failed to fetch user information.");
      }
    };

    fetchUserName();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    if (!title || !content || !topic || !writer) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      let imageUrl = null;

      if (image) {
        console.log("Uploading image:", image.name);

        const fileExt = image.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("article-images")
          .upload(filePath, image);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          throw uploadError;
        }

        console.log("Image uploaded successfully:", uploadData);

        const { data: urlData } = supabase.storage
          .from("article-images")
          .getPublicUrl(filePath);

        console.log("Image URL:", urlData.publicUrl);
        imageUrl = urlData.publicUrl;
      }

      console.log("Inserting article into database:", {
        title,
        content,
        topic,
        writer,
        image_url: imageUrl,
      });

      const { data, error } = await supabase
        .from("articles")
        .insert([{ title, content, topic, writer, image_url: imageUrl }])
        .select();

      if (error) {
        console.error("Database insertion error:", error);
        throw error;
      }

      console.log("Article inserted successfully:", data);

      setSuccess("Article uploaded successfully!");
      setTitle("");
      setContent("");
      setTopic("");
      setImage(null);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error uploading article:", {
          message: err.message,
          stack: err.stack,
          details: err,
        });
      } else {
        console.error("Unknown error:", err);
      }
      setError("An error occurred while uploading the article.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="bg-white/30 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-xl md:text-2xl font-semibold mb-6 text-center">
          Upload a New Article
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter the article title"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              rows={6}
              placeholder="Write your article content here..."
              required
            />
          </div>

          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
              Topic
            </label>
            <select
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            >
              <option value="" disabled>
                Select a topic
              </option>
              {topics.map((topicOption, index) => (
                <option key={index} value={topicOption}>
                  {topicOption}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Article Image (Optional)
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 md:py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
            >
              {loading ? "Uploading..." : "Upload Article"}
            </button>
          </div>

          {error && (
            <div className="text-red-500 text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-500 text-center">
              {success}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}