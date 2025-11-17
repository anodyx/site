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
  metadataBase: new URL('https://anodyx.com'),
  title: "Anodyx - Digital Transformation Solutions | Web Development & Software Services",
  description: "Anodyx specializes in building stunning websites, custom software solutions, and helping businesses establish their digital presence. Professional web development, software consulting, and digital transformation services.",
  keywords: [
    "Anodyx", 
    "web development", 
    "software solutions", 
    "digital transformation", 
    "online presence", 
    "custom software",
    "website design",
    "software consulting",
    "digital agency",
    "web applications"
  ],
  authors: [{ name: "Anodyx Team" }],
  creator: "Anodyx",
  publisher: "Anodyx",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' }
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Anodyx - Digital Transformation Solutions",
    description: "Professional web development, software solutions, and digital transformation services. Building the future of online presence.",
    url: "https://anodyx.com",
    siteName: "Anodyx",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Anodyx - Digital Solutions",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@anodyx",
    creator: "@anodyx",
    title: "Anodyx - Digital Transformation Solutions",
    description: "Professional web development and software solutions. Building the future of online presence.",
    images: ["/android-chrome-512x512.png"],
  },
  verification: {
    google: "google25d940b90cbc035a",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://anodyx.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#2563eb" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#3b82f6" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased selection:bg-primary/20`}
        suppressHydrationWarning
      >
        {/* Google Tag Manager */}
        <Script
          id="gtm-head"
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
        
        {/* Google Tag Manager (noscript) - Should be immediately after opening body tag */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TQTMH6WN"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        
        <div id="main-content">
          {children}
        </div>
        
        {/* Scroll to top functionality */}
        <Script
          id="scroll-behavior"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              // Enhanced scroll behavior
              if (typeof window !== 'undefined') {
                // Smooth scrolling for anchor links
                document.addEventListener('click', function(e) {
                  const target = e.target.closest('a[href^="#"]');
                  if (target) {
                    e.preventDefault();
                    const id = target.getAttribute('href').slice(1);
                    const element = document.getElementById(id);
                    if (element) {
                      element.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
