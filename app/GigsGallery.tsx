"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import Image from "next/image";
import Link from "next/link"; // Import the Link component

export const GigsGallery = () => {
  const gigs = useQuery(api.gigs.getGigs);

  if (gigs === undefined) {
    return <p>Loading...</p>;
  }

  if (gigs instanceof Error) {
    return <p>Error loading gigs.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gigs.map((gig) => (
          <div key={gig._id} className="flex flex-col space-y-2">
            <Link href={`/gigs/${gig._id}`}>
              <p className="text-center text-lg font-semibold">{gig.title}</p>
              <Image
                src={gig.url}
                alt={gig.title}
                width={500}
                height={500}
                className="object-cover rounded-lg cursor-pointer"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
