"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Navbar } from "../Navbar";
import { api } from "@/convex/_generated/api";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import Image from "next/image";

import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";

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

      const response = await fetch(postUrl, {
        method: "POST",
        body: selectedImage,
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

      <Authenticated>
        <div className="h-full flex flex-col justify-center items-center">
          <form
            className="flex flex-col w-full p-5 gap-2 "
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
                الغاء الصورة
              </button>
            )}
            <button
              type="submit"
              className="bg-emerald-800 text-white p-2 rounded-lg"
              disabled={!selectedImage || isUploading}
            >
              تحميل
            </button>
            {isUploading ? (
              <div className="absolute top-0 right-0 h-screen w-screen   bg-black opacity-70 flex justify-center items-center">
                <p className=" text-white  text-2xl font-bold">
                  ...جاري التحميل
                </p>
              </div>
            ) : (
              <></>
            )}
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
      </Authenticated>
      <Unauthenticated>
        <div className="flex items-center flex-col">
          <h2 className="bg-green-900 p-2 rounded-lg text-white text-xl font-bold mb-4">
            <SignUpButton />
          </h2>

          <h2 className="bg-green-900 p-2 rounded-lg text-white text-xl font-bold mb-4">
            <SignInButton />
          </h2>
        </div>
      </Unauthenticated>
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
