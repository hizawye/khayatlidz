"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import Image from "next/image";

export const GigsGallery = () => {
  const gigs = useQuery(api.gigs.getGigs);
  return (
    <div>
      {gigs?.map((gig) => {
        return (
          <div key={gig._id} className="flex flex-col space-y-2">
            <p>{gig.title}</p>
            <Image src={gig.url} alt="" width={500} height={500} />
          </div>
        );
      })}
    </div>
  );
};
