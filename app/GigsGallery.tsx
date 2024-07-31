"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import Image from "next/image";
import Link from "next/link"; // Import the Link component

export const GigsGallery = () => {
  const posts = useQuery(api.posts.getAllPosts);

  if (posts === undefined) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (posts instanceof Error) {
    return <p className="text-red-500">Error loading posts.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 ">
        {posts.map((post) => (
          <div
            key={post._id}
            className="rounded p-1 flex flex-col space-y-2 transform transition duration-300 hover:scale-105 max-h-96 "
          >
            <Link href={`/posts/${post._id}`} className="max-h-96">
              <Image
                src={post.imageUrls[0]!}
                alt={post.title}
                width={500}
                height={500}
                className="rounded-lg object-cover cursor-pointer aspect-video object-center"
              />
              <p className=" text-[#7A3486] text-sm sm:text-lg pb-1">
                {post.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
