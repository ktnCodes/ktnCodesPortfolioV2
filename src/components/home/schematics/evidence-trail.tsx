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
