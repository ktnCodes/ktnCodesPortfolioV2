# ktncodes-v2 Mytra Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Revamp ktncodes.com homepage to mirror Mytra's luxury-industrial dark aesthetic (dark canvas, Swiss grotesque type, small-caps labels, 4-column stats pattern, cyan-wireframe schematics) while keeping the existing AI chat, blog, and routing intact.

**Architecture:** Single-page homepage composition. Existing Next.js 16 + React 19 + Tailwind 4 stack, unchanged. Five new home-specific components + three inline-SVG schematics + retheme passes on navbar, footer, and chat primitives. `portfolio-config.json` is the single source of truth for project data; swap featured flags and add two internal-project entries.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion (already in deps), Geist Sans/Mono + Space Grotesk fonts (already loaded).

**Spec:** `docs/superpowers/specs/2026-04-23-ktncodes-v2-mytra-revamp-design.md`

---

## File Structure

### Files to CREATE

| Path | Responsibility |
| --- | --- |
| `src/components/home/hero.tsx` | Hero section: name, tagline, 4-col stats row, grain overlay. |
| `src/components/home/how-i-think.tsx` | Composes the 3 schematic rows with eyebrow labels + captions. |
| `src/components/home/what-i-can-do.tsx` | 4-card project grid reading from portfolio-config featured subset. |
| `src/components/home/ask-me-anything.tsx` | Section-framed wrapper around existing `<Chat/>`. |
| `src/components/home/stat-cell.tsx` | Reusable 4-col stat atom: label, value, caption. |
| `src/components/home/section-eyebrow.tsx` | Small-caps eyebrow marker used at each section head. |
| `src/components/home/schematics/evidence-trail.tsx` | Inline SVG of log lines resolving into a `file:line` citation. |
| `src/components/home/schematics/icm-pipeline.tsx` | Inline SVG axonometric 5-stage pipeline with hover states. |
| `src/components/home/schematics/workshop-clock.tsx` | Inline SVG 24-hour radial with two highlighted arcs. |

### Files to MODIFY

| Path | What changes |
| --- | --- |
| `src/app/globals.css` | Add new dark palette tokens; keep existing light-mode theme. |
| `src/app/layout.tsx` | Nothing if route-group layout handles dark lock; else attach a client effect on homepage. |
| `src/app/page.tsx` | Compose new sections; remove the single `<Chat/>` render. |
| `src/components/layout/navbar.tsx` | Small-caps retheme, hide theme toggle on homepage. |
| `src/components/layout/footer.tsx` | 3-col small-caps layout, hairline top divider. |
| `src/components/chat/chat-landing.tsx` | Preset button restyle to hairline pills. |
| `src/components/chat/chat-input.tsx` | Small-caps placeholder, dark surface. |
| `src/components/chat/chat-message.tsx` | Bubble colors per spec. |
| `portfolio-config.json` | Add 2 internal projects; flip featured flags. |

### Files to LEAVE ALONE

`src/app/about/**`, `src/app/posts/**`, `src/app/tags/**`, `src/app/archives/**`, `src/app/search/**`, `src/app/api/**`, `content/posts/**`, `src/components/chat/chat.tsx`, `src/components/tools/**`, `src/components/posts/**`, `src/components/layout/theme-provider.tsx`, `src/components/layout/theme-toggle.tsx`.

---

### Task 1: Add Mytra dark palette tokens to globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace the `:root` block at lines 23-31 with the new Mytra dark palette and a `[data-theme="mytra"]` override.**

```css
:root {
  --background: #0A0A0A;
  --foreground: #F5F5F5;
  --surface: #141414;
  --accent: #22D3EE;
  --accent-hover: #67E8F9;
  --muted: #6B6B6B;
  --border-color: #1F1F1F;
  --hairline: #2A2A2A;
}

[data-theme="light"] {
  --background: #f8fafc;
  --foreground: #0f172a;
  --surface: #ffffff;
  --accent: #0891b2;
  --accent-hover: #0e7490;
  --muted: #64748b;
  --border-color: #e2e8f0;
  --hairline: #cbd5e1;
}
```

- [ ] **Step 2: Append a small-caps utility and a grain overlay utility after the existing `code` block.**

```css
.small-caps {
  font-variant-caps: all-small-caps;
  letter-spacing: 0.14em;
  font-weight: 500;
}

.grain::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  mix-blend-mode: screen;
}
```

- [ ] **Step 3: Add the `--color-hairline` mapping inside the `@theme inline` block near the top so Tailwind's `border-hairline` class works.**

```css
@theme inline {
  /* ...existing mappings... */
  --color-hairline: var(--hairline);
}
```

- [ ] **Step 4: Verify build.**

Run: `npm run build`
Expected: builds without CSS or type errors.

- [ ] **Step 5: Commit.**

```bash
git add src/app/globals.css
git commit -m "style(homepage): add mytra dark palette tokens and small-caps utility"
```

---

### Task 2: Dark-lock the homepage

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Read Next 16's route-group / forcedTheme docs.**

Run: `ls node_modules/next/dist/docs/ 2>/dev/null | head -20`
Then skim the `next-themes` README already in node_modules: `cat node_modules/next-themes/README.md | head -120`.

Decision rule: if `ThemeProvider` accepts `forcedTheme`, use it in a client wrapper on the homepage. If not, set `data-theme` via a one-time `useEffect` on mount + cleanup on unmount.

- [ ] **Step 2: Implement a ClientOnly dark lock in `src/app/page.tsx` using a small inline effect so blog pages keep their toggle untouched.**

```tsx
"use client";

import { useEffect } from "react";
import { Hero } from "@/components/home/hero";
import { HowIThink } from "@/components/home/how-i-think";
import { WhatICanDo } from "@/components/home/what-i-can-do";
import { AskMeAnything } from "@/components/home/ask-me-anything";

export default function Home() {
  useEffect(() => {
    const prev = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "mytra");
    return () => {
      if (prev) document.documentElement.setAttribute("data-theme", prev);
      else document.documentElement.removeAttribute("data-theme");
    };
  }, []);

  return (
    <div className="flex-1 overflow-y-auto">
      <Hero />
      <HowIThink />
      <WhatICanDo />
      <AskMeAnything />
    </div>
  );
}
```

Note: the `[data-theme="mytra"]` selector does not exist yet because the `:root` block IS the mytra palette (Task 1). That's intentional - removing the attribute on unmount still falls back to the same palette until blog pages set their own `data-theme="light"` if the user toggles there. No extra CSS selector needed for the homepage itself.

- [ ] **Step 3: Verify in dev.**

Run: `npm run dev` and open http://localhost:3000. Expected: page is dark (even if components don't exist yet - they'll error, which is fine). `document.documentElement.getAttribute('data-theme')` in DevTools returns `"mytra"`.

- [ ] **Step 4: Commit.**

```bash
git add src/app/page.tsx
git commit -m "feat(homepage): dark-lock homepage via data-theme effect"
```

---

### Task 3: Shared primitives - SectionEyebrow and StatCell

**Files:**
- Create: `src/components/home/section-eyebrow.tsx`
- Create: `src/components/home/stat-cell.tsx`

- [ ] **Step 1: Write SectionEyebrow.**

```tsx
// src/components/home/section-eyebrow.tsx
export function SectionEyebrow({
  children,
  number,
}: {
  children: React.ReactNode;
  number?: string;
}) {
  return (
    <div className="flex items-center gap-3 text-muted">
      {number ? (
        <span className="font-mono text-xs tracking-widest">{number}</span>
      ) : null}
      <span className="h-px flex-1 bg-[var(--hairline)] max-w-16" />
      <span className="small-caps text-xs">{children}</span>
    </div>
  );
}
```

- [ ] **Step 2: Write StatCell.**

```tsx
// src/components/home/stat-cell.tsx
export function StatCell({
  value,
  label,
  caption,
}: {
  value: string;
  label: string;
  caption: string;
}) {
  return (
    <div className="flex flex-col gap-2 border-t border-[var(--hairline)] pt-4">
      <span className="font-mono text-2xl md:text-3xl text-foreground leading-none">
        {value}
      </span>
      <span className="small-caps text-[10px] text-muted">{label}</span>
      <span className="text-xs text-muted leading-snug max-w-[16ch]">
        {caption}
      </span>
    </div>
  );
}
```

- [ ] **Step 3: Run lint.**

Run: `npm run lint -- src/components/home/`
Expected: clean.

- [ ] **Step 4: Commit.**

```bash
git add src/components/home/section-eyebrow.tsx src/components/home/stat-cell.tsx
git commit -m "feat(home): add SectionEyebrow and StatCell primitives"
```

---

### Task 4: Navbar retheme

**Files:**
- Modify: `src/components/layout/navbar.tsx`

- [ ] **Step 1: Replace the brand and link styles with small-caps; hide theme toggle when `pathname === "/"`.**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/posts", label: "Posts" },
  { href: "/search", label: "Search" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";

  function handleLogoClick(e: React.MouseEvent) {
    if (pathname === "/") {
      e.preventDefault();
      window.location.reload();
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--hairline)] bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            onClick={handleLogoClick}
            className="small-caps text-sm text-foreground hover:text-accent transition-colors"
          >
            KTNCODES
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "small-caps text-xs transition-colors",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            {!isHome && <ThemeToggle />}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {!isHome && <ThemeToggle />}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-muted hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="pb-3 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block py-2 small-caps text-xs",
                  pathname === link.href ? "text-foreground" : "text-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Verify navbar in dev.**

Run: `npm run dev` and load `/` and `/posts`. Expected: brand and links are all-caps with tight tracking; theme toggle shows on `/posts` and hides on `/`.

- [ ] **Step 3: Commit.**

```bash
git add src/components/layout/navbar.tsx
git commit -m "style(navbar): small-caps retheme and hide theme toggle on homepage"
```

---

### Task 5: Footer restructure

**Files:**
- Modify: `src/components/layout/footer.tsx`

- [ ] **Step 1: Replace with 3-col small-caps grid.**

```tsx
import { Mail } from "lucide-react";

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--hairline)] py-10">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-1">
          <div className="small-caps text-xs text-muted">KTNCODES</div>
          <div className="small-caps text-xs text-foreground">
            KEVIN TRINH NGUYEN
          </div>
          <div className="small-caps text-xs text-muted">AUSTIN, TX</div>
        </div>
        <div className="space-y-1">
          <div className="small-caps text-xs text-muted">CONTACT</div>
          <a
            href="mailto:kevtrinhnguyen@gmail.com"
            className="text-xs text-foreground hover:text-accent flex items-center gap-2"
          >
            <Mail size={14} />
            kevtrinhnguyen@gmail.com
          </a>
          <div className="small-caps text-xs text-muted">
            {`(c) ${new Date().getFullYear()}`}
          </div>
        </div>
        <div className="space-y-1 md:text-right">
          <div className="small-caps text-xs text-muted">SOCIAL</div>
          <div className="flex gap-4 md:justify-end">
            <a
              href="https://github.com/ktnCodes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="small-caps text-xs text-muted hover:text-accent flex items-center gap-2"
            >
              <GitHubIcon /> GITHUB
            </a>
            <a
              href="https://www.linkedin.com/in/itskevtrinh/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="small-caps text-xs text-muted hover:text-accent flex items-center gap-2"
            >
              <LinkedInIcon /> LINKEDIN
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify footer renders on desktop and mobile.**

Run: `npm run dev`. Resize viewport between 1440px and 375px. Expected: 3 columns on desktop, stacked on mobile.

- [ ] **Step 3: Commit.**

```bash
git add src/components/layout/footer.tsx
git commit -m "style(footer): restructure to 3-col small-caps grid"
```

---

### Task 6: Update portfolio-config.json

**Files:**
- Modify: `portfolio-config.json`

- [ ] **Step 1: Add `AutoPath Guidance` as the first entry in the `projects` array (before `AI Portfolio Site`).**

```json
{
  "title": "AutoPath Guidance",
  "category": "Embedded / C++",
  "description": "Day-job product. AutoPath is John Deere's GPS guidance system for tractors running on ruggedized embedded Linux hardware over CAN. I own feature development across Boundaries, Rows, Zones, and Pro product lines and validation through Jenkins CI plus Code Collaborator review, with HIL-style testing against target hardware.",
  "techStack": ["C++14", "Qt5", "Embedded Linux", "CAN Protocol", "Jenkins", "Google Test", "HIL Testing"],
  "date": "2024",
  "status": "Ongoing (John Deere internal)",
  "featured": true,
  "links": {}
}
```

- [ ] **Step 2: Add `Team LLM Knowledge Base` as the second entry.**

```json
{
  "title": "Team LLM Knowledge Base",
  "category": "AI / Developer Tools",
  "description": "Team-shared MkDocs knowledge base plus 6 custom Claude Code / GitHub Copilot skills and agentic workflows, adopted across the AutoPath team. Covers test generation, requirement extraction, test coverage analysis, test-to-requirement mapping, refactoring safety nets, and LLM architecture diagramming. Drove team Copilot usage from 0 to daily.",
  "techStack": ["MkDocs", "Python", "Claude Code", "GitHub Copilot", "MCP", "Skill Authoring"],
  "date": "2026",
  "status": "Ongoing (John Deere internal)",
  "featured": true,
  "links": {}
}
```

- [ ] **Step 3: In the existing projects, flip featured flags.**

Find the entries by title and set `featured`:

- `"AI Portfolio Site (ktncodes.com)"`: `featured: false`
- `"JobReforgerAI"`: `featured: false`
- `"ICM Template"`: leave `featured: true`
- `"Arkive"`: `featured: false`
- `"YouTube Research Report Tool"`: add `featured: true`

- [ ] **Step 4: Validate JSON.**

Run: `node -e "JSON.parse(require('fs').readFileSync('portfolio-config.json','utf8')); console.log('ok')"`
Expected: prints `ok`.

- [ ] **Step 5: Commit.**

```bash
git add portfolio-config.json
git commit -m "feat(config): add AutoPath and Team LLM KB, flip featured flags"
```

---

### Task 7: Hero section

**Files:**
- Create: `src/components/home/hero.tsx`

- [ ] **Step 1: Implement Hero.**

```tsx
"use client";

import { motion } from "framer-motion";
import { StatCell } from "./stat-cell";

const stats = [
  {
    value: "100+",
    label: "DEFECTS RESOLVED",
    caption: "C++ / Qt across Gen4OS 4060 + 4600",
  },
  {
    value: "0 -> DAILY",
    label: "COPILOT ADOPTION",
    caption: "Drove team-wide agentic uptake",
  },
  {
    value: "6",
    label: "AI SKILLS SHIPPED",
    caption: "Test gen, refactor safety, LLM diags",
  },
  {
    value: "4",
    label: "PRODUCT LINES",
    caption: "Boundaries, Rows, Zones, Pro",
  },
];

export function Hero() {
  return (
    <section className="relative min-h-[100vh] flex flex-col justify-between overflow-hidden grain">
      <div className="flex-1 flex items-center">
        <div className="mx-auto max-w-6xl w-full px-6 space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-[var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95]"
          >
            KEVIN TRINH NGUYEN
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-base md:text-lg text-muted max-w-2xl"
          >
            I build agentic workflows, and debug the systems they break.
          </motion.p>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="mx-auto max-w-6xl w-full px-6 pb-12 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {stats.map((s) => (
          <StatCell key={s.label} {...s} />
        ))}
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Temporarily stub the other homepage sections so page.tsx renders without errors.**

```bash
cat > src/components/home/how-i-think.tsx <<'EOF'
export function HowIThink() { return null; }
EOF
cat > src/components/home/what-i-can-do.tsx <<'EOF'
export function WhatICanDo() { return null; }
EOF
cat > src/components/home/ask-me-anything.tsx <<'EOF'
export function AskMeAnything() { return null; }
EOF
```

- [ ] **Step 3: Verify in dev.**

Run: `npm run dev`. Expected at `/`: dark canvas, giant name, tagline, 4-col stats row pinned near bottom of viewport.

- [ ] **Step 4: Commit.**

```bash
git add src/components/home/hero.tsx src/components/home/how-i-think.tsx src/components/home/what-i-can-do.tsx src/components/home/ask-me-anything.tsx
git commit -m "feat(home): hero section with stats row and stubs for other sections"
```

---

### Task 8: What I Can Do section

**Files:**
- Modify: `src/components/home/what-i-can-do.tsx`

- [ ] **Step 1: Implement card grid from config.**

```tsx
"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/config";
import { SectionEyebrow } from "./section-eyebrow";

function Card({
  title,
  description,
  techStack,
  statLabel,
  statValue,
  href,
}: {
  title: string;
  description: string;
  techStack: string[];
  statLabel: string;
  statValue: string;
  href?: string;
}) {
  const inner = (
    <div className="group relative h-full border border-[var(--hairline)] bg-[var(--surface)] p-6 flex flex-col gap-6 transition-colors hover:border-accent">
      <div className="flex-1">
        <h3 className="font-[var(--font-display)] text-2xl font-light tracking-tight mb-3">
          {title}
        </h3>
        <p className="text-sm text-muted leading-relaxed">{description}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {techStack.slice(0, 6).map((t) => (
          <span
            key={t}
            className="small-caps text-[10px] text-muted border border-[var(--hairline)] px-2 py-1"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-end justify-between border-t border-[var(--hairline)] pt-4">
        <div>
          <div className="font-mono text-lg text-foreground leading-none">
            {statValue}
          </div>
          <div className="small-caps text-[10px] text-muted mt-1">
            {statLabel}
          </div>
        </div>
        {href ? (
          <span className="small-caps text-[10px] text-accent">VIEW →</span>
        ) : (
          <span className="small-caps text-[10px] text-muted">INTERNAL</span>
        )}
      </div>
    </div>
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {inner}
      </a>
    );
  }
  return <div className="h-full">{inner}</div>;
}

function deriveStat(title: string, techStack: string[]) {
  if (title === "AutoPath Guidance")
    return { statValue: "4", statLabel: "PRODUCT LINES" };
  if (title === "Team LLM Knowledge Base")
    return { statValue: "0 -> DAILY", statLabel: "COPILOT ADOPTION" };
  if (title === "YouTube Research Report Tool")
    return { statValue: "FastMCP", statLabel: "MCP TOOL SERVER" };
  if (title === "ICM Template")
    return { statValue: "OSS", statLabel: "METHODOLOGY" };
  return {
    statValue: techStack[0] ?? "-",
    statLabel: "STACK",
  };
}

export function WhatICanDo() {
  const featured = projects.filter((p) => p.featured);
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-6xl px-6 space-y-12">
        <div className="max-w-xl space-y-4">
          <SectionEyebrow number="02">WHAT I CAN DO</SectionEyebrow>
          <h2 className="font-[var(--font-display)] text-3xl md:text-5xl font-light tracking-tight">
            Shipped. Adopted. Maintained.
          </h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {featured.map((p) => {
            const href = p.links?.live ?? p.links?.github ?? undefined;
            const stat = deriveStat(p.title, p.techStack);
            return (
              <Card
                key={p.title}
                title={p.title}
                description={p.description}
                techStack={p.techStack}
                href={href}
                {...stat}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify 4 cards render with correct stats.**

Run: `npm run dev`. Expected: 4 cards in 2x2 grid, AutoPath + Team LLM KB show "INTERNAL", YT-Deep and ICM may show VIEW or INTERNAL depending on links - fine either way.

- [ ] **Step 3: Commit.**

```bash
git add src/components/home/what-i-can-do.tsx
git commit -m "feat(home): what i can do section reading featured projects"
```

---

### Task 9: Evidence Trail schematic

**Files:**
- Create: `src/components/home/schematics/evidence-trail.tsx`

- [ ] **Step 1: Implement SVG schematic.**

```tsx
"use client";

export function EvidenceTrail() {
  return (
    <svg
      viewBox="0 0 600 300"
      className="w-full h-auto"
      role="img"
      aria-label="Messy log lines resolving into a file line citation"
    >
      <defs>
        <linearGradient id="fade-left" x1="0" x2="1">
          <stop offset="0" stopColor="#22D3EE" stopOpacity="0.2" />
          <stop offset="1" stopColor="#22D3EE" stopOpacity="1" />
        </linearGradient>
      </defs>
      {Array.from({ length: 10 }).map((_, i) => (
        <g key={i} opacity={0.25 + i * 0.05}>
          <rect
            x={20}
            y={20 + i * 22}
            width={120 + (i % 3) * 40}
            height={8}
            fill="#1F1F1F"
            stroke="#2A2A2A"
          />
          <rect
            x={20}
            y={20 + i * 22}
            width={8 + (i % 5) * 4}
            height={8}
            fill="#22D3EE"
            opacity={0.6}
          />
        </g>
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <path
          key={`c${i}`}
          d={`M ${200 + (i % 3) * 10} ${24 + i * 22} C 320 ${24 + i * 22} 360 150 420 150`}
          stroke="url(#fade-left)"
          strokeWidth="1"
          fill="none"
          opacity={0.7}
        >
          <animate
            attributeName="stroke-dasharray"
            from="0 400"
            to="400 0"
            dur="3s"
            begin={`${i * 0.1}s`}
            repeatCount="indefinite"
          />
        </path>
      ))}
      <g transform="translate(420, 130)">
        <rect
          x={0}
          y={0}
          width={160}
          height={44}
          fill="#0A0A0A"
          stroke="#22D3EE"
          strokeWidth="1"
        />
        <text
          x={10}
          y={20}
          fontFamily="var(--font-mono), monospace"
          fontSize="10"
          fill="#22D3EE"
        >
          guidance.cpp:1423
        </text>
        <text
          x={10}
          y={34}
          fontFamily="var(--font-mono), monospace"
          fontSize="9"
          fill="#6B6B6B"
        >
          resolved
        </text>
      </g>
    </svg>
  );
}
```

- [ ] **Step 2: Verify renders in isolation.**

Create a quick preview by temporarily rendering in `src/components/home/how-i-think.tsx` (will be replaced in Task 12):

```tsx
import { EvidenceTrail } from "./schematics/evidence-trail";
export function HowIThink() {
  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
      <EvidenceTrail />
    </section>
  );
}
```

Run: `npm run dev`, scroll past hero. Expected: log rows on left, cyan curves to a citation chip on right, animated stroke dasharray.

- [ ] **Step 3: Commit.**

```bash
git add src/components/home/schematics/evidence-trail.tsx src/components/home/how-i-think.tsx
git commit -m "feat(home): evidence trail schematic"
```

---

### Task 10: ICM Pipeline schematic

**Files:**
- Create: `src/components/home/schematics/icm-pipeline.tsx`

- [ ] **Step 1: Implement axonometric 5-stage pipeline.**

```tsx
"use client";

import { useState } from "react";

const STAGES = [
  { id: "intake", label: "INTAKE", artifact: "spec.md" },
  { id: "investigate", label: "INVESTIGATE", artifact: "evidence.md" },
  { id: "implement", label: "IMPLEMENT", artifact: "code + tests" },
  { id: "verify", label: "VERIFY", artifact: "ci + lint" },
  { id: "review", label: "REVIEW", artifact: "PR + sign-off" },
];

export function IcmPipeline() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <svg
      viewBox="0 0 600 280"
      className="w-full h-auto"
      role="img"
      aria-label="ICM 5-stage pipeline diagram"
    >
      {STAGES.map((s, i) => {
        const x = 30 + i * 110;
        const y = 110;
        const isActive = active === s.id;
        const stroke = isActive ? "#22D3EE" : "#2A2A2A";
        return (
          <g
            key={s.id}
            onMouseEnter={() => setActive(s.id)}
            onMouseLeave={() => setActive(null)}
            style={{ cursor: "pointer" }}
          >
            <polygon
              points={`${x},${y} ${x + 60},${y - 25} ${x + 100},${y - 25} ${x + 100},${y + 55} ${x + 40},${y + 55}`}
              fill="#0A0A0A"
              stroke={stroke}
              strokeWidth="1"
            />
            <polygon
              points={`${x + 60},${y - 25} ${x + 100},${y - 25} ${x + 60},${y + 15} ${x},${y + 15}`}
              fill="#0A0A0A"
              stroke={stroke}
              strokeWidth="0.5"
              opacity="0.5"
            />
            <line
              x1={x}
              y1={y + 15}
              x2={x + 40}
              y2={y + 55}
              stroke={stroke}
              strokeWidth="0.5"
              opacity="0.5"
            />
            <text
              x={x + 45}
              y={y + 80}
              textAnchor="middle"
              fontFamily="var(--font-display), sans-serif"
              fontSize="9"
              letterSpacing="0.14em"
              fill={isActive ? "#F5F5F5" : "#6B6B6B"}
            >
              {s.label}
            </text>
            {i < STAGES.length - 1 ? (
              <path
                d={`M ${x + 100} ${y + 20} L ${x + 130} ${y + 20}`}
                stroke={isActive ? "#22D3EE" : "#2A2A2A"}
                strokeWidth="1"
              />
            ) : null}
            {isActive ? (
              <g>
                <rect
                  x={x - 10}
                  y={y - 60}
                  width={120}
                  height={24}
                  fill="#0A0A0A"
                  stroke="#22D3EE"
                  strokeWidth="1"
                />
                <text
                  x={x + 50}
                  y={y - 43}
                  textAnchor="middle"
                  fontFamily="var(--font-mono), monospace"
                  fontSize="10"
                  fill="#22D3EE"
                >
                  {s.artifact}
                </text>
              </g>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
```

- [ ] **Step 2: Verify hover states.**

Render temporarily inside `how-i-think.tsx`:

```tsx
import { IcmPipeline } from "./schematics/icm-pipeline";
export function HowIThink() {
  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
      <IcmPipeline />
    </section>
  );
}
```

Run: `npm run dev`. Hover each stage. Expected: stage outlines cyan, artifact balloon appears above.

- [ ] **Step 3: Commit.**

```bash
git add src/components/home/schematics/icm-pipeline.tsx src/components/home/how-i-think.tsx
git commit -m "feat(home): icm pipeline schematic with hover artifacts"
```

---

### Task 11: Workshop Clock schematic

**Files:**
- Create: `src/components/home/schematics/workshop-clock.tsx`

- [ ] **Step 1: Implement 24-hour radial dial.**

```tsx
"use client";

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number
) {
  const start = polarToCartesian(cx, cy, r, endDeg);
  const end = polarToCartesian(cx, cy, r, startDeg);
  const large = endDeg - startDeg <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y}`;
}

export function WorkshopClock() {
  const cx = 150;
  const cy = 150;
  const r = 110;
  const hourToDeg = (h: number) => (h / 24) * 360;
  const workshopStart = hourToDeg(23);
  const workshopEnd = hourToDeg(28); // 4am next day
  const officeStart = hourToDeg(9);
  const officeEnd = hourToDeg(17);
  return (
    <svg
      viewBox="0 0 300 300"
      className="w-full max-w-[360px] h-auto"
      role="img"
      aria-label="24-hour workshop and office clock"
    >
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1F1F1F" strokeWidth="1" />
      {Array.from({ length: 24 }).map((_, i) => {
        const deg = hourToDeg(i);
        const outer = polarToCartesian(cx, cy, r, deg);
        const inner = polarToCartesian(cx, cy, r - (i % 6 === 0 ? 12 : 6), deg);
        return (
          <line
            key={i}
            x1={outer.x}
            y1={outer.y}
            x2={inner.x}
            y2={inner.y}
            stroke="#2A2A2A"
            strokeWidth="1"
          />
        );
      })}
      <path
        d={arcPath(cx, cy, r, officeStart, officeEnd)}
        stroke="#6B6B6B"
        strokeWidth="6"
        fill="none"
      />
      <path
        d={arcPath(cx, cy, r, workshopStart, workshopEnd > 360 ? workshopEnd - 360 : workshopEnd)}
        stroke="#22D3EE"
        strokeWidth="6"
        fill="none"
      />
      {[0, 6, 12, 18].map((h) => {
        const deg = hourToDeg(h);
        const pos = polarToCartesian(cx, cy, r + 18, deg);
        return (
          <text
            key={h}
            x={pos.x}
            y={pos.y + 4}
            textAnchor="middle"
            fontFamily="var(--font-mono), monospace"
            fontSize="10"
            fill="#6B6B6B"
          >
            {String(h).padStart(2, "0")}
          </text>
        );
      })}
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        fontFamily="var(--font-display), sans-serif"
        fontSize="10"
        letterSpacing="0.14em"
        fill="#6B6B6B"
      >
        THE OFFICE
      </text>
      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        fontFamily="var(--font-display), sans-serif"
        fontSize="10"
        letterSpacing="0.14em"
        fill="#22D3EE"
      >
        THE WORKSHOP
      </text>
    </svg>
  );
}
```

- [ ] **Step 2: Verify.**

Render temporarily in `how-i-think.tsx`:

```tsx
import { WorkshopClock } from "./schematics/workshop-clock";
export function HowIThink() {
  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
      <WorkshopClock />
    </section>
  );
}
```

Run: `npm run dev`. Expected: circular dial with 24 hour ticks, muted grey arc on 09-17, cyan arc crossing midnight 23-04.

- [ ] **Step 3: Commit.**

```bash
git add src/components/home/schematics/workshop-clock.tsx src/components/home/how-i-think.tsx
git commit -m "feat(home): workshop clock 24-hour radial schematic"
```

---

### Task 12: Compose How I Think section

**Files:**
- Modify: `src/components/home/how-i-think.tsx`

- [ ] **Step 1: Replace the temporary preview with the full composed section.**

```tsx
"use client";

import { motion } from "framer-motion";
import { SectionEyebrow } from "./section-eyebrow";
import { EvidenceTrail } from "./schematics/evidence-trail";
import { IcmPipeline } from "./schematics/icm-pipeline";
import { WorkshopClock } from "./schematics/workshop-clock";

type Row = {
  number: string;
  eyebrow: string;
  caption: string;
  note: string;
  visual: React.ReactNode;
  reverse?: boolean;
};

const rows: Row[] = [
  {
    number: "01",
    eyebrow: "EVIDENCE TRAIL",
    caption: "Claims need citations. Every assertion needs file:line evidence.",
    note: "Bug investigations start with logs, not code. I build an event timeline, then chase each line to a file and a cause. No speculation shipped.",
    visual: <EvidenceTrail />,
  },
  {
    number: "02",
    eyebrow: "ICM PIPELINE",
    caption: "Vertical slices. Every stage leaves a trail.",
    note: "Interpretable Context Methodology: five stages, each with a named artifact. Intake -> Investigate -> Implement -> Verify -> Review. Every stage is inspectable by the next human or agent in the loop.",
    visual: <IcmPipeline />,
    reverse: true,
  },
  {
    number: "03",
    eyebrow: "WORKSHOP CLOCK",
    caption: "Two modes. Both ship.",
    note: "Office hours are execution: focused, meetings, pushes. Workshop hours 23:00-04:00 are tinkering: prototypes, experiments, the clicks that become tomorrow's features.",
    visual: <WorkshopClock />,
  },
];

export function HowIThink() {
  return (
    <section className="relative py-32 border-t border-[var(--hairline)]">
      <div className="mx-auto max-w-6xl px-6 space-y-24">
        <div className="max-w-xl space-y-4">
          <SectionEyebrow number="01">HOW I THINK</SectionEyebrow>
          <h2 className="font-[var(--font-display)] text-3xl md:text-5xl font-light tracking-tight">
            Pattern matcher first. Evidence-backed always.
          </h2>
        </div>
        {rows.map((r) => (
          <motion.div
            key={r.number}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className={`grid grid-cols-1 md:grid-cols-12 gap-10 items-center ${r.reverse ? "md:[&>*:first-child]:order-2" : ""}`}
          >
            <div className="md:col-span-7 border border-[var(--hairline)] bg-[var(--surface)] p-6">
              {r.visual}
            </div>
            <div className="md:col-span-5 space-y-4">
              <SectionEyebrow number={r.number}>{r.eyebrow}</SectionEyebrow>
              <p className="text-xl md:text-2xl text-foreground leading-snug">
                {r.caption}
              </p>
              <p className="text-sm text-muted leading-relaxed">{r.note}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in dev.**

Run: `npm run dev`. Scroll past hero. Expected: 3 rows with eyebrow + caption + note beside each schematic; middle row reversed so visual is on the right.

- [ ] **Step 3: Commit.**

```bash
git add src/components/home/how-i-think.tsx
git commit -m "feat(home): compose how i think section with 3 schematic rows"
```

---

### Task 13: Chat retheme

**Files:**
- Modify: `src/components/chat/chat-landing.tsx`
- Modify: `src/components/chat/chat-input.tsx`
- Modify: `src/components/chat/chat-message.tsx`
- Create: `src/components/home/ask-me-anything.tsx`

- [ ] **Step 1: Restyle chat-landing.tsx preset buttons to hairline pills.**

Replace the preset rendering block with this pattern (keep imports and prop signature unchanged; update the className on each preset button to):

```tsx
className="small-caps text-xs border border-[var(--hairline)] text-muted hover:text-foreground hover:border-accent px-4 py-2 transition-colors disabled:opacity-40"
```

And update the landing copy to use the Mytra small-caps tone. If the file imports `presetQuestions` from config and iterates, the button render stays the same shape - only the classes change.

- [ ] **Step 2: Restyle chat-input.tsx.**

Update the input component so:
- Wrapper gets: `className="border-t border-[var(--hairline)] bg-background"`
- Input gets: `placeholder="ASK KEVIN ANYTHING"`, add `className="small-caps tracking-widest text-xs"` plus the existing layout classes, and use `bg-transparent text-foreground placeholder:text-muted outline-none` as the base.
- Submit button: small-caps `SEND`, hairline border, cyan hover.

- [ ] **Step 3: Restyle chat-message.tsx bubbles.**

- User bubble: `className="rounded-none border border-accent bg-[var(--surface)] text-foreground px-4 py-3"`
- Assistant bubble: `className="rounded-none border border-[var(--hairline)] bg-[var(--surface)] text-foreground px-4 py-3"`
- Keep the `rounded-2xl rounded-bl-sm` pattern away - Mytra is sharp corners.

- [ ] **Step 4: Implement AskMeAnything wrapper.**

```tsx
// src/components/home/ask-me-anything.tsx
import { Chat } from "@/components/chat/chat";
import { SectionEyebrow } from "./section-eyebrow";

export function AskMeAnything() {
  return (
    <section className="relative py-32 border-t border-[var(--hairline)]">
      <div className="mx-auto max-w-4xl px-6 space-y-8">
        <div className="max-w-xl space-y-4">
          <SectionEyebrow number="03">ASK KEVIN ANYTHING</SectionEyebrow>
          <h2 className="font-[var(--font-display)] text-3xl md:text-5xl font-light tracking-tight">
            A chat, powered by my notes.
          </h2>
          <p className="text-sm text-muted leading-relaxed max-w-lg">
            Ask about projects, tools, embedded debugging war stories, or what I am reading this week.
          </p>
        </div>
        <div className="border border-[var(--hairline)] min-h-[420px] flex flex-col">
          <Chat />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Verify chat still streams.**

Run: `npm run dev`. Open `/`, scroll to chat, hit a preset button, confirm an assistant reply streams.

- [ ] **Step 6: Commit.**

```bash
git add src/components/chat/chat-landing.tsx src/components/chat/chat-input.tsx src/components/chat/chat-message.tsx src/components/home/ask-me-anything.tsx
git commit -m "style(chat): mytra retheme presets input bubbles and add section wrapper"
```

---

### Task 14: QA pass + type check + lint

**Files:** none to create

- [ ] **Step 1: Full dev-server walkthrough.**

Run: `npm run dev`. At viewport widths 1440, 1024, 768, 375, walk top-to-bottom:
- Nav is small-caps and sticky; theme toggle missing on `/`.
- Hero: name + tagline + 4 stats pinned.
- How I Think: 3 rows, schematics render, hover on ICM pipeline reveals artifact balloon.
- What I Can Do: 4 cards in 2x2 (or 1-col on mobile). Internal cards do not navigate.
- Ask Kevin Anything: preset buttons render as hairline pills, click one, response streams.
- Footer: 3 small-caps columns.

- [ ] **Step 2: Build.**

Run: `npm run build`
Expected: 0 errors, page/chunk sizes reasonable.

- [ ] **Step 3: Lint.**

Run: `npm run lint`
Expected: 0 errors.

- [ ] **Step 4: Commit any QA fixups.**

```bash
git add -A
git commit -m "chore(home): qa pass fixups post build and lint" || echo "no fixups"
```

---

### Task 15: Polish pass + ship

**Files:** whatever needs tweaking after visual review

- [ ] **Step 1: Spacing and type polish.**

Tune any visual misalignments noticed during Task 14. Common pass targets: hero vertical centering at 1024px, stats-row wrap on 375px, schematic scale inside card borders.

- [ ] **Step 2: Final build.**

Run: `npm run build`
Expected: clean.

- [ ] **Step 3: Push to main for Vercel deploy.**

```bash
git push origin main
```

Expected: Vercel picks up the push and deploys ktncodes.com within ~2 minutes.

- [ ] **Step 4: Smoke test the live site.**

Open https://ktncodes.com, repeat the walkthrough from Task 14 Step 1 in production.

- [ ] **Step 5: Update spec status.**

Add a "Status" line at the top of `docs/superpowers/specs/2026-04-23-ktncodes-v2-mytra-revamp-design.md`:

```
- Status: Shipped 2026-04-XX
```

Commit and push:

```bash
git add docs/superpowers/specs/2026-04-23-ktncodes-v2-mytra-revamp-design.md
git commit -m "docs(spec): mark mytra revamp shipped"
git push origin main
```
