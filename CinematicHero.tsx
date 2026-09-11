"use client";

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import './CinematicHero.css';

export default function CinematicHero({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const visible = useInView(container, { amount: 0.1 });
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    let cancelled = false;
    if (visible && pageVisible && reduced === false && !paused && !failed) {
      element.muted = true;
      void element.play().catch(error => {
        if (!cancelled && error.name !== 'AbortError') setPaused(true);
      });
    } else element.pause();
    return () => { cancelled = true; element.pause(); };
  }, [visible, pageVisible, reduced, paused, failed]);

  return <div ref={container} className="cinematic-option">
    <div className="cinematic-film">
      <div className="cinematic-background" aria-hidden="true">
      <img className="cinematic-media" src="/images/drydock-video-poster.jpg" alt="" aria-hidden="true" fetchPriority="high" />
      {reduced === false && !failed && <video ref={video} className="cinematic-media" src="/video/drydock-hero.mp4" poster="/images/drydock-video-poster.jpg" muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} onError={() => setFailed(true)} />}
      </div>
      <div className="cinematic-shade" aria-hidden="true" />
      <div className="cinematic-copy">{children}</div>
      {reduced === false && !failed && <button className="cinematic-playback" type="button" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play background video' : 'Pause background video'}>{paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}</button>}
    </div>
  </div>;
}
