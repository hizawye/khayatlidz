"use client";

import { Navbar } from "../Navbar";
import { GigsGallery } from "../GigsGallery";
import { Container, Typography } from "@mui/material";

export default function DesignsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Designs Gallery Section */}
      <section className="py-16 bg-white">
        <Container maxWidth="lg">
          <Typography variant="h3" className="text-right text-gray-800 mb-8 font-bold">
            جميع التصاميم
          </Typography>
          <GigsGallery />
        </Container>
      </section>
    </main>
  );
} 