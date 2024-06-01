import { Image, Link } from "lucide-react";

export default function PostCard({ posts }) {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="flex flex-col space-y-2 transform transition duration-300 hover:scale-105"
          >
            <Link href={`/posts/${post._id}`}>
              <p className="text-center text-lg font-semibold hover:underline">
                {post.title}
              </p>
              <Image
                src={post.url}
                alt={post.title}
                width={500}
                height={500}
                className="object-cover rounded-lg shadow-md cursor-pointer"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
