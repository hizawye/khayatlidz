import { ConvexError } from "convex/values";
import type { UserIdentity } from "convex/server";
import { mutation, query } from "./_generated/server";

export const storeUser = mutation({
  args: {},
  handler: async (ctx) => {
    const currentIdentity = await ctx.auth.getUserIdentity();
    if (currentIdentity == null) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) =>
        q.eq("userId", currentIdentity.tokenIdentifier),
      )
      .unique();
    if (user !== null) {
      return user._id;
    }
    const user_id = await ctx.db.insert("users", {
      userId: currentIdentity.tokenIdentifier,
      name: currentIdentity.name!,
      email: currentIdentity.email!,
      profileImageUrl: currentIdentity.profileUrl,
    });
    return user_id;
  },
});

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const currentIdentity = await ctx.auth.getUserIdentity();

    if (currentIdentity == null) {
      return null;
    }

    return await ctx.db
      .query("users")
      .withIndex("by_userId", (q) =>
        q.eq("userId", currentIdentity.tokenIdentifier),
      )
      .unique();
  },
});
