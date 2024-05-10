"use client";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { Navbar } from "@/app/Navbar";
import { v } from "convex/values";

interface Params {
  gigId: any; // Assuming gigId is of type string
}

const GigDetails = ({ params }: { params: Params }) => {
  const router = useRouter();
  const gigId = params.gigId;
  const gig = useQuery(api.gigs.getGig, { gigId });

  if (gig === undefined) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (gig instanceof Error || gig === null) {
    return <p className="text-red-500">Error loading gig details.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{gig.title}</h1>
        <div className="w-full max-w-md mx-auto">
          {" "}
          {/* Image container for responsiveness */}
          <Image
            src={gig.url}
            alt={gig.title}
            width={500}
            height={500}
            className="object-cover rounded-lg shadow-md"
          />
        </div>
        <p className="mt-4 text-gray-700">{gig.description}</p>
        {/* Add more details as needed */}
      </div>
    </>
  );
};

export default GigDetails;

//TODO adding a state of where user came from ,add button to get him back
