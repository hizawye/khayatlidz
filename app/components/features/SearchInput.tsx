"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

export function SearchInput() {
  const [query, setQuery] = useState('');
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${locale}/designs?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-2xl mx-auto">
      <div className="relative flex-1">
        <Search className={`absolute ${locale === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`} />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('home.hero.searchPlaceholder')}
          className={`w-full ${locale === 'ar' ? 'pr-10 text-right' : 'pl-10'} py-6 border-brand-300 focus:border-brand-500`}
        />
      </div>
      <Button type="submit" size="lg" className="px-6 py-6">
        {t('home.hero.searchButton')}
      </Button>
    </form>
  );
}

// Keep old export for backwards compatibility during migration
export { SearchInput as InputWithButton };
