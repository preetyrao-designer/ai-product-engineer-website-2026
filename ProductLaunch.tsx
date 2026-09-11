"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, Command, Pause, Play, Sparkles } from 'lucide-react';
import './ProductLaunch.css';

const STATES = [
  { label: 'An idea', title: 'It starts with “what if”.', description: 'A problem you understand. Something you want to exist.' },
  { label: 'A working build', title: 'Make it real.', description: 'Turn the idea into a product people can actually use.' },
  { label: 'Out in the world', title: 'Built by you. Ready to ship.', description: 'A working product is the beginning of what comes next.' },
];

export default function ProductLaunch() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.15 });
  const reduced = useReducedMotion();
  const [step, setStep] = useState(2);
  const [paused, setPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update(); document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  const moving = visible && reduced === false && !paused && pageVisible;
  useEffect(() => {
    if (!moving) return;
    const timer = window.setInterval(() => setStep(value => (value + 1) % 3), 4200);
    return () => window.clearInterval(timer);
  }, [moving]);
  const duration = reduced ? 0 : 0.8;
  return <div ref={ref} className="launch-art" aria-label="From an idea to a working product">
    <div className="launch-stage">
      <div aria-hidden="true" className="launch-glow" />
      <svg aria-hidden="true" className="launch-orbits" viewBox="0 0 640 570" fill="none">
        <ellipse cx="336" cy="302" rx="291" ry="189" transform="rotate(-22 336 302)" stroke="#527C83" strokeOpacity=".2" />
        <ellipse cx="336" cy="302" rx="260" ry="216" transform="rotate(24 336 302)" stroke="#527C83" strokeOpacity=".12" />
        <motion.path d="M50 381 C20 202 383 71 578 205 C717 302 464 531 183 452" stroke="#9DE5D9" strokeOpacity=".45" strokeWidth="1" initial={false} animate={{ pathLength: step === 0 ? 0.2 : step === 1 ? 0.65 : 1 }} transition={{ duration }} />
        <circle cx="50" cy="381" r="3" fill="#EDC785" /><circle cx="578" cy="205" r="3" fill="#C8F4EE" />
      </svg>
      <motion.div className="launch-browser" initial={false} animate={{ rotateY: step === 0 ? -7 : -3, rotateX: step === 0 ? 5 : 3, y: moving ? [0, -7, 0] : 0 }} transition={{ rotateY: { duration }, rotateX: { duration }, y: { duration: moving ? 7 : 0, repeat: moving ? Infinity : 0, ease: 'easeInOut' } }}>
        <div className="launch-browser-bar"><span className="launch-dots"><i /><i /><i /></span><span>your-idea / made-real</span><ArrowUpRight size={12} /></div>
        <div className="launch-app" aria-hidden="true">
          <div className="launch-app-nav"><span><Command size={16} /> orbit</span><span className="launch-avatar">Y</span></div>
          <div className="launch-app-heading"><span className="launch-kicker">YOUR SPACE TO MAKE THINGS HAPPEN</span><h3>A little less busy.<br />A lot more done.</h3><p>Your projects, with a clearer path forward.</p></div>
          <div className="launch-app-grid">
            <div className="launch-project">
              <div className="launch-project-art"><svg viewBox="0 0 180 126" fill="none"><path d="M90 13 157 49 90 86 23 49Z" fill="#254F4C" stroke="#90D4BE"/><path d="M23 49 90 86 90 117 23 80Z" fill="#163B38" stroke="#578D7E"/><path d="M90 86 157 49 157 80 90 117Z" fill="#387363" stroke="#90D4BE"/><path d="M90 29 130 51 90 73 50 51Z" fill="#B6E7D2"/><path d="M90 39 112 51 90 63 68 51Z" fill="#63A791"/></svg></div>
              <span className="launch-kicker">THE NEXT BIG THING</span><strong>Your first product</strong><span className="launch-project-meta">An idea with somewhere to go.</span>
            </div>
            <div className="launch-task-list"><span className="launch-kicker">MAKE IT HAPPEN</span>{['Find the problem', 'Build the first version', 'Put it in people’s hands'].map((task, i) => <div key={task} className="launch-task"><span style={{ color: step >= i ? '#93D8BC' : '#516571' }}>{step >= i ? <Check size={12} /> : '·'}</span><span>{task}</span></div>)}<div className="launch-assistant"><Sparkles size={14} /><span>A little intelligence.<br />A lot of possibility.</span></div></div>
          </div>
          <motion.div className="launch-wireframe" initial={false} animate={{ opacity: step === 0 ? 0.92 : step === 1 ? 0.28 : 0 }} transition={{ duration }} />
        </div>
        <div className="launch-browser-footer"><span className="launch-status-dot" />{step === 0 ? 'One possibility. Yours.' : step === 1 ? 'Taking shape, one decision at a time.' : 'A product you can put into the world.'}</div>
      </motion.div>
      <motion.div className="launch-idea" initial={false} animate={{ y: step === 0 ? -7 : 0, opacity: step === 2 ? 0.65 : 1 }} transition={{ duration }}><span className="launch-kicker">THE SPARK</span><span>“What if I built this?”</span><span className="launch-idea-line" /></motion.div>
      <motion.div className="launch-shipped" initial={false} animate={{ y: step === 2 ? 0 : 12, opacity: step === 2 ? 1 : 0 }} transition={{ duration }}><span className="launch-check"><Check size={17} /></span><span><strong>Made real.</strong><small>By you, with AI.</small></span><ArrowUpRight size={15} /></motion.div>
      <span className="launch-example">ILLUSTRATIVE PRODUCT / YOUR IDEA GOES HERE</span>
    </div>
    <div className="launch-caption"><div><p>{STATES[step].title}</p><span>{STATES[step].description}</span></div>{reduced === false && <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play product transformation' : 'Pause product transformation'}>{paused ? <Play size={13} /> : <Pause size={13} />}</button>}</div>
    <div className="launch-controls" role="group" aria-label="Explore product transformation">{STATES.map((state, i) => <button type="button" key={state.label} aria-pressed={step === i} onClick={() => { setStep(i); setPaused(true); }}><span style={{ background: step === i ? '#C8F4EE' : '#263B46' }} /><span>{state.label}</span></button>)}</div>
  </div>;
}
