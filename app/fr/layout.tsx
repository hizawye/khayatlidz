import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "خياطلي - الأزياء التقليدية الجزائرية",
  description: "منصة تجمع أفضل الخياطين والمصممين في الجزائر",
};

export default function ArabicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
} 