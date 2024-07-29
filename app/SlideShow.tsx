import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <>
      <Carousel>
        <CarouselContent>
          {posts?.map((post) => (
            <CarouselItem key={post._id}>
              <Card>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
                <CardContent>
                  <Image
                    src={post.imageUrls[0]!}
                    width={500}
                    height={500}
                    alt=""
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};
