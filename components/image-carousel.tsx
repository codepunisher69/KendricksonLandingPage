"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { getImageList, createImageCarouselConfig } from "@/lib/image-utils";

interface ImageCarouselProps {
  imageDirectory?: string;
  autoRotate?: boolean;
  rotationSpeed?: number;
  className?: string;
}

export const ImageCarousel = ({
  imageDirectory = "/about-us",
  autoRotate = true,
  rotationSpeed = 3000,
  className = "",
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const config = createImageCarouselConfig(imageDirectory);
        const imagePaths = await getImageList(config);

        setImages(imagePaths);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
        setIsLoading(false);
      }
    };

    loadImages();
  }, [imageDirectory]);

  useEffect(() => {
    if (!autoRotate || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, rotationSpeed);

    return () => clearInterval(interval);
  }, [autoRotate, rotationSpeed, images.length]);

  if (isLoading) {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 shadow-xl backdrop-blur-sm ${className}`}
      >
        <div className="relative aspect-[4/3] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">
            Loading images...
          </div>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 shadow-xl backdrop-blur-sm ${className}`}
      >
        <div className="relative aspect-[4/3] flex items-center justify-center">
          <div className="text-muted-foreground">No images found</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 shadow-xl backdrop-blur-sm ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <div
          className="flex h-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 relative h-full">
              <Image
                fill
                alt={`Gallery image ${index + 1}`}
                className="object-cover grayscale contrast-125 brightness-105"
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 480px"
                quality={70}
                src={image}
              />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

        {/* Carousel indicators - only show if more than 1 image */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white/80" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
