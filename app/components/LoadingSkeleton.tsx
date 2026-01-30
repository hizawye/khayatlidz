"use client";

import { Skeleton, Grid, Card, CardContent, Box } from '@mui/material';

interface PostSkeletonProps {
  count?: number;
}

export function PostCardSkeleton({ count = 6 }: PostSkeletonProps) {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card className="h-full">
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
              <Skeleton variant="text" width="80%" height={32} />
              <Skeleton variant="text" width="60%" height={24} className="mt-2" />
              <Box className="flex gap-2 mt-4">
                <Skeleton variant="circular" width={40} height={40} />
                <Box className="flex-1">
                  <Skeleton variant="text" width="70%" />
                  <Skeleton variant="text" width="50%" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export function ProfileHeaderSkeleton() {
  return (
    <Box className="p-6 mb-8">
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={3} className="text-center">
          <Skeleton variant="circular" width={160} height={160} className="mx-auto" />
        </Grid>
        <Grid item xs={12} md={9}>
          <Skeleton variant="text" width="40%" height={40} className="mb-2" />
          <Skeleton variant="text" width="60%" height={24} className="mb-4" />
          <Box className="flex justify-end gap-3">
            <Skeleton variant="rectangular" width={150} height={36} />
            <Skeleton variant="rectangular" width={120} height={36} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export function NavbarSkeleton() {
  return (
    <Box className="w-full h-16 bg-purple-900 flex items-center justify-between px-4">
      <Skeleton variant="text" width={120} height={32} className="bg-purple-700" />
      <Box className="flex gap-4">
        <Skeleton variant="circular" width={40} height={40} className="bg-purple-700" />
        <Skeleton variant="circular" width={40} height={40} className="bg-purple-700" />
      </Box>
    </Box>
  );
}
