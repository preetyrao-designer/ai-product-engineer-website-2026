import type { ReactNode } from 'react';
import { Target, Package, MonitorPlay, GitBranch, Sparkles } from 'lucide-react';
import './bento.css';

export interface BentoEntry { title: string; description: string }

const icons = [Target, Package, MonitorPlay, GitBranch, Sparkles];
const POSTER_TINT = '#8CA7FF';
const POSTER_ACCENT = '#8CA7FF';

export function BentoCard({ index, title, description, featured = false }: { index: number; title: ReactNode; description: ReactNode; featured?: boolean }) {
  const Icon = icons[index % icons.length];
  return <article className={`demo-poster-card${featured ? ' demo-poster-card-featured' : ''}`} style={{ '--poster-tint': POSTER_TINT, '--poster-accent': POSTER_ACCENT } as any}>
    <Icon className="demo-poster-icon" strokeWidth={1.3} aria-hidden="true" />
    <div className="demo-poster-text">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </article>;
}

export default function FUIBentoGridDark({ data }: { data: BentoEntry[] }) {
  const featuredIndex = data.reduce((longest, item, index) =>
    item.title.length + item.description.length > data[longest].title.length + data[longest].description.length ? index : longest, 0);
  const ordered = data.map((item, index) => ({ ...item, index })).sort((a, b) => Number(b.index === featuredIndex) - Number(a.index === featuredIndex));
  return <div className="demo-float-grid">{ordered.map(item => <BentoCard key={item.title} {...item} featured={item.index === featuredIndex} />)}</div>;
}
