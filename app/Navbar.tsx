"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";
import { UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";

export const Navbar = () => {
  // State to manage the visibility of the menu
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Function to toggle the menu visibility
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <nav className=" relative">
      <div className="flex  flex-row p-3 justify-between items-center">
        <IoIosMenu className="text-4xl cursor-pointer" onClick={toggleMenu} />
        <h1 className="font-bold text-2xl flex-auto text-center text-purple-700">
          <Link href={"/"}> KhayatliDz</Link>
        </h1>
        <Authenticated>
          <UserButton></UserButton>
        </Authenticated>
        <Unauthenticated>login</Unauthenticated>
      </div>
      {isMenuVisible && (
        <div className="absolute top-full z-10 text-white flex flex-col items-center  w-full space-y-2 bg-black bg-opacity-35 p-5 ">
          <Link href="/">
            <p className="font-semibold text-xl  hover:underline border-b border-b-white ">
              Home
            </p>
          </Link>
          <Link href="/profile">
            <p className="font-semibold text-xl  hover:underline border-b border-b-white">
              Profile
            </p>
          </Link>
        </div>
      )}
    </nav>
  );
};
