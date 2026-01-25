// app/layout.tsx (server component)
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import React from "react";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer_with_socials";
import { BackgroundBeamsWrapper } from "@/components/beams-wrapper";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s - ${siteConfig.name}` },
  description: siteConfig.description,
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="h-full" lang="en">
      <body
        className={clsx(
          "h-full overflow-hidden text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <BackgroundBeamsWrapper />
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="min-h-dvh flex flex-col">
            <Navbar />
            <main className="container mx-auto max-w-7xl flex-1 pt-16 px-6 pb-10">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
