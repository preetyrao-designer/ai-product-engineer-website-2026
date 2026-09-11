"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import "./timeline.css";

export interface TimelineEntry { title: string; content: ReactNode }

/** Sticky step labels and a scroll-following beam, inspired by Aceternity UI's Timeline. */
export function Timeline({ data }: { data: TimelineEntry[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  return <ol ref={ref} className="admission-timeline">
    <li className="admission-track" aria-hidden="true"><motion.div style={{ scaleY: reduced !== false ? 1 : scrollYProgress }} /></li>
    {data.map((item, i) => <li key={item.title} className="admission-step">
      <div className="admission-step-label"><span className="admission-dot" aria-hidden="true"/><span>STEP {String(i + 1).padStart(2, "0")}</span></div>
      <article className="admission-step-card"><h3>{item.title}</h3>{item.content}</article>
    </li>)}
  </ol>;
}
