import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import './hour-filmstrip.css';

const FRAMES = [
  { hour: 0, image: '/images/takeover/hour-0.jpg', label: 'Problem brief' },
  { hour: 12, image: '/images/takeover/hour-12.jpg', label: 'Checkpoint' },
  { hour: 18, image: '/images/takeover/hour-18.jpg', label: 'Core flow works' },
  { hour: 26, image: '/images/takeover/hour-26.jpg', label: 'Feature freeze' },
  { hour: 36, image: '/images/takeover/hour-36.jpg', label: 'Live demo' },
] as const;
const TOTAL_HOURS = 36;

function activeIndexForHour(hour: number) {
  let index = 0;
  FRAMES.forEach((frame, i) => { if (hour >= frame.hour) index = i; });
  return index;
}

export default function HourFilmstrip() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const maxOffset = useRef(0);
  const reduced = useReducedMotion();
  const [desktop, setDesktop] = useState(true);
  const [hour, setHour] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchProgress, setTouchProgress] = useState(0);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] });
  const progressWidth = useTransform(scrollYProgress, value => `${Math.min(Math.max(value, 0), 1) * 100}%`);
  const filmstripTransform = useTransform(scrollYProgress, value => {
    const clamped = Math.min(Math.max(value, 0), 1);
    return `translateX(${-clamped * maxOffset.current}px)`;
  });

  useMotionValueEvent(scrollYProgress, 'change', value => {
    if (!desktop || reduced) return;
    const clamped = Math.min(Math.max(value, 0), 1);
    const nextHour = Math.round(clamped * TOTAL_HOURS);
    setHour(previous => (previous === nextHour ? previous : nextHour));
    const nextIndex = activeIndexForHour(nextHour);
    setActiveIndex(previous => (previous === nextIndex ? previous : nextIndex));
  });

  // Below the pin breakpoint the filmstrip scrolls natively by touch instead of
  // scrubbing with the page scroll, so we measure progress off the viewport's
  // own scrollLeft rather than the (disabled) page-scroll pin.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || desktop || reduced) return;
    const onScroll = () => {
      const max = viewport.scrollWidth - viewport.clientWidth;
      const clamped = max > 0 ? Math.min(Math.max(viewport.scrollLeft / max, 0), 1) : 0;
      setTouchProgress(clamped);
      const nextHour = Math.round(clamped * TOTAL_HOURS);
      setHour(previous => (previous === nextHour ? previous : nextHour));
      setActiveIndex(previous => {
        const nextIndex = activeIndexForHour(nextHour);
        return previous === nextIndex ? previous : nextIndex;
      });
    };
    viewport.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => viewport.removeEventListener('scroll', onScroll);
  }, [desktop, reduced]);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 901px)');
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const measure = () => { maxOffset.current = Math.max(0, track.scrollWidth - viewport.clientWidth); };
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    measure();
    return () => observer.disconnect();
  }, []);

  const scrubbing = desktop && !reduced;
  const showProgress = scrubbing ? progressWidth : `${touchProgress * 100}%`;

  return <div className="hour-filmstrip-wrap">
    <div className={`hour-filmstrip-scroll-space${scrubbing ? ' is-scrubbing' : ''}`} ref={wrapRef}>
    <div className="hour-filmstrip-pin">
      <div className="hour-filmstrip-hr">
        <span className="hour-filmstrip-hr-num">{hour}</span>
        <span className="hour-filmstrip-hr-unit">HR&nbsp;/&nbsp;{TOTAL_HOURS}</span>
      </div>

      <div className={`hour-filmstrip-viewport${scrubbing ? '' : ' hour-filmstrip-viewport-touch'}`} ref={viewportRef}>
        <motion.div className="hour-filmstrip-track" ref={trackRef} style={scrubbing ? { transform: filmstripTransform } : undefined}>
          {FRAMES.map((frame, i) => <div key={frame.hour} className={`hour-filmstrip-frame${i === activeIndex ? ' active' : ''}`}>
            <img src={frame.image} alt="" loading="lazy" decoding="async" />
            <div className="hour-filmstrip-frame-label">
              <span className="hour-filmstrip-frame-hour">Hour {frame.hour}</span>
              <span className="hour-filmstrip-frame-name">{frame.label}</span>
            </div>
          </div>)}
        </motion.div>
      </div>

      <div className="hour-filmstrip-progress"><motion.div className="hour-filmstrip-progress-fill" style={{ width: showProgress }} /></div>
    </div>
    </div>

    <div className="hour-filmstrip-bar" style={{ backgroundImage: 'url(/images/takeover/the-bar-banner.jpg)' }}>
      <span className="hour-filmstrip-bar-tag">The bar</span>
      <h3>What it takes to qualify for Bangalore.</h3>
      <p>Score at least 45% across two evaluations and attend 65% of sessions — live or recorded, recorded viewing counts in full. Everyone who clears both travels — there is no cap.</p>
      <div className="hour-filmstrip-bar-chips">
        <span className="hour-filmstrip-bar-chip">Overall score <strong>≥ 45%</strong></span>
        <span className="hour-filmstrip-bar-chip">Attendance <strong>≥ 65%</strong></span>
      </div>
    </div>
  </div>;
}
