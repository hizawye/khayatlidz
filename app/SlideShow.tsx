import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";

import React from "react";

export function SlideShow() {
  const posts = useQuery(api.posts.getAllPosts);

  return (
    <div className="">
      <div className="flex justify-center">
        {posts?.map((post, index) => (
          <div key={index} className="pl-1 pr-1">
            <Image
              width={200}
              height={200}
              src={post.imageUrls[0]!}
              alt={post.title}
              className="rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
