"use client";

import { Link } from "@heroui/link";
import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 py-10">
          <div className="text-center">
            <Image
              priority
              alt="Kendrickson Education Consulting"
              className="mx-auto h-auto w-auto max-w-[200px]"
              height={60}
              src="/KendricksonEdConsultCMYK.png"
              width={200}
            />
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            <Link
              className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50 rounded"
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("about");

                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              About Us
            </Link>
            <Link
              className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50 rounded"
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("services");

                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              Services
            </Link>
            <Link
              className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50 rounded"
              href="#team"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("team");

                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              Team
            </Link>
            <Link
              className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50 rounded"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("contact");

                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              Contact Us
            </Link>
          </nav>
        </div>

        <div className="py-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {year} Kendrickson. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
