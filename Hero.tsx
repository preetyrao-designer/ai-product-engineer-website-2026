"use client";

import './Typography.css';
import './Palette.css';
import './FoundryGlass.css';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import ProductBlueprint from './components/ui/product-blueprint';
import { BuilderFit, DemoExpectations, ProgramFAQ, Faculty, ProgramFees } from './components/ui/program-information';
import { Admissions } from './components/ui/admissions';
import ScrollExpansionHero from './components/ui/scroll-expansion-hero';
import TrustedBy from './components/ui/trusted-by';
import { SiteNav } from './components/ui/site-nav';


const DISPLAY = 'var(--font-display)';
const MONO = 'var(--font-mono)';
const CHAPTERS = [
  { id: 'sri-lanka', phase: 'WEEK 01', title: 'A change of scene.\nA real starting point.', short: 'The foundation', place: 'Sri Lanka · 13–17 Dec 2026', copy: 'Meet your cohort, find the problem you want to solve, and commit to a product worth building. Your launch residency is where the journey gets real.', tags: ['Launch residency', 'Product anatomy', 'One committed build'], color: '#EDC785' },
  { id: 'architecture', phase: 'WEEKS 02–04', title: 'Understand the layers.\nBuild with intention.', short: 'The architecture', place: 'Online core · Web, data & AI', copy: 'Connect interfaces, data, and LLMs. Learn to work with AI coding agents while understanding the architecture behind what you ship.', tags: ['Web & data', 'LLMs & prompting', 'AI coding agents'], color: '#61E8EF' },
  { id: 'orchestration', phase: 'WEEKS 05–07', title: 'Give your product\nthe power to act.', short: 'The intelligence', place: 'Online core · Connected systems', copy: 'Bring tools, knowledge, and agents into the same product. Connect retrieval, multi-agent workflows, and MCP, then evaluate and deploy your application.', tags: ['RAG & MCP', 'Multi-agent systems', 'Evaluation & deployment'], color: '#B8A0FF' },
  { id: 'bengaluru', phase: 'WEEK 08', title: 'Build under pressure.\nDemo with conviction.', short: 'The launch', place: 'Masai Office, Bangalore · 36 hours', copy: 'Take your continuous build into a 36-hour offline hackathon. Refine it, demonstrate the working product, and show what you can now build.', tags: ['Offline hackathon', 'Working product', 'Demo Day'], color: '#63E6B0' },
] as const;
const JOURNEY_TABS = [
  { label: 'Sri Lanka', sub: '5 days · Sri Lanka', chapters: [0] },
  { label: 'Build', sub: '6 weeks · Online', chapters: [1, 2] },
  { label: 'Bangalore', sub: '3 days · Hackathon', chapters: [3] },
] as const;
export type HeroProps = { applyHref: string; seatHref?: string };

export default function Hero({ applyHref }: HeroProps) {
  const arcRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const tabBarRef = useRef<HTMLDivElement>(null);
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sceneRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [stage, setStage] = useState(0);
  const [journeyTab, setJourneyTab] = useState(0);
  const [tabVisible, setTabVisible] = useState(true);
  const [finePointer, setFinePointer] = useState(false);
  const reduced = useReducedMotion();
  const inView = useInView(sceneRef, { margin: '100px' });
  useEffect(() => {
    tabButtonRefs.current[journeyTab]?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
  }, [journeyTab, reduced]);
  useEffect(() => {
    let frame = 0;
    const syncChapter = () => {
      frame = 0;
      // Advance to whichever chapter's heading has crossed a reading line placed a third of
      // the way down the viewport (below the sticky tab bar). Using each chapter's own top,
      // rather than requiring the previous one to fully clear the viewport, keeps this correct
      // even when chapters are short and several are on-screen at once, as they are on mobile.
      const barBottom = tabBarRef.current?.getBoundingClientRect().bottom ?? 24;
      const readingLine = barBottom + (window.innerHeight - barBottom) * 0.35;
      let nextStage = 0;
      for (let i = 0; i < CHAPTERS.length; i++) {
        const chapter = chapterRefs.current[i];
        if (chapter && chapter.getBoundingClientRect().top <= readingLine) nextStage = i;
      }
      setStage(previous => previous === nextStage ? previous : nextStage);
      const nextTab = JOURNEY_TABS.findIndex(tab => (tab.chapters as readonly number[]).includes(nextStage));
      if (nextTab !== -1) setJourneyTab(previous => previous === nextTab ? previous : nextTab);
    };
    const scheduleSync = () => {
      if (!frame) frame = window.requestAnimationFrame(syncChapter);
    };
    const observer = new ResizeObserver(scheduleSync);
    if (arcRef.current) observer.observe(arcRef.current);
    window.addEventListener('scroll', scheduleSync, { passive: true });
    window.addEventListener('resize', scheduleSync);
    syncChapter();
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', scheduleSync);
      window.removeEventListener('resize', scheduleSync);
    };
  }, []);
  useEffect(() => {
    setMounted(true);
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updatePointer = () => setFinePointer(query.matches);
    const updateVisibility = () => setTabVisible(!document.hidden);
    updatePointer(); updateVisibility();
    query.addEventListener('change', updatePointer);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => { query.removeEventListener('change', updatePointer); document.removeEventListener('visibilitychange', updateVisibility); };
  }, []);
  useEffect(() => {
    const panel = sceneRef.current;
    if (!panel) return;
    const measure = () => {
      panel.style.setProperty('--foundry-panel-height', `${panel.offsetHeight}px`);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    measure();
    return () => observer.disconnect();
  }, []);
  const moving = mounted && reduced === false && inView && tabVisible;
  const focus = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8CA7FF]';
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
        <div ref={tabBarRef} className="leap-tabs-scroll sticky top-0 z-20 -mx-5 mb-12 flex gap-4 overflow-x-auto border-b border-white/10 bg-black px-5 sm:-mx-10 sm:px-10 lg:mb-20 lg:justify-center lg:gap-12 lg:-mx-14 lg:px-14" role="tablist" aria-label="Your Leap Journey phases">
          {JOURNEY_TABS.map((tab, i) => <button key={tab.label} ref={el => { tabButtonRefs.current[i] = el; }} type="button" role="tab" aria-selected={journeyTab === i} onClick={() => {
            setJourneyTab(i);
            const target = chapterRefs.current[tab.chapters[0]];
            if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 160, behavior: reduced ? 'auto' : 'smooth' });
          }} className={`shrink-0 whitespace-nowrap border-b-2 px-6 py-4 text-left transition-colors ${focus}`} style={{ borderColor: journeyTab === i ? '#8CA7FF' : 'transparent' }}>
            <span className="block text-lg font-medium sm:text-xl" style={{ fontFamily: DISPLAY, color: journeyTab === i ? '#E9EDFF' : '#8B8B94' }}>{tab.label}</span>
            <span className="mt-1 block text-[10px] tracking-[0.1em]" style={{ fontFamily: MONO, color: journeyTab === i ? '#8CA7FF' : '#6B7280' }}>{tab.sub}</span>
          </button>)}
        </div>

        <div className="relative grid gap-x-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative min-w-0 lg:col-start-2 lg:row-start-1 lg:row-end-2">
          <div className="foundry-glass-region pb-10 lg:sticky lg:pt-0" ref={sceneRef}>
            <div className="foundry-glass relative isolate overflow-hidden rounded-2xl border"
              onPointerMove={moving && finePointer ? event => { const bounds = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty('--glass-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`); event.currentTarget.style.setProperty('--glass-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`); pointer.current.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2; pointer.current.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2; } : undefined}
              onPointerLeave={moving && finePointer ? () => { pointer.current = { x: 0, y: 0 }; } : undefined}>
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-30" style={{ backgroundImage: 'linear-gradient(#ffffff12 1px, transparent 1px), linear-gradient(90deg, #ffffff12 1px, transparent 1px)', backgroundSize: '40px 40px', maskImage: 'radial-gradient(ellipse at center, black, transparent 75%)' }} />
              <div className="flex items-center justify-between gap-3 px-5 pt-5 text-[8px] tracking-[0.12em] text-[#A1A1AA] sm:text-[9px]" style={{ fontFamily: MONO }}><span className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-[#E4E4E7]" />AI RESIDENCY / PRODUCT BLUEPRINT</span><span>BUILD_001</span></div>
              <ProductBlueprint stage={stage} moving={moving} />
              <div className="foundry-glass-controls relative border-t px-5 py-4">
                <div className="mb-3 flex items-center justify-between gap-2"><p className="text-xs text-[#FAFAFA]">{CHAPTERS[stage].short}<span className="ml-2 text-[#8B8B94]">/ 0{stage + 1}</span></p></div>
                <div role="group" aria-label="Select product build stage" className="grid grid-cols-4 gap-2">{['Define', 'Build', 'Connect', 'Ship'].map((label, i) => <button key={label} type="button" aria-pressed={stage === i} onClick={() => { setStage(i); }} className={`min-h-10 rounded border px-1 py-2 text-[8px] sm:text-[10px] border-white/10 ${focus}`} style={{ color: CHAPTERS[i].color, borderColor: stage === i ? `${CHAPTERS[i].color}88` : undefined, backgroundColor: stage === i ? `${CHAPTERS[i].color}18` : undefined }}>{label}</button>)}</div>
              </div>
            </div>
          </div>
        </div>

        <div ref={arcRef} className="relative scroll-mt-8 lg:col-start-1 lg:row-start-1">

          {CHAPTERS.map((chapter, i) => <section ref={element => { chapterRefs.current[i] = element; }} key={chapter.id} id={chapter.id} aria-labelledby={`${chapter.id}-title`} className={`foundry-chapter relative scroll-mt-[140px] ${i === CHAPTERS.length - 1 ? 'foundry-chapter-final' : ''}`}>
            <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[9px] tracking-[0.13em]" style={{ fontFamily: MONO }}><span className="hidden text-[#929DBF] lg:inline">{chapter.phase}</span><span className="normal-case tracking-normal text-[11px]" style={{ color: chapter.color, fontFamily: 'var(--font-sans)' }}>{chapter.place}</span></div>
            <h3 id={`${chapter.id}-title`} className="whitespace-pre-line text-3xl font-medium leading-[1.15] tracking-[-0.025em] sm:text-4xl" style={{ fontFamily: DISPLAY }}>{chapter.title}</h3>
            <p className="mt-4 max-w-[420px] text-sm leading-7 text-[#C5CCE3]">{chapter.copy}</p>
            <ul className="mt-5 flex flex-wrap gap-2">{chapter.tags.map(tag => <li key={tag} className="foundry-glass-chip px-3.5 py-2 text-[10px] text-[#D4D4D8]">{tag}</li>)}</ul>
          </section>)}
        </div>
      </div>

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
