import { useState } from 'react';
import { Megaphone, Palette, HeartHandshake, Workflow, Presentation, Store, Plus, Sparkles } from 'lucide-react';
import './capstone-explorer.css';

type Example = { title: string; copy: string; tags: string };
type Category = { key: string; label: string; icon: typeof Megaphone; examples: Example[] };

const CATEGORIES: Category[] = [
  {
    key: 'marketing', label: 'Marketing & growth', icon: Megaphone,
    examples: [
      { title: 'Competitor creative engine', copy: "Watches competitor ads and landing pages, tags the hooks and angles, and proposes new concepts in your brand's voice every week.", tags: 'Ad libraries · Brand guidelines' },
      { title: 'Campaign performance analyst', copy: 'Answers "why did CAC go up last week?" from your ad and analytics exports, flags anomalies and drafts the weekly report.', tags: 'Ad platform exports · Analytics' },
      { title: 'SEO and content brief engine', copy: 'Finds the gaps between what people search for and what you have published, and drafts briefs that cite what already ranks.', tags: 'Search Console · Your blog' },
    ],
  },
  {
    key: 'product', label: 'Product & design', icon: Palette,
    examples: [
      { title: 'User research synthesiser', copy: 'Groups interviews, tickets and app reviews into themes with direct quotes, and files tickets for the top issues.', tags: 'Transcripts · Tickets · Jira' },
      { title: 'Design QA assistant', copy: 'Checks the live product against your design system and accessibility rules, and lists what is broken by severity.', tags: 'Design system · Screenshots' },
      { title: 'Feedback triage agent', copy: 'Reads feature requests from sales calls, support and surveys, merges duplicates and ranks them by how many customers asked.', tags: 'Call notes · Tickets · Surveys' },
    ],
  },
  {
    key: 'accounts', label: 'Account management', icon: HeartHandshake,
    examples: [
      { title: 'Account health monitor', copy: 'Reads CRM notes, threads and usage data, flags accounts at risk with the reason, and prepares notes before a client review.', tags: 'CRM · Support tickets · Usage' },
      { title: 'RFP and questionnaire responder', copy: 'Drafts answers to RFPs and security questionnaires from past answers, cites each source and marks what it is unsure of.', tags: 'Past RFPs · Policies' },
      { title: 'Customer onboarding tracker', copy: "Tracks each new customer's onboarding steps, spots who is stuck, and drafts the nudge for the account manager to send.", tags: 'CRM · Onboarding checklist · Email' },
    ],
  },
  {
    key: 'ops', label: 'Operations', icon: Workflow,
    examples: [
      { title: 'Ops bottleneck agent', copy: "Reads your team's chat and project tool, maps where time goes, spots recurring blockers and sends a weekly report.", tags: 'Slack or Google Chat · Jira' },
      { title: 'Vendor invoice reconciler', copy: 'Reads invoice PDFs, matches them to purchase orders, flags mismatches and drafts the vendor email for approval.', tags: 'Invoices · Purchase orders' },
      { title: 'Internal SOP assistant', copy: 'Answers "how do we do this?" from your internal documents, and flags the ones that no longer match how the team works.', tags: 'Internal docs · Team chat' },
    ],
  },
  {
    key: 'consultants', label: 'Consultants', icon: Presentation,
    examples: [
      { title: 'Client discovery accelerator', copy: "Reads a new client's documents, produces a first diagnostic with sources, and drafts the stakeholder interview guide.", tags: 'Client documents · Process notes' },
      { title: 'Automation opportunity finder', copy: 'Takes a process map and a team survey, estimates hours per task, and ranks what to automate first, with reasons.', tags: 'Process maps · Surveys' },
      { title: 'Proposal and scope drafter', copy: 'Drafts proposals and statements of work from the client brief, your past proposals and your rate card.', tags: 'Past proposals · Rate card' },
    ],
  },
  {
    key: 'owners', label: 'Business owners', icon: Store,
    examples: [
      { title: 'Customer enquiry agent', copy: 'Answers customers on email or WhatsApp from your catalogue and policies, takes simple bookings and hands over when it should.', tags: 'Catalogue · Policies · Bookings' },
      { title: 'Inventory and reorder assistant', copy: 'Reads sales and stock sheets, predicts what runs out and when, and drafts purchase orders for you to approve.', tags: 'Sales · Stock sheets' },
      { title: 'Reviews and reputation monitor', copy: "Pulls reviews from Google and marketplaces, sorts complaints by cause and drafts replies in your brand's voice.", tags: 'Reviews · Brand voice' },
    ],
  },
];

export default function CapstoneExplorer() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const category = CATEGORIES[active];
  const Icon = category.icon;

  const toggle = (key: string) => setExpanded(previous => {
    const next = new Set(previous);
    if (next.has(key)) next.delete(key); else next.add(key);
    return next;
  });

  return <section id="capstone" className="program-information capstone-section" aria-labelledby="capstone-title">
    <header className="section-intro">
      <p className="admissions-eyebrow">Your capstone</p>
      <h2 id="capstone-title" className="mx-auto max-w-[820px]">Build something your work actually{' '}needs.</h2>
      <p className="admissions-intro-copy mx-auto max-w-[720px]">One production-grade AI product, built across all eight weeks and deployed live, with your own data, an agent that acts, and a security check before it ships. Pick a problem from the pool, or bring your{' '}own.</p>
    </header>

    <div className="program-faq-tabs" role="tablist" aria-label="Capstone categories">
      {CATEGORIES.map((cat, i) => <button key={cat.key} type="button" role="tab" aria-selected={active === i} onClick={() => setActive(i)} className={active === i ? 'program-faq-tab-active' : ''}>{cat.label}</button>)}
    </div>

    <div className="capstone-grid">
      {category.examples.map(example => {
        const key = `${category.key}-${example.title}`;
        const isExpanded = expanded.has(key);
        return <article key={key} className={`capstone-card${isExpanded ? ' is-expanded' : ''}`} onClick={() => toggle(key)}>
          <span className="capstone-card-expand-hint" aria-hidden="true"><Plus size={16} /></span>
          <span className="capstone-card-icon" aria-hidden="true"><Icon size={19} strokeWidth={1.8} /></span>
          <span className="capstone-card-tag">{category.label}</span>
          <h4>{example.title}</h4>
          <div className="capstone-card-detail"><p>{example.copy}</p></div>
          <div className="capstone-card-spacer" aria-hidden="true" />
          <span className="capstone-card-data">{example.tags}</span>
        </article>;
      })}
      {(() => {
        const ownKey = `${category.key}-own`;
        const ownExpanded = expanded.has(ownKey);
        return <article className={`capstone-card capstone-card-own${ownExpanded ? ' is-expanded' : ''}`} onClick={() => toggle(ownKey)}>
          <span className="capstone-card-expand-hint" aria-hidden="true"><Plus size={16} /></span>
          <span className="capstone-card-icon capstone-card-icon-own" aria-hidden="true"><Sparkles size={19} strokeWidth={1.8} /></span>
          <span className="capstone-card-tag">{category.label}</span>
          <h4>Or bring your own problem</h4>
          <div className="capstone-card-detail"><p>Any real problem from your work qualifies, if it uses your own data, takes actions and has answers you can check.</p></div>
          <div className="capstone-card-spacer" aria-hidden="true" />
          <span className="capstone-card-data">Must meet the capstone benchmark</span>
        </article>;
      })()}
    </div>

    <p className="capstone-note">Sample capstones from the program, drawn from what businesses in India and Sri Lanka face.</p>
  </section>;
}
