"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { Navbar } from "@/app/Navbar";
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Skeleton,
  ImageList,
  ImageListItem,
  Divider,
  Box,
  Avatar,
  IconButton
} from "@mui/material";
import { LocationOn, Person, DateRange, ChevronLeft as PrevIcon, ChevronRight as NextIcon } from '@mui/icons-material';
import { useState } from "react";
import { useSwipeable } from 'react-swipeable';

export default function PostDetails({ params }: { params: { postId: string } }) {
  // ... existing code ...
} 