"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const bgStyle = {
    backgroundImage: "url(/book.jpeg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    setError("");
    setSuccess("");

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const { data: existingUser } = await supabase
        .from("users")
        .select("email")
        .eq("email", email)
        .single();

      if (existingUser) {
        setError("User with this email already exists.");
        setLoading(false);
        return;
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(`SignUp Error: ${signUpError.message}`);
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase.from("users").insert([
        { email, name },
      ]);

      if (insertError) {
        setError(`User Insert Error: ${insertError.message}`);
        setLoading(false);
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(`SignIn Error: ${signInError.message}`);
        setLoading(false);
        return;
      }

      setSuccess("Sign up successful! You are now logged in.");

      setTimeout(() => {
        router.push("/Account");
      }, 1500);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-hidden" style={bgStyle}>
      <div className="min-h-screen flex items-center justify-center bg-white/50 backdrop-blur-3xl">
        <div className="p-8 bg-white/50 shadow-xl rounded-lg w-80">
          <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          {success && <div className="text-green-500 text-sm mb-4">{success}</div>}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border mb-4 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border mb-4 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Name"
          />

          <button
            onClick={handleSignUp}
            className={`w-full py-2 text-white rounded ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
            aria-disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;