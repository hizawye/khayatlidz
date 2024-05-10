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
            url: await ctx.storage.getUrl(gig.image.id),
          }
          : gigs),
      })),
    );
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getGig = query({
  args: {
    gigId: v.id("gigs"),
  },
  handler: async (ctx, args) => {
    const gig = await ctx.db.get(args.gigId);
    if (!gig) {
      throw new Error("Gig not found");
    }
    // Check if the gig has an image and the format is 'image'
    if (gig.image && gig.image.format === "image") {
      const url = await ctx.storage.getUrl(gig.image.id);
      return {
        ...gig,
        url, // Add the image URL to the gig object
      };
    }
    // If there's no image or the format is not 'image', return the gig as is
    return gig;
  },
});
