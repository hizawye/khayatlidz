"use client";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { Navbar } from "@/app/Navbar";
import { v } from "convex/values";

interface Params {
  postId: string; // Specify type as string
}

export default function PostDetails({ params }: { params: Params }) {
  const router = useRouter();
  const postId = params.postId;

  const post = useQuery(api.posts.getPost, { postId });

  if (post === undefined) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (post instanceof Error || post === null) {
    return <p className="text-red-500">Error loading post details.</p>;
  }

  return (
    <>
      <Navbar />
      {post?.map((post, index) => (
        <div key={index} className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="w-full max-w-md mx-auto">
            {post?.imageUrls?.length > 0 && // Check if imageUrls has elements
              post.imageUrls.map((url, index) => (
                <Image
                  key={index}
                  src={url || "path/to/placeholder.jpg"} // Placeholder for missing url
                  alt={post.title}
                  width={500}
                  height={500}
                  className="object-cover rounded-lg shadow-md"
                />
              ))}
          </div>
          <p className="mt-4 text-gray-700">{post.description}</p>
          {/* Add more details as needed */}
        </div>
      ))}
    </>
  );
}
