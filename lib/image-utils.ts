// Utility functions for handling image carousels

export interface ImageCarouselConfig {
  directory: string;
  supportedFormats: string[];
  excludePatterns?: string[];
}

export const getImageList = async (
  config: ImageCarouselConfig
): Promise<string[]> => {
  const { directory } = config;

  try {
    const response = await fetch(
      `/api/images?dir=${encodeURIComponent(directory)}`,
      { method: "GET", cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`Failed to load images: ${response.status}`);
    }

    const files: string[] = await response.json();

    const filtered = files.filter((name) => isValidImagePath(name, config));
    return filtered.map((name) => `${directory}/${name}`);
  } catch {
    return [];
  }
};

export const createImageCarouselConfig = (
  directory: string = "/about-us",
  supportedFormats: string[] = [".jpeg", ".jpg", ".png", ".webp"]
): ImageCarouselConfig => ({
  directory,
  supportedFormats,
  excludePatterns: ["thumbnail", "preview", "icon"],
});

// Helper to validate image paths
export const isValidImagePath = (
  path: string,
  config: ImageCarouselConfig
): boolean => {
  const { supportedFormats, excludePatterns = [] } = config;

  const hasValidExtension = supportedFormats.some((format) =>
    path.toLowerCase().endsWith(format.toLowerCase())
  );

  const isExcluded = excludePatterns.some((pattern) =>
    path.toLowerCase().includes(pattern.toLowerCase())
  );

  return hasValidExtension && !isExcluded;
};
