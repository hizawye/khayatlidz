"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const languages = [
  { code: 'ar', name: 'العربية', englishName: 'Arabic', dir: 'rtl' },
  { code: 'en', name: 'English', englishName: 'English', dir: 'ltr' },
  { code: 'fr', name: 'Français', englishName: 'French', dir: 'ltr' }
];

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split('/')[1] || 'ar';
  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    const segments = pathname.split('/');
    segments[1] = langCode;
    const newPath = segments.join('/');
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white hover:text-brand-200 hover:bg-white/10 border border-white/30 px-3"
        aria-label="Change language"
      >
        <Globe className="w-5 h-5" />
        <span className="hidden sm:inline font-medium">{currentLanguage.englishName}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20 overflow-hidden border border-gray-200">
            <div className="py-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full px-4 py-3 text-left hover:bg-brand-50 transition-colors flex items-center justify-between ${
                    currentLanguage.code === language.code
                      ? 'bg-brand-100 text-brand-700 font-semibold'
                      : 'text-gray-700'
                  }`}
                >
                  <div>
                    <div className="font-medium">{language.name}</div>
                    <div className="text-xs text-gray-500">{language.englishName}</div>
                  </div>
                  {currentLanguage.code === language.code && (
                    <Check className="w-5 h-5 text-brand-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
