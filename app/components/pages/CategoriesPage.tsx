"use client";

import { useTranslations, useLocale } from 'next-intl';
import { Navbar } from "../layout/Navbar";
import Link from "next/link";
import Image from "next/image";

interface Category {
  name: string;
  slug: string;
  image: string;
}

export default function CategoriesPage() {
  const t = useTranslations();
  const locale = useLocale();

  const categories: Category[] = [
    {
      name: t('categories.items.kaftan'),
      slug: "kaftan",
      image: "/categories/kaftan.jpg"
    },
    {
      name: t('categories.items.djebba'),
      slug: "djebba",
      image: "/categories/djebba.jpg"
    },
    {
      name: t('categories.items.gandoura'),
      slug: "gandoura",
      image: "/categories/gandoura.jpg"
    },
    {
      name: t('categories.items.traditionalSuit'),
      slug: "traditional-suit",
      image: "/categories/traditional-suit.jpg"
    },
    {
      name: t('categories.items.karakou'),
      slug: "karakou",
      image: "/categories/karakou.jpg"
    },
    {
      name: t('categories.items.fetla'),
      slug: "fetla",
      image: "/categories/fetla.jpg"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar />

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className={`text-3xl md:text-4xl ${locale === 'ar' ? 'text-right' : 'text-left'} text-gray-800 mb-12 font-bold`}>
            {t('categories.title')}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.slug} href={`/${locale}/categories/${category.slug}`}>
                <div className="relative h-72 group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  <Image
                    src={category.image}
                    alt={`${category.name} ${t('categories.title')}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 right-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-white/90 text-sm">{t('home.categories.exploreMore')}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
