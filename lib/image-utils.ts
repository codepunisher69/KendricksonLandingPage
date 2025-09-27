// Utility functions for handling image carousels
import type { StaticImageData } from "next/image";

// Statically import carousel images so Next can generate blurDataURL placeholders
import img1 from "@/public/about-us/IMG_4407.jpeg";
import img2 from "@/public/about-us/IMG_4412.jpeg";
import img3 from "@/public/about-us/1011384882698293975.jpeg";

export interface ImageCarouselConfig {
  directory: string;
}

export const getImageList = (
  _config: ImageCarouselConfig
): StaticImageData[] => {
  // Return imported images so <Image> can use placeholder="blur"
  return [img1, img2, img3];
};

export const createImageCarouselConfig = (
  directory: string = "/about-us"
): ImageCarouselConfig => ({
  directory,
});
