"use client";

import { ArrowUpRight } from "lucide-react";
import { Timeline } from "./timeline";

const steps = [
  { title: "Submit your application", copy: "Pay ₹999 and tell us about your work and what you want to build. This puts you in the review pool." },
  { title: "Applications are reviewed", copy: "We look at intent, ambition and whether this is the right environment for what you want to build." },
  { title: "Attend your counselling", copy: "A conversation with the team about the program, the commitment and the travel." },
  { title: "Reserve your seat with ₹5,000", copy: "Seats are limited and released in the order they are blocked. Adjusted against the full program fee." },
  { title: "Complete your enrolment", copy: "Pay the balance, then onboarding: cohort access, pre-reading, travel and visa guidance." },
  { title: "06 Jan 2027", copy: "Phase 1 begins: five days in Sri Lanka, then six weeks online, then a weekend hackathon in Bangalore." },
];

export function Admissions({ applyHref }: { applyHref: string }) {
  return <section id="admissions" aria-labelledby="admissions-title" className="admissions-section">
    <header className="section-intro">
      <p className="admissions-eyebrow">Admission process</p>
      <h2 id="admissions-title">₹999 to apply.<br />You pay nothing more unless you're selected.</h2>
      <p className="admissions-intro-copy">Applications are reviewed on a rolling basis and seats are limited.</p>
    </header>
    <Timeline data={steps.map(({ title, copy }, i) => ({ title, content: <>
      <p>{copy}</p>
      {i === steps.length - 1 && <p className="admission-duration-summary">5 days in Sri Lanka · 6 weeks online · 36 hours in Bangalore</p>}
      {i === 0 && <div className="admission-card-footer"><a href={applyHref}>Apply Now <ArrowUpRight size={16} aria-hidden="true"/></a></div>}
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
