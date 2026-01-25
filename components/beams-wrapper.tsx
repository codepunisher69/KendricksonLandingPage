"use client";

import dynamic from "next/dynamic";

const BackgroundBeams = dynamic(
  () => import("./beams").then((mod) => mod.BackgroundBeams),
  {
    ssr: false,
  },
);

export const BackgroundBeamsWrapper = () => {
  return <BackgroundBeams />;
};
