# ktnCodes

My personal portfolio and engineering blog — **[ktncodes.vercel.app](https://ktncodes.vercel.app)**

The homepage is an AI chatbot powered by Google Gemini. Ask it anything about my work: projects, experience, skills, or blog posts. The rest of the site is a full blog with posts, tags, archives, and search.

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 + React 19 + TypeScript |
| Styling | Tailwind CSS 4 (dark slate + cyan) |
| AI | Google Gemini 1.5 Flash via Vercel AI SDK v6 |
| Blog | MDX + next-mdx-remote + gray-matter |
| Deployment | Vercel |

---

## Features

- **AI Chatbot homepage** — Gemini-powered chat that answers questions about my work and surfaces blog posts as rich UI cards
- **6 chat tools** — Presentation, Projects, Skills, Resume, Contact, Blog Posts
- **Full blog** — 9 MDX posts with syntax highlighting, reading time, tags, and table of contents
- **Posts / Tags / Archives / Search** — complete blog navigation
- **Dark/light mode** — persisted with next-themes
- **Responsive** — mobile-first layout

---

## Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/ktnCodes/ktncodes-v2.git
cd ktncodes-v2

# 2. Install dependencies
npm install

# 3. Add environment variables
cp .env.example .env.local
# Open .env.local and add your key:
# GOOGLE_GENERATIVE_AI_API_KEY=your_key_here

# 4. Run dev server
npm run dev
```

Get a free Gemini API key at [aistudio.google.com](https://aistudio.google.com).

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage (chatbot)
│   ├── about/                # About page
│   ├── posts/                # Blog posts + [slug]
│   ├── tags/                 # Tag index + [tag] filter
│   ├── archives/             # Chronological archive
│   ├── search/               # Client-side search
│   └── api/chat/             # Gemini streaming API route + 6 tools
├── components/
│   ├── chat/                 # Chat UI (chat, landing, input, message, tool-renderer)
│   ├── tools/                # Tool UI components (presentation, projects, skills, resume, contact, blog-posts)
│   ├── posts/                # Blog post components (card, header, MDX, TOC)
│   └── layout/               # Navbar, footer, theme toggle
├── lib/
│   ├── posts.ts              # MDX loading and filtering
│   ├── config.ts             # Portfolio config loader
│   └── utils.ts              # formatDate, readingTime
content/
└── posts/                    # 9 MDX blog posts
portfolio-config.json         # All portfolio data (single source of truth)
```

---

## Deploying Your Own Fork

1. Fork this repo
2. Connect to [Vercel](https://vercel.com) via GitHub
3. Add `GOOGLE_GENERATIVE_AI_API_KEY` in Vercel environment variables
4. Deploy — Vercel auto-deploys on every push to `main`

---

## Author

**Kevin Trinh Nguyen**  
Software Engineer — Embedded Systems & AI/Agentic Engineering

- GitHub: [@ktnCodes](https://github.com/ktnCodes)
- LinkedIn: [itskevtrinh](https://linkedin.com/in/itskevtrinh)


This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
