"use client";

import { Navbar } from "@/app/Navbar";
import { GigsGallery } from "@/app/GigsGallery";

export default function ArabicDesignsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Designs Gallery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl text-right text-gray-800 mb-8 font-bold">
            جميع التصاميم
          </h1>
          <GigsGallery />
        </div>
      </section>
    </main>
  );
}
