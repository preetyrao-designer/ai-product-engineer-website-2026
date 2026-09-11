import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './specials-linear-carousel.css';

export interface FacultyProfile { name: string; company: string; role: string; image: string }
const domains: Record<string, string> = { Google: 'google.com', Microsoft: 'microsoft.com', Simplismart: 'simplismart.ai', Intuit: 'intuit.com', PayPal: 'paypal.com', Ericsson: 'ericsson.com' };

function CompanyIcon({ company }: { company: string }) {
  const [failed, setFailed] = useState(false);
  return <span className="faculty-company-icon" aria-hidden="true">{failed ? company.slice(0, 2) : <img src={`https://www.google.com/s2/favicons?domain=${domains[company]}&sz=64`} alt="" loading="lazy" onError={() => setFailed(true)} />}</span>;
}

export default function FacultyCarousel({ people }: { people: FacultyProfile[] }) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; scroll: number } | null>(null);
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
  const move = (direction: number) => {
    const el = track.current;
    if (!el) return;
    const width = el.firstElementChild?.getBoundingClientRect().width ?? 320;
    el.scrollBy({ left: direction * (width + 16), behavior: reduced ? 'instant' : 'smooth' });
  };
  return <div className="faculty-carousel" role="region" aria-label="Faculty profiles" aria-roledescription="carousel">
    <div className="faculty-carousel-track" ref={track} tabIndex={0} onScroll={updateEdges}
      onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }}
      onPointerDown={event => { if (event.pointerType !== 'mouse' || event.button !== 0) return; drag.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft }; event.currentTarget.setPointerCapture(event.pointerId); }}
      onPointerMove={event => { if (drag.current) event.currentTarget.scrollLeft = drag.current.scroll - (event.clientX - drag.current.x); }}
      onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }} onLostPointerCapture={() => { drag.current = null; }}>
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
