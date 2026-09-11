"use client";

import { ArrowUpRight, FilePenLine, ClipboardCheck, MessagesSquare, Armchair, BookOpenCheck, PlaneLanding } from "lucide-react";
import { Timeline } from "./timeline";

const steps = [
  { title: "Apply · ₹999", Icon: FilePenLine, copy: "Pay the ₹999 application fee and fill in the application form. This puts you in the review pool.", tag: "Your first step" },
  { title: "Selection decision", Icon: ClipboardCheck, copy: "Applications are reviewed and you are told where you stand: selected or rejected. No waiting without an answer.", tag: "A clear decision" },
  { title: "Counselling", Icon: MessagesSquare, copy: "A conversation with the team about the program, the commitment, the travel, and whether this is the right fit for what you want to build.", tag: "Find your fit" },
  { title: "Seat blocking · ₹5,000", Icon: Armchair, copy: "₹5,000 holds your seat in the cohort. Seats are limited and released in the order they are blocked.", tag: "Reserve your place" },
  { title: "Full fee & onboarding", Icon: BookOpenCheck, copy: "Balance payment, then onboarding: cohort access, pre-reading, and travel and visa guidance for the residency.", tag: "Get ready to build" },
  { title: "13 December · Sri Lanka", Icon: PlaneLanding, copy: "The cohort lands in Sri Lanka and the launch residency begins. Your eight-week build starts here.", tag: "The journey begins" },
];

export function Admissions({ applyHref }: { applyHref: string }) {
  return <section id="admissions" aria-labelledby="admissions-title" className="admissions-section">
    <header className="section-intro">
      <p className="admissions-eyebrow">How to apply</p>
      <h2 id="admissions-title">The admission process</h2>
      <p className="admissions-intro-copy">Six steps from application to the first morning in Sri Lanka. Applications are reviewed on a rolling basis and seats are limited.</p>
    </header>
    <Timeline data={steps.map(({ title, Icon, copy, tag }, i) => ({ title, content: <>
      <p>{copy}</p>
      <div className="admission-card-footer"><span className="foundry-glass-chip"><Icon size={15} aria-hidden="true"/>{tag}</span>{i === 0 && <a href={applyHref}>Apply Now <ArrowUpRight size={16} aria-hidden="true"/></a>}</div>
    </> }))}/>
    <div className="admissions-details">
      <article><h3>What you pay, and when</h3><dl>
        <div className="admissions-application-highlight"><dt><strong>₹999</strong> Application</dt><dd>Paid with the form, before review.</dd></div>
        <div><dt><strong>₹5,000</strong> Seat blocking</dt><dd>Paid after counselling to hold your place. Adjusted against the full program fee.</dd></div>
      </dl></article>
      <article><h3>Before you apply</h3><ul>
        <li>Seats are limited and applications are reviewed on a rolling basis.</li>
        <li>The residency involves international travel. Plan for a passport and visa.</li>
        <li>Counselling happens before any large payment.</li>
      </ul></article>
    </div>
    <div className="admissions-actions">
      <a href={applyHref} className="admissions-glass-cta admissions-glass-cta-primary">Apply Now <ArrowUpRight size={18} aria-hidden="true"/></a>
    </div>
  </section>;
}
