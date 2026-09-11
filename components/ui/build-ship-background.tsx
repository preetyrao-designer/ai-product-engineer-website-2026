"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { BrainCircuit, Code2, Database, Users, ChartNoAxesCombined, Pause, Play } from "lucide-react";
import "./build-ship-background.css";

const nodes = [
  { x: 760, y: 100, label: "DATA", color: "#EDC785", Icon: Database },
  { x: 930, y: 150, label: "AI", color: "#61E8EF", Icon: BrainCircuit },
  { x: 1090, y: 115, label: "AGENTS", color: "#B8A0FF", Icon: Users },
  { x: 900, y: 265, label: "BUILD", color: "#E1E0CC", Icon: Code2 },
  { x: 1190, y: 245, label: "LIVE", color: "#63E6B0", Icon: ChartNoAxesCombined },
];
const paths = [
  "M790 130 C835 130 845 180 900 180",
  "M960 180 C1020 180 1000 145 1060 145",
  "M930 210 C930 235 925 245 925 265",
  "M1120 145 C1180 145 1130 275 1160 275",
  "M930 295 C990 325 1080 290 1160 275",
  "M1190 305 C1190 335 1140 340 1120 360",
];

export function BuildShipBackground() {
  const root = useRef<HTMLDivElement>(null);
  const visible = useInView(root);
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [foreground, setForeground] = useState(true);
  useEffect(() => {
    const update = () => setForeground(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return <>
    <div ref={root} className="build-ship-background" data-ready={ready} data-running={ready && visible && foreground && !paused && reduced === false} data-reduced={reduced !== false} aria-hidden="true">
      <svg className="build-ship-camera" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="build-ship-glass" x2="1" y2="1"><stop stopColor="#fff" stopOpacity=".32"/><stop offset=".45" stopColor="#14171c" stopOpacity=".78"/><stop offset="1" stopColor="#fff" stopOpacity=".08"/></linearGradient>
          <filter id="build-ship-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3"/></filter>
          <filter id="build-ship-cloud-texture" x="-20%" y="-30%" width="140%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency=".008 .016" numOctaves="3" seed="12"/>
            <feColorMatrix type="matrix" values="0 0 0 0 .8 0 0 0 0 .77 0 0 0 0 .7 0 0 0 1.8 -.8"/>
            <feGaussianBlur stdDeviation="3"/>
          </filter>
          <radialGradient id="build-ship-cloud-fade"><stop stopColor="white" stopOpacity=".65"/><stop offset=".65" stopColor="white" stopOpacity=".3"/><stop offset="1" stopColor="white" stopOpacity="0"/></radialGradient>
          <mask id="build-ship-cloud-mask"><ellipse cx="470" cy="480" rx="650" ry="240" fill="url(#build-ship-cloud-fade)"/></mask>
        </defs>
        <image href="/images/drydock-builder-clean.png" width="1600" height="900" onLoad={() => setReady(true)} />
        <g mask="url(#build-ship-cloud-mask)">
          <g className="build-ship-clouds"><rect x="-250" y="230" width="1400" height="520" filter="url(#build-ship-cloud-texture)" opacity=".5"/></g>
          <g className="build-ship-clouds build-ship-clouds-near"><rect x="-250" y="300" width="1400" height="520" filter="url(#build-ship-cloud-texture)" opacity=".28"/></g>
        </g>
        {paths.map((d, i) => <g key={d} className="build-ship-connection" style={{ "--step": i } as CSSProperties}>
          <path d={d} fill="none" stroke={nodes[Math.min(i,4)].color} strokeWidth="2.6" opacity=".95" />
          <path className="build-ship-signal" d={d} pathLength="100" fill="none" stroke={nodes[Math.min(i,4)].color} strokeWidth="4.5" strokeLinecap="round" strokeDasharray="2 98" />
        </g>)}
        {nodes.map(({ x, y, color, label, Icon }, i) => <g key={label} transform={`translate(${x - 30} ${y})`}>
          <g className="build-ship-node" style={{ "--step": i } as CSSProperties}>
            <rect width="66" height="76" rx="9" fill="url(#build-ship-glass)" stroke={color} strokeOpacity=".95" strokeWidth="2"/>
            <path d="M10 2 H54" stroke="white" strokeOpacity=".7"/>
            <Icon x="17" y="13" width="32" height="32" color={color} strokeWidth="2.2"/>
            <text x="33" y="62" textAnchor="middle" fill={color} fontSize="9" fontWeight="600" letterSpacing="1.5" fontFamily="IBM Plex Mono, monospace">{label}</text>
          </g>
        </g>)}

      </svg>
    </div>
    {reduced === false && <button type="button" className="build-ship-pause" onClick={() => setPaused(value => !value)} aria-label={paused ? "Resume hero animation" : "Pause hero animation"}>{paused ? <Play size={14}/> : <Pause size={14}/>}</button>}
  </>;
}
