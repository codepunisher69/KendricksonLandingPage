import { NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs/promises";

const ALLOWED_EXTENSIONS = [".jpeg", ".jpg", ".png", ".webp", ".heic", ".heif"];

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const dirParam = url.searchParams.get("dir") ?? "/about-us";

    // Normalize and constrain to public/
    const relativeDir = dirParam.replace(/^\/+/, "");
    if (relativeDir.includes("..")) {
      return NextResponse.json({ error: "Invalid directory" }, { status: 400 });
    }

    const basePublic = path.join(process.cwd(), "public");
    const targetDir = path.join(basePublic, relativeDir);

    const entries = await fs.readdir(targetDir, { withFileTypes: true });

    const files = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) =>
        ALLOWED_EXTENSIONS.some((ext) =>
          name.toLowerCase().endsWith(ext.toLowerCase()),
        ),
      );

    return NextResponse.json(files, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to read images" }, { status: 500 });
  }
}


