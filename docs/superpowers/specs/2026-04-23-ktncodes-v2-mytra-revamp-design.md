# ktncodes-v2 Mytra Revamp - Design

- Date: 2026-04-23
- Owner: Kevin Trinh Nguyen
- Target live: 2026-04-24 (Fri) or 2026-04-25 (Sat)
- Interview context: Mytra recruiter screen 2026-04-27 for Senior Software Validation Engineer

## Intent

Revamp the public homepage of ktncodes.com to mirror Mytra's luxury-industrial dark aesthetic. Frame Kevin's work in terms Mytra will recognize: embedded validation, HIL/SIL pipelines, agentic tooling. The existing AI chat stays functional; only its skin changes. The revamp doubles as a demo of the pattern-matching superpower Kevin claims in `me.md`: study their design language, internalize it, play it back with his own content.

## Non-goals

- No stack change. Staying on Next.js 16 + React 19 + Tailwind 4.
- No chat logic changes. Only retheme.
- No blog / posts / about / tags / archives / search page rewrites. They inherit the dark palette for consistency and keep the light-mode toggle.
- No new backend, no new API route, no new data source.

## Aesthetic lock

Source of truth for visual direction: Mytra screenshots at
`MyIdeaverse/Vault/_personal/career/mytra/Screenshot 2026-04-23 *.png`.

Cues being mirrored:

- Pure dark canvas. No white or cream anywhere on homepage.
- Swiss grotesque type. Light-to-medium weights. Tight tracking.
- All-caps / small-caps labels with hairline letter-spacing for nav, section eyebrows, stat labels.
- 4-column stats-at-bottom pattern: LABEL (small-caps) / VALUE (large display) / one-line caption underneath.
- Technical schematic visuals (cyan wireframe / axonometric / CAD style) as the decorative and informational element. Not illustrations. Not gradients.
- Center-weighted hero with the subject (the product; for us, Kevin's name + tagline) as the focal element.
- Dramatic dark background, minimal noise overlay.

### Token lock

| Token | Value | Notes |
| --- | --- | --- |
| `--bg`       | `#0A0A0A` | Homepage canvas |
| `--ink`      | `#F5F5F5` | Primary text |
| `--muted`    | `#6B6B6B` | Secondary text |
| `--hairline` | `#1F1F1F` | Borders, dividers |
| `--surface`  | `#141414` | Card / bubble / input fill |
| `--accent`   | `#22D3EE` | Existing cyan var, reused |
| Display font | Space Grotesk | Already loaded via `next/font` |
| Body font    | Geist Sans    | Already loaded |
| Mono font    | Geist Mono    | Already loaded; used for stat values |

No new fonts. No new dependencies (Framer Motion already in deps for scroll reveals).

## Page structure (homepage only)

```
/ (src/app/page.tsx)
+-- Navbar            (existing, retheme to small-caps)
+-- Hero              (new, full viewport h-screen)
+-- How I Think       (new, 3 wireframe visuals, scroll-revealed)
+-- What I Can Do     (new, 4 project cards)
+-- Ask Me Anything   (existing chat, retheme only, section framing added)
+-- Footer            (existing, restructure to 3-col small-caps)
```

Non-homepage pages keep their current structure and inherit the dark palette. Theme toggle stays available on blog pages.

## Section specs

### Navbar

Small-caps text, hairline-bottom divider, sticky. Brand is `KTNCODES`. Nav links remain Home / About / Posts / Search. Theme toggle hides on the homepage (dark-locked) and shows on other routes.

### Hero (full viewport)

- Name (display): `KEVIN TRINH NGUYEN` in Space Grotesk, light weight, very large.
- Tagline (body): *I build agentic workflows, and debug the systems they break.*
- Stats row pinned near the bottom of the viewport, 4 columns on desktop, 2x2 on mobile:

  | Value       | Label              | Caption                                |
  | ---         | ---                | ---                                    |
  | `100+`      | DEFECTS RESOLVED   | C++ / Qt across Gen4OS 4060 + 4600     |
  | `0 -> DAILY`| COPILOT ADOPTION   | Drove team-wide agentic uptake         |
  | `6`         | AI SKILLS SHIPPED  | Test gen, refactor safety, LLM diags   |
  | `4`         | PRODUCT LINES      | Boundaries, Rows, Zones, Pro           |

- Background: flat `--bg` with a 2-4% opacity SVG noise overlay. No imagery.
- Motion: name fades+rises on mount; tagline follows with 100ms stagger; stats row fades in last.

### How I Think

Three cyan-wireframe schematic visuals on the dark canvas. Scroll-triggered reveal with stagger. Each is its own full-width row with a small-caps eyebrow label, the visual on one side, and a single-sentence caption + expanded note on the other.

1. **EVIDENCE TRAIL** (inline SVG)
   - Visual: animated timeline. Messy log-line fragments on the left; cyan lines connect them into a single `file:line` citation chip on the right.
   - Caption: *Claims need citations. Every assertion needs file:line evidence.*

2. **ICM PIPELINE** (inline SVG, axonometric)
   - Visual: 5-stage pipeline - Intake -> Investigate -> Implement -> Verify -> Review - drawn isometric with cyan hairlines.
   - Interaction: hover each stage, it lights cyan and reveals the artifact that stage produces (a tiny label balloon).
   - Caption: *Vertical slices. Every stage leaves a trail.*

3. **WORKSHOP CLOCK** (inline SVG, radial)
   - Visual: 24-hour radial dial. Two highlighted arcs: 9am-5pm labeled THE OFFICE, 11pm-4am labeled THE WORKSHOP. On scroll into view, a sweeping pointer traces the current hour.
   - Caption: *Two modes. Both ship.*

All three are hand-authored inline SVG. CSS animations where possible; Framer Motion only for scroll-triggered reveal/stagger.

### What I Can Do

Four project cards, 2x2 grid on desktop, 1-col on mobile. Each card uses the stats-at-bottom grammar (small-caps LABEL / large VALUE / one-line stack):

| # | Project                    | Stat value     | Tech stack headline                           | Link behavior        |
| --- | ---                       | ---            | ---                                           | ---                  |
| 1 | AutoPath Guidance          | 4 PRODUCT LINES | C++14 / Qt / Embedded Linux / CAN / HIL       | No public repo       |
| 2 | Team LLM Knowledge Base    | 0 -> DAILY      | MkDocs / 6 custom skills / Claude / Copilot   | No public repo       |
| 3 | YT-Deep Research           | FastMCP         | Python / FastMCP / Claude Code                | GitHub (when public) |
| 4 | ICM Template               | OSS             | Python / model-agnostic framework             | GitHub (live link)   |

- Hover: flips to reveal a short description + tech tag list.
- Click: routes to the public repo or project page, if available. Non-public projects show a hairline outline and no cursor change (indicates "role-highlight, internal").

### Ask Me Anything (chat retheme only)

Keep `chat.tsx`, `chat-landing.tsx`, `chat-input.tsx`, `chat-message.tsx` logic entirely as-is. Visual changes only:

- Section wrapped in a small-caps eyebrow `ASK KEVIN ANYTHING`.
- Input placeholder: `ASK KEVIN ANYTHING` small-caps.
- Preset buttons become hairline-bordered pills with small-caps labels and a cyan underline on hover.
- User bubble: cyan 1px border on `--surface`.
- Assistant bubble: `--ink` text on `--surface` with `--hairline` border.
- Loading dots stay cyan.

### Footer

Three-column small-caps grid on desktop, stack on mobile:

```
KTNCODES                CONTACT                      SOCIAL
KEVIN TRINH NGUYEN      kevtrinhnguyen@gmail.com     GITHUB . LINKEDIN
AUSTIN, TX              (c) 2026
```

Hairline-top divider above the grid. Small-caps everywhere.

## Component boundaries

Files to CREATE:

```
src/components/home/hero.tsx
src/components/home/how-i-think.tsx
src/components/home/what-i-can-do.tsx
src/components/home/ask-me-anything.tsx         (thin wrapper over existing <Chat/> with section framing)
src/components/home/stat-cell.tsx               (reusable 4-col stat pattern)
src/components/home/section-eyebrow.tsx         (small-caps label marker)
src/components/home/schematics/evidence-trail.tsx
src/components/home/schematics/icm-pipeline.tsx
src/components/home/schematics/workshop-clock.tsx
```

Files to MODIFY:

```
src/app/page.tsx                                (compose the new sections)
src/app/globals.css                             (new palette tokens; keep existing light-mode theme for blog pages)
src/app/layout.tsx                              (only if homepage needs a dark-locked attribute; see "Dark-locked homepage" below)
src/components/layout/navbar.tsx                (small-caps retheme, dark-only on homepage)
src/components/layout/footer.tsx                (3-col small-caps)
src/components/chat/chat-landing.tsx            (preset button restyle)
src/components/chat/chat-input.tsx              (input restyle)
src/components/chat/chat-message.tsx            (bubble restyle)
portfolio-config.json                           (add 2 internal projects; set featured flags)
```

Files to LEAVE ALONE:

```
src/app/about/**
src/app/posts/**
src/app/tags/**
src/app/archives/**
src/app/search/**
src/app/api/**
content/posts/**
```

## Data model changes

`portfolio-config.json` update:

1. ADD new project entry: `AutoPath Guidance`
   - category: `Embedded / C++`
   - status: `Ongoing (John Deere internal)`
   - featured: `true`
   - links: `{}`
2. ADD new project entry: `Team LLM Knowledge Base`
   - category: `AI / Developer Tools`
   - status: `Ongoing (John Deere internal)`
   - featured: `true`
   - description: one-liner covering MkDocs knowledge base, 6 custom skills, agent workflows, 0 -> daily Copilot adoption
   - techStack: `["MkDocs", "Python", "Claude Code", "GitHub Copilot", "MCP"]`
   - links: `{}`
3. SET `featured: true` on existing `YouTube Research Report Tool` entry.
4. SET `featured: true` on existing `ICM Template` entry.
5. SET `featured: false` on `JobReforgerAI` and `Arkive` entries (still in "all projects" listings; just not on homepage).

The "What I Can Do" component reads the featured subset from config.

## Dark-locked homepage

`next-themes` `ThemeProvider` already wraps the app. Two workable approaches:

- A) Add `forcedTheme="dark"` to the provider ONLY on the homepage layout via a route group.
- B) Let the existing system theme drive non-homepage pages, and on the homepage add a small client effect that applies `data-theme="dark"` on mount and cleans up on unmount.

Pick A if Next 16 routing supports it cleanly; pick B otherwise. Decision made during implementation after consulting `node_modules/next/dist/docs/` per the AGENTS.md warning.

## Testing

- Manual: `npm run dev`, inspect each section at 375 / 768 / 1024 / 1440 widths. Verify all links navigate. Confirm chat still streams responses end-to-end.
- Build: `npm run build` must pass with zero type errors.
- Lint: `npm run lint` must be clean.
- No new unit tests. This is presentational work on an existing runtime path.

## Risk register

1. **Next.js 16 breaking changes** (flagged in AGENTS.md). Mitigation: before using any `next/*` import not already present in the codebase, consult `node_modules/next/dist/docs/`.
2. **Dark-only homepage vs light-capable blog.** Mitigation: force dark via layout / data attribute on homepage route only. Theme toggle hides on homepage, stays on blog.
3. **Grain overlay pulling visual focus.** Mitigation: start at 2-4% opacity, adjust during polish pass.
4. **Accessibility of cyan-on-black small text.** Mitigation: keep body copy in `--ink` not cyan; cyan reserved for accents and interactive hover states. Confirm contrast on stat captions (may bump to `#9CA3AF` for secondary text if AA fails).
5. **Performance regression from SVG schematics.** Mitigation: all 3 are inline hand-authored, no external images or heavy libs. Framer Motion already bundled.

## Ship order

1. Palette + type tokens in `globals.css`.
2. Navbar + footer retheme.
3. Hero.
4. What I Can Do (easier before the schematic SVGs).
5. How I Think - evidence trail -> ICM pipeline -> workshop clock.
6. Chat retheme.
7. Polish pass (spacing, type scale, motion timings, mobile check).
8. `npm run build` + `npm run lint`.
9. Commit, push to `main`, let Vercel auto-deploy.

## Definition of done

- Homepage loads dark-only and matches the 6-section structure above.
- Hero tagline matches the locked tagline exactly.
- Hero stats row matches the 4 values in the token lock.
- How I Think has 3 working schematic visuals with captions.
- What I Can Do lists exactly these 4 projects: AutoPath Guidance, Team LLM Knowledge Base, YT-Deep Research, ICM Template.
- JobReforgerAI and Arkive are not on the homepage.
- AI chat still streams, presets still fire, tools still render.
- Footer is the 3-col small-caps layout.
- Live on ktncodes.com no later than 2026-04-25.
