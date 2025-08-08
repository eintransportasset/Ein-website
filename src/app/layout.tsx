// "use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'react-day-picker/dist/style.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eintransport",
  description: "We provide on-demand, reliable, and affordable transport services for all your moving and delivery needs. Whether you need to relocate household items, deliver goods to customers, or transport commercial cargo, our fleet of vehicles and professional drivers ensure safe, fast, and hassle-free transportation.",
  icons: {
    icon: [
      { url: "/Eintransport.png", type: "image/png" },
      { url: "/Eintransport.png",  type: "image/png" },
    ],
    apple: "/Eintransport.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
