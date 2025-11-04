import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "尊想世家 LUXE DREAM HOME - 全球高端电商社交开创者",
  description: "万物皆可定 | 全球限量定制发行网 | 中国·杭州 | 为您打造专属的奢华定制体验，提供顶级豪车、奢侈品等高端定制服务",
  keywords: "尊想世家,LUXE DREAM HOME,高端定制,豪华汽车,奢侈品定制,限量定制,杭州,全球电商",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
