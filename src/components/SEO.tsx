import { Helmet } from "react-helmet-async";
import { SEO_CONFIG, getFullUrl } from "@/lib/seo";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  structuredData?: object;
}

/**
 * SEO Component for managing meta tags dynamically
 * Uses react-helmet-async to update document head
 */
export const SEO = ({
  title = SEO_CONFIG.defaultTitle,
  description = SEO_CONFIG.defaultDescription,
  keywords = SEO_CONFIG.defaultKeywords,
  path = "/",
  image = SEO_CONFIG.ogImage,
  type = "website",
  noindex = false,
  structuredData
}: SEOProps) => {
  const fullUrl = getFullUrl(path);
  const fullImageUrl = image.startsWith("http") ? image : getFullUrl(image);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content={SEO_CONFIG.twitter} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
