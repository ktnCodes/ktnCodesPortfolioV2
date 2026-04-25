"use client";

import { useChat } from "@ai-sdk/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const HASH = "#chat";

type ChatHook = ReturnType<typeof useChat>;

type ChatContextValue = {
  messages: ChatHook["messages"];
  sendMessage: ChatHook["sendMessage"];
  status: ChatHook["status"];
  stop: ChatHook["stop"];
  error: ChatHook["error"];
  isOpen: boolean;
  openWith: (question?: string) => void;
  close: () => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const { messages, sendMessage, status, stop, error } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const lastSentRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    function sync() {
      setIsOpen(window.location.hash === HASH);
    }
    window.addEventListener("hashchange", sync);
    // Sync once after hydration to honor deeplinks like /#chat.
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const openWith = useCallback(
    (question?: string) => {
      if (typeof window !== "undefined" && window.location.hash !== HASH) {
        history.pushState(null, "", HASH);
      }
      setIsOpen(true);
      if (!question) return;
      const isBusy = status === "streaming" || status === "submitted";
      if (isBusy) return;
      if (lastSentRef.current === question) return;
      lastSentRef.current = question;
      sendMessage({ text: question });
    },
    [sendMessage, status]
  );

  const close = useCallback(() => {
    setIsOpen(false);
    if (typeof window === "undefined") return;
    if (window.location.hash === HASH) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        status,
        stop,
        error,
        isOpen,
        openWith,
        close,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error("useChatContext must be used inside <ChatProvider>");
  }
  return ctx;
}
