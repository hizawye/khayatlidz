"use client";

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

  // ... rest of your existing create post code ...
  // Update any navigation paths to include /ar prefix

  return (
    <>
      <Navbar />
      {/* ... rest of your JSX ... */}
    </>
  );
} 