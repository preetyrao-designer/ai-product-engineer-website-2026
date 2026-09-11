"use client";

import { Component, useEffect, useMemo, useRef, type ReactNode, type RefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export type FoundryTopic = 'RAG' | 'MCP' | 'Multi-agents' | 'Evals';
type Vec3 = [number, number, number];
export type FoundrySceneProps = {
  stage: number;
  moving: boolean;
  reduced: boolean;
  pointer: { current: { x: number; y: number } };
  onTopic: (topic: FoundryTopic | null) => void;
};
const CYAN = '#61E8EF';
const GOLD = '#EDC785';
const GREEN = '#63E6B0';
const VIOLET = '#B8A0FF';
const LAYERS = [
  { name: 'FOUNDATION', detail: 'Sri Lanka', color: GOLD, surface: '#493C24' },
  { name: 'ARCHITECTURE', detail: 'Web · Data · RAG', color: CYAN, surface: '#153B49' },
  { name: 'AGENT SYSTEMS', detail: 'Workflows · MCP', color: VIOLET, surface: '#362748' },
  { name: 'PRODUCTION', detail: 'Deployed product', color: GREEN, surface: '#183E32' },
];
type CalloutRefs = RefObject<(SVGGElement | null)[]>;

function Block({ position = [0, 0, 0], size, color = '#162D39', glow = '#000000', opacity = 1, emission = 0.35 }: { position?: Vec3; size: Vec3; color?: string; glow?: string; opacity?: number; emission?: number }) {
  const geometry = useMemo(() => new THREE.BoxGeometry(...size), [size[0], size[1], size[2]]);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);
  useEffect(() => () => { geometry.dispose(); edges.dispose(); }, [geometry, edges]);
  return <group position={position}>
    <mesh geometry={geometry}><meshStandardMaterial color={color} emissive={glow} emissiveIntensity={emission} roughness={0.38} metalness={0.5} transparent={opacity < 1} opacity={opacity} /></mesh>
    <lineSegments geometry={edges}><lineBasicMaterial color={glow === '#000000' ? '#46717F' : glow} transparent opacity={0.5} /></lineSegments>
  </group>;
}

function Wire({ points, color = CYAN, flowing = false, moving }: { points: Vec3[]; color?: string; flowing?: boolean; moving: boolean }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p))), [points]);
  const particle = useRef<THREE.Mesh>(null);
  const elapsed = useRef(0);
  useFrame((_, dt) => {
    if (!moving || !particle.current) return;
    elapsed.current += dt;
    curve.getPointAt((elapsed.current * 0.19) % 1, particle.current.position);
  });
  return <group>
    <mesh><tubeGeometry args={[curve, 48, 0.012, 5, false]} /><meshBasicMaterial color={color} transparent opacity={0.46} /></mesh>
    {flowing && <mesh ref={particle} position={points[0]}><sphereGeometry args={[0.045, 8, 8]} /><meshBasicMaterial color={color} /></mesh>}
  </group>;
}

function Deck({ y, index, stage, reduced, callouts, children }: { y: number; index: number; stage: number; reduced: boolean; callouts: CalloutRefs; children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const anchor = useMemo(() => new THREE.Vector3(), []);
  const { camera, size } = useThree();
  useFrame((_, dt) => {
    if (!group.current) return;
    const reveal = index <= stage ? 1 : 0.06;
    const alpha = reduced ? 1 : 1 - Math.exp(-dt * 5);
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, reveal, alpha));
    group.current.visible = group.current.scale.x > 0.065;
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, y + (index > stage ? -0.28 : 0), alpha);
    // Project the actual moving deck edge into the HTML annotation rail.
    const callout = callouts.current[index];
    if (callout) {
      group.current.updateWorldMatrix(true, false);
      anchor.set(-2.2, 0.06, 1.575).applyMatrix4(group.current.matrixWorld).project(camera);
      const rail = 108;
      const x = (anchor.x * 0.5 + 0.5) * size.width + rail;
      const y = (-anchor.y * 0.5 + 0.5) * size.height;
      callout.style.opacity = index <= stage ? '1' : '0';
      callout.setAttribute('transform', `translate(0 ${y})`);
      callout.querySelector('path')?.setAttribute('d', `M16 11 H${rail - 12} L${x - 12} 0 H${x}`);
      callout.querySelector('circle')?.setAttribute('cx', String(x));
    }
  });
  return <group ref={group} position={[0, y, 0]}>
    <Block size={[4.4, 0.12, 3.15]} color={LAYERS[index].surface} glow={LAYERS[index].color} emission={0.04} />
    {children}
  </group>;
}

function TopicNode({ topic, position, onTopic, children }: { topic: FoundryTopic; position: Vec3; onTopic: FoundrySceneProps['onTopic']; children: ReactNode }) {
  return <group position={position}
    onPointerOver={event => { event.stopPropagation(); onTopic(topic); }}
    onPointerOut={() => onTopic(null)}
    onClick={event => { event.stopPropagation(); onTopic(topic); }}>
    {children}
  </group>;
}

function Shipyard({ stage, moving, reduced, pointer, onTopic, callouts }: FoundrySceneProps & { callouts: CalloutRefs }) {
  const world = useRef<THREE.Group>(null);
  const { camera, size } = useThree();
  useEffect(() => {
    const orthographic = camera as THREE.OrthographicCamera;
    orthographic.zoom = Math.min(size.width / 8.4, size.height / 8.8);
    orthographic.updateProjectionMatrix();
    camera.lookAt(0, 0.85, 0);
  }, [camera, size]);
  const time = useRef(0);
  const focusY = useRef(0.75);
  useFrame((_, dt) => {
    if (!world.current) return;
    if (moving) time.current += dt;
    const blend = reduced ? 1 : 1 - Math.exp(-dt * 3);
    const targetX = reduced ? 7.5 : 7.5 + pointer.current.x * 0.5 + stage * 0.17;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, blend);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 5.6 + (reduced ? 0 : pointer.current.y * 0.35) + stage * 0.12, blend);
    focusY.current = THREE.MathUtils.lerp(focusY.current, -1.2 + stage * 0.65, blend);
    camera.lookAt(0, focusY.current, 0);
    camera.updateMatrixWorld();
    world.current.position.y = reduced ? 0 : Math.sin(time.current * 0.45) * 0.035;
  });
  const wavePoints = useMemo(() => Array.from({ length: 8 }, (_, row) => Array.from({ length: 40 }, (_, column): Vec3 => {
    const x = column / 39 * 6.8 - 3.4;
    return [x, -2.06, -2.2 + row * 0.58 + Math.sin(x * 2.3 + row) * 0.12];
  })), []);
  return <group ref={world}>
    <ambientLight intensity={1.2} color="#B4D9E3" />
    <directionalLight position={[4, 8, 6]} intensity={2.5} color="#F1F5FF" />
    <pointLight position={[-4, 1, 2]} intensity={12} color={GOLD} />
    <pointLight position={[1, 4, -3]} intensity={15} color={CYAN} />
    {wavePoints.map((points, i) => <Wire key={i} points={points} color="#346473" moving={moving} />)}
    <Deck y={-1.8} index={0} stage={stage} reduced={reduced || !moving} callouts={callouts}>
      <Block size={[4.8, 0.16, 3.5]} position={[0, -0.14, 0]} color="#15212C" glow="#4C6972" />
      {[-1.9, 1.9].map(x => <Block key={x} size={[0.16, 0.18, 2.7]} position={[x, 0.1, 0]} color="#5E5543" glow={GOLD} />)}
      <mesh position={[-1.1, 0.2, 0.3]}><cylinderGeometry args={[0.52, 0.64, 0.25, 6]} /><meshStandardMaterial color="#7D6945" metalness={0.65} roughness={0.35} /></mesh>
      <mesh position={[-1.1, 0.35, 0.3]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.35, 0.39, 48]} /><meshBasicMaterial color={GOLD} side={THREE.DoubleSide} /></mesh>
      {[0, 1, 2].map(i => <Block key={i} size={[0.65, 0.18 + i * 0.08, 0.75]} position={[0.1 + i * 0.65, 0.2, -0.1]} color="#25363E" glow="#637568" />)}
    </Deck>
    <Deck y={-0.25} index={1} stage={stage} reduced={reduced || !moving} callouts={callouts}>
      {[-1.3, -0.5].map((x) => <group key={x} position={[x, 0.37, -0.35]}>
        <Block size={[0.64, 0.52, 0.16]} color="#1E3C4D" glow={CYAN} />
        {[0, 1, 2].map(row => <Block key={row} size={[0.4, 0.025, 0.025]} position={[0, 0.13 - row * 0.12, 0.1]} color={CYAN} />)}
      </group>)}
      <TopicNode topic="RAG" position={[0.9, 0.3, -0.05]} onTopic={onTopic}>
        <Block size={[1.1, 0.36, 0.8]} color="#1B3D4B" glow={CYAN} />
      </TopicNode>
      <Block size={[0.8, 0.18, 0.5]} position={[-0.7, 0.2, 0.9]} color="#244455" glow={CYAN} />
      <Wire points={[[-1.3, 0.2, 0], [-1.3, 0.2, 0.65], [0.8, 0.2, 0.65], [0.9, 0.2, 0]]} flowing moving={moving} />
    </Deck>
    <Deck y={1.3} index={2} stage={stage} reduced={reduced || !moving} callouts={callouts}>
      <TopicNode topic="Multi-agents" position={[-0.25, 0.28, 0]} onTopic={onTopic}>
        <mesh><cylinderGeometry args={[0.4, 0.48, 0.32, 6]} /><meshStandardMaterial color="#594278" emissive={VIOLET} emissiveIntensity={0.13} metalness={0.7} roughness={0.3} /></mesh>
      </TopicNode>
      {[[-1.45, 0.8], [-1.25, -0.9], [1.4, -0.65]].map(([x, z], i) => <group key={i}>
        <Block size={[0.45, 0.24, 0.45]} position={[x, 0.23, z]} color="#574270" glow={VIOLET} />
        <Wire points={[[x, 0.3, z], [x * 0.5, 0.5, z * 0.7], [-0.25, 0.3, 0]]} color={VIOLET} flowing moving={moving} />
      </group>)}
      <TopicNode topic="MCP" position={[1.25, 0.25, 0.85]} onTopic={onTopic}>
        <Block size={[0.72, 0.22, 0.42]} color="#68518A" glow={VIOLET} />
      </TopicNode>
      <Wire points={[[-1.5, 0.17, 0.9], [-1.7, 0.17, -0.9], [0.4, 0.17, -1.1], [1.5, 0.17, -0.6], [1.5, 0.17, 0.9], [-1.5, 0.17, 0.9]]} color={VIOLET} flowing moving={moving} />
    </Deck>
    <Deck y={2.85} index={3} stage={stage} reduced={reduced || !moving} callouts={callouts}>
      <group position={[-0.3, 0.62, -0.4]}>
        <Block size={[2.15, 1.03, 0.1]} color="#112A31" glow={GREEN} />
        <Block size={[2, 0.1, 0.02]} position={[0, 0.42, 0.065]} color="#285348" />
        {[-0.87, -0.76, -0.65].map(x => <mesh key={x} position={[x, 0.42, 0.09]}><circleGeometry args={[0.025, 12]} /><meshBasicMaterial color={GREEN} /></mesh>)}
        <Block size={[0.48, 0.54, 0.02]} position={[-0.68, -0.04, 0.08]} color="#234A46" />
        {[0, 1, 2].map(i => <Block key={i} size={[0.85 - i * 0.15, 0.055, 0.02]} position={[0.12, 0.13 - i * 0.18, 0.08]} color={i === 0 ? '#74DBC2' : '#386762'} />)}
      </group>
      <TopicNode topic="Evals" position={[1.4, 0.45, 0.55]} onTopic={onTopic}>
        <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.35, 0.25, 0.12, 5]} /><meshStandardMaterial color="#286C56" emissive={GREEN} emissiveIntensity={0.3} metalness={0.5} roughness={0.3} /></mesh>
      </TopicNode>
    </Deck>
    {[-2, 2].map(x => <Wire key={x} points={[[x, -1.7, -1.3], [x, 0.5, -1.3], [x, 2.85, -1.3]]} moving={moving} color="#386776" />)}
  </group>;
}

function StaticFoundry() {
  return <div className="flex h-full flex-col items-center justify-center gap-4 px-10" role="img" aria-label="Product layers: Sri Lanka foundation, architecture, agent systems, and deployed product">
    {['04 / DEPLOYED PRODUCT', '03 / AGENT SYSTEMS', '02 / ARCHITECTURE', '01 / SRI LANKA'].map((label, i) => <div key={label} className="w-full max-w-[300px] rounded-xl border border-[#61E8EF]/30 bg-[#12232D] px-6 py-5 text-center font-mono text-xs text-[#BEEFF2]" style={{ transform: `perspective(700px) rotateX(25deg) rotateZ(-10deg) translateX(${i % 2 ? -8 : 8}px)` }}>{label}</div>)}
  </div>;
}
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <StaticFoundry /> : this.props.children; }
}

export default function FoundryScene(props: FoundrySceneProps) {
  const callouts = useRef<(SVGGElement | null)[]>([]);
  return <SceneBoundary><div className="relative h-full w-full">
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 108, right: 0 }}>
      <Canvas orthographic camera={{ position: [7.5, 7, 9], zoom: 65, near: 0.1, far: 80 }} dpr={[1, 1.5]} frameloop={props.moving && !props.reduced ? 'always' : 'demand'} gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }} fallback={<StaticFoundry />}>
        <Shipyard {...props} callouts={callouts} />
      </Canvas>
    </div>
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" style={{ fontFamily: 'var(--font-mono)' }}>
      {LAYERS.map((layer, index) => <g key={layer.name} ref={element => { callouts.current[index] = element; }} style={{ opacity: 0 }}>
        <text x="16" y="-14" fill={layer.color} fontSize="8" letterSpacing="1.4">0{index + 1}</text>
        <text x="16" y="0" fill={layer.color} fontSize="10.5" fontWeight="600">{layer.name}</text>
        <path fill="none" stroke={layer.color} strokeWidth="0.8" strokeOpacity="0.65" />
        <circle cy="0" r="2.5" fill={layer.color} />
      </g>)}
    </svg>
  </div></SceneBoundary>;
}
