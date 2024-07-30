"use client";
import Image from "next/image";
import { InputWithButton } from "./Input";
import { SlideShow } from "./SlideShow";
import { GigsGallery } from "./GigsGallery";
import headerBg from "@/public/couture.jpg";
import { Navbar } from "./Navbar";
export default function Home() {
  return (
    <div className="">
      <header>
        <Navbar />
        <div className="lg:h-screen sm:h-[500px] h-[400px] relative">
          {" "}
          {/* Adjusted height as needed */}
          <div className="bg-[url('../public/couture.jpg')] bg-cover bg-no-repeat bg-center absolute inset-0">
            <div className="bg-gradient-to-b from-purple-400/80 to-purple-900/30 p-5 h-full flex flex-col justify-center">
              <div className="text-3xl md:text-5xl lg:text-5xl font-bold text-right text-white pr-2">
                <p>حوس و اختار</p>
                <p>واش تحب</p>
                <p>كامل الخياطين راهم هنا</p>
              </div>
              <div className="flex justify-center mt-10">
                <InputWithButton />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className=" px-4">
        <p className="text-right font-bold text-3xl text-[#7A3486] pt-3 pb-1">
          بعض التفصيلات
        </p>

        <SlideShow />
      </div>
      <GigsGallery />
      <footer className="text-center bg-gray-100 py-2">
        <p>KhayatliDz © 2024</p>
      </footer>
    </div>
  );
}
