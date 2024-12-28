"use client";

import { Navbar } from "@/app/Navbar";
import { Container, Typography, Grid, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <Container maxWidth="lg" className="py-16">
        <Typography variant="h3" className="text-right text-gray-800 mb-12 font-bold">
          فئات التصاميم
        </Typography>
        
        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.name}>
              <Link href={`/ar/categories/${category.slug}`}>
                <Box className="relative h-80 group overflow-hidden rounded-lg">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <Box className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div>
                      <Typography variant="h5" className="text-white font-bold mb-2">
                        {category.name}
                      </Typography>
                      <Typography className="text-gray-200">
                        {category.description}
                      </Typography>
                    </div>
                  </Box>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}

const categories = [
  {
    name: "قفطان",
    slug: "kaftan",
    image: "/categories/kaftan.jpg",
    description: "تشكيلة متنوعة من القفاطين العصرية والتقليدية"
  },
  // ... add more categories with descriptions
]; 