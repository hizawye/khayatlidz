"use client";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import React, { useState } from "react";

export default function Profile() {
  const [title, setTitle] = useState("");
  const createGig = useMutation(api.gigs.createGig);
  const gigs = useQuery(api.gigs.getGigs);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // call the mutation here
          createGig({
            title,
          });
          setTitle("")
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-emerald-100"
        />
        <button type="submit">create gig</button>
      </form>
      <body>
        {gigs?.map((gig) => {
          return <div key={gig._id}>{gig.title}</div>;
        })}
      </body>
    </>
  );
}
