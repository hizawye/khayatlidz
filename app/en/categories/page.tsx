"use client";

import { Navbar } from "@/app/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl md:text-4xl text-right text-gray-800 mb-12 font-bold">
          فئات التصاميم
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={`/ar/categories/${category.slug}`}>
              <div className="relative h-80 group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all">
                <Image
                  src={category.image}
                  alt={`صورة تصميم ${category.name} تقليدي جزائري`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {category.name}
                    </h2>
                    <p className="text-gray-200">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

const categories = [
  {
    name: "قفطان",
    slug: "kaftan",
    image: "/categories/kaftan.jpg",
    description: "تشكيلة متنوعة من القفاطين العصرية والتقليدية"
  },
  {
    name: "جبة",
    slug: "djebba",
    image: "/categories/djebba.jpg",
    description: "جباب تقليدية فاخرة"
  },
  {
    name: "قندورة",
    slug: "gandoura",
    image: "/categories/gandoura.jpg",
    description: "قنادر عصرية وتقليدية"
  },
  {
    name: "بدلة تقليدية",
    slug: "traditional-suit",
    image: "/categories/traditional-suit.jpg",
    description: "بدل تقليدية أنيقة"
  },
  {
    name: "كراكو",
    slug: "karakou",
    image: "/categories/karakou.jpg",
    description: "كراكو عاصمي راقي"
  },
  {
    name: "فتلة",
    slug: "fetla",
    image: "/categories/fetla.jpg",
    description: "فتلة تقليدية جميلة"
  }
];
