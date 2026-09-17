import { useEffect, useRef, useState } from 'react';
import './journey-explorer.css';

const SRI_LANKA_IMAGE = 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYMNjMlBUYHaeYpxduXPVNwf8mnFA61L7rkcoS';
const BANGALORE_IMAGE = '/images/takeover/the-bar-banner.jpg';

const PHASES = [
  {
    id: 'sri-lanka', label: 'Sri Lanka', meta: '5 days · Residency',
    tag: 'PHASE 01 · SRI LANKA · 5 DAYS', image: SRI_LANKA_IMAGE as string | null,
    title: 'It starts on the coasts', accent: 'of Sri Lanka.' as string | null,
    copy: 'Meet your fellow builders. Get into the rhythm of building with a small MVP. Explore Sri Lanka, and commit to a capstone product.',
    kind: 'cards' as const,
    cards: [
      { tag: 'Day 01', title: 'Meet the builders', copy: 'Why AI has changed what non-technical people can build, the whole cohort in one room, and an evening with a senior technology leader from an AI-first company.' },
      { tag: 'Day 02', title: 'Build Day', copy: 'Pick a small idea in the morning and put it live on a URL by evening. Then demo it to everyone.' },
      { tag: 'Day 03', title: 'Tech Foundations 101', copy: 'Dig deeper into how any content is served on a website or an app, from servers and APIs. Followed by a lab that eases you into the world of APIs.' },
      { tag: 'Day 04', title: 'Explore Sri Lanka', copy: 'A guided day on the Sri Lankan coast with the cohort, then an evening on where AI really is, past the headlines.' },
      { tag: 'Day 05', title: 'Choose what you will build', copy: 'Design your product’s data model, meet your pod and mentor, and commit to the capstone you will build by Demo Day.' },
    ],
  },
  {
    id: 'build', label: 'Build', meta: '6 weeks · Online',
    tag: 'PHASE 02 · ONLINE · 6 WEEKS', image: 'https://res.cloudinary.com/amwga9rc/image/upload/v1789635806/programming-background-with-person-working-with-codes-computer_1.jpg' as string | null,
    title: 'Build the product.', accent: null as string | null,
    copy: 'Structured online sessions on weekends, digging deeper into the capabilities of LLMs. Every week has a hands-on lab where you implement what you learn.',
    kind: 'weeks' as const,
    weeks: [
      { range: 'Week 02', title: 'How software actually works', copy: 'Read code and understand what an AI agent built for you. Then what an LLM is, why models hallucinate, and how to choose one for your product.', tags: ['Reading code', 'LLMs', 'Model choice'] },
      { range: 'Week 03', title: 'Controlling AI', copy: 'Prompting, context and structured outputs. Then why vibe coding fails: planning before prompting, reusable skills, and Git so nothing is lost.', tags: ['Prompting', 'Planning', 'Git'] },
      { range: 'Week 04', title: 'Idea to working product', copy: 'Turn your idea into a spec and a design with Claude Design and Google Stitch, then into a running app with Cursor, Claude Code or Codex, backed by a real database. First evaluation.', tags: ['Product spec', 'Coding agents', 'Databases'] },
      { range: 'Week 05', title: 'From agents to agent systems', copy: 'What makes something an agent, when one is worth building, and why agents fail. Then several agents working together, and automations in n8n.', tags: ['Agents', 'Multi-agent', 'n8n'] },
      { range: 'Week 06', title: 'Your data, and the outside world', copy: 'Ground your product in your own documents with citations, connect it to real systems over MCP, and keep it working when an API fails.', tags: ['RAG', 'MCP', 'Reliability'] },
      { range: 'Week 07', title: 'Prove it, then ship it', copy: 'Test it with an eval set, protect it against prompt injection and data leaks, then deploy it to a public URL. Final evaluation.', tags: ['Evals', 'Security', 'Deployment'] },
    ],
  },
  {
    id: 'bangalore', label: 'Bangalore', meta: '3 days · Hackathon',
    tag: 'PHASE 03 · BANGALORE · 3 DAYS', image: BANGALORE_IMAGE as string | null,
    title: 'Build for a real company.', accent: 'In one weekend.' as string | null,
    copy: 'A partner company brings a real problem on Friday evening. Your team builds a working solution through the weekend and demos it to them on Sunday.',
    kind: 'cards' as const,
    cards: [
      { tag: 'Friday evening · The brief', title: 'Meet the problem', copy: 'The partner company presents its problem at the Masai office. Teams of three or four form, and a mentor reviews your plan before anyone builds.' },
      { tag: 'Saturday · The build', title: 'Build through the day', copy: 'Mentors on the floor in shifts. Three checkpoints: something running, the main flow working, then no new features.' },
      { tag: 'Sunday · Demo Day', title: 'Demo it to the company', copy: 'Deploy and run your security checklist, then demo live to the company’s own team and answer their questions.' },
    ],
  },
];

export default function JourneyExplorer() {
  const tabBarRef = useRef<HTMLDivElement>(null);
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const isFirstTabScroll = useRef(true);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    // Skip on mount — scrollIntoView on an off-screen tab bar would otherwise
    // jump the whole page down to it before the visitor has scrolled there.
    if (isFirstTabScroll.current) { isFirstTabScroll.current = false; return; }
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
