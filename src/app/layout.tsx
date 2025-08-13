// "use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'react-day-picker/dist/style.css';
import Script from "next/script";

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
      { url: "/Eintransport.png", type: "image/png" },
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
      <head>
        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17381887493"
        />
        <Script
          id="google-ads"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17381887493');
            `,
          }}
        />
        
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
