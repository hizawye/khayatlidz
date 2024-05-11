"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Navbar } from "../Navbar";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";

export default function Profile() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const createGig = useMutation(api.gigs.createGig);
  const gigs = useQuery(api.gigs.getGigs);
  const generateUploadUrl = useMutation(api.gigs.generateUploadUrl);

  const imageInput = useRef<HTMLInputElement>(null);

  async function handleOnSubmit(e: FormEvent) {
    e.preventDefault();
    if (selectedImage) {
      setIsUploading(true);
      const postUrl = await generateUploadUrl();

      const formData = new FormData();
      formData.append("file", selectedImage);

      const response = await fetch(postUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const { storageId } = await response.json();
        createGig({
          title,
          description,
          storageId,
        });
        setTitle("");
        setDescription("");
        setSelectedImage(null);
        setImagePreviewUrl(null);
        if (imageInput.current) {
          imageInput.current.value = "";
        }
      } else {
        console.error("Error uploading image");
      }

      setIsUploading(false);
      setUploadProgress(0);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];
    setSelectedImage(file);
    const fileUrl = URL.createObjectURL(file);
    setImagePreviewUrl(fileUrl);
  }

  function handleRemoveImage() {
    setSelectedImage(null);
    setImagePreviewUrl(null);
    if (imageInput.current) {
      imageInput.current.value = "";
    }
  }

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  return (
    <div className="fixed inset-0">
      <Navbar />
      <div className="h-full flex flex-col justify-center items-center">
        <form
          className="flex flex-col w-full p-5 space-y-2"
          onSubmit={handleOnSubmit}
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-emerald-100 p-2"
            placeholder="Title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-emerald-100 p-2"
            placeholder="Description"
          />
          <input
            type="file"
            accept="image/*"
            ref={imageInput}
            onChange={handleImageChange}
          />
          {selectedImage && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="bg-red-500 text-white p-2 rounded-lg mt-2"
            >
              Remove Photo
            </button>
          )}
          <button
            type="submit"
            className="bg-emerald-800 text-white p-2 rounded-lg"
            disabled={!selectedImage || isUploading}
          >
            {isUploading ? "...جاري التحميل" : "تحميل"}
          </button>
        </form>
        {imagePreviewUrl && (
          <div className="mt-4">
            <Image
              width={500}
              height={500}
              src={imagePreviewUrl}
              alt="Image Preview"
              className="max-w-xs"
            />
          </div>
        )}
        {isUploading && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}

{
  /* <div> */
}
{
  /*   {gigs?.map((gig) => { */
}
{
  /*     return ( */
}
{
  /*       <div key={gig._id} className="p-3"> */
}
{
  /*         <p>Title: {gig.title}</p> */
}
{
  /*         <p>Description: {gig.description}</p> */
}
{
  /*         <Image */
}
{
  /*           width={500} */
}
{
  /*           height={500} */
}
{
  /*           src={gig.url} */
}
{
  /*           alt="" */
}
{
  /*           className="object-cover" */
}
{
  /*         /> */
}
{
  /*       </div> */
}
{
  /*     ); */
}
{
  /*   })} */
}
{
  /* </div> */
}
