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

    if (!currentUser) {
      throw new Error("Couldn't authenticate user");
    }

    return await ctx.db
      .query("posts")
      .withIndex("by_userId", (q) => q.eq("userId", currentUser._id))
      .collect();
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
