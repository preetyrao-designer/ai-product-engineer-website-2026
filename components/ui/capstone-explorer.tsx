import { useState } from 'react';
import { Megaphone, Palette, Workflow } from 'lucide-react';
import './capstone-explorer.css';

type Example = { title: string; copy: string };
type Category = { key: string; label: string; icon: typeof Megaphone; example: Example };

const CATEGORIES: Category[] = [
  {
    key: 'marketing', label: 'Marketing & growth', icon: Megaphone,
    example: { title: 'Always-on brand marketer', copy: 'Learns your brand, plans the month, writes the copy, generates the creative, and posts it — with one approval before anything goes live.' },
  },
  {
    key: 'product', label: 'Product & design', icon: Palette,
    example: { title: 'Zero-to-PRD agent', copy: 'Researches the market, interrogates the competition, writes the PRD, and hands back a design system and screens ready to build against.' },
  },
  {
    key: 'ops', label: 'Operations', icon: Workflow,
    example: { title: 'Company brain', copy: "Answers anything your team or your customers ask from your own documents — cites the source every time, and escalates what it doesn't know." },
  },
];

export default function CapstoneExplorer() {
  const [active, setActive] = useState(0);
  const category = CATEGORIES[active];
  const Icon = category.icon;

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
      <span className="capstone-card-wide-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.8} /></span>
      <div className="capstone-card-wide-body">
        <span className="capstone-card-tag">{category.label}</span>
        <h4>{category.example.title}</h4>
        <p className="capstone-card-wide-copy">{category.example.copy}</p>
      </div>
    </article>

    <p className="capstone-note">Sample capstones from the program, drawn from what businesses in India and Sri Lanka face.</p>
  </section>;
}
