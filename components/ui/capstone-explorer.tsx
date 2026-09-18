import { useState } from 'react';
import './capstone-explorer.css';

type Example = { company: string; title: string; copy: string; tags: string; ships: string };
type Category = { key: string; label: string; example: Example };

const CATEGORIES: Category[] = [
  {
    key: 'marketing', label: 'Marketing & Growth',
    example: {
      company: 'Mamaearth',
      title: 'The Always-On Brand Marketer',
      copy: 'Mamaearth launches new products every few weeks, with each launch taking days of agency work. Build an agent that takes a product brief, plans 30 days of content, writes the copy, creates the creatives, and sends them to a scheduler through n8n — with one human approval before publishing.',
      tags: 'Brand grounding · Multimodal AI · n8n · Human approval',
      ships: 'A live campaign agent that turns one product brief into 30 on-brand posts.',
    },
  },
  {
    key: 'product', label: 'Product & Design',
    example: {
      company: 'Zomato',
      title: 'Idea → PRD → Screens',
      copy: 'A PM says, “Let’s build meal subscriptions.” Build an agent that researches five competitors, writes the PRD, and creates a design system with three working screens. Every decision should link back to the research behind it.',
      tags: 'Competitive research · Structured outputs · Design generation · Traceability',
      ships: 'A one-line idea turned into a PRD and three build-ready screens.',
    },
  },
  {
    key: 'ops', label: 'Operations',
    example: {
      company: 'Urban Company',
      title: 'Grounded Support Agent',
      copy: "Urban Company's help centre has hundreds of pages, but customers still raise tickets. Build a support agent using the help centre and 50 real customer questions from app reviews. Every answer must cite its source. If it cannot find an answer, it should refuse and raise a ticket through MCP.",
      tags: 'RAG · Citations · Refusal behaviour · MCP · Evals',
      ships: 'A support agent tested on 50 questions — answer, cite, refuse, or escalate. Zero unsourced answers.',
    },
  },
  {
    key: 'owners', label: 'Business Owners',
    example: {
      company: 'D2C Store',
      title: 'Order-to-Cash Agent',
      copy: 'A store owner is matching orders, invoices, and payments late at night. Build an agent that reconciles every transaction, finds mismatches, drafts follow-up messages, and creates a morning summary. Nothing gets sent without approval. It runs automatically every day.',
      tags: 'Agent tools · Reconciliation · n8n · Human-in-the-loop',
      ships: 'A daily agent that finds every exception and drafts the follow-up, ready for one-tap approval.',
    },
  },
];

export default function CapstoneExplorer() {
  const [active, setActive] = useState(0);
  const category = CATEGORIES[active];

  return <section id="capstone" className="program-information capstone-section" aria-labelledby="capstone-title">
    <header className="section-intro">
      <p className="admissions-eyebrow">Your capstone</p>
      <h2 id="capstone-title" className="mx-auto max-w-[820px]">Build something your work actually{' '}needs.</h2>
      <p className="admissions-intro-copy mx-auto max-w-[720px]">One production-grade AI product, built across all eight weeks and deployed live, with your own data, an agent that acts, and a security check before it ships.</p>
    </header>

    <div className="program-faq-tabs capstone-tabs" role="tablist" aria-label="Capstone categories">
      {CATEGORIES.map((cat, i) => <button key={cat.key} type="button" role="tab" aria-selected={active === i} onClick={() => setActive(i)} className={active === i ? 'program-faq-tab-active' : ''}>{cat.label}</button>)}
    </div>

    <article className="capstone-card-wide">
      <div className="capstone-card-wide-body">
        <span className="capstone-card-company">{category.example.company}</span>
        <h4>{category.example.title}</h4>
        <p className="capstone-card-wide-copy">{category.example.copy}</p>
        <span className="capstone-card-data">{category.example.tags}</span>
        <p className="capstone-card-ships"><strong>Ships:</strong> {category.example.ships}</p>
      </div>
    </article>

    <p className="capstone-note">Sample capstones from the program, drawn from what businesses in India and Sri Lanka face.</p>
  </section>;
}
