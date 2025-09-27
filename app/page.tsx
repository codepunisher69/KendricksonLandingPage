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
      id: "increasing-revenue",
      title: "Increasing Revenue",
      description:
        "Grow your funding streams through strategic alliances and partnerships.",
      icon: "trending-up",
      detailedInfo:
        "Relying on a single revenue stream is risky. Outside partnerships provide financial stability, broaden your reach, and open up new opportunities. They let you do more of what you care about—while sharing costs, expertise, and impact.",
      benefitsLabel: "How we help:",
      benefits: [
        "Identify potential partners: corporations, foundations, nonprofits, and community stakeholders aligned with your mission",
        "Structure mutually beneficial agreements: grants, sponsorships, joint programs or services",
        "Develop proposals, pitches, and contractual frameworks to formalize partnerships",
        "Support with relationship management and performance tracking to ensure ongoing value",
      ],
    },
    {
      id: "strategic-planning",
      title: "Strategic Planning",
      description:
        "Create a clear, actionable plan that aligns resources with your priorities.",
      icon: "briefcase",
      detailedInfo:
        "Without a clear, actionable plan, even the strongest organizations can lose focus. Strategic planning creates a shared vision, aligns resources with priorities, and ensures accountability across every level of the organization. It transforms ideas into measurable outcomes and keeps you on course when challenges arise.",
      benefits: [],
    },
    {
      id: "partnership-development",
      title: "Partnership Development",
      description:
        "Build intentional collaborations that expand reach and diversify resources.",
      icon: "users",
      detailedInfo:
        "The right partnerships can open doors to funding, expertise, and community trust that no organization can achieve alone. Building intentional collaborations allows you to expand your reach, diversify resources, and strengthen your impact while avoiding duplication of effort.",
      benefits: [],
    },
    {
      id: "administrative-support",
      title: "Administrative Support",
      description:
        "Reliable systems that keep daily operations smooth and compliant.",
      icon: "building",
      detailedInfo:
        "Behind every thriving organization is a foundation of reliable administrative processes. From compliance and record-keeping to scheduling and communication, administrative support ensures daily operations run smoothly. When these systems are in place, leaders and staff are freed to focus on serving students and communities.",
      benefits: [],
    },
    {
      id: "counseling-services",
      title: "Counseling Services",
      description:
        "Certified counselors guiding you through education compliance and student support.",
      icon: "graduation-cap",
      detailedInfo:
        "Ensuring that student records are accurate and that specialized supports are properly arranged protects both your students and your institution. Our counselors help reduce risk, improve educational outcomes, and foster a learning environment that meets everyone’s needs.",
      benefitsLabel: "Services include:",
      benefits: [
        "Transcript Audits: Review and verification of academic records to ensure accuracy and compliance",
        "Special Education Counseling: Expert advice on IEP/504 plans, accommodations, and legal obligations",
        "Navigation of regulatory requirements to ensure your students get the support they deserve",
      ],
    },
    {
      id: "special-education-services",
      title: "Special Education Services",
      description:
        "From speech support to full compliance reviews, we help your programs flourish.",
      icon: "accessibility",
      detailedInfo:
        "Special education is both essential and complex. By working with us, you ensure that your services are effective, documented, and fully compliant—helping students reach their potential while protecting your district or organization from legal or administrative risks.",
      benefitsLabel: "What we offer:",
      benefits: [
        "Speech therapy and communication support services",
        "Folder audits: ensuring documentation, evaluations, meetings, and accommodations are properly recorded",
        "TEA (Texas Education Agency) compliance: guidance to meet state standards, reporting, and oversight",
        "Staff training: helping your teachers and administrators understand best practices and documentation requirements",
      ],
    },
    {
      id: "it-support",
      title: "IT Support",
      description:
        "Dependable, flexible IT without full-time overhead—scaled to your needs.",
      icon: "server",
      detailedInfo:
        "Technology issues interrupt operations and cost money. With reliable IT support, you minimize downtime, protect data, maintain productivity, and have peace of mind without over-investing in full-time staff.",
      benefitsLabel: "What we offer:",
      benefits: [
        "On-demand troubleshooting: software issues, network problems, hardware glitches",
        "Preventative maintenance: patching, security updates, backups",
        "System monitoring and disaster recovery planning",
        "Infrastructure setup: servers, email systems, user permissions, remote access",
        "Scalable support plans—use us when you need us, avoid paying full-time wages when you don’t",
      ],
    },
    {
      id: "website-design-maintenance",
      title: "Website Design & Maintenance",
      description:
        "We build responsive, modern, and visually compelling websites tailored to your brand—and keep them running smoothly.",
      icon: "monitor",
      detailedInfo:
        "Your website is often the first impression people have of you. A well-designed, reliable site builds trust, enhances usability, and helps convert visitors into clients, partners, or donors.",
      benefitsLabel: "What you get:",
      benefits: [
        "Custom website design aligned with your organization’s identity",
        "Mobile-friendly layouts so your site works well on phones, tablets, and desktops",
        "Regular updates, security patches, backups, and performance monitoring",
        "Ongoing maintenance: content updates, plugin/theme upgrades, and minor adjustments",
        "Fast load times, optimized images, SEO-friendly architecture",
      ],
    },
    {
      id: "program-evaluation",
      title: "Program Evaluation",
      description:
        "Use objective data to learn what’s working, what’s not, and why.",
      icon: "clipboard-check",
      detailedInfo:
        "Programs that aren’t regularly evaluated risk becoming ineffective or misaligned with community needs. Evaluation provides objective data to show what’s working, what’s not, and where to invest resources. It also strengthens credibility with funders, boards, and stakeholders by demonstrating accountability and results.",
      benefits: [],
    },
    {
      id: "data-analysis",
      title: "Data Analysis",
      description:
        "Turn raw information into actionable insight for confident decisions.",
      icon: "bar-chart-3",
      detailedInfo:
        "Numbers alone don’t drive change—it’s what you do with them that matters. Data analysis translates raw information into actionable insights, empowering leaders to make informed decisions, allocate resources effectively, and track progress toward goals. Good analysis turns uncertainty into clarity.",
      benefits: [],
    },
    {
      id: "professional-development",
      title: "Professional Development",
      description:
        "Invest in your people to elevate skills, confidence, and results.",
      icon: "book-open",
      detailedInfo:
        "Investing in your people is the single most effective way to elevate your organization. Professional development builds skills, increases confidence, and boosts morale, ensuring staff are prepared to meet today’s challenges and tomorrow’s opportunities. Strong teams deliver stronger results for students and communities.",
      benefits: [],
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
                      // Keep high priority but reduce decode cost
                      priority
                      fetchPriority="high"
                      alt="Kendrickson headshot"
                      className="object-cover grayscale contrast-125 brightness-105 transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                      quality={70}
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
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
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
              imagePositionClassName="object-[50%_30%]"
              imageUrl="/kinsey.PNG"
              name="Kinsey Mickelson"
              position="CFO"
            />
            <InteractiveTeamCard
              bio="With over 20 years of experience in educational counseling, Anissa brings unmatched expertise in guiding students, families, and educators through the complexities of academic and personal development. As a Licensed Professional Counselor (LPC), she combines compassion with professionalism, ensuring that every individual she works with feels supported, valued, and empowered to succeed."
              email="anissa.geeslin@kenedu.net"
              imageUrl="/anissa.jpg"
              name="Anissa Geeslin"
              position="Director of Counseling Services and Admin Liaison"
            />
            <InteractiveTeamCard
              bio="Becky has more than 20 years of experience in education and administration, where she has earned a reputation for her organization, efficiency, and ability to keep teams running smoothly. Known as the steady hand behind the scenes, Becky ensures that operations remain seamless, deadlines are met, and every detail is managed with care."
              email="becky.bourland@kenedu.net"
              imageUrl="/becky.jpeg"
              name="Becky Bourland"
              position="Executive Administrative Assistant"
            />
            <InteractiveTeamCard
              bio="With over a decade of experience in educational leadership, Skylar bridges the gap between innovation and communication. She oversees the organization’s social media presence, ensuring that the message of impact and progress reaches the right audiences. Her leadership background adds depth and vision to every outreach effort."
              email="skylar.funk@kenedu.net"
              imagePositionClassName="object-[50%_35%]"
              imageUrl="/skylar.PNG"
              name="Skylar Funk"
              position="Educational Leadership & Marketing Coordinator"
            />
            <InteractiveTeamCard
              bio="Jacob leads the technology systems that keep the organization running securely and efficiently. As IT Director, he manages infrastructure, provides technical solutions, and ensures that both staff and clients have the tools they need to succeed in a digital world. His expertise and dedication make him the go-to resource for all technology needs."
              email="jacob.mickelson@kenedu.net"
              imageUrl="/jacob.jpeg"
              name="Jacob Mickelson"
              position="Director of Information Technology"
            />
            <InteractiveTeamCard
              bio="Trevor specializes in creating and maintaining professional websites that reflect the vision and goals of the organization. With a focus on user-friendly design and functionality, he develops web platforms that not only look great but also perform seamlessly. His technical skills and creative approach bring digital projects to life."
              email="trevor.mickelson@kenedu.net"
              imageUrl="/trevor.png"
              name="Trevor Mickelson"
              position="Web Development & Design Specialist"
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
