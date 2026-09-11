# Drydock — The AI Foundry

## Creative direction: One product, made visible

A floating digital shipyard becomes a readable model of the program. The visitor first sees the assembled product, then scrolls through the foundations that make it work. All four layers belong to the same build. The architecture never resets to a different project.

The hero combines an editorial left column with an isometric scene on the right. Navigation and conversion copy remain real HTML. The 3D canvas is a separate, progressively loaded surface, with layer and topic controls outside it. No rotating globe, decorative robot, or unrelated sci-fi machinery competes with the product story.

### Scene and asset map

| Layer | Visual assets | Meaning and interaction |
| --- | --- | --- |
| 01 · Foundation | Dark floating dock, fine wave contours, warm gold hexagonal Sri Lanka beacon, construction rails | Week 1 establishes the builder, cohort, problem, and commitment. Selecting Foundation isolates the launch platform. |
| 02 · Architecture | Relational `users`/`products` tables, API block, raised context/RAG module, cyan signal paths | Interfaces, data, and model context form one system. Hover or select RAG for a plain-language explanation of retrieval. |
| 03 · Agent systems | Central orchestrator, specialist nodes, a closed n8n-style workflow, amber MCP port, traveling signal particles | Agents coordinate around a shared product. MCP and Multi-agents expose explanatory text. The n8n label represents a visual workflow, not a promised integration or partnership. |
| 04 · Production | Browser-shaped product frame, green deployment target, faceted firewall/security shield, Evals hotspot | The build reaches a demonstrable product. Green represents the intended production state; it is not actual uptime telemetry or a security certification. |

Materials: restrained brushed metal, smoked blue panels, thin luminous edges, and warm foundation rails. Transparent glass is an optional finishing pass; the prototype uses lightweight reflective standard materials instead of expensive refractive transmission. Wave contours and signal curves are procedural geometry. All labels are locally generated textures; no external image or model assets are required.

Palette: `#0D1117` canvas, `#121D26` surfaces, `#31414C` hairlines, `#61E8EF` electric cyan, `#63E6B0` live green, `#EDC785` tropical gold, `#F2F6F7` headings, and `#A6B3BE` body copy. A pale mint `#C8F4EE` primary button carries strong contrast without adding another saturated accent.

Light comes from a broad cool key above the scene, cyan side fill, and warm point light near the residency base. Specular highlights move naturally with the camera. There is no fullscreen bloom or flashing exposure.

## Above-the-fold copy

**Navigation:** Drydock / by Masai · Curriculum · Sri Lanka · Bengaluru Hackathon · Fee Structure · Apply — ₹999.

**Eyebrow:** DEC 2026 COHORT / 8 WEEKS · HYBRID · TWO CITIES

**Category:** THE AI FOUNDRY

**Headline:**

> Don’t just prompt it.
> Build it. Ship it.

**Subheadline:**

> Learn enough technology to build intelligently with AI. Take one product from a Sri Lanka residency, through six weeks online, to a working demo in Bengaluru.

**Primary CTA:** Apply — ₹999

**Secondary CTA:** Explore 3D Build Arc

**Supporting date:** Launch residency: 13–17 Dec 2026 · Sri Lanka

**Program metrics:** 8 Weeks · 1 Deployed Product · 36h Live Hackathon

**Lower-page conversion:** Come with a problem. Leave with a product.

The application is the primary entry point. Seat reservation — ₹5,000 — is an optional separate link in the fee section, controlled by `seatHref`. Avoid making two different payments compete in the hero. Tuition, refund terms, and how the application/reservation payments are treated must come from the actual program terms; none are invented here. These program metrics describe the offered journey, not independently measured success rates.

## Interaction choreography

1. **Arrival:** The complete, exploded product stack shows the destination immediately. The headline enters over 700 ms with cubic-bezier `[0.22, 1, 0.36, 1]`. Copy and the CTA remain readable in server-rendered HTML before the scene loads.
2. **Pointer:** Normalized pointer coordinates feed a ref. The camera moves within a small bounded range, exponentially damped with `1 - exp(-3 × delta)`. Scene geometry receives stable highlights as the viewpoint changes. There is no free orbit or cursor hijacking.
3. **Explore:** The secondary CTA scrolls to the curriculum and starts at the foundation. Natural page scrolling remains intact.
4. **Assembly:** A sticky desktop scene accompanies four curriculum chapters. Scroll progress selects a layer; deck scale and position approach their targets using `1 - exp(-5 × delta)`. The camera shifts gently upward as the build advances. Each new layer joins the existing foundation.
5. **Signals:** Small cyan particles traverse curved connections at roughly one trip per 5.3 seconds. Their positions mutate inside the render loop, without React state updates each frame.
6. **Inspect:** 3D RAG, MCP, Multi-agents, and Evals nodes reveal explanations in a stable panel. Equivalent HTML buttons expose the same information by keyboard or touch. Layer buttons let the visitor override the current stage; the next scroll movement resumes curriculum progression.
7. **Pause:** Pause motion stops particle and floating animations. Layer changes remain available and render immediately. Reduced-motion preferences disable entrance transforms, pointer movement, idle motion, and smooth scrolling; the scene becomes demand-rendered.
8. **Mobile:** Copy and CTA come first; a fixed-height 3D viewport follows. Layer buttons support deliberate exploration. The scene is not sticky on small screens, preventing it from taking over the reading area. When offscreen, its render loop stops. There is no horizontal scroll or touch drag capture.

The Weeks 02–04 / 05–07 topic division is a proposed narrative grouping for the website. The supplied program brief specifies the collective Weeks 2–7 syllabus, not these exact week-by-week assignments; confirm the grouping before publication.

## Implementation architecture

- `Hero.tsx`: client component with semantic HTML, navigation, conversion links, curriculum sections, Framer Motion scroll state, pause/reduced-motion handling, accessible topic buttons, and Suspense boundary.
- `FoundryScene.tsx`: lazily loaded R3F canvas, camera rig, four deck groups, procedural geometry and labels, curved signal paths, pointer hit targets, and error/WebGL fallback.
- `ProductAnatomyHero.tsx`: the previous six-node interactive hero, retained for comparison.
- `preview/main.tsx`: local demo only. Its application and reservation links lead to an explicitly labelled preview destination and do not collect payment.

```tsx
// app/page.tsx — pass your real application destination.
import Hero from '@/components/Hero';

export default function Page() {
  return <Hero applyHref="/apply" seatHref="/reserve" />;
}
```

Copy both `Hero.tsx` and `FoundryScene.tsx` into the same component directory. The supplied Hero includes page navigation, a main landmark, the scroll story, fee summary, and footer. If embedding it in an existing page shell, remove duplicate landmarks and reuse that shell’s navigation/footer. Load Plus Jakarta Sans and Manrope in the layout; IBM Plex Mono is used for small technical labels. Ensure Tailwind scans both files.

For React 19, use R3F 9 with a React version that meets its peer dependency range. The local preview uses React 19.2 because the installed R3F 9.7 release excludes React 19.3. React 18 projects should use the matching R3F 8 major. The lockfile records the tested local dependency set.

The key separation is:

```tsx
<div className="relative">
  <div className="h-[510px]">
    <Suspense fallback={<SceneLoading />}>
      <FoundryScene
        stage={stage}
        moving={inView && !paused && !reduced}
        reduced={reduced}
        pointer={pointer}
        onTopic={setTopic}
      />
    </Suspense>
  </div>
  {/* Real HTML remains independently accessible above/below the canvas. */}
  <LayerControls />
  <TopicExplanation />
</div>
```

This excerpt illustrates the boundary; the delivered source files contain the working controls and fallbacks.

Performance choices: orthographic projection; device pixel ratio capped at 1.5; no postprocessing, shadow maps, downloaded models, or refraction passes; cached edge geometry and generated label textures with disposal; lazy scene loading; demand rendering while paused/reduced/offscreen. Scene failure leaves a four-layer HTML illustration while the application path remains intact. Measure real mobile GPU performance and loading metrics before describing the page as production-benchmarked.

Implementation references: [R3F Canvas and fallback configuration](https://r3f.docs.pmnd.rs/api/canvas), [R3F animation hooks](https://r3f.docs.pmnd.rs/api/hooks), [R3F performance guidance](https://r3f.docs.pmnd.rs/advanced/pitfalls), and [Three.js color management](https://threejs.org/manual/en/color-management.html).

Program dates, fees, and positioning come from the supplied brief. Its `[cite: 1]` markers did not include a source document, so they are not presented as independently verified citations.

## Layer annotation refinement

Layer names now occupy a separate 108 px annotation rail. Thin SVG leader lines end at the projected front-left edge of each deck and follow camera and assembly motion. Internal floating text has been removed; module explanations remain available through hover and accessible topic controls. The four layers use gold (#EDC785), cyan (#61E8EF), violet (#B8A0FF), and green (#63E6B0), with matching deck materials and selector states. Low deck emission keeps modules distinguishable from the colored platforms.

## Hero and curriculum separation

The first section now uses `ProductLaunch.tsx` and `ProductLaunch.css`: an illustrative application moves from idea/wireframe to working product to launch. A floating idea card, curved orbital strokes, perspective browser frame, and completion card tell the outcome story. The 12.6-second cycle has pause and direct state selection, respects reduced motion, and stops while offscreen or the tab is hidden.

The existing colored Three.js layer assembly is now exclusively in the second section, “One product. Built layer by layer.” Its initial state is the foundation, and its sticky desktop scene follows the curriculum chapters. The hero’s secondary CTA is “Explore the 8-week journey.”

## Typography tokens

`Typography.css` defines `--font-display` as Plus Jakarta Sans, `--font-sans` as Manrope, and `--font-mono` as IBM Plex Mono. Both hero options, the curriculum, and the 3D callouts use these tokens. The preview loads the fonts through the Google Fonts stylesheet in `index.html`. Include equivalent font loading in the Next.js application layout when integrating.
