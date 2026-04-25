# Portfolio Roadmap

Backlog of enhancements for ktncodes.com beyond the Mytra interview push. Inspired by what production AI-portfolio sites (e.g. santifer.io) demonstrate, scoped to what makes sense for this site's narrative.

## Tier 1 — Small Wins (next 1-2 weeks)

- **Sitemap.xml generator** — script in `scripts/` that walks `src/app` route tree + posts and emits `/public/sitemap.xml` at build. Wire into `next build`.
- **robots.txt** — explicit allowlist for AI crawlers (GPTBot, Claude-Web, Google-Extended, PerplexityBot) pointing at sitemap + llms.txt.
- **OG images per post** — `/api/og` route using `next/og` to render a branded card from post frontmatter (title, date, tag chips). Add `openGraph.images` to post layout metadata.
- **Per-post metadata** — `generateMetadata` for each post slug pulling title/description/tags. Currently default falls through to the layout template.
- **404 + loading states** — branded `not-found.tsx` and `loading.tsx` matching the dark hairline aesthetic.
- **Keyboard shortcuts** — `cmd+k` to open chat, `g h` for home, `g p` for posts (vim-style hjkl). Use a tiny `react-hotkeys-hook` or a 30-line custom hook.

## Tier 2 — Content Layer (1 month)

- **Case-study format for top 3 projects** — split AutoPath, Team LLM KB, and ICM Template out of the home grid into long-form `/work/[slug]` pages: problem → constraints → approach → outcome → what I'd change. Currently the cards are summaries; a recruiter clicking through wants the story.
- **Blog migration from v1** — pull the best 3-5 posts from `ktncodes.github.io` (Hugo) into MDX and publish here. Today's `/posts` is thin.
- **Now page** — `/now` micro-page (what I'm focused on this week / what I'm reading / what's shipping). Updated monthly. Cheap signal that the site is alive.
- **Reading list / influences** — `/reading` page surfacing the books and papers behind how I work (Working Effectively with Legacy Code, Karpathy's LLM-OS post, etc.). Anchors the agentic posture.

## Tier 3 — Chat Enhancements (1-2 months)

- **RAG over posts** — embed MDX chunks into Supabase pgvector (or a flat JSON for cost), let the chatbot quote from posts with citations. Today's bot can't reach into post bodies.
- **Source citations in answers** — when chat tool retrieves projects/posts, render the link inline ("From the AutoPath case study: ..."). Trust signal.
- **Voice mode** — OpenAI Realtime API for spoken Q&A. Santiago has this; it's an obvious GEO play. Requires careful cost ceiling.
- **Eval suite for chat** — `evals/` folder with golden Q&A pairs, run on PR. Catches regressions when prompt changes.
- **Tool-use observability** — Langfuse or homegrown SQLite log of every tool call + token spend. Lets me see what people actually ask.

## Tier 4 — SEO + GEO (1 month)

- **JSON-LD per page type** — `BlogPosting` schema on posts, `WebSite` on home, `BreadcrumbList` on nested pages. Already have Person JSON-LD on layout.
- **IndexNow ping on publish** — POST new URLs to Bing's IndexNow on `next build`. Free and ~instant indexing.
- **Per-post llms.txt entries** — extend `/llms.txt` to include all published posts grouped by tag.
- **Open Graph + Twitter cards** — verify on every page type, not just root.

## Tier 5 — Design + Performance (ongoing)

- **Light-theme polish** — current toggle works but light mode loses some of the editorial weight. Audit hairlines, accent contrast, code-block colors.
- **A11y pass** — full keyboard nav audit, focus states on every interactive element, axe-core run, color contrast verification (especially `text-muted` on `bg-background`).
- **Reduced-motion respect** — gate framer-motion entrances behind `prefers-reduced-motion`.
- **Image optimization audit** — ensure all `next/image` calls have proper `sizes` and avoid layout shift. Audit total page weight.
- **Lighthouse target: 95+ across the board** — baseline first, then close gaps.
- **View transitions API** — slick page-to-page transitions on supporting browsers, no-op fallback elsewhere.

## Tier 6 — Operational (one-shot, then forget)

- **Analytics dashboard** — internal `/admin` page (cookie-gated) reading Vercel Analytics + chat logs. Learn what works.
- **Uptime monitor** — UptimeRobot or BetterStack ping on root + `/api/chat`. Page on failure.
- **Backup of MDX posts to a private git mirror** — already in main repo but worth a separate concern.

## Cut From Scope

Documented so I don't re-propose them:

- **Comments / discussion** — adds moderation surface, low signal for a portfolio
- **Newsletter signup** — distribution problem I don't have yet
- **Multi-language** — single-audience site
- **Heavy 3D / WebGL hero** — clashes with the editorial aesthetic; the typography is the design

## Inspiration / Reference

- [santifer.io](https://santifer.io) — same stack pivot point (React 19 + Vite 7 + Tailwind v4), demonstrates RAG-over-portfolio and voice mode. Source: `coding-projects/_open-source/cv-santiago-main/`.
- [llmstxt.org](https://llmstxt.org) — spec for AI crawler discoverability.
- [karpathy/llm-os](https://twitter.com/karpathy/status/1723140519554105733) — the 3-layer mental model that drives the wiki template.
