"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { Navbar } from "../layout/Navbar";
import { User, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from "react";
import { useSwipeable } from 'react-swipeable';
import { useLocale } from 'next-intl';

interface PostDetailPageProps {
  params: {
    postId: string;
  };
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const locale = useLocale();
  const posts = useQuery(api.posts.getAllPosts);
  const post = posts?.find(p => p._id === params.postId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => post && setCurrentImageIndex((prev) =>
      prev < post.imageUrls.length - 1 ? prev + 1 : prev
    ),
    onSwipedRight: () => setCurrentImageIndex((prev) => prev > 0 ? prev - 1 : prev),
  });

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="max-w-6xl mx-auto py-8 px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto py-8 px-4" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96" {...handlers}>
            <Image
              src={post.imageUrls[currentImageIndex] || "/placeholder.jpg"}
              alt={post.title}
              fill
              className="object-cover"
            />
            {post.imageUrls.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : prev)}
                  className={`absolute ${locale === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2`}
                  disabled={currentImageIndex === 0}
                >
                  {locale === 'ar' ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
                </button>
                <button
                  onClick={() => setCurrentImageIndex(prev =>
                    prev < post.imageUrls.length - 1 ? prev + 1 : prev
                  )}
                  className={`absolute ${locale === 'ar' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2`}
                  disabled={currentImageIndex === post.imageUrls.length - 1}
                >
                  {locale === 'ar' ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
                </button>
              </>
            )}
          </div>

          <div className="p-6">
            <h1 className={`text-3xl font-bold text-gray-800 mb-4 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{post.title}</h1>
            <p className={`text-gray-600 text-lg mb-6 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{post.description}</p>

            <hr className="my-6" />

            <div className={`flex items-center gap-4 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
              <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div className={`flex-1 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                <p className="font-semibold text-gray-800">{post.authorName}</p>
                <p className={`text-sm text-gray-500 flex items-center ${locale === 'ar' ? 'justify-end' : 'justify-start'} gap-1`}>
                  <Calendar className="w-4 h-4" />
                  {new Date(post.createdAt).toLocaleDateString(locale === 'ar' ? 'ar-DZ' : locale === 'fr' ? 'fr-FR' : 'en-US')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
