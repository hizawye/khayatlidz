"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardMedia, Typography, Grid, Skeleton } from "@mui/material";

export const GigsGallery = () => {
  const posts = useQuery(api.posts.getAllPosts);

  if (posts === undefined) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <Skeleton variant="rectangular" height={200} className="rounded-lg" />
            <Skeleton variant="text" className="mt-2" />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (posts instanceof Error) {
    return (
      <div className="text-red-500 text-center p-4 rounded-lg bg-red-50">
        عذراً، حدث خطأ أثناء تحميل التصاميم
      </div>
    );
  }

  return (
    <Grid container spacing={3}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post._id}>
          <Link href={`/posts/${post._id}`}>
            <Card className="h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardMedia
                component="div"
                className="relative h-64"
              >
                <Image
                  src={post.imageUrls[0]!}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </CardMedia>
              <CardContent>
                <Typography variant="h6" className="text-purple-600 text-right font-bold">
                  {post.title}
                </Typography>
                <Typography variant="body2" className="text-gray-600 text-right mt-2">
                  {post.description?.slice(0, 100)}...
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};
