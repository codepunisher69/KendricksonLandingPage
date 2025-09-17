import { NextRequest, NextResponse } from "next/server";

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

    // For now, we'll log the email content
    // In production, you would integrate with an email service like:
    // - Nodemailer with SMTP
    // - SendGrid
    // - Resend
    // - AWS SES
    // eslint-disable-next-line no-console
    console.log("Contact form submission:", {
      to: "kristi.kendrickson@kenedu.net",
      subject: `New Contact Form Submission from ${name}`,
      content: emailContent,
      from: email,
    });

    // TODO: Replace this with actual email sending logic
    // Example with Nodemailer:
    // const nodemailer = require('nodemailer');
    // const transporter = nodemailer.createTransporter({
    //   // your email configuration
    // });
    // await transporter.sendMail({
    //   from: email,
    //   to: 'kristi.kendrickson@kenedu.net',
    //   subject: `New Contact Form Submission from ${name}`,
    //   text: emailContent,
    //   replyTo: email
    // });

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
