import { useEffect, useRef, useState } from 'react';
import './journey-explorer.css';

const SRI_LANKA_IMAGE = 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYMNjMlBUYHaeYpxduXPVNwf8mnFA61L7rkcoS';
const BANGALORE_IMAGE = '/images/takeover/the-bar-banner.jpg';

const PHASES = [
  {
    id: 'sri-lanka', label: 'Sri Lanka', meta: '5 days · Sri Lanka',
    tag: 'PHASE 01 · SRI LANKA · 5 DAYS', image: SRI_LANKA_IMAGE as string | null,
    title: 'A change of scene.', accent: 'A real starting point.' as string | null,
    copy: 'Meet your cohort, find the problem you want to solve, and commit to a product worth building. Your launch residency is where the journey gets real.',
    kind: 'cards' as const,
    cards: [
      { tag: 'Arrival', title: 'Launch residency', copy: 'Meet your cohort in person and get oriented — this is where the eight weeks begin.' },
      { tag: 'Workshop', title: 'Product anatomy', copy: 'Break down how interfaces, data, and AI work together before you start building.' },
      { tag: 'Commitment', title: 'One committed build', copy: 'Find the problem you want to solve, and commit to the one product you’ll carry through the program.' },
    ],
  },
  {
    id: 'build', label: 'Build', meta: '6 weeks · Online',
    tag: 'PHASE 02 · ONLINE · 6 WEEKS', image: null as string | null,
    title: 'Build with intention.', accent: null as string | null,
    copy: 'Six weeks to turn your idea into a working product — connect interfaces, data, and AI, then give it the power to act.',
    kind: 'weeks' as const,
    weeks: [
      { range: 'Weeks 02–04', title: 'Understand the layers. Build with intention.', copy: 'Connect interfaces, data, and LLMs. Learn to work with AI coding agents while understanding the architecture behind what you ship.', tags: ['Web & data', 'LLMs & prompting', 'AI coding agents'] },
      { range: 'Weeks 05–07', title: 'Give your product the power to act.', copy: 'Bring tools, knowledge, and agents into the same product. Connect retrieval, multi-agent workflows, and MCP, then evaluate and deploy your application.', tags: ['RAG & MCP', 'Multi-agent systems', 'Evaluation & deployment'] },
    ],
  },
  {
    id: 'bangalore', label: 'Bangalore', meta: '3 days · Hackathon',
    tag: 'PHASE 03 · BANGALORE · 3 DAYS', image: BANGALORE_IMAGE as string | null,
    title: 'Build under pressure.', accent: 'Demo with conviction.' as string | null,
    copy: 'Take your continuous build into a 36-hour offline hackathon. Refine it, demonstrate the working product, and show what you can now build.',
    kind: 'cards' as const,
    cards: [
      { tag: 'Hackathon begins', title: 'Offline hackathon', copy: 'Arrive at the Masai office and start the 36-hour build, mentors on the floor throughout.' },
      { tag: '36 hours', title: 'Working product', copy: 'Refine six weeks of work into something real people can use.' },
      { tag: 'Demo Day', title: 'Demo Day', copy: 'Show the product, explain the decisions, and present what you built to the room.' },
    ],
  },
];

export default function JourneyExplorer() {
  const tabBarRef = useRef<HTMLDivElement>(null);
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    tabButtonRefs.current[active]?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
  }, [active, reduced]);

  useEffect(() => {
    let frame = 0;
    const compute = () => {
      frame = 0;
      const barBottom = tabBarRef.current?.getBoundingClientRect().bottom ?? 24;
      const readingLine = barBottom + (window.innerHeight - barBottom) * 0.35;
      let next = 0;
      panelRefs.current.forEach((panel, i) => { if (panel && panel.getBoundingClientRect().top <= readingLine) next = i; });
      setActive(previous => (previous === next ? previous : next));
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(compute); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    compute();
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return <div className="journey-explorer">
    <div ref={tabBarRef} className="leap-tabs-scroll journey-tabs" role="tablist" aria-label="Your Leap Journey phases">
      {PHASES.map((phase, i) => <button key={phase.id} ref={el => { tabButtonRefs.current[i] = el; }} type="button" role="tab" aria-selected={active === i}
        className={`journey-tab${active === i ? ' active' : ''}`}
        onClick={() => {
          setActive(i);
          const panel = panelRefs.current[i];
          if (panel) window.scrollTo({ top: panel.getBoundingClientRect().top + window.scrollY - 160, behavior: reduced ? 'auto' : 'smooth' });
        }}>
        <span className="journey-tab-name">{phase.label}</span>
        <span className="journey-tab-meta">{phase.meta}</span>
      </button>)}
    </div>

    <div className="journey-panels">
      {PHASES.map((phase, i) => <div key={phase.id} ref={el => { panelRefs.current[i] = el; }} id={phase.id} className="journey-panel">
        <div className={`journey-banner${phase.image ? '' : ' journey-banner-plain'}`} style={phase.image ? { backgroundImage: `url(${phase.image})` } : undefined}>
          <span className="journey-banner-tag">{phase.tag}</span>
          <h3>{phase.title}{phase.accent && <><br /><span>{phase.accent}</span></>}</h3>
          <p>{phase.copy}</p>
        </div>

        {phase.kind === 'cards' ? <div className="journey-day-grid">
          {phase.cards.map(card => <div key={card.title} className="journey-day-card">
            <span className="journey-day-tag">{card.tag}</span>
            <h4>{card.title}</h4>
            <p>{card.copy}</p>
          </div>)}
        </div> : <div className="journey-week-list">
          {phase.weeks.map(week => <div key={week.range} className="journey-week-item">
            <span className="journey-week-range">{week.range}</span>
            <div>
              <h4>{week.title}</h4>
              <p>{week.copy}</p>
              <div className="journey-week-tags">{week.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            </div>
          </div>)}
        </div>}
      </div>)}
    </div>
  </div>;
}
