import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './specials-linear-carousel.css';

export interface FacultyProfile { name: string; company: string; role: string; image: string }
const logos: Record<string, string> = { Google: '/images/logos/google-com.png', Microsoft: '/images/logos/microsoft-com.png', Simplismart: '/images/logos/simplismart-ai.png', Intuit: '/images/logos/intuit-com.png', PayPal: '/images/logos/paypal-com.png', Ericsson: '/images/logos/ericsson-com.png' };

function CompanyIcon({ company }: { company: string }) {
  const [failed, setFailed] = useState(false);
  return <span className="faculty-company-icon" aria-hidden="true">{failed ? company.slice(0, 2) : <img src={logos[company]} alt="" loading="lazy" onError={() => setFailed(true)} />}</span>;
}

export default function FacultyCarousel({ people }: { people: FacultyProfile[] }) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; scroll: number } | null>(null);
  const hovering = useRef(false);
  const pausedUntil = useRef(0);
  const reduced = useReducedMotion();
  const [edges, setEdges] = useState({ left: false, right: true });
  const updateEdges = () => {
    const el = track.current;
    if (el) setEdges({ left: el.scrollLeft > 2, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 2 });
  };
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(el);
    updateEdges();
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (reduced) return;
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const step = () => {
      if (!hovering.current && Date.now() > pausedUntil.current && !drag.current) {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 0) el.scrollLeft = el.scrollLeft >= max - 1 ? 0 : el.scrollLeft + 0.6;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);
  const move = (direction: number) => {
    const el = track.current;
    if (!el) return;
    pausedUntil.current = Date.now() + 3000;
    const width = el.firstElementChild?.getBoundingClientRect().width ?? 320;
    el.scrollBy({ left: direction * (width + 16), behavior: reduced ? 'instant' : 'smooth' });
  };
  return <div className="faculty-carousel" role="region" aria-label="Faculty profiles" aria-roledescription="carousel">
    <div className="faculty-carousel-track" ref={track} tabIndex={0} onScroll={updateEdges}
      onMouseEnter={() => { hovering.current = true; }} onMouseLeave={() => { hovering.current = false; }}
      onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }}
      onPointerDown={event => { if (event.pointerType !== 'mouse' || event.button !== 0) return; drag.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft }; event.currentTarget.setPointerCapture(event.pointerId); }}
      onPointerMove={event => { if (drag.current) event.currentTarget.scrollLeft = drag.current.scroll - (event.clientX - drag.current.x); }}
      onPointerUp={() => { drag.current = null; pausedUntil.current = Date.now() + 3000; }} onPointerCancel={() => { drag.current = null; }} onLostPointerCapture={() => { drag.current = null; }}>
      {people.map((person, index) => <motion.article className="faculty-carousel-card" key={person.name}
        initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: .45, delay: (index % 3) * .08 }}>
        <img className="faculty-carousel-portrait" src={person.image} alt={person.name} width={396} height={396} loading="lazy" decoding="async" draggable={false} />
        <div className="faculty-carousel-caption">
          <p className="faculty-carousel-company"><CompanyIcon company={person.company} />{person.company}</p>
          <h3>{person.name}</h3><p className="faculty-carousel-role">{person.role}</p>
        </div>
      </motion.article>)}
    </div>
    <div className="faculty-carousel-controls">
      <button type="button" onClick={() => move(-1)} disabled={!edges.left} aria-label="Previous faculty member"><ChevronLeft size={22} /></button>
      <button type="button" onClick={() => move(1)} disabled={!edges.right} aria-label="Next faculty member"><ChevronRight size={22} /></button>
    </div>
  </div>;
}
