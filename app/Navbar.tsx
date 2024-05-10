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
    <nav className="bg-gray-100 p-3 text-gray-800">
      <div className="flex flex-row justify-between items-center">
        <IoIosMenu className="text-4xl cursor-pointer" onClick={toggleMenu} />
        <h1 className="font-bold text-2xl flex-auto text-center text-purple-700">
          KhayatliDz
        </h1>
      </div>
      {isMenuVisible && (
        <div className="flex flex-col items-center mt-3 space-y-2">
          <Link href="/">
            <p className="font-bold text-xl text-purple-700 hover:underline">
              Home
            </p>
          </Link>
          <Link href="/profile">
            <p className="font-bold text-xl text-purple-700 hover:underline">
              Profile
            </p>
          </Link>
        </div>
      )}
    </nav>
  );
};
