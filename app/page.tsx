import Image from "next/image";
import { IoIosMenu } from "react-icons/io";
import headerBg from "@/public/couture.jpg";
import { InputWithButton } from "./Input";
import { SlideShow } from "./SlideShow";

export default function Home() {
  return (
    <div>
      <header>
        <nav className="flex justify-center p-3 bg-[##F5F5F5] text-color-theme">
          <div>
            <IoIosMenu className="text-4xl " />
          </div>
          <h1 className="font-bold text-2xl flex-auto text-center text-[#7A3486]">
            KhayatliDz.
          </h1>
        </nav>
        <div>
          <div className="bg-[url('../public/couture.jpg')]  bg-cover bg-no-repeat bg-center ">
            <div className="bg-gradient-to-b from-purple-400/80  to-purple-900/30 p-5 ">
              <div className="font-bold text-3xl pt-10 pr-2 text-right text-white">
                <p>حوس و اختار</p>
                <p>واش تحب</p>
                <p>كامل الخياطين راهم هنا</p>
              </div>
              <div className="flex justify-center p-2 pt-20">
                <InputWithButton />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="m-4">
        <p className="text-right font-bold text-3xl text-[#7A3486] pt-5 pr-3 ">
          بعض التفصيلات
        </p>

        <SlideShow />
      </div>
      <footer className="text-center m-2">
        <p>KhayatliDz © 2024</p>
      </footer>
    </div>
  );
}
