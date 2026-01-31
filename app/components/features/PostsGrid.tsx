"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from 'next-intl';
import { Skeleton } from "@/components/ui/skeleton";

export function PostsGrid() {
  const locale = useLocale();
  const posts = useQuery(api.posts.getAllPosts);

  if (!posts) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item}>
            <Skeleton className="h-64 rounded-lg" />
            <Skeleton className="h-4 mt-2" />
            <Skeleton className="h-4 mt-2 w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <p className="text-gray-500">No designs available yet.</p>
      </div>
    );
  }

  return (
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
  );
}

// Keep old export for backwards compatibility during migration
export { PostsGrid as GigsGallery };
