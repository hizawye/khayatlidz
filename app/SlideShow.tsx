import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import React from "react";

export const SlideShow = () => {
  const posts = useQuery(api.posts.getAllPosts);

  return (
    <Carousel>
      <CarouselContent>
        {posts?.map((post) => (
          <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={post._id}>
            <Image
              src={post.imageUrls[0]!}
              alt=""
              width={400}
              height={400}
              className="rounded-lg object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
