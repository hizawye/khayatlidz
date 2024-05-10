import { title } from "process";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createGig = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    imageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("gigs", {
      title: args.title,
      description: args.description,
      image: { body: args.imageId, format: "image" },
    });
  },
});
export const getGigs = query({
  handler(ctx) {
    return ctx.db.query("gigs").collect();
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
