"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import Link from "next/link";
import { PostCardSkeleton } from "./components/LoadingSkeleton";
import { QueryErrorFallback } from "./components/ErrorFallback";

export function GigsGallery() {
  const posts = useQuery(api.posts.getAllPosts);

  if (!posts) {
    return <PostCardSkeleton count={6} />;
  }

  if (posts instanceof Error) {
    return <QueryErrorFallback error={posts} />;
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 text-lg">لا توجد تصاميم حالياً</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link
          key={post._id}
          href={`/ar/posts/${post._id}`}
          className="group block"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative h-64">
              <Image
                src={post.imageUrls[0] || "/placeholder.jpg"}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-brand-700 mb-2 text-right">
                {post.title}
              </h3>
              {post.description && (
                <p className="text-gray-600 text-sm text-right line-clamp-2">
                  {post.description}
                </p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
