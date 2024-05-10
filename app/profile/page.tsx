"use client";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import React, { FormEvent, useRef, useState } from "react";

export default function Profile() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const createGig = useMutation(api.gigs.createGig);
  const gigs = useQuery(api.gigs.getGigs);
  const generateUploadUrl = useMutation(api.gigs.generateUploadUrl);

  const imageInput = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  async function handleOnSubmit(e: FormEvent) {
    e.preventDefault();
    // call the mutation here
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": selectedImage!.type },
      body: selectedImage,
    });
    const { storageId } = await result.json();
    createGig({
      title,
      description,
      storageId,
    });
    setTitle("");
    setDescription("");
    setSelectedImage(null);
    imageInput.current!.value = "";
  }
  return (
    <>
      <form className="flex flex-col m-5 space-y-2" onSubmit={handleOnSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-emerald-100"
          placeholder="title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-emerald-100"
          placeholder="description"
        />
        <input
          type="file"
          accept="image/*"
          ref={imageInput}
          onChange={(e) => setSelectedImage(e.target.files![0])}
          disabled={selectedImage !== null}
        />

        <button type="submit" disabled={selectedImage === null}>
          create gig
        </button>
      </form>

      <div>
        {gigs?.map((gig) => {
          return (
            <div key={gig._id}>
              {gig.title},{gig.description}
              {<img src={gig.image.url} alt="" />}
            </div>
          );
        })}
      </div>
    </>
  );
}
