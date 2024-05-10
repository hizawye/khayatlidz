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
    return <p>Loading...</p>;
  }

  if (gig instanceof Error || gig === null) {
    return <p>Error loading gig details.</p>;
  }

  return (
    <>
      <Navbar />
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
    </>
  );
};

export default GigDetails;

//TODO adding a state of where user came from ,add button to get him back
