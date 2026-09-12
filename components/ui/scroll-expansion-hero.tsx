import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Pause, Play } from 'lucide-react';
import './scroll-expansion-hero.css';

const VIDEO = 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1';
const POSTER = 'https://cdn.21st.dev/assets/localized/5bb1be92440e920def3eb36ad5a610d609240616cd8b11c0effe6b92bcafe06e.jpg';
const BACKGROUND = 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYMNjMlBUYHaeYpxduXPVNwf8mnFA61L7rkcoS';

export default function ScrollExpansionHero() {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const visible = useInView(section);
  const [paused, setPaused] = useState(false);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const width = useTransform(scrollYProgress, value => {
    const progress = Math.min(value / 0.8, 1);
    return `calc(min(300px, 78vw) * ${1 - progress} + 95vw * ${progress})`;
  });
  const height = useTransform(scrollYProgress, value => {
    const progress = Math.min(value / 0.8, 1);
    return `calc(min(400px, 58svh) * ${1 - progress} + 85svh * ${progress})`;
  });
  const left = useTransform(scrollYProgress, [0, 0.8], ['0vw', '-110vw']);
  const right = useTransform(scrollYProgress, [0, 0.8], ['0vw', '110vw']);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const introOpacity = useTransform(scrollYProgress, [0.3, 0.65], [0, 1]);
  const openingOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [showOpening, setShowOpening] = useState(true);
  useMotionValueEvent(scrollYProgress, 'change', value => setShowOpening(value < 0.2));

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (visible && !paused && !reduced) void element.play().catch(() => {});
    else element.pause();
  }, [visible, paused, reduced]);

  return <section ref={section} className={`sri-expansion${reduced ? ' sri-expansion-reduced' : ''}`} aria-labelledby="sri-experience-title">
    <div className="sri-expansion-stage">
      <motion.div className="sri-expansion-background" style={{ opacity: reduced ? 0.35 : backgroundOpacity }}>
        <img src={BACKGROUND} alt="" loading="lazy" />
      </motion.div>
      <motion.div className="sri-expansion-media" style={{ width: reduced ? '95vw' : width, height: reduced ? '85svh' : height }}>
        <video ref={video} src={VIDEO} poster={POSTER} muted loop playsInline preload="metadata" aria-label="Immersive experience video" />
        <div className="sri-expansion-shade" />
        <motion.p className="sri-expansion-intro" style={{ opacity: reduced ? 1 : introOpacity }}>Build with AI. Understand what you ship. <strong>Eight weeks</strong> with Masai, from five days in <strong>Sri Lanka</strong> through six weeks online to a 36-hour <strong>Bengaluru</strong> hackathon. Leave with a <strong>live product</strong> people can use.</motion.p>
        {!reduced && <p className="sri-expansion-hint">Scroll to explore <ArrowDown size={15} aria-hidden="true" /></p>}
      </motion.div>
      <div className="sri-expansion-copy" style={reduced ? { display: 'none' } : undefined}>
        {showOpening && <motion.p className="sri-expansion-opening" style={{ opacity: openingOpacity }}>Have an immersive experience in Sri Lanka with our</motion.p>}
        <h2 id="sri-experience-title">
          <motion.span style={{ x: reduced ? 0 : left }}>AI Residency</motion.span>
          <motion.span style={{ x: reduced ? 0 : right }}>Program</motion.span>
        </h2>
      </div>
      <button className="sri-expansion-pause" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play experience video' : 'Pause experience video'} disabled={!!reduced}>
        {paused || reduced ? <Play size={15} /> : <Pause size={15} />}
        {reduced ? 'Motion reduced' : paused ? 'Play video' : 'Pause video'}
      </button>
    </div>
  </section>;
}
