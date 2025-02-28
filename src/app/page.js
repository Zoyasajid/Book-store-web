"use client";

import BookSection from "@/componenets/landingPage/Booksection";
import HeroSection from "@/componenets/landingPage/HomeSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 pb-20 font-[family-name:var(--font-geist-sans)]">
      <HeroSection />
      <BookSection />
    </div>
  );
}
