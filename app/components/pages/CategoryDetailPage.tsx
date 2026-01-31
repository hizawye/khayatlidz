"use client";

import { useTranslations, useLocale } from 'next-intl';
import { Navbar } from "../layout/Navbar";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface CategoryDetailPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const t = useTranslations();
  const locale = useLocale();
  const { slug } = params;

  // Get posts filtered by category
  const posts = useQuery(api.posts.getPostsByCategory, { category: slug });

  // Get category name from slug
  const getCategoryName = (slug: string) => {
    const categoryMap: Record<string, string> = {
      'kaftan': t('categories.items.kaftan'),
      'djebba': t('categories.items.djebba'),
      'gandoura': t('categories.items.gandoura'),
      'traditional-suit': t('categories.items.traditionalSuit'),
      'karakou': t('categories.items.karakou'),
      'fetla': t('categories.items.fetla')
    };
    return categoryMap[slug] || slug;
  };

  const categoryName = getCategoryName(slug);

  return (
    <main className="min-h-screen bg-gray-50" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className={`text-3xl md:text-4xl ${locale === 'ar' ? 'text-right' : 'text-left'} text-gray-800 mb-8 font-bold`}>
            {categoryName}
          </h1>

          {!posts ? (
            // Loading state
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item}>
                  <Skeleton className="h-64 rounded-lg" />
                  <Skeleton className="h-4 mt-2" />
                  <Skeleton className="h-4 mt-2 w-3/4" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            // Empty state
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <h3 className="text-xl font-semibold text-gray-600 mb-4">
                {t('errors.dataLoadError')}
              </h3>
              <p className="text-gray-500">
                {t('errors.unexpectedMessage')}
              </p>
            </div>
          ) : (
            // Posts grid
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post._id} href={`/${locale}/posts/${post._id}`}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="relative h-64">
                      <Image
                        src={post.imageUrls[0] ?? '/placeholder.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className={`text-lg font-semibold text-brand-600 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                        {post.title}
                      </h3>
                      <p className={`text-sm text-gray-600 ${locale === 'ar' ? 'text-right' : 'text-left'} mt-2 line-clamp-2`}>
                        {post.description?.slice(0, 100)}...
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
