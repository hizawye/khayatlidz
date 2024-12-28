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

interface Params {
  postId: string;
}

function formatDate(timestamp: number | undefined) {
  if (!timestamp) return ""; // Handle undefined case
  
  try {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('ar-DZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch (error) {
    console.error('Date formatting error:', error);
    return "";
  }
}

export default function PostDetails({ params }: { params: Params }) {
  const post = useQuery(api.posts.getPost, { postId: params.postId });
  const [selectedImage, setSelectedImage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);

  const handleNext = () => {
    if (!post?.[0]) return;
    setSelectedImage((prev) => 
      prev === post[0].imageUrls.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    if (!post?.[0]) return;
    setSelectedImage((prev) => 
      prev === 0 ? post[0].imageUrls.length - 1 : prev - 1
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const dragDistance = e.clientX - dragStart;
    const threshold = 50; // minimum drag distance to trigger change

    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0) {
        handlePrev();
      } else {
        handleNext();
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (post === undefined) {
    return (
      <>
        <Navbar />
        <Container maxWidth="lg" className="py-8">
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Skeleton variant="rectangular" height={500} className="rounded-lg" />
            </Grid>
            <Grid item xs={12} md={5}>
              <Skeleton variant="text" height={60} />
              <Skeleton variant="text" height={30} className="mt-2" />
              <Skeleton variant="text" height={120} className="mt-4" />
              <Skeleton variant="rectangular" height={200} className="mt-4 rounded-lg" />
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }

  if (post instanceof Error || post === null) {
    return (
      <>
        <Navbar />
        <Container maxWidth="lg" className="py-8">
          <Paper className="p-8 text-center">
            <Typography variant="h5" color="error">
              عذراً، حدث خطأ أثناء تحميل التفاصيل
            </Typography>
          </Paper>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      {post?.map((post, index) => (
        <Container key={index} maxWidth="lg" className="py-8">
          <Grid container spacing={4}>
            {/* Main Image and Gallery */}
            <Grid item xs={12} md={7}>
              <Paper elevation={2} className="overflow-hidden rounded-lg">
                <div 
                  className="relative h-[500px] group cursor-grab active:cursor-grabbing"
                  {...handlers}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <Image
                    src={post.imageUrls[selectedImage] || "/placeholder.jpg"}
                    alt={post.title}
                    fill
                    className={`object-cover transition-transform duration-300 ${
                      isDragging ? 'scale-[1.02]' : ''
                    }`}
                    priority
                    draggable={false}
                  />
                  
                  {/* Navigation Arrows */}
                  {post.imageUrls.length > 1 && (
                    <>
                      <div className="absolute inset-y-0 left-0 flex items-center">
                        <IconButton
                          onClick={handlePrev}
                          className="bg-black/30 text-white hover:bg-black/50 mx-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <PrevIcon />
                        </IconButton>
                      </div>
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <IconButton
                          onClick={handleNext}
                          className="bg-black/30 text-white hover:bg-black/50 mx-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <NextIcon />
                        </IconButton>
                      </div>
                      
                      {/* Image Counter */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {selectedImage + 1} / {post.imageUrls.length}
                      </div>
                      
                      {/* Swipe Indicator */}
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 bg-gradient-to-r from-black/20 to-transparent" />
                        <div className="w-12 h-12 bg-gradient-to-l from-black/20 to-transparent" />
                      </div>
                    </>
                  )}
                </div>

                {post.imageUrls.length > 1 && (
                  <Box className="p-4">
                    <Typography variant="h6" className="text-right mb-3">
                      صور إضافية
                    </Typography>
                    <Grid container spacing={2}>
                      {post.imageUrls.map((url, idx) => (
                        <Grid item xs={3} key={idx}>
                          <Box 
                            className={`relative aspect-square cursor-pointer transition-all ${
                              selectedImage === idx 
                                ? 'ring-2 ring-purple-600 ring-offset-2' 
                                : 'hover:opacity-80'
                            }`}
                            onClick={() => setSelectedImage(idx)}
                          >
                            <Image
                              src={url}
                              alt={`${post.title} ${idx + 1}`}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Paper>
            </Grid>

            {/* Details Section */}
            <Grid item xs={12} md={5}>
              <Paper elevation={2} className="p-6 rounded-lg">
                <Typography variant="h4" className="text-purple-600 text-right mb-4 font-bold">
                  {post.title}
                </Typography>

                <Divider className="my-4" />

                {/* Meta Information */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-end gap-3">
                    <Typography className="text-gray-600 text-right">
                      {post.authorName}
                    </Typography>
                    <Avatar src={post.authorImage} alt={post.authorName} />
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <Typography className="text-gray-600 text-right">
                      {post.createdAt ? formatDate(post.createdAt) : 'التاريخ غير متوفر'}
                    </Typography>
                    <DateRange className="text-purple-600" />
                  </div>
                </div>

                <Divider className="my-4" />

                {/* Description */}
                <Typography variant="body1" className="text-gray-700 text-right leading-relaxed">
                  {post.description}
                </Typography>

                {/* Additional Details */}
                <Box className="mt-6 bg-purple-50 p-4 rounded-lg">
                  <Typography variant="h6" className="text-right text-purple-600 mb-2">
                    معلومات إضافية
                  </Typography>
                  <Typography variant="body2" className="text-right text-gray-600">
                    يمكنك التواصل مع الخياط مباشرة للحصول على مزيد من التفاصيل حول التصميم والأسعار
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      ))}
    </>
  );
}
