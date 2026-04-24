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
