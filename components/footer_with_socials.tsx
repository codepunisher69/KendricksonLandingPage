"use client";

import { Link } from "@heroui/link";
import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border/40 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center md:order-2">
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Link
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-pink-500"
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              About
            </Link>
            <Link
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-pink-500"
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Services
            </Link>
            <Link
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-pink-500"
              href="#team"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("team")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Team
            </Link>
            <a
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-pink-500"
              href="mailto:kristi.kendrickson@kenedu.net"
            >
              Contact
            </a>
          </nav>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Image
              alt="Kendrickson Education Consulting"
              className="h-8 w-auto opacity-90"
              height={32}
              src="/KendricksonEdConsultCMYK.png"
              width={160}
            />
            <p className="text-center text-xs leading-5 text-muted-foreground md:text-left">
              &copy; {year} Kendrickson Educational Consulting, LLC. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
