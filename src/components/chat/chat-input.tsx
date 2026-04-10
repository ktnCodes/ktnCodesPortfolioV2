"use client";

import { Send, Square } from "lucide-react";
import { useRef, type KeyboardEvent, type FormEvent } from "react";

interface Props {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  stop: () => void;
}

export function ChatInput({ input, setInput, onSubmit, isLoading, stop }: Props) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        onSubmit(e as unknown as FormEvent);
      }
    }
  }

  function handleInput() {
    const el = inputRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-end gap-2 border-t border-border bg-background px-4 py-3"
    >
      <textarea
        ref={inputRef}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          handleInput();
        }}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything..."
        rows={1}
        className="flex-1 resize-none rounded-xl bg-surface border border-border px-4 py-2.5 text-sm placeholder:text-muted/60 focus:outline-none focus:border-accent/50 transition-colors"
      />
      {isLoading ? (
        <button
          type="button"
          onClick={stop}
          className="shrink-0 p-2.5 rounded-xl bg-surface border border-border text-muted hover:text-foreground transition-colors"
          aria-label="Stop generating"
        >
          <Square className="w-4 h-4" />
        </button>
      ) : (
        <button
          type="submit"
          disabled={!input.trim()}
          className="shrink-0 p-2.5 rounded-xl bg-accent text-background disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent-hover active:scale-95 transition-all"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      )}
    </form>
  );
}
