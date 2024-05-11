"use client";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import React, { FormEvent, useRef, useState } from "react";
import { Navbar } from "../Navbar";

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
    <div className="fixed inset-0">
      <Navbar />
      <div className="h-full  flex flex-col p-5 justify-center items-center">
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

          <button
            type="submit"
            className="bg-emerald-800 text-white rounded-e"
            disabled={selectedImage === null}
          >
            تحميل
          </button>
        </form>
      </div>

      {/* <div> */}
      {/*   {gigs?.map((gig) => { */}
      {/*     return ( */}
      {/*       <div key={gig._id} className="p-3"> */}
      {/*         <p>Title: {gig.title}</p> */}
      {/*         <p>Description: {gig.description}</p> */}
      {/*         <Image */}
      {/*           width={500} */}
      {/*           height={500} */}
      {/*           src={gig.url} */}
      {/*           alt="" */}
      {/*           className="object-cover" */}
      {/*         /> */}
      {/*       </div> */}
      {/*     ); */}
      {/*   })} */}
      {/* </div> */}
    </div>
  );
}
