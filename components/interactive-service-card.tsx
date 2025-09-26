"use client";

import React, { useState } from "react";
import { Button } from "@heroui/button";
import {
  Briefcase,
  Users,
  ClipboardCheck,
  Building,
  BarChart3,
  BookOpen,
  Monitor,
  GraduationCap,
  Accessibility,
  Server,
  TrendingUp,
} from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  detailedInfo: string;
  benefits: string[];
  benefitsLabel?: string;
}

interface InteractiveServiceCardProps {
  service: Service;
}

const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    briefcase: Briefcase,
    users: Users,
    "clipboard-check": ClipboardCheck,
    building: Building,
    "bar-chart-3": BarChart3,
    "book-open": BookOpen,
    monitor: Monitor,
    "graduation-cap": GraduationCap,
    accessibility: Accessibility,
    server: Server,
    "trending-up": TrendingUp,
  };

  return iconMap[iconName] || Briefcase;
};

export const InteractiveServiceCard = ({
  service,
}: InteractiveServiceCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = getIconComponent(service.icon);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div
        aria-label={`Learn more about ${service.title}`}
        className="w-full max-w-[360px] mx-auto rounded-xl border border-border/60 bg-card shadow-sm transition-all duration-200 hover:shadow-md hover:border-pink-500/60 cursor-pointer group"
        role="button"
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOpen();
          }
        }}
      >
        <div className="flex items-start gap-4 px-6 py-5">
          <div className="grid size-10 place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20 group-hover:bg-primary/20 transition-colors">
            <IconComponent className="h-5 w-5" />
          </div>
          <div className="flex min-w-0 flex-col">
            <p className="truncate text-base font-medium tracking-tight">
              {service.title}
            </p>
          </div>
        </div>
        <div className="px-6 pb-6 pt-0">
          <p className="text-sm leading-6 text-muted-foreground">
            {service.description}
          </p>
        </div>
        <div className="px-6 pb-4">
          <span className="text-xs text-primary font-medium group-hover:text-primary/80 transition-colors">
            Learn more →
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
          <div className="relative w-full max-w-2xl rounded-2xl border border-border/60 bg-background shadow-2xl">
            <div className="border-b border-border/60 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20">
                  <IconComponent className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
              </div>
            </div>
            <div className="px-6 py-6">
              {service.benefits && service.benefits.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium mb-3">
                    {service.benefitsLabel || "What you get:"}
                  </h4>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-primary mt-1">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <h4 className="font-medium mb-2">Why it matters</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {service.detailedInfo}
                </p>
              </div>
            </div>
            <div className="border-t border-border/60 px-6 py-4 flex justify-end gap-3">
              <Button color="primary" variant="light" onClick={handleClose}>
                Close
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  handleClose();
                  // Scroll to contact section
                  const element = document.getElementById("contact");

                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
