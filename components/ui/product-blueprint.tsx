import { useId } from 'react';
import { motion } from 'framer-motion';
import './product-blueprint.css';

const colors = ['#EDC785', '#61E8EF', '#B8A0FF', '#63E6B0'];
const titles = ['An idea takes shape', 'The application connects', 'Intelligence joins the build', 'One product. Ready to ship.'];
export default function ProductBlueprint({ stage, moving }: { stage: number; moving: boolean }) {
  const id = useId().replace(/:/g, '');
  const transition = { duration: moving ? .85 : 0, ease: 'easeInOut' as const };
  const joined = stage === 3;
  return <div className={`product-assembly ${moving ? 'assembly-moving' : ''}`}>
    <svg viewBox="0 0 600 510" role="img" aria-label={`${titles[stage]}. Interface exchanges requests and responses with the backend. The backend queries retrieval and calls the LLM. Documents are indexed separately. Infrastructure and security are omitted from this simplified view.`}>
      <defs>
        <radialGradient id={`${id}-halo`}><stop stopColor={colors[stage]} stopOpacity=".18"/><stop offset="1" stopColor={colors[stage]} stopOpacity="0"/></radialGradient>
        <linearGradient id={`${id}-glass`} x2="1" y2="1"><stop stopColor="#25313d"/><stop offset="1" stopColor="#0d111b"/></linearGradient>
        {[['cyan','#61e8ef'],['green','#63e6b0'],['purple','#b8a0ff'],['gold','#edc785']].map(([name,color]) => <marker key={name} id={`${id}-${name}-arrow`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L8 4L0 8Z" fill={color}/></marker>)}
        <filter id={`${id}-glow`}><feGaussianBlur stdDeviation="3"/></filter>
      </defs>
      <ellipse cx="310" cy="270" rx="280" ry="230" fill={`url(#${id}-halo)`}/>
      <g stroke="#ffffff08" fill="none">{[0,1,2,3,4,5,6].map(i=><path key={i} d={`M${60+i*65} 90V445 M45 ${90+i*55}H560`}/>)}</g>
      <motion.g animate={{ opacity: joined ? 1 : .25 }} transition={transition}>
        <ellipse cx="300" cy="430" rx="190" ry="43" fill="#080e12" stroke={colors[stage]} strokeOpacity=".35"/>
        <ellipse cx="300" cy="430" rx="163" ry="30" fill="none" stroke={colors[stage]} strokeOpacity=".15"/>
      </motion.g>
      {/* Representative application-controlled RAG: backend coordinates both services. */}
      <motion.g animate={{ opacity: stage >= 1 ? 1 : 0 }} transition={transition} fill="none" strokeWidth="1.8">
        <path className="assembly-route" d="M290 216 L290 257" stroke="#61e8ef" markerEnd={`url(#${id}-cyan-arrow)`}/>
        <path className="assembly-route" d="M310 256 L310 218" stroke="#63e6b0" markerEnd={`url(#${id}-green-arrow)`}/>
        <path className="assembly-route" d="M250 300 C200 310 160 332 146 369" stroke="#61e8ef" markerEnd={`url(#${id}-cyan-arrow)`}/>
        <path className="assembly-route" d="M168 373 C191 345 215 332 251 323" stroke="#61e8ef" markerEnd={`url(#${id}-cyan-arrow)`}/>
        <motion.g animate={{ opacity: stage >= 2 ? 1 : 0 }} transition={transition}>
          <path className="assembly-route" d="M355 279 C390 268 416 280 441 290" stroke="#b8a0ff" markerEnd={`url(#${id}-purple-arrow)`}/>
          <path className="assembly-route" d="M430 330 C398 348 374 330 354 321" stroke="#b8a0ff" markerEnd={`url(#${id}-purple-arrow)`}/>
          <path d="M79 298 C72 342 97 349 121 373" stroke="#edc785" strokeDasharray="2 5" markerEnd={`url(#${id}-gold-arrow)`}/>
        </motion.g>
      </motion.g>
      <motion.g animate={{opacity:stage >= 2 ? 1 : 0}} transition={transition}>
        <path d="M58 259h33l12 12v28H58Z" fill="#2b251b" stroke="#edc78588"/><path d="M91 259v12h12M66 279h27M66 287h20" fill="none" stroke="#edc78588"/>
        <text x="80" y="244" fill="#edc785" textAnchor="middle">DOCUMENTS</text>
        <text x="70" y="343" fill="#a69a81" textAnchor="middle" style={{fontSize:7}}>INDEXING</text>
      </motion.g>
      {/* Interface is retained from the first frame to the final assembled product. */}
      <motion.g animate={{ x: 0, y: stage === 0 ? 62 : -55, scale: stage === 0 ? 1.13 : 1 }} style={{ transformOrigin:'300px 200px' }} transition={transition}>
        <path d="M175 115 L407 135 L425 289 L192 272Z" fill="#06090f" stroke="#ffffff22" strokeWidth="2"/>
        <path d="M165 104 L397 124 L415 278 L182 261Z" fill={`url(#${id}-glass)`} stroke={stage === 0 ? colors[0] : colors[stage]} strokeOpacity=".7" strokeWidth="1.5"/>
        <path d="M168 127L400 147" stroke="#ffffff15"/>
        <g fill="#ffffff50"><circle cx="178" cy="117" r="2"/><circle cx="186" cy="118" r="2"/><circle cx="194" cy="119" r="2"/></g>
        <path d="M190 153L377 169L381 189L194 173Z" fill="#8ca7ff12" stroke="#8ca7ff55"/>
        <circle cx="205" cy="164" r="4" fill="none" stroke="#8ca7ff"/><path d="M208 168l4 4M221 166l91 8" stroke="#8ca7ff"/>
        <g stroke={stage === 0 ? '#ffffff25' : '#cbd9ed'} strokeWidth="3" strokeLinecap="round"><path d="M198 195l150 13M200 207l130 11M202 220l142 12"/></g>
        <motion.g animate={{opacity:stage >= 2 ? 1 : 0}} transition={transition}><path d="M205 237l45 4M260 242l44 4" stroke="#b8a0ff" strokeWidth="7" strokeLinecap="round"/></motion.g>
        <motion.g animate={{opacity:joined ? 1 : 0}} transition={transition}><circle cx="386" cy="245" r="11" fill="#63e6b025" stroke="#63e6b0"/><path d="M381 244l4 4 6-7" stroke="#63e6b0" strokeWidth="2" fill="none"/></motion.g>
        <text x="270" y="95" fill={colors[stage]} textAnchor="middle">INTERFACE</text>
      </motion.g>
      {/* Backend module */}
      <motion.g animate={{opacity:stage >= 1 ? 1 : 0,x:170,y:-45}} transition={transition}>
        <path d="M80 312l65-14 40 23-66 16Z" fill="#193f49" stroke="#61e8ef66"/><path d="M80 312v48l39 24v-47Z" fill="#10242d" stroke="#61e8ef55"/><path d="M119 337l66-16v48l-66 15Z" fill="#163742" stroke="#61e8ef66"/>
        <path d="M132 348l38-9M132 359l38-9" stroke="#61e8ef" strokeWidth="3"/><text x="130" y="411" textAnchor="middle" fill="#61e8ef">APP SERVER / ORCHESTRATOR</text>
      </motion.g>
      {/* Document data, then retrieval */}
      <motion.g animate={{opacity:stage >= 1 ? 1 : 0,x:-160,y:60}} transition={transition}>
        <path d="M258 322v49c0 21 82 21 82 0v-49" fill="#112b33" stroke="#61e8ef77"/><ellipse cx="299" cy="322" rx="41" ry="13" fill="#214652" stroke="#61e8ef"/>
        <path d="M258 338c0 20 82 20 82 0M258 354c0 20 82 20 82 0" fill="none" stroke="#61e8ef55"/>
        <text x="300" y="411" textAnchor="middle" fill="#61e8ef">{stage >= 2 ? 'SEARCH INDEX' : 'APP DATA'}</text>
      </motion.g>
      {/* AI network */}
      <motion.g animate={{opacity:stage >= 2 ? 1 : 0,x:0,y:0}} transition={transition}>
        <path d="M429 297l47-22 45 25v49l-45 23-47-26Z" fill="#261d3d" stroke="#b8a0ff99"/>
        <g stroke="#b8a0ff" fill="#b8a0ff"><path d="M446 317l27-18 28 20-22 28-33-30 33 30-6-48 28 20-55-2" fill="none" strokeOpacity=".6"/>{[[446,317],[473,299],[501,319],[479,347]].map(([x,y])=><circle key={x} cx={x} cy={y} r="4"/>)}</g>
        <text x="475" y="397" textAnchor="middle" fill="#b8a0ff">LLM API</text>
      </motion.g>
      <motion.g animate={{opacity:joined ? 1 : 0,y:joined ? 0 : 15}} transition={transition}>
        <rect x="225" y="469" width="150" height="28" rx="14" fill="#63e6b016" stroke="#63e6b060"/>
        <circle cx="241" cy="483" r="3" fill="#63e6b0"/><text x="308" y="487" textAnchor="middle" fill="#63e6b0">CONNECTED PRODUCT</text>
      </motion.g>
    </svg>
    <div className="assembly-caption"><span style={{color:colors[stage]}}>{titles[stage]}</span><small>RAG EXAMPLE · CORE REQUEST PATH</small></div>
  </div>;
}
