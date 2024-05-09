"use client";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import React, { useState } from "react";

export default function Profile() {
  const [title, setTitle] = useState("");
  const createGig = useMutation(api.gigs.createGig);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // call the mutation here
          createGig({
            title,
          });
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-emerald-100"
        />
        <button type="submit">create gig</button>
      </form>
    </>
  );
}
