"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import * as React from "react";
import Image from "next/image";
import { NavbarMenu, NavbarMenuItem } from "@heroui/navbar";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (elementId: string) => {
    const element = document.getElementById(elementId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false); // Close the menu after clicking a link
  };

  return (
    <HeroUINavbar
      isBordered
      className="backdrop-blur-md bg-background/70 supports-[backdrop-filter]:bg-background/60 fixed top-0 w-full z-[100]"
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Left: brand + toggle */}
      <NavbarContent className="items-center gap-2">
        <NavbarMenuToggle
          aria-label="Toggle navigation"
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link
            aria-label="Go to homepage"
            className="flex items-center gap-2 text-foreground relative z-10"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // Find the scroll container (ScrollShadow component)
              const scrollContainer =
                document.querySelector(".overflow-y-auto");

              if (scrollContainer) {
                scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                // Fallback to window scroll
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <div className="relative h-9 w-16 z-10">
              <Image
                alt="Kendrickson logo"
                className="object-contain"
                fill
                priority
                sizes="(max-width: 640px) 64px, 64px"
                src="/logo-simple.png"
              />
            </div>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Center: desktop nav */}
      <NavbarContent className="hidden sm:flex gap-8 absolute left-1/2 transform -translate-x-1/2">
        <NavbarItem>
          <Link
            className="transition-colors hover:text-pink-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50 rounded"
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("about");

              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="transition-colors hover:text-pink-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50 rounded"
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("services");

              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            Services
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="transition-colors hover:text-pink-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50 rounded"
            href="#team"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("team");

              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            Team
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="transition-colors hover:text-pink-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50 rounded"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("contact");

              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            Contact Us
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Right: Schedule Button */}
      <NavbarContent justify="end" className="hidden sm:flex">
        <NavbarItem>
          <Button
            as={Link}
            className="bg-gradient-to-r from-[#FF72E1] to-[#F54C7A] text-white shadow-sm hover:opacity-95 font-medium"
            href="https://calendly.com/kristi-kendrickson-kenedu/30min?month=2026-01"
            isExternal
            radius="full"
            variant="solid"
          >
            Schedule a Free Consult
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu className="sm:hidden">
        <NavbarMenuItem>
          <Link
            className="w-full py-2 transition-colors hover:text-pink-500"
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("about");
            }}
          >
            About Us
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="w-full py-2 transition-colors hover:text-pink-500"
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("services");
            }}
          >
            Services
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="w-full py-2 transition-colors hover:text-pink-500"
            href="#team"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("team");
            }}
          >
            Team
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="w-full py-2 transition-colors hover:text-pink-500"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("contact");
            }}
          >
            Contact Us
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="mt-2">
          <Button
            as={Link}
            className="w-full bg-gradient-to-r from-[#FF72E1] to-[#F54C7A] text-white shadow-sm hover:opacity-95 font-medium"
            href="https://calendly.com/kristi-kendrickson-kenedu/30min?month=2026-01"
            isExternal
            radius="full"
            variant="solid"
          >
            Schedule a Free Consult
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
