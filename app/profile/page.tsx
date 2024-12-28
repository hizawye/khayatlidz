"use client";

import { Navbar } from "../Navbar";
import { useUser, useClerk } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import Link from "next/link";
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  CardMedia,
  Skeleton,
  Box,
  Divider 
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const convexUser = useQuery(api.users.getUser, 
    user?.id ? { userId: user.id } : "skip"
  );
  
  // Fetch user's posts using convex user ID
  const userPosts = useQuery(
    api.posts.getUserPosts,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  console.log("Clerk User Object:", user);
  console.log("User ID:", user?.id);
  console.log("User Email:", user?.primaryEmailAddress?.emailAddress);
  console.log("User Name:", user?.fullName);
  console.log("User Image:", user?.imageUrl);

  if (!user) {
    return (
      <>
        <Navbar />
        <Container maxWidth="lg" className="py-8">
          <Typography variant="h5" className="text-center text-gray-600">
            يرجى تسجيل الدخول لعرض الملف الشخصي
          </Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" className="py-8">
        {/* Profile Header */}
        <Paper elevation={2} className="p-6 mb-8 rounded-lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={3} className="text-center">
              <div className="relative w-40 h-40 mx-auto">
                <Image
                  src={user.imageUrl}
                  alt={user.fullName || "Profile"}
                  fill
                  className="rounded-full object-cover border-4 border-purple-600"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="h4" className="text-right text-purple-600 mb-2">
                {user.fullName}
              </Typography>
              <Typography variant="body1" className="text-right text-gray-600 mb-4">
                {user.primaryEmailAddress?.emailAddress}
              </Typography>
              <div className="flex justify-end gap-3">
                <Link href="/posts/create">
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    إضافة تصميم جديد
                  </Button>
                </Link>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleSignOut}
                  className="border-red-500 text-red-500 hover:bg-red-50"
                >
                  تسجيل الخروج
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>

        {/* User Posts */}
        <Box>
          <Typography variant="h5" className="text-right mb-6">
            تصاميمي
          </Typography>
          
          {!convexUser ? (
            // Loading state
            <Grid container spacing={3}>
              {[1, 2, 3].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item}>
                  <Skeleton variant="rectangular" height={200} className="rounded-lg" />
                  <Skeleton variant="text" className="mt-2" />
                </Grid>
              ))}
            </Grid>
          ) : !userPosts ? (
            // Loading posts
            <Grid container spacing={3}>
              {[1, 2, 3].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item}>
                  <Skeleton variant="rectangular" height={200} className="rounded-lg" />
                  <Skeleton variant="text" className="mt-2" />
                </Grid>
              ))}
            </Grid>
          ) : userPosts instanceof Error ? (
            // Error state
            <Typography color="error" className="text-center">
              حدث خطأ أثناء تحميل التصاميم
            </Typography>
          ) : userPosts.length === 0 ? (
            // Empty state
            <Paper className="p-8 text-center">
              <Typography variant="h6" className="text-gray-600 mb-4">
                لا توجد تصاميم بعد
              </Typography>
              <Link href="/posts/create">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  إضافة أول تصميم
                </Button>
              </Link>
            </Paper>
          ) : (
            // Posts grid
            <Grid container spacing={3}>
              {userPosts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post._id}>
                  <Link href={`/posts/${post._id}`}>
                    <Card className="h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                      <CardMedia
                        component="div"
                        className="relative h-48"
                      >
                        <Image
                          src={post.imageUrls[0] ?? '/placeholder.jpg'}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </CardMedia>
                      <CardContent>
                        <Typography variant="h6" className="text-purple-600 text-right">
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
          )}
        </Box>
      </Container>
    </>
  );
}
