import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WorksSection3D from "@/components/WorksSection3D";
import TestimonialSlider from "@/components/TestimonialSlider";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import ParallaxDivider from "@/components/ParallaxDivider";
import SEO from "@/components/SEO";
import { PAGE_SEO, SEO_CONFIG } from "@/lib/seo";

const Index = () => {
  // Structured data for homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SEO_CONFIG.siteName,
    "url": SEO_CONFIG.siteUrl,
    "description": PAGE_SEO.home.description,
    "publisher": SEO_CONFIG.organizationSchema
  };

  return (
    <SmoothScrollProvider>
      <SEO
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        keywords={PAGE_SEO.home.keywords}
        path={PAGE_SEO.home.path}
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />
        <HeroSection />
        <ParallaxDivider variant="wave" />
        <TestimonialSlider />
        <ParallaxDivider variant="gradient" />
        <WhyChooseSection />
        <ParallaxDivider variant="gradient" />
        <HowItWorksSection />
        <ParallaxDivider variant="dots" />
        <WorksSection3D />
        <ParallaxDivider variant="wave" flip />
        <CTASection />
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
};

export default Index;

