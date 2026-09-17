"use client";

import './Typography.css';
import './Palette.css';
import './FoundryGlass.css';

import { BuilderFit, DemoExpectations, ProgramFAQ, Faculty, ProgramFees } from './components/ui/program-information';
import { Admissions } from './components/ui/admissions';
import ScrollExpansionHero from './components/ui/scroll-expansion-hero';
import TrustedBy from './components/ui/trusted-by';
import JourneyExplorer from './components/ui/journey-explorer';
import CapstoneExplorer from './components/ui/capstone-explorer';
import { SiteNav } from './components/ui/site-nav';


const DISPLAY = 'var(--font-display)';
const MONO = 'var(--font-mono)';
export type HeroProps = { applyHref: string; seatHref?: string };

export default function Hero({ applyHref }: HeroProps) {
  return <div className="drydock-theme overflow-clip" style={{ fontFamily: 'var(--font-sans)' }}>
    <SiteNav applyHref={applyHref} />
    <main id="drydock">
      <ScrollExpansionHero />
      <div className="drydock-dotted-background">
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14">
      <TrustedBy />
      <BuilderFit />
      <section id="curriculum" aria-labelledby="curriculum-title" className="relative scroll-mt-8 pt-[110px] sm:pt-[200px]">
        <div className="section-intro">
          <p className="mb-4 text-[10px] uppercase tracking-[0.17em] text-[#8CA7FF]" style={{ fontFamily: MONO }}>The AI Residency journey</p>
          <h2 id="curriculum-title" className="mx-auto max-w-[680px] text-3xl font-medium tracking-[-0.025em] sm:text-4xl" style={{ fontFamily: DISPLAY }}>Five days in Sri Lanka. Six weeks online.<br />A weekend hackathon in Bangalore.</h2>
        </div>
        <JourneyExplorer />
      </section>

      <CapstoneExplorer />

      <Faculty />
      <DemoExpectations />
      <Admissions applyHref={applyHref} />
      <ProgramFees />
      <ProgramFAQ />

      </div>
      </div>
    </main>
  </div>;
}
