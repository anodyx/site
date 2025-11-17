"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, ArrowUpRight, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(logoRef.current, 
      { opacity: 0, scale: 0.5, rotation: -180 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
    );
    
    if (heroRef.current?.children) {
      tl.fromTo(Array.from(heroRef.current.children), 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" },
        "-=0.5"
      );
    }
    
    gsap.to(logoRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });
    
    gsap.to(".bg-anodyx-blue\\/10", {
      scale: 1.1,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });
    
    gsap.to(".bg-anodyx-teal\\/10", {
      scale: 0.9,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: 1
    });
    
    gsap.to(".bg-anodyx-orange\\/10", {
      scale: 1.2,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: 2
    });
    
    const cards = document.querySelectorAll('[data-card]');
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.05, duration: 0.3, ease: "power2.out" });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-anodyx-light-blue/10 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-anodyx-blue/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-anodyx-teal/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-anodyx-orange/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <div ref={logoRef} className="flex items-center space-x-3">
              <Image
                src="/android-chrome-512x512.png"
                alt="Anodyx"
                width={50}
                height={50}
                className="drop-shadow-lg"
                priority
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-anodyx-blue to-anodyx-teal bg-clip-text text-transparent">
                Anodyx
              </span>
            </div>
            <Badge variant="secondary" className="bg-anodyx-blue/80 text-anodyx-dark border-anodyx-blue/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Coming Soon
            </Badge>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-4 py-12 lg:py-24">
          <div ref={heroRef} className="max-w-4xl mx-auto text-center space-y-8">
            {/* Logo Animation Container */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Image
                  src="/android-chrome-512x512.png"
                  alt="Anodyx Logo"
                  width={150}
                  height={150}
                  className="drop-shadow-2xl"
                  priority
                />
                {/* Animated rings */}
                <div className="absolute inset-0 rounded-full border-2 border-anodyx-blue/30 animate-ping" />
                <div className="absolute inset-4 rounded-full border border-anodyx-teal/40 animate-pulse" />
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold">
                <span className="bg-gradient-to-r from-anodyx-blue via-anodyx-teal to-anodyx-blue bg-clip-text text-transparent">
                  Launching
                </span>
                <br />
                <span className="text-foreground">Something</span>{" "}
                <span className="bg-gradient-to-r from-anodyx-blue to-anodyx-teal bg-clip-text text-transparent">
                  Amazing
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                We&apos;re building the future of{" "}
                <span className="text-anodyx-blue font-semibold">digital transformation</span>.
                <br />
                Innovative software solutions that elevate your business to new heights.
              </p>
            </div>

            {/* Features Preview */}
            <div className="grid md:grid-cols-3 gap-6 my-16">
              <Card data-card className="p-6 border-anodyx-blue/20 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:border-anodyx-blue/40">
                <div className="w-12 h-12 bg-gradient-to-br from-anodyx-blue to-anodyx-teal rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <ArrowUpRight className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Online Presence</h3>
                <p className="text-muted-foreground text-sm">Building stunning websites and digital experiences</p>
              </Card>
              
              <Card data-card className="p-6 border-anodyx-teal/20 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:border-anodyx-teal/40">
                <div className="w-12 h-12 bg-gradient-to-br from-anodyx-teal to-anodyx-blue rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Custom Solutions</h3>
                <p className="text-muted-foreground text-sm">Tailored software products for your unique needs</p>
              </Card>
              
              <Card data-card className="p-6 border-anodyx-orange/20 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:border-anodyx-orange/40">
                <div className="w-12 h-12 bg-gradient-to-br from-anodyx-teal to-anodyx-blue rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Expert Support</h3>
                <p className="text-muted-foreground text-sm">Dedicated team to bring your vision to life</p>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="space-y-6">
              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-anodyx-blue to-anodyx-teal hover:from-anodyx-blue/90 hover:to-anodyx-teal/90 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <a href="mailto:anodyxofficial@gmail.com">
                    <Mail className="w-5 h-5 mr-2" />
                    Get in Touch
                  </a>
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                💡 Already trusted by growing businesses
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 mt-24">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <Image
                src="/android-chrome-192x192.png"
                alt="Anodyx"
                width={32}
                height={32}
              />
              <span className="text-sm text-muted-foreground">
                © 2025 Anodyx. All rights reserved.
              </span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a 
                href="mailto:anodyxofficial@gmail.com"
                className="text-sm text-muted-foreground hover:text-anodyx-blue transition-colors duration-200 flex items-center space-x-1"
              >
                <Mail className="w-4 h-4" />
                <span>anodyxofficial@gmail.com</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
