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

const Index = () => (
  <SmoothScrollProvider>
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

export default Index;

