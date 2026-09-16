"use client";

import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import './site-nav.css';

const LINKS = [
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'Faculty', href: '#faculty' },
  { label: 'Demo Day', href: '#demo-day' },
  { label: 'Admission', href: '#admissions' },
  { label: 'Fees', href: '#fees' },
  { label: 'FAQ', href: '#faq' },
];

export function SiteNav({ applyHref, revealAfter = 'curriculum' }: { applyHref: string; revealAfter?: string }) {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const target = document.getElementById(revealAfter);
    if (!target) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      // Stay hidden for the whole section (it has its own sticky tab bar) —
      // only reveal once its bottom has scrolled past the viewport top.
      setVisible(target.getBoundingClientRect().bottom <= 0);
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

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    const onPointerDown = (event: PointerEvent) => { if (navRef.current && !navRef.current.contains(event.target as Node)) setMenuOpen(false); };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [visible]);

  return <nav ref={navRef} className={`site-nav${visible ? ' site-nav-visible' : ''}${menuOpen ? ' site-nav-menu-open' : ''}`} aria-label="Primary">
    <div className="site-nav-glass">
      <button type="button" className="site-nav-menu-btn" aria-expanded={menuOpen} aria-controls="site-nav-drawer" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen(open => !open)}>
        {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
      </button>
      <a className="site-nav-brand" href="#top" aria-label="LEAP by Masai, home">
        <img className="site-nav-brand-logo" src="/images/leap-logo.svg" alt="LEAP by Masai" width={87} height={38} />
      </a>
      <ul className="site-nav-links">
        {LINKS.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}
      </ul>
      <a className="site-nav-cta" href={applyHref}>Apply Now</a>
    </div>
    <div className="site-nav-drawer" id="site-nav-drawer" hidden={!menuOpen}>
      <ul>
        {LINKS.map(link => <li key={link.href}><a href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a></li>)}
      </ul>
    </div>
  </nav>;
}
