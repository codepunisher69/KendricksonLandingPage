"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Copy, Check } from "lucide-react";

type TeamCardProps = {
  name: string;
  position: string;
  bio: string;
  email?: string;
  imageUrl?: string;
};

export const InteractiveTeamCard = ({
  name,
  position,
  bio,
  email,
  imageUrl,
}: TeamCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyTextToClipboard = async (text: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        // fall through to fallback
      }
    }

    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    let success = false;
    try {
      success = document.execCommand("copy");
    } catch {
      success = false;
    }

    document.body.removeChild(textArea);
    return success;
  };

  const handleCopyEmail = async () => {
    if (!email) {
      return;
    }
    const success = await copyTextToClipboard(email);
    if (!success) {
      return;
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full overflow-hidden rounded-2xl border border-border/60 bg-card/90 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-pink-500/60 group backdrop-blur-sm relative flex flex-col">
      {/* Image section - larger */}
      <div className="relative h-64 sm:h-72 lg:h-72 overflow-hidden">
        {imageUrl ? (
          <Image
            fill
            alt={`${name} — ${position}`}
            className="object-cover object-center grayscale contrast-125 brightness-105 transition-transform duration-300 group-hover:scale-[1.02]"
            priority={false}
            sizes="(max-width: 1024px) 100vw, 480px"
            src={imageUrl}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/15 to-primary/8">
            <div className="text-center">
              <div className="mx-auto mb-2 h-16 w-16 rounded-full bg-gradient-to-br from-primary/30 to-primary/20 flex items-center justify-center border border-primary/20">
                <span className="text-2xl font-bold text-primary">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Photo coming soon</p>
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.25),transparent_40%)]" />

        {/* Pink accent overlay on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content section */}
      <div className="px-6 pb-6 pt-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="text-lg font-semibold leading-tight text-foreground">
              {name}
            </p>
            <p className="text-sm text-primary font-medium mt-1">{position}</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-muted-foreground">{bio}</p>

        {/* Email section with click-to-copy */}
        {email && (
          <div className="mt-auto pt-4 border-t border-border/40">
            <button
              aria-label={`Copy ${email} to clipboard`}
              className="flex items-center gap-2 w-full text-left hover:bg-primary/5 rounded-lg p-2 -m-2 transition-colors duration-200 group/email"
              onClick={handleCopyEmail}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCopyEmail();
                }
              }}
              title="Copy email to clipboard"
            >
              <div className="h-2 w-2 rounded-full bg-primary/60 group-hover/email:bg-primary transition-colors" />
              <p className="text-sm text-primary font-medium flex-1">{email}</p>
              <div className="opacity-0 group-hover/email:opacity-100 transition-opacity">
                {copied ? (
                  <Check className="h-4 w-4 text-pink-500" />
                ) : (
                  <Copy className="h-4 w-4 text-primary/60" />
                )}
              </div>
            </button>
            {copied && (
              <p className="text-xs text-pink-500 mt-1 animate-pulse">
                Email copied!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
