import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Lightbulb, CodeXml, Rocket, UsersRound, ArrowDown } from 'lucide-react';
import './builder-story.css';

const visuals = [
  { image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=85', alt: 'Planning a digital interface', Icon: Lightbulb },
  { image: 'https://images.unsplash.com/photo-1649451844897-8699a1d6d96d?auto=format&fit=crop&w=1200&q=85', alt: 'A coding workspace', Icon: CodeXml },
  { image: 'https://images.unsplash.com/photo-1641736494173-e7d5775121b2?auto=format&fit=crop&w=1200&q=85', alt: 'A digital product on screen', Icon: Rocket },
  { image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=85', alt: 'People collaborating around a table', Icon: UsersRound },
];
function StoryFrame({ item, index, progress }: { item: string[]; index: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, value => {
    const phase = value * 4;
    const enter = index === 0 ? 1 : Math.min(1, Math.max(0, (phase - index + .16) / .32));
    const leave = index === 3 ? 1 : Math.min(1, Math.max(0, (index + 1 + .16 - phase) / .32));
    return Math.min(enter, leave);
  });
  const y = useTransform(progress, value => Math.max(-24, Math.min(24, (index - value * 4 + .5) * 24)));
  const { image, alt, Icon } = visuals[index];
  return <motion.article className="builder-story-frame" style={{ opacity }}>
    <motion.div className="builder-story-text" style={{ y }}>
      <Icon className="builder-story-icon" size={44} strokeWidth={1.6} aria-hidden="true" />
      <h3>{item[0]}</h3><p>{item[1]}</p>
      <div className="builder-story-position" aria-label={`Story ${index + 1} of 4`}><span>{String(index + 1).padStart(2, '0')} / 04</span><span>Scroll to explore <ArrowDown size={14} aria-hidden="true" /></span></div>
    </motion.div>
    <div className="builder-story-image"><img src={image} alt={alt} loading="lazy" decoding="async" /></div>
  </motion.article>;
}
export default function BuilderStory({ items }: { items: string[][] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return <div className="builder-story" ref={ref}><div className="builder-story-stage">{items.map((item, index) => <StoryFrame key={item[0]} item={item} index={index} progress={scrollYProgress} />)}</div></div>;
}
