// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const method = req.method || "GET";
  const accept = req.headers.get("accept") || "";
  const fetchDest = req.headers.get("sec-fetch-dest") || "";

  const isDocument = fetchDest === "document" || accept.includes("text/html");
  const isGet = method === "GET";
  const isInternal = pathname.startsWith("/_next") || pathname.startsWith("/api");
  const isStatic = /\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|txt|json|map|woff2?|ttf|otf|eot|mp4|webm|avi|mp3|wav)$/.test(
    pathname,
  );

  if (isDocument && isGet && !isInternal && !isStatic) {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    const ua = req.headers.get("user-agent") ?? "unknown";
    const time = new Date().toISOString();
    console.log(`[VISIT] ${time} | ${ip} | ${pathname} | ${ua}`);
  }

  return NextResponse.next();
}