"use client";

import { Navbar } from "@/app/Navbar";
import { useUser, useClerk } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const convexUser = useQuery(api.users.getUser,
    user?.id ? { userId: user.id } : "skip"
  );

  const userPosts = useQuery(
    api.posts.getUserPosts,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );

  const handleSignOut = async () => {
    await signOut();
    router.push("/ar");
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl text-center text-gray-600">
            يرجى تسجيل الدخول لعرض الملف الشخصي
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-3 text-center">
              <div className="relative w-40 h-40 mx-auto">
                <Image
                  src={user.imageUrl}
                  alt={user.fullName || "Profile"}
                  fill
                  className="rounded-full object-cover border-4 border-brand-600"
                />
              </div>
            </div>
            <div className="md:col-span-9">
              <h1 className="text-3xl md:text-4xl text-right text-brand-600 mb-2 font-bold">
                {user.fullName}
              </h1>
              <p className="text-lg text-right text-gray-600 mb-4">
                {user.primaryEmailAddress?.emailAddress}
              </p>
              <div className="flex justify-end gap-3">
                <Link href="/fr/posts/create">
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    إضافة تصميم جديد
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="border-red-500 text-red-500 hover:bg-red-50"
                >
                  تسجيل الخروج
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div>
          <h2 className="text-2xl md:text-3xl text-right mb-6 font-bold">
            تصاميمي
          </h2>

          {!convexUser ? (
            // Loading state
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item}>
                  <Skeleton className="h-48 rounded-lg" />
                  <Skeleton className="h-4 mt-2" />
                </div>
              ))}
            </div>
          ) : !userPosts ? (
            // Loading posts
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item}>
                  <Skeleton className="h-48 rounded-lg" />
                  <Skeleton className="h-4 mt-2" />
                </div>
              ))}
            </div>
          ) : userPosts instanceof Error ? (
            // Error state
            <p className="text-red-500 text-center p-8">
              حدث خطأ أثناء تحميل التصاميم
            </p>
          ) : userPosts.length === 0 ? (
            // Empty state
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-600 mb-4">
                لا توجد تصاميم بعد
              </h3>
              <Link href="/fr/posts/create">
                <Button className="flex items-center gap-2 mx-auto">
                  <Plus className="w-4 h-4" />
                  إضافة أول تصميم
                </Button>
              </Link>
            </div>
          ) : (
            // Posts grid
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {userPosts.map((post) => (
                <Link key={post._id} href={`/ar/posts/${post._id}`}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="relative h-48">
                      <Image
                        src={post.imageUrls[0] ?? '/placeholder.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-brand-600 text-right">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 text-right mt-2 line-clamp-2">
                        {post.description?.slice(0, 100)}...
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
