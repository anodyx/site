/**
 * SEO Configuration for Anodyx
 * Central location for all SEO-related constants and metadata
 */

export const SEO_CONFIG = {
  // Site Information
  siteName: "Anodyx",
  siteUrl: "https://anodyx.com",
  companyEmail: "anodyxofficial@gmail.com",
  
  // Default Meta Tags
  defaultTitle: "Anodyx - Digital Transformation & Custom Software Solutions",
  defaultDescription: "Anodyx specializes in digital transformation, custom software development, and building exceptional online presence for businesses. Expert web development and software solutions tailored to your needs.",
  defaultKeywords: "digital transformation, custom software development, web development, online presence, software solutions, digital services, business software, web design, Anodyx",
  
  // Social Media
  twitter: "@Anodyx",
  
  // Images
  ogImage: "/android-chrome-512x512.png",
  ogImageAlt: "Anodyx - Digital Transformation Solutions",
  
  // Theme
  themeColor: "#000000",
  
  // Organization Schema
  organizationSchema: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Anodyx",
    url: "https://anodyx.com",
    logo: "https://anodyx.com/android-chrome-512x512.png",
    description: "Digital transformation and custom software solutions company specializing in web development and online presence.",
    email: "anodyxofficial@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US"
    },
    sameAs: [
      "https://twitter.com/Anodyx"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "anodyxofficial@gmail.com",
      contactType: "Customer Service"
    }
  }
} as const;

/**
 * Page-specific SEO configurations
 */
export const PAGE_SEO = {
  home: {
    title: "Anodyx - Digital Transformation & Custom Software Solutions",
    description: "Anodyx specializes in digital transformation, custom software development, and building exceptional online presence for businesses. Expert web development and software solutions tailored to your needs.",
    keywords: "digital transformation, custom software development, web development, online presence, software solutions",
    path: "/"
  },
  notFound: {
    title: "404 - Page Not Found | Anodyx",
    description: "The page you're looking for doesn't exist. Return to Anodyx homepage for digital transformation solutions.",
    keywords: "404, page not found",
    path: "*"
  }
} as const;

/**
 * Generate full URL from path
 */
export const getFullUrl = (path: string): string => {
  return `${SEO_CONFIG.siteUrl}${path}`;
};

/**
 * Generate page title
 */
export const getPageTitle = (title?: string): string => {
  if (!title) return SEO_CONFIG.defaultTitle;
  return `${title} | ${SEO_CONFIG.siteName}`;
};
