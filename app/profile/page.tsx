// "use client";
// import {
//   Authenticated,
//   Unauthenticated,
//   useMutation,
//   useQuery,
// } from "convex/react";
// import { SignInButton } from "@clerk/clerk-react";
// import { api } from "@/convex/_generated/api";
// import { useEffect } from "react";
//
// export default function Profile() {
//   useEffect(() => {
//     storeuser();
//   });
//   const storeuser = useMutation(api.users.storeUser);
//   return (
//     <>
//       <Unauthenticated>
//         <SignInButton></SignInButton>
//       </Unauthenticated>
//       <Authenticated>
//         <p></p>
//       </Authenticated>
//     </>
//   );
// }

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
  const storeUser = useMutation(api.users.storeUser);
  useEffect(() => {
    storeUser({});
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[] | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string[] | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const createPost = useMutation(api.posts.createPost);
  const userPosts = useQuery(api.posts.getUserPosts);
  const generateUploadUrl = useMutation(api.posts.generateUploadUrl);
  const currentUser = useQuery(api.users.currentUser);

  const imageInput = useRef<HTMLInputElement>(null);

  async function handleOnSubmit(e: FormEvent) {
    e.preventDefault();
    if (selectedImages?.length) {
      setIsUploading(true);
      const uploadPromises = [];

      for (const image of selectedImages) {
        const postUrl = await generateUploadUrl();
        uploadPromises.push(
          fetch(postUrl, {
            method: "POST",
            body: image,
          }),
        );
      }
      const responses = await Promise.all(uploadPromises);
      const storageIds = [];

      for (const response of responses) {
        if (response.ok) {
          const { storageId } = await response.json();
          storageIds.push(storageId);
        } else {
          console.error("Error uploading image");
        }
      }
      createPost({
        userId: currentUser!._id,
        title: title,
        description: description,
        imageUrls: storageIds,
      });
      setTitle("");
      setDescription("");
      setSelectedImages(null);
      setImagePreviewUrl(null);
      if (imageInput.current) {
        imageInput.current.value = "";
      }

      setIsUploading(false);
      setUploadProgress(0);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files!) as File[];
    setSelectedImages(files);
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviewUrl(fileUrls);
  }

  function handleRemoveImage() {
    setSelectedImages(null);
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
              multiple
              ref={imageInput}
              onChange={handleImageChange}
            />
            {selectedImages && (
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
              disabled={!selectedImages || isUploading}
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
