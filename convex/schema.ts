import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
  }),

  posts: defineTable({
    userId: v.id("users"),
    title: v.string(),
    description: v.string(),
    imageUrls: v.array(v.string()),
    createdAt: v.number(),
    authorName: v.string(),
    authorImage: v.string(),
  }).index("by_userId", ["userId"]),
});
