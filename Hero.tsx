"use client";

import './Typography.css';
import './Palette.css';
import './FoundryGlass.css';

import { BuilderFit, DemoExpectations, ProgramFAQ, Faculty, ProgramFees } from './components/ui/program-information';
import { Admissions } from './components/ui/admissions';
import ScrollExpansionHero from './components/ui/scroll-expansion-hero';
import TrustedBy from './components/ui/trusted-by';
import JourneyExplorer from './components/ui/journey-explorer';
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
          <p className="mb-4 text-[10px] uppercase tracking-[0.17em] text-[#929DBF]" style={{ fontFamily: MONO }}>Your Leap Journey</p>
          <h2 id="curriculum-title" className="text-3xl font-medium tracking-[-0.025em] sm:text-4xl" style={{ fontFamily: DISPLAY }}>One product. Built layer by layer.</h2>
          <p className="mx-auto mt-4 max-w-[580px] text-sm leading-7 text-[#C5CCE3]">From your first commitment in Sri Lanka to your final demo in Bangalore. Follow the weeks to see your product take shape.</p>
        </div>
        <JourneyExplorer />
      </section>

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
