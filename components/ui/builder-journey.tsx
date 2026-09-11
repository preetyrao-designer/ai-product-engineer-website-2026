import { useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { Check } from 'lucide-react';
import './builder-journey.css';

const VISUALS = [
  { image: 'https://res.cloudinary.com/amwga9rc/image/upload/v1789142034/01.png', alt: 'Hand-drawn product wireframes sketched out on a laptop' },
  { image: 'https://res.cloudinary.com/amwga9rc/image/upload/v1789142243/hf_20260911_155545_e4dba9fa-77b0-4108-9d0d-bbbaafca6e70.png', alt: 'An AI prompt generating code on a laptop, with one line highlighted for review' },
  { image: 'https://res.cloudinary.com/amwga9rc/image/upload/v1789142218/2.png', alt: 'A product dashboard showing live metrics like code commits and revenue' },
  { image: 'https://res.cloudinary.com/amwga9rc/image/upload/v1789142219/001.png', alt: 'A team working together on a beach terrace in Sri Lanka' },
];

export default function BuilderJourney({ items }: { items: string[][] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', value => {
    const index = Math.min(items.length - 1, Math.max(0, Math.floor(value * items.length)));
    setActive(previous => previous === index ? previous : index);
  });

  return <div className="builder-journey" ref={ref}>
    <div className="builder-journey-stage">
      <ol className="builder-journey-steps">
        {items.map(([title, copy], index) => {
          const state = index < active ? 'done' : index === active ? 'active' : 'upcoming';
          return <li key={title} className={`builder-journey-step builder-journey-step-${state}`}>
            <span className="builder-journey-dot" aria-hidden="true">{state === 'upcoming' ? String(index + 1).padStart(2, '0') : <Check size={15} strokeWidth={2.5} />}</span>
            <div className="builder-journey-copy">
              <h3>{title}</h3>
              <p>{copy}</p>
              <img className="builder-journey-copy-image" src={VISUALS[index].image} alt={VISUALS[index].alt} loading="lazy" decoding="async" />
            </div>
          </li>;
        })}
      </ol>
      <div className="builder-journey-visual">
        {VISUALS.map((visual, index) => <img key={visual.alt} src={visual.image} alt={visual.alt} className="builder-journey-image" style={{ opacity: index === active ? 1 : 0 }} loading="lazy" decoding="async" />)}
      </div>
    </div>
  </div>;
}
