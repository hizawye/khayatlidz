"use client";

import { Navbar } from "@/app/Navbar";
import { useParams } from "next/navigation";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Convert slug to display name
  const categoryNames: { [key: string]: string } = {
    "kaftan": "Kaftan",
    "djebba": "Djebba",
    "gandoura": "Gandoura",
    "traditional-suit": "Traditional Suit",
    "karakou": "Karakou",
    "fetla": "Fetla"
  };

  const categoryName = categoryNames[slug] || slug;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {categoryName}
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">
            This page is under development. Soon you'll be able to browse all designs in the {categoryName} category.
          </p>
        </div>
      </div>
    </>
  );
}
