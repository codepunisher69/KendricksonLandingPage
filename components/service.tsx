"use client";

import React from "react";

import { AcademicCap } from "@/components/icons";

type CometCardDemoProps = {
  title: string;
  description: string;
};

export function CometCardDemo({ title, description }: CometCardDemoProps) {
  return (
    <div className="max-w-[360px] rounded-xl border border-border/60 bg-card shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/30">
      <div className="flex items-start gap-4 px-6 py-5">
        <div className="grid size-10 place-items-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20">
          <AcademicCap height={22} width={22} />
        </div>
        <div className="flex min-w-0 flex-col">
          <p className="truncate text-base font-medium tracking-tight">
            {title}
          </p>
        </div>
      </div>
      <div className="px-6 pb-6 pt-0">
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
