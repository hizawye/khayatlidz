import { getRequestConfig } from 'next-intl/server';

export const locales = ['ar', 'en', 'fr'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is valid, fallback to 'ar' if undefined
  const validLocale = locale && locales.includes(locale as Locale) ? locale : 'ar';
  
  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default
  };
});
