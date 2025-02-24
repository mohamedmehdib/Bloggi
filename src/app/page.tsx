"use client";
import Footer from "./Footer";
import Hero from "./Hero";
import HomeBlog from "./HomeBlog";
import Navbar from "./Navbar";

export default function Home() {
  const bgStyle = {
    backgroundImage: "url(/book.jpeg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div style={bgStyle} className="overflow-x-hidden">
      <Navbar/>
      <div className="min-h-screen bg-white/50 backdrop-blur-3xl">
        <Hero/>
        <HomeBlog/>
        <Footer/>
      </div>
    </div>
  );
}
