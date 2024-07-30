"use client";
import Image from "next/image";
import { InputWithButton } from "./Input";
import { SlideShow } from "./SlideShow";
import { GigsGallery } from "./GigsGallery";
import headerBg from "@/public/couture.jpg";
import { Navbar } from "./Navbar";
export default function Home() {
  return (
    <div className="bg-purple-100">
      <header>
        <Navbar />
        <div className="lg:h-screen sm:h-96 relative">
          {" "}
          {/* Adjusted height as needed */}
          <div className="bg-[url('../public/couture.jpg')] bg-cover bg-no-repeat bg-center absolute inset-0">
            <div className="bg-gradient-to-b from-purple-400/80 to-purple-900/30 p-5 h-full flex flex-col justify-center">
              <div className="text-5xl font-bold text-right text-white pr-2">
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
      <div className="container mx-auto px-4">
        <p className="text-right font-bold text-3xl text-[#7A3486] pt-5 pr-3">
          بعض التفصيلات
        </p>

        <SlideShow />
      </div>
      <GigsGallery />
      <footer className="text-center py-2">
        <p>KhayatliDz © 2024</p>
      </footer>
    </div>
  );
}
