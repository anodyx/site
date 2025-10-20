"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-anodyx-light-blue/10 flex items-center justify-center px-4">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-anodyx-blue/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-anodyx-teal/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Card className="max-w-2xl w-full p-8 md:p-12 text-center bg-card/80 backdrop-blur-sm border-anodyx-blue/20">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/anodyx-logo.webp"
            alt="Anodyx Logo"
            width={80}
            height={80}
            className="drop-shadow-lg"
          />
        </div>

        {/* 404 Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-anodyx-blue to-anodyx-teal bg-clip-text text-transparent mb-4">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
              Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Oops! The page you&apos;re looking for doesn&apos;t exist. 
              Maybe it&apos;s still under construction as we prepare for launch.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button 
              asChild 
              size="lg"
              className="bg-gradient-to-r from-anodyx-blue to-anodyx-teal hover:from-anodyx-blue/90 hover:to-anodyx-teal/90 text-white px-6 py-3"
            >
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-anodyx-blue/30 text-anodyx-blue hover:bg-anodyx-blue/10 px-6 py-3"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.history.back();
                }
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Additional Info */}
          <div className="pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              Need help? Contact us at{" "}
              <a 
                href="mailto:anodyxofficial@gmail.com"
                className="text-anodyx-blue hover:underline font-medium"
              >
                anodyxofficial@gmail.com
              </a>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}