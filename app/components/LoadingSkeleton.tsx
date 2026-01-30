"use client";

interface PostSkeletonProps {
  count?: number;
}

export function PostCardSkeleton({ count = 6 }: PostSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="h-full bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="h-[200px] bg-gray-200 animate-pulse" />
          <div className="p-4">
            <div className="h-8 bg-gray-200 animate-pulse rounded w-4/5 mb-2" />
            <div className="h-6 bg-gray-200 animate-pulse rounded w-3/5 mt-2" />
            <div className="flex gap-2 mt-4">
              <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3 mb-2" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProfileHeaderSkeleton() {
  return (
    <div className="p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-3 text-center">
          <div className="w-40 h-40 bg-gray-200 animate-pulse rounded-full mx-auto" />
        </div>
        <div className="md:col-span-9">
          <div className="h-10 bg-gray-200 animate-pulse rounded w-2/5 mb-2" />
          <div className="h-6 bg-gray-200 animate-pulse rounded w-3/5 mb-4" />
          <div className="flex justify-end gap-3">
            <div className="w-[150px] h-9 bg-gray-200 animate-pulse rounded" />
            <div className="w-[120px] h-9 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function NavbarSkeleton() {
  return (
    <div className="w-full h-16 bg-purple-900 flex items-center justify-between px-4">
      <div className="h-8 w-[120px] bg-purple-700 animate-pulse rounded" />
      <div className="flex gap-4">
        <div className="w-10 h-10 bg-purple-700 animate-pulse rounded-full" />
        <div className="w-10 h-10 bg-purple-700 animate-pulse rounded-full" />
      </div>
    </div>
  );
}
