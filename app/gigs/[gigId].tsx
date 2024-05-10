"use client";
import { useRouter } from "next/router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";

const GigDetails = () => {
  const router = useRouter();
  const { gigId } = router.query;
  const gig = useQuery(api.gigs.getGig, gigId);

  if (gig === undefined) {
    return <p>Loading...</p>;
  }

  if (gig instanceof Error || gig === null) {
    return <p>Error loading gig details.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{gig.title}</h1>
      <Image
        src={gig.url}
        alt={gig.title}
        width={500}
        height={500}
        className="object-cover rounded-lg"
      />
      <p>{gig.description}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default GigDetails;
