"use client";

import { m, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import clsx from "clsx";

type Tag = "section" | "div" | "article" | "header" | "footer";
type RevealProps = Omit<HTMLMotionProps<Tag>, "ref"> & { as?: Tag };

const M = {
  section: m.section,
  div: m.div,
  article: m.article,
  header: m.header,
  footer: m.footer,
} as const;

const Reveal = forwardRef<HTMLElement, RevealProps>(function Reveal(
  { as = "section", className, children, ...rest },
  ref,
) {
  const Comp = M[as] ?? m.section;

  return (
    <Comp
      ref={ref as any}
      className={clsx("mt-20 pt-12 lg:mt-28", className)}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      whileInView={{ opacity: 1, y: 0 }}
      {...rest}
    >
      {children}
    </Comp>
  );
});

export default Reveal;
