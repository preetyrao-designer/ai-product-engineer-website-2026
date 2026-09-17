import { Building2, User, Handshake, Briefcase } from 'lucide-react';
import './builder-fit-grid.css';

const ICONS = [Building2, User, Handshake, Briefcase];

export default function BuilderFitGrid({ items }: { items: string[][] }) {
  return <div className="builder-fit-grid">
    {items.map(([title, copy], i) => {
      const Icon = ICONS[i % ICONS.length];
      return <article className="builder-fit-card" key={title}>
        <span className="builder-fit-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.8} /></span>
        <h3>{title}</h3>
        <div className="builder-fit-note">
          <span className="builder-fit-note-label">In AI Residency</span>
          <p>{copy}</p>
        </div>
      </article>;
    })}
  </div>;
}
