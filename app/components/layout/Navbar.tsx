"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUser, SignInButton, useClerk } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import Image from "next/image";
import { Menu, Home, Palette, User, LogOut, Grid3x3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from 'next-intl';
import { LanguageSwitcher } from "../LanguageSwitcher";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const t = useTranslations();
  const locale = useLocale();

  const handleSignOut = async () => {
    await signOut();
    router.push(`/${locale}`);
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-brand-700 to-brand-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center px-4 min-h-[4rem] md:min-h-[5rem]">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden text-white hover:text-purple-200 p-2 rounded-md transition-colors"
            aria-label={t('accessibility.openMenu')}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10 flex-grow justify-center">
            <Link
              href={`/${locale}`}
              className="text-white hover:text-purple-200 transition-colors text-base lg:text-lg font-semibold whitespace-nowrap"
            >
              {t('nav.home')}
            </Link>
            <Link
              href={`/${locale}/designs`}
              className="text-white hover:text-purple-200 transition-colors text-base lg:text-lg font-semibold whitespace-nowrap"
            >
              {t('nav.designs')}
            </Link>
            <Link
              href={`/${locale}/categories`}
              className="text-white hover:text-purple-200 transition-colors text-base lg:text-lg font-semibold whitespace-nowrap"
            >
              {t('nav.categories')}
            </Link>
            <Authenticated>
              <Link
                href={`/${locale}/profile`}
                className="text-white hover:text-purple-200 transition-colors text-base lg:text-lg font-semibold whitespace-nowrap"
              >
                {t('nav.profile')}
              </Link>
            </Authenticated>
          </div>

          {/* Auth & Language */}
          <div className="flex items-center gap-3 md:gap-5">
            <LanguageSwitcher />
            <Authenticated>
              <div className="flex items-center">
                <Link href={`/${locale}/profile`} aria-label={t('nav.profile')}>
                  <div
                    className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] relative rounded-full border-2 border-purple-200 hover:border-purple-400 transition-all focus:outline-none focus:ring-2 focus:ring-purple-300"
                    style={{ minWidth: '36px' }}
                  >
                    {user ? (
                      <>
                        <Image
                          src={user.imageUrl || "/default-avatar.svg"}
                          alt={t('accessibility.profileImage')}
                          fill
                          className="rounded-full object-cover"
                          sizes="(max-width: 768px) 36px, 42px"
                          priority
                        />
                        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-green-500 rounded-full border-2 border-[#7e22ce]" aria-label={t('accessibility.online')}></div>
                      </>
                    ) : (
                      <div className="w-full h-full rounded-full bg-purple-200 animate-pulse" aria-label={t('accessibility.loading')} />
                    )}
                  </div>
                </Link>
              </div>
            </Authenticated>
            <Unauthenticated>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 md:px-6 py-1.5 md:py-2 text-sm md:text-base rounded-md font-medium transition-colors">
                <SignInButton mode="modal">
                  <span>{t('nav.signIn')}</span>
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
          <div className={`fixed top-0 ${locale === 'ar' ? 'right-0' : 'left-0'} h-full w-[280px] sm:w-[320px] bg-white z-50 shadow-xl`}>
            <div className="p-4 md:p-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
              <h2 className="text-xl md:text-2xl font-bold">{t('nav.menu')}</h2>
            </div>
            <nav className="p-3 md:p-4">
              <Link
                href={`/${locale}`}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 hover:bg-purple-50 rounded-lg mb-2 p-3 transition-colors"
              >
                <Home className="w-5 h-5 text-purple-600" />
                <span className="font-medium">{t('nav.home')}</span>
              </Link>

              <Link
                href={`/${locale}/designs`}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 hover:bg-purple-50 rounded-lg mb-2 p-3 transition-colors"
              >
                <Palette className="w-5 h-5 text-purple-600" />
                <span className="font-medium">{t('nav.designs')}</span>
              </Link>

              <Link
                href={`/${locale}/categories`}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 hover:bg-purple-50 rounded-lg mb-2 p-3 transition-colors"
              >
                <Grid3x3 className="w-5 h-5 text-purple-600" />
                <span className="font-medium">{t('nav.categories')}</span>
              </Link>

              <div className="my-4">
                <LanguageSwitcher />
              </div>

              <Authenticated>
                <hr className="my-4 border-gray-200" />
                <Link
                  href={`/${locale}/profile`}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 hover:bg-purple-50 rounded-lg mb-2 p-3 transition-colors"
                >
                  <User className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">{t('nav.profile')}</span>
                </Link>

                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 hover:bg-red-50 rounded-lg text-red-600 p-3 transition-colors"
                >
                  <LogOut className="w-5 h-5 text-red-500" />
                  <span className="font-medium">{t('nav.signOut')}</span>
                </button>
              </Authenticated>

              <Unauthenticated>
                <hr className="my-4 border-gray-200" />
                <div className="px-4">
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-base rounded-md font-medium transition-colors">
                    <SignInButton mode="modal">
                      <span>{t('nav.signIn')}</span>
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
