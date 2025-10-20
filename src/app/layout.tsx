import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anodyx - Launching Soon | Digital Transformation Solutions",
  description: "Anodyx is launching soon! We specialize in building stunning websites, custom software solutions, and helping businesses establish their online presence. Get in touch: anodyxofficial@gmail.com",
  keywords: ["Anodyx", "web development", "software solutions", "digital transformation", "online presence", "custom software"],
  authors: [{ name: "Anodyx Team" }],
  creator: "Anodyx",
  publisher: "Anodyx",
  openGraph: {
    title: "Anodyx - Launching Soon",
    description: "Digital transformation solutions coming soon. Building the future of online presence.",
    url: "https://anodyx.com",
    siteName: "Anodyx",
    type: "website",
    images: [
      {
        url: "/anodyx-logo.webp",
        width: 1200,
        height: 630,
        alt: "Anodyx Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anodyx - Launching Soon",
    description: "Digital transformation solutions coming soon",
    images: ["/anodyx-logo.webp"],
  },
  verification: {
    google: "google25d940b90cbc035a",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

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
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TQTMH6WN');
            `,
          }}
        />
        
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TQTMH6WN"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        {children}
      </body>
    </html>
  );
}
