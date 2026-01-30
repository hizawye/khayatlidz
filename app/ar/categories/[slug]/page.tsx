"use client";

import { Navbar } from "@/app/Navbar";
import { useParams } from "next/navigation";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Convert slug to display name
  const categoryNames: { [key: string]: string } = {
    "kaftan": "قفطان",
    "djebba": "جبة",
    "gandoura": "قندورة",
    "traditional-suit": "بدلة تقليدية",
    "karakou": "كراكو",
    "fetla": "فتلة"
  };

  const categoryName = categoryNames[slug] || slug;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-right">
          {categoryName}
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-right">
            جاري العمل على هذه الصفحة. قريباً ستتمكن من تصفح جميع التصاميم في فئة {categoryName}.
          </p>
        </div>
      </div>
    </>
  );
}
