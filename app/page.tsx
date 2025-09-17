"use client";

import { button as buttonStyles } from "@heroui/theme";
import { Button } from "@heroui/button";
import Image from "next/image";
import { useState } from "react";

import { title, subtitle } from "@/components/primitives";
import { InteractiveServiceCard } from "@/components/interactive-service-card";
import { InteractiveTeamCard } from "@/components/interactive-team-card";
import { ImageCarousel } from "@/components/image-carousel";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          institution: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
        setErrorMessage(
          data.error || "Failed to send message. Please try again.",
        );
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      id: "strategic-planning",
      title: "Strategic Planning",
      description:
        "Develop comprehensive strategic plans that align with your educational goals and vision for student success.",
      icon: "briefcase",
      detailedInfo:
        "Our strategic planning service helps educational institutions create comprehensive roadmaps for success. We work closely with your leadership team to assess current capabilities, identify opportunities, and develop actionable strategies that drive meaningful change.",
      benefits: [
        "Comprehensive needs assessment",
        "Goal alignment and prioritization",
        "Implementation roadmap development",
        "Progress monitoring and evaluation",
      ],
    },
    {
      id: "partnership-development",
      title: "Partnership Development",
      description:
        "Build meaningful partnerships between educational institutions, businesses, and community organizations.",
      icon: "users",
      detailedInfo:
        "We facilitate strategic partnerships that create value for all stakeholders. Our approach focuses on building sustainable relationships that enhance educational opportunities and community engagement.",
      benefits: [
        "Stakeholder identification and mapping",
        "Partnership agreement development",
        "Relationship management strategies",
        "Impact measurement and reporting",
      ],
    },
    {
      id: "program-evaluation",
      title: "Program Evaluation",
      description:
        "Assess the effectiveness of your educational programs and identify opportunities for improvement and growth.",
      icon: "clipboard-check",
      detailedInfo:
        "Our program evaluation services provide data-driven insights into your educational initiatives. We use proven methodologies to assess program effectiveness and recommend evidence-based improvements.",
      benefits: [
        "Comprehensive program assessment",
        "Data collection and analysis",
        "Performance benchmarking",
        "Improvement recommendations",
      ],
    },
    {
      id: "administrative-support",
      title: "Administrative Support",
      description:
        "Provide expert guidance on administrative challenges, leveraging our extensive experience in school leadership.",
      icon: "building",
      detailedInfo:
        "Our administrative support services help educational leaders navigate complex challenges and implement best practices. We provide practical solutions based on years of hands-on experience in educational administration.",
      benefits: [
        "Policy development and implementation",
        "Operational efficiency optimization",
        "Leadership development and coaching",
        "Crisis management and planning",
      ],
    },
    {
      id: "data-analysis",
      title: "Data Analysis",
      description:
        "Transform educational data into actionable insights that drive decision-making and improve student outcomes.",
      icon: "bar-chart-3",
      detailedInfo:
        "We help educational institutions harness the power of data to make informed decisions. Our data analysis services turn complex information into clear, actionable insights that drive student success.",
      benefits: [
        "Data collection and management",
        "Statistical analysis and reporting",
        "Predictive modeling and forecasting",
        "Dashboard development and visualization",
      ],
    },
    {
      id: "professional-development",
      title: "Professional Development",
      description:
        "Design and deliver customized professional development programs for educators and administrators.",
      icon: "book-open",
      detailedInfo:
        "Our professional development programs are tailored to meet the specific needs of your educational team. We create engaging, practical learning experiences that enhance skills and drive performance.",
      benefits: [
        "Customized training programs",
        "Skill assessment and gap analysis",
        "Interactive workshops and seminars",
        "Ongoing support and mentoring",
      ],
    },
  ];

  return (
    <section className="relative isolate flex flex-col items-center justify-center gap-4 py-8 sm:py-12 md:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 [background:linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] [background-size:36px_36px] [mask-image:radial-gradient(58%_65%_at_50%_2%,black,transparent)] opacity-[0.015] dark:opacity-[0.07]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(1200px_480px_at_50%_-30%,hsl(var(--primary)/0.015),transparent_72%)] dark:bg-[radial-gradient(1200px_600px_at_50%_-20%,hsl(var(--primary)/0.09),transparent_60%)]"
      />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-6 text-center lg:grid-cols-12 lg:gap-8 lg:text-left">
          <div className="lg:col-span-7 xl:col-span-6 text-center lg:text-left">
            <p
              aria-label="eyebrow"
              className="mx-auto mb-3 inline-block rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground backdrop-blur sm:text-[13px] lg:mx-0"
            >
              Empowering schools and districts
            </p>
            <h1 className="mx-auto max-w-2xl lg:mx-0">
              <span className={title()}>
                Simplifying complicated with&nbsp;
              </span>
              <span className={title({ color: "pink" })}>integrity</span>
            </h1>
            <p
              className={subtitle({
                class:
                  "mx-auto mt-5 max-w-2xl text-balance text-muted-foreground lg:mx-0 leading-relaxed",
              })}
            >
              We help create partnerships with educational entities that have a
              growth mindset to create greater opportunities for students.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                aria-label="View our services"
                className={
                  buttonStyles({
                    color: "primary",
                    radius: "full",
                    variant: "solid",
                  }) + " px-6 py-3"
                }
                onClick={() => {
                  const element = document.getElementById("services");

                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                Our Services
              </Button>
              <Button
                aria-label="Contact us"
                className={
                  buttonStyles({
                    color: "secondary",
                    radius: "full",
                    variant: "bordered",
                  }) + " px-6 py-3"
                }
                onClick={() => {
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
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5 xl:col-span-6">
            <div className="mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
              <div className="relative group">
                {/* Subtle glow effect */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-pink-500/20 via-purple-500/10 to-blue-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Main image container */}
                <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-card/90 shadow-xl backdrop-blur-sm">
                  <figure className="relative aspect-[4/3]">
                    <Image
                      fill
                      priority
                      alt="Kendrickson headshot"
                      className="object-cover grayscale contrast-125 brightness-105 transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 360px"
                      src="/kkheadshot.png"
                    />
                    {/* Professional overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
                  </figure>
                </div>

                {/* Professional badge */}
                <div className="absolute -bottom-3 -right-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-1 shadow-lg">
                  <div className="rounded-full bg-background px-3 py-1 text-xs font-medium text-foreground">
                    Kristi Kendrickson
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="mt-20 pt-12 lg:mt-28" id="about">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Content - appears first on mobile, second on desktop */}
            <div className="order-1 lg:order-2 lg:col-span-7 xl:col-span-6 text-center lg:text-left">
              <div className="mb-3 inline-flex items-center rounded-full bg-gradient-to-r from-[#FF72E1]/15 to-[#F54C7A]/15 px-2.5 py-1 text-xs font-medium tracking-wide text-muted-foreground ring-1 ring-[#FF72E1]/30">
                About Us
              </div>
              <h2 className="mb-4 text-balance">
                <span className={`${title()}`}>Built on&nbsp;</span>
                <span className={`${title({ color: "pink" })}`}>integrity</span>
              </h2>
              <p className="text-sm leading-7 text-muted-foreground">
                At Kendrickson Consulting, we believe in the power of education
                to transform lives. Our mission is to simplify the complicated
                aspects of educational partnerships, bringing integrity and
                expertise to every project we undertake.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                We work exclusively with educational entities that demonstrate a
                growth mindset, fostering collaborations that ultimately create
                greater opportunities for students across Texas.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
                <div className="inline-flex items-center rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs text-muted-foreground">
                  Experienced leadership
                </div>
                <div className="inline-flex items-center rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs text-muted-foreground">
                  Outcome-focused
                </div>
                <div className="inline-flex items-center rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs text-muted-foreground">
                  Technology-enabled
                </div>
              </div>
            </div>

            {/* Image carousel - appears second on mobile, first on desktop */}
            <div className="order-2 lg:order-1 lg:col-span-5 xl:col-span-6">
              <div className="mx-auto max-w-lg lg:max-w-none">
                <ImageCarousel />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-16 border-border/60 pt-12 lg:mt-24" id="services">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative mb-8 sm:mb-12 text-center">
            <div className="mb-3 flex justify-center">
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[#FF72E1]/15 to-[#F54C7A]/15 px-2.5 py-1 text-xs font-medium tracking-wide text-muted-foreground ring-1 ring-[#FF72E1]/30">
                What we do
              </span>
            </div>
            <h2 className="mx-auto max-w-2xl">
              <span className={`${title()}`}>Our&nbsp;</span>
              <span className={`${title({ color: "pink" })}`}>Services</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
              We offer specialized consulting services designed to help
              educational instituations thrive.
            </p>
            <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#FF72E1] to-[#F54C7A]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service) => (
              <InteractiveServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
      <section className="mt-20 pt-12 lg:mt-28" id="team">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-center sm:mb-12">
            <div className="mb-3 flex justify-center">
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[#FF72E1]/15 to-[#F54C7A]/15 px-2.5 py-1 text-xs font-medium tracking-wide text-muted-foreground ring-1 ring-[#FF72E1]/30">
                Our Team
              </span>
            </div>
            <h2 className="mx-auto max-w-2xl">
              <span className={`${title()}`}>The people&nbsp;</span>
              <span className={`${title({ color: "pink" })}`}>
                behind the work
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
              Our leadership team brings decades of experience in public
              education to serve your institution.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 max-w-4xl mx-auto">
            <InteractiveTeamCard
              bio="With over 30 years of experience in public education in Texas, including more than 15 years as a public school administrator, Kristi brings unparalleled expertise to every consultation."
              email="kristi.kendrickson@kenedu.net"
              imageUrl="/kkheadshot.png"
              name="Kristi Kendrickson"
              position="CEO & Founder"
            />
            <InteractiveTeamCard
              bio="As a public school professional in Texas, Kinsey brings valuable insights into the financial and operational aspects of educational institutions, ensuring our solutions are both effective and practical."
              email="kinsey.mickelson@kenedu.net"
              name="Kinsey Mickelson"
              position="CFO"
            />
          </div>
        </div>
      </section>
      <section className="mt-20 pt-12 lg:mt-28" id="contact">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-center sm:mb-12">
            <div className="mb-3 flex justify-center">
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[#FF72E1]/15 to-[#F54C7A]/15 px-2.5 py-1 text-xs font-medium tracking-wide text-muted-foreground ring-1 ring-[#FF72E1]/30">
                Get in touch
              </span>
            </div>
            <h2 className="mx-auto max-w-2xl">
              <span className={`${title()}`}>Let’s talk&nbsp;</span>
              <span className={`${title({ color: "pink" })}`}>
                about your goals
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
              Ready to transform your educational institution? Contact us today
              to schedule a consultation.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 shadow-sm backdrop-blur-sm">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(to_bottom,hsl(var(--background)/0.85),transparent)]"
            />
            <form
              className="relative grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 sm:gap-8 sm:p-6 lg:p-8"
              onSubmit={handleSubmit}
            >
              <div className="sm:col-span-1">
                <label
                  className="mb-1 block text-xs font-medium text-muted-foreground"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  required
                  autoComplete="name"
                  className="block w-full rounded-lg border border-border/60 bg-background/80 px-3 py-2 text-sm outline-none ring-0 transition-shadow focus:border-[#FF72E1]/60 focus:shadow-[0_0_0_2px_rgba(255,114,225,0.2)]"
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="sm:col-span-1">
                <label
                  className="mb-1 block text-xs font-medium text-muted-foreground"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  required
                  autoComplete="email"
                  className="block w-full rounded-lg border border-border/60 bg-background/80 px-3 py-2 text-sm outline-none ring-0 transition-shadow focus:border-[#FF72E1]/60 focus:shadow-[0_0_0_2px_rgba(255,114,225,0.2)]"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  className="mb-1 block text-xs font-medium text-muted-foreground"
                  htmlFor="institution"
                >
                  Institution
                </label>
                <input
                  required
                  autoComplete="organization"
                  className="block w-full rounded-lg border border-border/60 bg-background/80 px-3 py-2 text-sm outline-none ring-0 transition-shadow focus:border-[#FF72E1]/60 focus:shadow-[0_0_0_2px_rgba(255,114,225,0.2)]"
                  id="institution"
                  name="institution"
                  type="text"
                  value={formData.institution}
                  onChange={handleInputChange}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  className="mb-1 block text-xs font-medium text-muted-foreground"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  required
                  className="block w-full rounded-lg border border-border/60 bg-background/80 px-3 py-2 text-sm outline-none ring-0 transition-shadow focus:border-[#FF72E1]/60 focus:shadow-[0_0_0_2px_rgba(255,114,225,0.2)]"
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>
              <div className="sm:col-span-2 flex flex-col items-center gap-4">
                {submitStatus === "success" && (
                  <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200">
                    ✓ Message sent successfully! We&apos;ll get back to you soon.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200">
                    ✗ {errorMessage}
                  </div>
                )}
                <Button
                  aria-label="Send message"
                  className={
                    buttonStyles({
                      color: "secondary",
                      radius: "full",
                      variant: "solid",
                    }) +
                    " bg-gradient-to-r from-[#FF72E1] to-[#F54C7A] text-white shadow-sm hover:opacity-95 px-6 py-3 disabled:opacity-50"
                  }
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Sending..." : "Send message"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </section>
  );
}
