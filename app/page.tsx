"use client";

import { Navbar } from "./Navbar";
import { InputWithButton } from "./Input";
import { GigsGallery } from "./GigsGallery";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-900 to-purple-700 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              اكتشف أجمل التصاميم التقليدية
            </h1>
            <p className="text-purple-100 text-lg mb-8">
              منصة تجمع أفضل الخياطين والمصممين في الجزائر
            </p>
            <InputWithButton />
          </div>
        </div>
      </section>

      {/* Main Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-right text-gray-800 mb-8">
            جميع التصاميم
          </h2>
          <GigsGallery />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-purple-200">© 2024 KhayatliDz. جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </main>
  );
}
