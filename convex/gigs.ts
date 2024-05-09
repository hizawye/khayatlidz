import { title } from "process";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createGig = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("gigs", {
      title: args.title,
    });
  },
});
