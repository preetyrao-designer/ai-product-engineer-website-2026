"use client";

import './Typography.css';

import { useEffect, useId, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useAnimationFrame,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowUpRight, Box, Braces, Database, Layers3, Sparkles, UserRound, Play, Pause, RotateCcw,
} from "lucide-react";

export type HeroProps = {
  /** The real application route or form URL; shared by both CTAs. */
  applyHref: string;
};

const DISPLAY = 'var(--font-display)';
const MONO = 'var(--font-mono)';
const EASE = [0.22, 1, 0.36, 1] as const;
const STAGES = [
  { label: "User", Icon: UserRound, detail: "Start with a person and a problem worth solving." },
  { label: "Interface", Icon: Layers3, detail: "Give the user a clear way to act on that problem." },
  { label: "Logic", Icon: Braces, detail: "Define the rules that turn an action into a working flow." },
  { label: "Data", Icon: Database, detail: "Store and retrieve the information your product needs." },
  { label: "AI", Icon: Sparkles, detail: "Add intelligence where it makes the product more useful." },
  { label: "Output", Icon: Box, detail: "Deliver a result the user can actually use." },
] as const;

const PAYLOADS = [
  '“Help me plan my week.”',
  'request → submit()',
  'validate → route',
  'tasks + availability',
  'context → reasoning',
  'Your weekly plan. Ready.',
];

function SignalString({ progress, index, vertical = false }: { progress: MotionValue<number>; index: number; vertical?: boolean }) {
  const offset = useTransform(progress, value => 1 - Math.min(1, Math.max(0, (value - index - 0.3) / 0.7)));
  const opacity = useTransform(progress, value => value >= index + 0.3 && value < index + 1 ? 1 : 0);
  const path = vertical ? 'M20 0 C4 24 36 40 20 64' : 'M0 20 C20 2 44 38 64 20';
  return <svg aria-hidden="true" viewBox={vertical ? '0 0 40 64' : '0 0 64 40'} preserveAspectRatio="none"
    className={vertical ? 'absolute left-1/2 top-full -ml-5 h-10 w-10 md:hidden' : 'absolute left-full top-1/2 -mt-5 hidden h-10 w-10 md:block'}>
    {[-5, 0, 5].map(shift => <g key={shift} transform={vertical ? `translate(${shift} 0)` : `translate(0 ${shift})`}>
      <path d={path} fill="none" stroke="#14B8A6" strokeOpacity={shift === 0 ? 0.35 : 0.12} strokeWidth="1" />
      <motion.path d={path} pathLength="1" fill="none" stroke="#5EEAD4" strokeWidth={shift === 0 ? 2 : 1} strokeLinecap="round" strokeDasharray="0.18 0.82" style={{ strokeDashoffset: offset, opacity }} />
    </g>)}
  </svg>;
}

function ProductAnatomy({ running, reduced }: { running: boolean; reduced: boolean }) {
  const [playing, setPlaying] = useState(true);
  const [stage, setStage] = useState(0);
  const stageRef = useRef(0);
  const progress = useMotionValue(0);
  const width = useTransform(progress, value => `${value / 6 * 100}%`);
  const detailId = useId();
  const active = running && playing && !reduced;
  useAnimationFrame((_, delta) => {
    if (!active) return;
    const next = (progress.get() + Math.min(delta, 64) / 3400) % 6;
    progress.set(next);
    const index = Math.floor(next);
    if (stageRef.current !== index) { stageRef.current = index; setStage(index); }
  });
  const seek = (index: number) => {
    progress.set(index); stageRef.current = index; setStage(index);
  };
  const control = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[#232326] px-3 text-xs text-[#A3A3A8] hover:bg-[#232326] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14B8A6]';
  return (
    <section aria-label="Week one: interactive product anatomy" className="overflow-hidden rounded-2xl border border-[#232326] bg-[#0A0A0B]/80">
      <div className="p-5 sm:p-7">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.14em] text-[#A3A3A8]" style={{ fontFamily: MONO }}>Week 01 / Product anatomy</h2>
            <p className="mt-2 text-sm text-[#A3A3A8]">One request. Six connected layers.</p>
          </div>
          <div className="flex gap-2" role="group" aria-label="Animation playback">
            {!reduced && <button type="button" className={control} onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause product anatomy animation' : 'Play product anatomy animation'}>{playing ? <Pause size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}{playing ? 'Pause' : 'Play'}</button>}
            <button type="button" className={control} onClick={() => { seek(0); setPlaying(true); }} aria-label="Replay product anatomy from the beginning"><RotateCcw size={13} aria-hidden="true" />Replay</button>
          </div>
        </div>
        <ol className="grid grid-cols-1 gap-10 md:grid-cols-6">
          {STAGES.map(({ label, Icon }, index) => {
            const current = stage === index;
            return <li key={label} className="relative min-w-0">
              {index < 5 && <><SignalString progress={progress} index={index} /><SignalString progress={progress} index={index} vertical /></>}
              <button type="button" aria-pressed={current} aria-describedby={current ? detailId : undefined} onClick={() => { seek(index); setPlaying(false); }}
                className={`relative flex min-h-[106px] w-full flex-col justify-between overflow-hidden rounded-xl border p-4 text-left transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14B8A6] motion-reduce:transition-none md:min-h-[154px] ${current ? 'border-[#14B8A6]/70 bg-[#102322] shadow-[0_0_32px_rgba(20,184,166,0.08)]' : 'border-[#232326] bg-[#151517] hover:border-[#6B6B70]'}`}>
                <span aria-hidden="true" className="flex w-full items-center justify-between">
                  <span className="text-[11px] text-[#A3A3A8]" style={{ fontFamily: MONO }}>{String(index + 1).padStart(2, '0')}</span>
                  <Icon size={19} strokeWidth={1.5} className={current ? 'text-[#5EEAD4]' : 'text-[#6B6B70]'} />
                </span>
                <span className="mt-4 text-sm font-medium">{label}</span>
                <span aria-hidden="true" className={`mt-2 text-[9px] uppercase tracking-[0.1em] ${current ? 'text-[#5EEAD4]' : 'text-[#6B6B70]'}`} style={{ fontFamily: MONO }}>{current ? 'Processing' : index < stage ? 'Transferred' : 'Awaiting signal'}</span>
                {current && active && <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#14B8A6]/10 to-transparent" initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1.7, repeat: Infinity, ease: 'linear' }} />}
              </button>
            </li>;
          })}
        </ol>
        <div className="mt-8 grid gap-5 border-t border-[#232326] pt-6 sm:grid-cols-[1fr_1fr] sm:items-center">
          <div id={detailId} aria-live={playing && !reduced ? 'off' : 'polite'} aria-atomic="true">
            <p className="mb-2 text-[10px] uppercase tracking-[0.15em] text-[#14B8A6]" style={{ fontFamily: MONO }}>0{stage + 1} / {STAGES[stage].label}</p>
            <p className="min-h-[3rem] text-sm leading-6 text-[#A3A3A8]">{STAGES[stage].detail}</p>
          </div>
          <div className="rounded-lg border border-[#232326] bg-[#151517] px-4 py-4">
            <p className="mb-3 text-[9px] uppercase tracking-[0.14em] text-[#A3A3A8]" style={{ fontFamily: MONO }}>Live payload / Weekly planner</p>
            <motion.p key={stage} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="break-words text-sm text-[#5EEAD4]" style={{ fontFamily: MONO }}>{PAYLOADS[stage]}</motion.p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="h-0.5 bg-[#232326]"><motion.div className="h-full bg-[#14B8A6]" style={{ width }} /></div>
      <div className="flex justify-between gap-4 px-5 py-3 text-[9px] uppercase tracking-[0.12em] text-[#A3A3A8] sm:px-7" style={{ fontFamily: MONO }}><span>{reduced ? 'Explore each layer' : playing ? 'Continuous playback · 20 seconds' : 'Paused · Explore each layer'}</span><span>Click a node to inspect</span></div>
    </section>
  );
}

export default function Hero({ applyHref }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const headingId = useId();
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [pastHero, setPastHero] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(45);
  const glowX = useSpring(pointerX, { stiffness: 65, damping: 25 });
  const glowY = useSpring(pointerY, { stiffness: 65, damping: 25 });
  const glow = useMotionTemplate`radial-gradient(480px circle at ${glowX}% ${glowY}%, rgba(20,184,166,0.075), transparent 75%)`;
  // Static SSR output also covers hydration and the reduced-motion path.
  const animate = mounted && reducedMotion === false;
  const running = animate && visible && pageVisible;

  useEffect(() => {
    setMounted(true);
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePointer = () => setFinePointer(query.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updatePointer();
    updateVisibility();
    query.addEventListener("change", updatePointer);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      query.removeEventListener("change", updatePointer);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const element = heroRef.current;
    if (!element) return;
    // Observe the entire hero: scrolling back above it must not show the bar.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      setVisible(entry.isIntersecting);
      setPastHero(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0);
    }, { threshold: 0 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = heroRef.current;
    if (!element || !running || !finePointer) return;
    const move = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      pointerX.set(((event.clientX - rect.left) / rect.width) * 100);
      pointerY.set(((event.clientY - rect.top) / rect.height) * 100);
    };
    const reset = () => { pointerX.set(50); pointerY.set(45); };
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", reset);
    return () => {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
    };
  }, [running, finePointer, pointerX, pointerY]);

  const ctaClass = "inline-flex min-h-[52px] items-center justify-center gap-3 rounded-lg bg-[#E8395A] px-6 py-3 text-center text-sm font-semibold text-[#0A0A0B] transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14B8A6] motion-reduce:transition-none";

  return (
    <>
      <header
        ref={heroRef}
        aria-labelledby={headingId}
        className="relative isolate overflow-hidden bg-[#0A0A0B] text-white"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage: "linear-gradient(#121215 1px, transparent 1px), linear-gradient(90deg, #121215 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse at 50% 55%, black, transparent 80%)",
          }}
        />
        {animate && finePointer ? (
          <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ background: glow }} />
        ) : (
          <motion.div aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            initial={false}
            animate={running ? { x: ["-8%", "8%", "-8%"], y: ["-4%", "6%", "-4%"] } : { x: 0, y: 0 }}
            transition={running ? { duration: 14, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
            style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(20,184,166,0.075), transparent 65%)" }}
          />
        )}

        <div className="mx-auto max-w-[1240px] px-5 pb-16 pt-7 sm:px-8 md:pb-24 md:pt-9">
          <div className="flex items-center justify-between gap-4 border-b border-[#232326] pb-6">
            <span className="flex items-baseline gap-3">
              <span className="text-xl font-semibold tracking-[-0.04em]" style={{ fontFamily: DISPLAY }}>drydock<span className="text-[#A3A3A8]">/</span></span>
              <span className="text-[10px] uppercase tracking-[0.12em] text-[#A3A3A8]" style={{ fontFamily: MONO }}>by Masai</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.12em] text-[#A3A3A8]" style={{ fontFamily: MONO }}>8 weeks. Build to ship.</span>
          </div>

          <div className="mx-auto max-w-[970px] pb-12 pt-16 text-center md:pb-16 md:pt-24">
            <p className="inline-flex items-center gap-2 text-[10px] leading-5 tracking-[0.12em] text-[#A3A3A8] sm:text-xs" style={{ fontFamily: MONO }}>
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#14B8A6]" />
              COHORT 01 • SRI LANKA TO BENGALURU
            </p>
            <h1 id={headingId} className="mt-7 text-[clamp(2.5rem,7.3vw,6rem)] font-semibold leading-[1.04] tracking-[-0.055em]" style={{ fontFamily: DISPLAY }}>
              <span className="sr-only">Everyone can prompt. Few can build.</span>
              <span aria-hidden="true">
                {[['Everyone', 'can', 'prompt.'], ['Few', 'can', 'build.']].map((line, row) => (
                  <span key={row} className="block">
                    {line.map((word, column) => (
                      <span key={`${row}-${column}`} className={`inline-block overflow-hidden align-bottom pb-[0.12em] ${column < line.length - 1 ? "mr-[0.2em]" : ""}`}>
                        <motion.span className={`inline-block ${word === 'build.' ? 'text-[#E8395A]' : ''}`}
                          initial={false}
                          animate={animate ? { y: [20, 0], opacity: [0, 1] } : { y: 0, opacity: 1 }}
                          transition={{ duration: animate ? 0.65 : 0, delay: animate ? (row * 3 + column) * 0.075 : 0, ease: EASE }}
                        >{word}</motion.span>
                      </span>
                    ))}
                  </span>
                ))}
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-[580px] text-base leading-relaxed text-[#A3A3A8] sm:text-lg">
              An eight-week foundry — Sri Lanka to a deployed product to a company demo in Bengaluru.
            </p>
            <nav aria-label="Cohort application" className="mt-8">
              <a href={applyHref} className={ctaClass}>Apply for the next cohort<ArrowUpRight aria-hidden="true" size={18} /></a>
            </nav>
            <p className="mt-4 text-xs leading-5 text-[#A3A3A8]">Limited to 24 builders • In-person &amp; intensive</p>
          </div>

          <ProductAnatomy running={running} reduced={!animate} />
        </div>
      </header>

      {pastHero && (
        <motion.nav aria-label="Quick cohort application" initial={animate ? { opacity: 0, y: 16 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: animate ? 0.25 : 0, ease: EASE }}
          className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 mx-auto flex max-w-[620px] items-center justify-between gap-4 rounded-xl border border-[#232326] bg-[#151517] p-3 shadow-[0_12px_48px_rgba(0,0,0,0.45)]" style={{ fontFamily: 'var(--font-sans)' }}>
          <div className="hidden pl-2 sm:block">
            <p className="text-sm font-semibold text-white" style={{ fontFamily: DISPLAY }}>Drydock / Cohort 01</p>
            <p className="mt-1 text-xs text-[#A3A3A8]">24 builders. Eight weeks.</p>
          </div>
          <a href={applyHref} className={`${ctaClass} w-full sm:w-auto`}>Apply for the next cohort<ArrowUpRight aria-hidden="true" size={18} /></a>
        </motion.nav>
      )}
    </>
  );
}
