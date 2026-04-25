import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ChatProvider } from "@/components/chat/chat-context";
import { FloatingChat } from "@/components/chat/floating-chat";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "ktnCodes",
    template: "%s | ktnCodes",
  },
  description:
    "Engineering notebook — agentic engineering, embedded systems, and software development.",
  openGraph: {
    title: "ktnCodes",
    description:
      "Engineering notebook — agentic engineering, embedded systems, and software development.",
    type: "website",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kevin Trinh Nguyen",
  url: "https://ktncodes.com",
  image: "https://ktncodes.com/avatarwithWinnie.jpg",
  jobTitle: "Software Engineer — Embedded Systems & AI/Agentic Engineering",
  worksFor: {
    "@type": "Organization",
    name: "John Deere",
    url: "https://www.deere.com",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Iowa State University",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Austin",
    addressRegion: "TX",
    addressCountry: "US",
  },
  sameAs: [
    "https://github.com/ktnCodes",
    "https://www.linkedin.com/in/itskevtrinh/",
  ],
  knowsAbout: [
    "Embedded Systems",
    "C++",
    "Qt",
    "Agentic Engineering",
    "LLM Tooling",
    "AI Workflows",
    "Model Context Protocol",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
    >
      <body suppressHydrationWarning className="h-dvh flex flex-col bg-background text-foreground antialiased overflow-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <ChatProvider>
            <Navbar />
            <main className="flex-1 flex flex-col min-h-0 overflow-hidden">{children}</main>
            <Footer />
            <FloatingChat />
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
