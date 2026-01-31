"use client";

import { useTranslations, useLocale } from 'next-intl';
import { Navbar } from "../layout/Navbar";
import { GigsGallery } from "../features/PostsGrid";

export default function DesignsPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-gray-50" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar />

      {/* Designs Gallery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className={`text-3xl md:text-4xl ${locale === 'ar' ? 'text-right' : 'text-left'} text-gray-800 mb-8 font-bold`}>
            {t('designs.allDesigns')}
          </h1>
          <GigsGallery />
        </div>
      </section>
    </main>
  );
}
