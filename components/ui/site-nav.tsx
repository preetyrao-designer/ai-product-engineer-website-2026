"use client";

import { useEffect, useState } from 'react';
import './site-nav.css';

const LINKS = [
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'Faculty', href: '#faculty' },
  { label: 'Fees', href: '#fees' },
  { label: 'FAQ', href: '#faq' },
];

export function SiteNav({ applyHref, revealAfter = 'curriculum' }: { applyHref: string; revealAfter?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(revealAfter);
    if (!target) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      setVisible(target.getBoundingClientRect().top <= 0);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(check); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    check();
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [revealAfter]);

  return <nav className={`site-nav${visible ? ' site-nav-visible' : ''}`} aria-label="Primary">
    <div className="site-nav-glass">
      <a className="site-nav-brand" href="#top" aria-label="LEAP by Masai, home">
        <span className="site-nav-brand-word">LEAP<span className="site-nav-brand-dot">.</span></span>
        <span className="site-nav-brand-sub">By Masai</span>
      </a>
      <ul className="site-nav-links">
        {LINKS.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}
      </ul>
      <a className="site-nav-cta" href={applyHref}>Apply Now</a>
    </div>
  </nav>;
}
