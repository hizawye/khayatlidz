import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createPost = mutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
    description: v.string(),
    imageUrls: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("posts", {
      userId: args.userId,
      title: args.title,
      description: args.description,
      imageUrls: args.imageUrls,
    });
  },
});

export const getUserPosts = query({
  args: {},
  handler: async (ctx) => {
    const currentUserIdentity = await ctx.auth.getUserIdentity();
    if (currentUserIdentity == null) {
      return null;
    }

    const userId = currentUserIdentity.tokenIdentifier;

    if (!userId) {
      throw new Error("Couldn't retrieve user ID");
    }

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    if (currentUser == null) {
      return null;
    }

    const posts = await ctx.db
      .query("posts")
      .withIndex("by_userId", (q) => q.eq("userId", currentUser._id))
      .collect();

    async function getPostsWithUrls() {
      const postsWithUrls = posts.map(async (post) => {
        // Fetch image URLs for each post synchronously
        const imageUrls = await Promise.all(
          post.imageUrls.map((id) => ctx.storage.getUrl(id)),
        );
        return {
          ...post,
          imageUrls,
        };
      });

      // Await the entire map to ensure all URLs are fetched before returning
      return await Promise.all(postsWithUrls);
    }
    console.log(getPostsWithUrls);
    return getPostsWithUrls();
  },
});

export const getAllPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").collect();
    async function getPostsWithUrls() {
      const postsWithUrls = posts.map(async (post) => {
        const imageUrls = await Promise.all(
          post.imageUrls.map((id) => ctx.storage.getUrl(id)),
        );
        return {
          ...post,
          imageUrls,
        };
      });
      return await Promise.all(postsWithUrls);
    }
    return getPostsWithUrls();
  },
});
export const getPost = query({
  args: { postId: v.string() },
  handler: async (ctx, { postId }) => {
    const post = await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("_id"), postId))
      .collect();
    async function getPostWithUrls() {
      const postWithUrls = post.map(async (post) => {
        const imageUrls = await Promise.all(
          post.imageUrls.map((id) => ctx.storage.getUrl(id)),
        );
        return {
          ...post,
          imageUrls,
        };
      });

      return await Promise.all(postWithUrls);
    }
    return getPostWithUrls();
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

//filtering the inputs
