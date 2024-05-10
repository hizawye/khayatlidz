import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createGig = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("gigs", {
      title: args.title,
      description: args.description,
      image: { id: args.storageId, format: "image" },
    });
  },
});
export const getGigs = query({
  async handler(ctx) {
    const gigs = await ctx.db.query("gigs").collect();
    return Promise.all(
      gigs.map(async (gig) => ({
        ...gig,
        ...(gig.image.format == "image"
          ? {
              url: await ctx.storage.getUrl(v.id(gig.image.id)),
            }
          : {}),
      })),
    );
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
