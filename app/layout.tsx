import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import { Providers } from "./providers";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['arabic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Khayatli Dz",
  description: "khayatlidz website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <style>
          {`
            body {
              margin: 0;
              padding: 0;
              width: 100%;
              overflow-x: hidden;
            }
          `}
        </style>
      </head>
      <body className={ibmPlexSansArabic.className}>
        <Providers>
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
        </Providers>
      </body>
    </html>
  );
}
