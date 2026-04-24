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
