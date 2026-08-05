"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

const TERMINAL_LINES = [
  'const standard = {',
  '  clarity: true,',
  '  security: "default",',
  '  quality: "production",',
  '  ownership: "end-to-end",',
  '  trust: "non-negotiable"',
  '};',
  "",
  "ship(standard);",
  "",
  "// Building with intent.",
  "// Shipping with confidence.",
];

const EXTRA_LINES = [
  'const ethos = {',
  '  precision: "pixel-level",',
  '  stack: ["Next.js", "NestJS", "Tailwind"],',
  '  mindset: "product-first"',
  '};',
  "",
  "deploy(ethos);",
  "",
  "// Every line intentional.",
  "// Every build production-grade.",
];

function useTypingSequence(lines: string[], speed = 60) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [phase, setPhase] = useState<"typing" | "pausing" | "clearing" | "idle">("typing");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    cleanup();

    const tick = () => {
      if (phase === "typing") {
        if (currentLine < lines.length) {
          const line = lines[currentLine];
          if (currentChar < line.length) {
            setDisplayed((prev) => {
              const copy = [...prev];
              if (copy.length <= currentLine) copy.push("");
              copy[currentLine] = line.slice(0, currentChar + 1);
              return copy;
            });
            setCurrentChar((c) => c + 1);
            // Vary speed slightly for realism
            const delay = line[currentChar] === " " ? speed * 0.6 : speed * (0.7 + Math.random() * 0.6);
            timerRef.current = setTimeout(tick, delay);
          } else {
            setCurrentLine((l) => l + 1);
            setCurrentChar(0);
            timerRef.current = setTimeout(tick, speed * 0.4);
          }
        } else {
          setPhase("pausing");
          setIsDone(true);
          timerRef.current = setTimeout(() => setPhase("clearing"), 3000);
        }
      } else if (phase === "pausing") {
        // Wait before cycling
        timerRef.current = setTimeout(() => setPhase("clearing"), 3000);
      } else if (phase === "clearing") {
        // Clear character by character backward
        if (displayed.length > 0) {
          const lastLineIdx = displayed.length - 1;
          const lastLine = displayed[lastLineIdx];
          if (lastLine.length > 0) {
            setDisplayed((prev) => {
              const copy = [...prev];
              copy[lastLineIdx] = lastLine.slice(0, -1);
              return copy;
            });
            timerRef.current = setTimeout(tick, 20);
          } else {
            setDisplayed((prev) => prev.slice(0, -1));
            timerRef.current = setTimeout(tick, 20);
          }
        } else {
          // Reset
          setCurrentLine(0);
          setCurrentChar(0);
          setIsDone(false);
          setPhase("typing");
          timerRef.current = setTimeout(tick, 800);
        }
      }
    };

    timerRef.current = setTimeout(tick, 400);
    return cleanup;
  }, [phase, currentLine, currentChar, lines, speed, displayed, cleanup]);

  return { displayed, isDone, phase };
}

export function TerminalUI({ className }: { className?: string }) {
  const { displayed } = useTypingSequence([...TERMINAL_LINES, ...EXTRA_LINES], 55);

  return (
    <div
      className={cn(
        "relative w-full max-w-[340px] rounded-xl border border-neutral-700/60 bg-[#0d1117] shadow-2xl overflow-hidden",
        className,
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-3 py-2.5 bg-[#161b22] border-b border-neutral-700/40">
        {/* Traffic light buttons */}
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="ml-2 text-[11px] font-medium text-neutral-500 tracking-wide">
          terminal — standard.ship()
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-4 font-mono text-[13px] leading-relaxed min-h-[220px]">
        <div className="text-neutral-400">
          {displayed.map((line, i) => (
            <div key={i} className="flex">
              {/* Line prompt for new statements */}
              <span className="text-emerald-500 mr-2 select-none shrink-0">
                {i === 0 || (i > 6 && line.startsWith("const") && !displayed[i - 1]?.startsWith("const"))
                  ? "❯"
                  : " "}
              </span>
              <span
                className={cn(
                  line.startsWith("//") && "text-neutral-600 italic",
                  line.includes("true") && "text-blue-400",
                  line.includes('"default"') && "text-amber-400",
                  line.includes('"production"') && "text-emerald-400",
                  line.includes('"end-to-end"') && "text-purple-400",
                  line.includes('"non-negotiable"') && "text-rose-400",
                  line.includes('"pixel-level"') && "text-sky-400",
                  line.includes("Next.js") && "text-cyan-400",
                  line.includes("NestJS") && "text-pink-400",
                  line.includes("Tailwind") && "text-teal-400",
                  line.includes('"product-first"') && "text-violet-400",
                  line.startsWith("ship") && "text-yellow-400 font-semibold",
                  line.startsWith("deploy") && "text-green-400 font-semibold",
                  line.includes("{") && "text-neutral-300",
                  line.includes("}") && "text-neutral-300",
                )}
              >
                {line || "\u00A0"}
              </span>
              {/* Blinking cursor */}
              {i === displayed.length - 1 && (
                <span className="ml-0.5 inline-block w-2 h-[15px] bg-emerald-400 animate-pulse" />
              )}
            </div>
          ))}
          {displayed.length === 0 && (
            <span className="ml-0.5 inline-block w-2 h-[15px] bg-emerald-400 animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
}
