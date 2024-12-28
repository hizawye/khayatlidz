import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createPost = mutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
    description: v.string(),
    imageUrls: v.array(v.string()),
    authorName: v.string(),
    authorImage: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("posts", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const getUserPosts = query({
  args: { userId: v.union(v.id("users"), v.literal("skip")) },
  handler: async (ctx, args) => {
    if (args.userId === "skip") {
      return [];
    }
    
    const posts = await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    // Get image URLs
    const postsWithUrls = await Promise.all(
      posts.map(async (post) => ({
        ...post,
        imageUrls: await Promise.all(
          post.imageUrls.map(id => ctx.storage.getUrl(id))
        ),
      }))
    );

    return postsWithUrls;
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

export const getImageUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, { storageId }) => {
    return await ctx.storage.getUrl(storageId);
  },
});

export const getImageUrls = query({
  args: { storageIds: v.array(v.string()) },
  handler: async (ctx, { storageIds }) => {
    const urls = await Promise.all(
      storageIds.map(id => ctx.storage.getUrl(id))
    );
    return urls;
  },
});

//filtering the inputs
