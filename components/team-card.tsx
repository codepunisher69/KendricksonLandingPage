"use client";

import React from "react";
import Image from "next/image";

type TeamCardProps = {
  name: string;
  position: string;
  bio?: string;
  imageUrl: string;
};

export const TeamCard = ({ name, position, bio, imageUrl }: TeamCardProps) => {
  return (
    <div className="h-full overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-48 overflow-hidden p-0">
        <Image
          fill
          alt={`${name} — ${position}`}
          className="object-cover"
          priority={false}
          sizes="(max-width: 1024px) 100vw, 360px"
          src={imageUrl}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.18),transparent_35%)]" />
      </div>
      <div className="px-5 pb-5 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-base font-medium leading-tight">{name}</p>
            <p className="text-xs text-muted-foreground">{position}</p>
          </div>
        </div>
        {bio ? (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{bio}</p>
        ) : null}
      </div>
    </div>
  );
};

export default TeamCard;
