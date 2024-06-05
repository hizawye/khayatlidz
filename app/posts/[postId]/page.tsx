"use client";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { Navbar } from "@/app/Navbar";
import { v } from "convex/values";

interface Params {
  postId: any; // Assuming postId is of type string
}

const postDetailes = ({ params }: { params: Params }) => {
  const router = useRouter();
  const postId = params.postId;
  const post = useQuery(api.posts.getPost, postId);

  if (post === undefined) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (post instanceof Error || post === null) {
    return <p className="text-red-500">Error loading post details.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="w-full max-w-md mx-auto">
          {" "}
          {/* Image container for responsiveness */}
          <Image
            src={post.url}
            alt={post.title}
            width={500}
            height={500}
            className="object-cover rounded-lg shadow-md"
          />
        </div>
        <p className="mt-4 text-gray-700">{post.description}</p>
        {/* Add more details as needed */}
      </div>
    </>
  );
};

export default postDetailes;

//TODO adding a state of where user came from ,add button to get him back
