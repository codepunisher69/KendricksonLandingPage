"use client";

import { ScrollShadow } from "@heroui/react";
import React from "react";

export default function ClientScroller({
  children,
}: {
  children: React.ReactNode;
}) {
  // h-dvh avoids mobile Safari 100vh issues
  return (
    <ScrollShadow className="h-dvh overflow-y-auto" size={100}>
      {children}
    </ScrollShadow>
  );
}
