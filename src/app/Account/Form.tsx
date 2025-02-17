"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { supabase } from "@/lib/supabase";

const FormPage: React.FC = () => {
  const { user } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [fetching, setFetching] = useState<boolean>(true);

  const handleUpdate = async () => {
    try {
      if (!user) {
        console.error("User not authenticated.");
        return;
      }

      const { error } = await supabase
        .from("users")
        .update({
          name: name.trim(),
        })
        .eq("email", user.email);

      if (error) throw error;

      alert("Your information has been updated successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error updating user data:", err.message);
      } else {
        console.error("Unknown error occurred while updating user data");
      }
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) {
          console.warn("User not authenticated.");
          return;
        }

        const { data, error } = await supabase
          .from("users")
          .select("email, name")
          .eq("email", user.email)
          .single();

        if (error) throw error;

        if (data) {
          setEmail(data.email || "");
          setName(data.name || "");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching user data:", err.message);
        } else {
          console.error("Unknown error occurred while fetching user data");
        }
      } finally {
        setFetching(false);
      }
    };

    if (user) {
      fetchUserData();
    } else {
      setFetching(false);
    }
  }, [user]);

  if (fetching) {
    return <p>Loading your information...</p>;
  }

  if (!user) {
    return <p>You need to sign in to access this form.</p>;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white/5 p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Personal Informations</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            readOnly
            className="mt-1 block w-full px-3 py-2 border-2 border-black rounded-md shadow-sm bg-white/5 text-gray-700 focus:outline-none cursor-not-allowed"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border-2 border-black rounded-md shadow-sm focus:outline-none bg-transparent"
          />
        </div>
      </div>
      <button
        onClick={handleUpdate}
        className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Update
      </button>
    </div>
  );
};

export default FormPage;
