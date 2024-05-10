"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";

export const Navbar = () => {
  // State to manage the visibility of the menu
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Function to toggle the menu visibility
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <nav className=" p-3 bg-[#F5F5F5] text-color-theme">
      <div className="flex flex-row justify-between">
        <IoIosMenu className="text-4xl  cursor-pointer" onClick={toggleMenu} />
        <h1 className="font-bold flex-auto text-2xl text-center text-[#7A3486]  ">
          KhayatliDz
        </h1>
      </div>
      {isMenuVisible && (
        <div className="flex flex-col items-center mt-3 ">
          <Link href="/">
            <p className="font-bold text-xl text-[#7A3486]">Home</p>
          </Link>
          <Link href="/profile">
            <p className="font-bold text-xl text-[#7A3486] mt-2">Profile</p>
          </Link>
        </div>
      )}
    </nav>
  );
};
