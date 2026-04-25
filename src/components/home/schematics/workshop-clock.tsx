"use client";

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  // Round to 2 decimals so server- and client-rendered SVG strings match
  // (avoids React 19 hydration warnings from float repr drift).
  const x = Math.round((cx + r * Math.cos(rad)) * 100) / 100;
  const y = Math.round((cy + r * Math.sin(rad)) * 100) / 100;
  return { x, y };
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
