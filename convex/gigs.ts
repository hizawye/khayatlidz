import { title } from "process";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createGig = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("gigs", {
      titles: {"title1":args.title,"title2":"help"},
      title:args.title,
    });
  },
});
export const getGigs = query({
  handler(ctx) {
    return ctx.db.query("gigs").collect();
  },
});
