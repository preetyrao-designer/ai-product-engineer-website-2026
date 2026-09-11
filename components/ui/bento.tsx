import type { ReactNode } from 'react';
import { Target, Package, MonitorPlay, GitBranch, Sparkles, Compass } from 'lucide-react';
import './bento.css';

export interface BentoEntry { title: string; description: string }

const icons = [Target, Package, MonitorPlay, GitBranch, Sparkles, Compass];
const colors = [
  ['#9EDCFF', '#4785FF'],
  ['#E2BEFF', '#9B64F4'],
  ['#FFE2A8', '#F59E0B'],
  ['#FFB9D9', '#E967A3'],
  ['#9AF5E4', '#23BBA6'],
  ['#BDF5BB', '#51BD78'],
];

export function BentoCard({ index, title, description }: { index: number; title: ReactNode; description: ReactNode }) {
  const Icon = icons[index % icons.length];
  const [tint, accent] = colors[index % colors.length];
  return <article className="demo-poster-card" style={{ '--poster-tint': tint, '--poster-accent': accent } as any}>
    <span className="demo-poster-tag">{String(index + 1).padStart(2, '0')}</span>
    <Icon className="demo-poster-icon" strokeWidth={1.1} aria-hidden="true" />
    <div className="demo-poster-text">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </article>;
}

export default function FUIBentoGridDark({ data }: { data: BentoEntry[] }) {
  return <div className="demo-float-grid">{data.map((item, i) => <BentoCard key={item.title} index={i} {...item} />)}</div>;
}
