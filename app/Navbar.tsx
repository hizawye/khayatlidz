"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUser, SignInButton, useClerk } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import Image from "next/image";
import { Menu, Home, Palette, User, LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();

  // Extract current locale from pathname
  const currentLocale = pathname?.split('/')[1] || 'ar';

  const handleSignOut = async () => {
    await signOut();
    router.push(`/${currentLocale}`);
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-purple-700 to-purple-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center px-4 min-h-[4rem] md:min-h-[5rem]">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden text-white hover:text-purple-200 p-2 rounded-md transition-colors"
            aria-label="فتح القائمة"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10 flex-grow justify-center">
            <Link
              href={`/${currentLocale}`}
              className="text-white hover:text-purple-200 transition-colors text-base lg:text-lg font-semibold whitespace-nowrap"
            >
              {currentLocale === 'ar' ? 'الرئيسية' : currentLocale === 'fr' ? 'Accueil' : 'Home'}
            </Link>
            <Link
              href={`/${currentLocale}/designs`}
              className="text-white hover:text-purple-200 transition-colors text-base lg:text-lg font-semibold whitespace-nowrap"
            >
              {currentLocale === 'ar' ? 'التصاميم' : currentLocale === 'fr' ? 'Designs' : 'Designs'}
            </Link>
            <Link
              href={`/${currentLocale}/categories`}
              className="text-white hover:text-purple-200 transition-colors text-base lg:text-lg font-semibold whitespace-nowrap"
            >
              {currentLocale === 'ar' ? 'الفئات' : currentLocale === 'fr' ? 'Catégories' : 'Categories'}
            </Link>
            <Authenticated>
              <Link
                href={`/${currentLocale}/profile`}
                className="text-white hover:text-purple-200 transition-colors text-base lg:text-lg font-semibold whitespace-nowrap"
              >
                {currentLocale === 'ar' ? 'الملف الشخصي' : currentLocale === 'fr' ? 'Profil' : 'Profile'}
              </Link>
            </Authenticated>
          </div>

          {/* Auth & Language */}
          <div className="flex items-center gap-3 md:gap-5">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <Authenticated>
              <div className="flex items-center">
                <Link href={`/${currentLocale}/profile`} aria-label={currentLocale === 'ar' ? 'الملف الشخصي' : currentLocale === 'fr' ? 'Profil' : 'Profile'}>
                  <div
                    className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] relative rounded-full border-2 border-purple-200 hover:border-purple-400 transition-all focus:outline-none focus:ring-2 focus:ring-purple-300"
                    style={{ minWidth: '36px' }}
                  >
                    {user ? (
                      <>
                        <Image
                          src={user.imageUrl || "/default-avatar.svg"}
                          alt={`صورة الملف الشخصي لـ ${user.fullName || "المستخدم"}`}
                          fill
                          className="rounded-full object-cover"
                          sizes="(max-width: 768px) 36px, 42px"
                          priority
                        />
                        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-green-500 rounded-full border-2 border-[#7e22ce]" aria-label="متصل"></div>
                      </>
                    ) : (
                      <div className="w-full h-full rounded-full bg-purple-200 animate-pulse" aria-label="جاري التحميل..." />
                    )}
                  </div>
                </Link>
              </div>
            </Authenticated>
            <Unauthenticated>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 md:px-6 py-1.5 md:py-2 text-sm md:text-base rounded-md font-medium transition-colors">
                <SignInButton mode="modal">
                  <span>{currentLocale === 'ar' ? 'تسجيل الدخول' : currentLocale === 'fr' ? 'Se connecter' : 'Sign In'}</span>
                </SignInButton>
              </button>
            </Unauthenticated>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white z-50 shadow-xl">
            <div className="p-4 md:p-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
              <h2 className="text-xl md:text-2xl font-bold">{currentLocale === 'ar' ? 'القائمة' : currentLocale === 'fr' ? 'Menu' : 'Menu'}</h2>
            </div>
            <nav className="p-3 md:p-4">
              <Link
                href={`/${currentLocale}`}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 hover:bg-purple-50 rounded-lg mb-2 p-3 transition-colors"
              >
                <Home className="w-5 h-5 text-purple-600" />
                <span className="font-medium">{currentLocale === 'ar' ? 'الرئيسية' : currentLocale === 'fr' ? 'Accueil' : 'Home'}</span>
              </Link>

              <Link
                href={`/${currentLocale}/designs`}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 hover:bg-purple-50 rounded-lg mb-2 p-3 transition-colors"
              >
                <Palette className="w-5 h-5 text-purple-600" />
                <span className="font-medium">{currentLocale === 'ar' ? 'التصاميم' : currentLocale === 'fr' ? 'Designs' : 'Designs'}</span>
              </Link>

              <Authenticated>
                <hr className="my-4 border-gray-200" />
                <Link
                  href={`/${currentLocale}/profile`}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 hover:bg-purple-50 rounded-lg mb-2 p-3 transition-colors"
                >
                  <User className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">{currentLocale === 'ar' ? 'الملف الشخصي' : currentLocale === 'fr' ? 'Profil' : 'Profile'}</span>
                </Link>

                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 hover:bg-red-50 rounded-lg text-red-600 p-3 transition-colors"
                >
                  <LogOut className="w-5 h-5 text-red-500" />
                  <span className="font-medium">{currentLocale === 'ar' ? 'تسجيل الخروج' : currentLocale === 'fr' ? 'Se déconnecter' : 'Sign Out'}</span>
                </button>
              </Authenticated>

              <Unauthenticated>
                <hr className="my-4 border-gray-200" />
                <div className="px-4">
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-base rounded-md font-medium transition-colors">
                    <SignInButton mode="modal">
                      <span>{currentLocale === 'ar' ? 'تسجيل الدخول' : currentLocale === 'fr' ? 'Se connecter' : 'Sign In'}</span>
                    </SignInButton>
                  </button>
                </div>
              </Unauthenticated>
            </nav>
          </div>
        </>
      )}
    </nav>
  );
};
