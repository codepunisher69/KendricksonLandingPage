import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, institution, message } = body;

    // Validate required fields
    if (!name || !email || !institution || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Institution: ${institution}

Message:
${message}

---
This message was sent from the Kendrickson Consulting contact form.
    `.trim();

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service not configured. Missing RESEND_API_KEY." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const toAddress = process.env.CONTACT_TO_EMAIL || "tmick28@protonmail.com";
    const fromAddress =
      process.env.CONTACT_FROM_EMAIL ||
      "Kendrickson Consulting <onboarding@resend.dev>";

    const subject = `New Contact Form Submission from ${name}`;

    const htmlContent = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\"; line-height: 1.6; color: #111827;">
        <h2 style="margin: 0 0 12px; font-size: 18px; color: #111827;">New Contact Form Submission</h2>
        <p style="margin: 0 0 4px;"><strong>Name:</strong> ${name}</p>
        <p style="margin: 0 0 4px;"><strong>Email:</strong> ${email}</p>
        <p style="margin: 0 0 12px;"><strong>Institution:</strong> ${institution}</p>
        <div style="padding: 12px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px;">
          <p style="margin: 0 0 8px; font-weight: 600;">Message:</p>
          <pre style="white-space: pre-wrap; font-family: inherit; margin: 0;">${message}</pre>
        </div>
        <p style="margin: 16px 0 0; font-size: 12px; color: #6B7280;">This message was sent from the Kendrickson Consulting contact form.</p>
      </div>
    `;

    const { error: sendError } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      subject,
      text: emailContent,
      html: htmlContent,
      replyTo: email,
    });

    if (sendError) {
      // eslint-disable-next-line no-console
      console.error("Resend send error:", sendError);
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { message: "Message sent successfully! We'll get back to you soon." },
      { status: 200 }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
