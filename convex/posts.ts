import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createPost = mutation({
  args: {
    userId: v.id("users"),
    title: v.string(), // Apply validation
    description: v.string(), // Apply validation
    imageUrls: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const { title, description, ...otherArgs } = args; // Destructure filtered args

    // Validate title and description (optional, can be done in handler if preferred)
    const titleError = validateTitle(title);
    const descriptionError = validateDescription(description);
    //testing title
    const threatRegex = /[\x00-\x1F\x7F]/g; // Basic filter for control characters
    if (threatRegex.test(title)) {
      return "Title contains invalid characters.";
    }

    const xssRegex =
      /<script.*?>|<iframe.*?>|<img.*? onerror.*?>|<embed.*?>|<object.*?>|<applet.*?>/gi;
    if (xssRegex.test(title)) {
      return "Title contains invalid characters.";
    }
    //testing description
    if (threatRegex.test(description)) {
      return "description contains invalid characters.";
    }

    if (xssRegex.test(description)) {
      return "description contains invalid characters.";
    }

    if (titleError || descriptionError) {
      throw new Error(`Validation errors: ${titleError}, ${descriptionError}`);
    }

    return await ctx.db.insert("posts", {
      userId: args.userId,
      title: title,
      description: description,
      imageUrls: args.imageUrls,
      // ...other fields (if applicable)
    });
  },
}); // Define validation functions
function validateTitle(title: string): string | undefined {
  if (title.length > 50) {
    return "Title cannot be longer than 50 characters.";
  }
  // Add more validation rules as needed (e.g., special characters)
  return undefined;
}

function validateDescription(description: string): string | undefined {
  if (description.length > 250) {
    return "Description cannot be longer than 250 characters.";
  }
  // Add more validation rules as needed (e.g., disallowed characters)
  return undefined;
}

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
