"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { Send, Sparkles } from "lucide-react";

interface CommandBarProps {
  onCommand: (command: string) => void;
  lastPing: string | null;
}

export function CommandBar({ onCommand, lastPing }: CommandBarProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "/" && document.activeElement === document.body) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  function handleSubmit() {
    if (!input.trim()) return;
    onCommand(input.trim());
    setInput("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-neutral-800 bg-neutral-950/95 backdrop-blur-xl">
      {lastPing && (
        <div className="mx-auto max-w-4xl px-4 pt-3">
          <div className="flex items-start gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-2.5">
            <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
            <div className="min-w-0">
              <p className="text-body-sm font-medium text-emerald-300">
                {lastPing} responding...
              </p>
              <p className="text-caption text-emerald-500/70">
                Agent is processing. A detailed status report will appear here.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-4">
        <div className="flex-1 flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 focus-within:border-neutral-600 focus-within:bg-neutral-800 transition-colors">
          <span className="text-body-sm text-neutral-600 font-mono">/</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Command an agent... (e.g., 'Aria, status report' or 'Ping Forge')"
            className="flex-1 bg-transparent text-body-sm text-neutral-200 placeholder-neutral-600 outline-none"
            aria-label="Agent command input"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md bg-neutral-800 px-2 py-0.5 text-[10px] font-medium text-neutral-500">
            ↵ Enter
          </kbd>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!input.trim()}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900 transition-all hover:bg-white hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
