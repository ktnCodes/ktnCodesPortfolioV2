import { ToolRenderer } from "./tool-renderer";
import type { UIMessage } from "ai";

export function ChatMessage({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";

  if (isUser) {
    const text = message.parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("");

    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-accent/15 border border-accent/30 px-4 py-2.5">
          <p className="text-sm whitespace-pre-wrap">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[90%] space-y-3">
        {message.parts.map((part, i) => {
          if (part.type === "text" && part.text.trim()) {
            return (
              <div
                key={i}
                className="rounded-2xl rounded-bl-sm bg-surface border border-border px-4 py-2.5"
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                  {part.text}
                </p>
              </div>
            );
          }
          if (part.type.startsWith("tool-")) {
            return (
              <div key={i} className="w-full">
                <ToolRenderer part={part as never} />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
