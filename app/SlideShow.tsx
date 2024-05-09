"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

export const SlideShow = () => {
  const data = [
    {
      id: 0,
      title: "card0",
      imgLink: "/bey.jpeg",
    },
    {
      id: 1,
      title: "card1",
      imgLink: "https://i.ibb.co/c8grkyc/couture.jpg",
    },
    {
      id: 2,
      title: "card2",
      imgLink: "https://i.ibb.co/c8grkyc/couture.jpg",
    },
    {
      id: 3,
      title: "card3",
      imgLink: "https://i.ibb.co/c8grkyc/couture.jpg",
    },
    {
      id: 4,
      title: "card4",
      imgLink: "https://i.ibb.co/c8grkyc/couture.jpg",
    },
    {
      id: 5,
      title: "card5",
      imgLink: "https://i.ibb.co/c8grkyc/couture.jpg",
    },
    {
      id: 6,
      title: "card6",
      imgLink: "https://i.ibb.co/c8grkyc/couture.jpg",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === data.length - 1 ? 0 : prevSlide + 1,
      );
    }, 10000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === data.length - 1 ? 0 : prevSlide + 1,
    );
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? data.length - 1 : prevSlide - 1,
    );
  };

  return (
    <div className="relative rounded-md overflow-hidden p-5">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {data.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-full h-52 relative ml-2 "
          >
            <Image
              src={item.imgLink}
              alt={item.title}
              className="object-cover w-full h-full rounded-md"
              layout="fill"
              objectFit="cover"
            />
            <div className="bg-gradient-to-t from-black absolute bottom-0 w-full p-1  text-white rounded-md text-center">
              {item.title}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={goToPrevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2 text-3xl text-white"
      >
        <FaArrowAltCircleLeft />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 text-3xl text-white"
      >
        <FaArrowAltCircleRight />
      </button>
    </div>
  );
};
