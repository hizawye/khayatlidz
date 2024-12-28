'use client';

import { Navbar } from "@/app/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box,
  IconButton,
  Grid,
  Alert,
  CircularProgress
} from "@mui/material";
import { CloudUpload, Clear } from "@mui/icons-material";
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";

export default function CreatePost() {
  const router = useRouter();
  const { user } = useUser();
  const generateUploadUrl = useMutation(api.posts.generateUploadUrl);
  const createPost = useMutation(api.posts.createPost);
  const createUser = useMutation(api.users.createUser);
  const convexUser = useQuery(api.users.getUser, 
    user?.id ? { userId: user.id } : "skip"
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // Use a single query for all images
  const imageUrlsData = useQuery(api.posts.getImageUrls, { storageIds: images });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    try {
      setUploading(true);
      setError("");
      
      // Convert FileList to Array and process each file
      const fileArray = Array.from(files);
      
      // Upload all files concurrently
      const uploadPromises = fileArray.map(async (file) => {
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        const { storageId } = await result.json();
        return storageId;
      });

      // Wait for all uploads to complete
      const newStorageIds = await Promise.all(uploadPromises);
      
      // Add new images to existing ones
      setImages(prev => [...prev, ...newStorageIds]);
    } catch (err) {
      setError("Failed to upload images. Please try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || images.length === 0) {
      setError("Please fill in all fields and upload at least one image.");
      return;
    }

    if (!user) {
      setError("You must be logged in to create a post.");
      return;
    }

    try {
      let userId = convexUser?._id;
      
      if (!userId) {
        userId = await createUser({
          userId: user.id,
          email: user.emailAddresses[0]?.emailAddress || "",
          name: user.fullName || "",
          imageUrl: user.imageUrl,
        });
      }

      await createPost({
        userId,
        title,
        description,
        imageUrls: images,
        authorName: user.fullName || "",
        authorImage: user.imageUrl,
      });
      router.push("/profile");
    } catch (err) {
      setError("Failed to create post. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" className="py-8">
        <Paper elevation={2} className="p-6 rounded-lg">
          <Typography variant="h4" className="text-purple-600 text-right mb-6">
            إضافة ��صميم جديد
          </Typography>

          {error && (
            <Alert severity="error" className="mb-4" onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
              fullWidth
              label="عنوان التصميم"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rtl"
              InputProps={{ className: "text-right" }}
            />

            <TextField
              fullWidth
              multiline
              rows={4}
              label="وصف التصميم"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rtl"
              InputProps={{ className: "text-right" }}
            />

            <Box className="border-2 border-dashed border-purple-200 rounded-lg p-4">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={uploading}
              />
              <label htmlFor="image-upload">
                <Button
                  component="span"
                  variant="outlined"
                  startIcon={<CloudUpload />}
                  className="w-full"
                  disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <CircularProgress size={24} className="mr-2" />
                      جاري رفع الصور...
                    </>
                  ) : (
                    "اختر صور متعددة"
                  )}
                </Button>
              </label>

              <Grid container spacing={2} className="mt-4">
                {images.map((storageId, index) => {
                  const imageUrl = imageUrlsData?.[index];
                  if (!imageUrl) return null;

                  return (
                    <Grid item xs={6} sm={4} key={index}>
                      <Box className="relative aspect-square">
                        <Image
                          src={imageUrl}
                          alt={`Upload ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                        <IconButton
                          className="absolute top-1 right-1 bg-white/80 hover:bg-white"
                          size="small"
                          onClick={() => removeImage(index)}
                        >
                          <Clear />
                        </IconButton>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outlined"
                onClick={() => router.back()}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="bg-purple-600 hover:bg-purple-700"
                disabled={uploading}
              >
                نشر التصميم
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
    </>
  );
} 