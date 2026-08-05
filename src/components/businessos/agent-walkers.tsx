"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { X } from "lucide-react";
import { WalkerSprite } from "@/components/businessos/walker-sprite";
import { DIALOGUE_POOL } from "@/features/businessos/dialogue";

interface Walker {
  id: number;
  x: number;
  y: number;
  direction: "right" | "left";
  message: string;
  showBubble: boolean;
  bubbleVisibleSince: number;
  speed: number;
  pauseUntil: number;
  phase: "walking" | "paused" | "exiting" | "dragged";
  spawnedAt: number;
  enteredCenter: boolean;
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function AgentWalkers() {
  const [dismissed, setDismissed] = useState(false);
  const [renderTick, setRenderTick] = useState(0); // triggers re-render for bubbles
  const walkersRef = useRef<Walker[]>([]);
  const elRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const rafRef = useRef<number>(0);
  const nextSpawnRef = useRef(Date.now() + 3000);
  const nextIdRef = useRef(0);
  const dragRef = useRef<{ walkerId: number; startX: number; startY: number; origX: number; origY: number } | null>(null);
  const maxWalkers = 2;

  // Periodic React re-render for bubbles (every 2s, not 60fps)
  useEffect(() => {
    const interval = setInterval(() => setRenderTick((t) => t + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  // Animation loop — positions via DOM writes only
  useEffect(() => {
    if (dismissed) return;

    function frame() {
      const now = Date.now();
      const walkers = walkersRef.current;

      // Spawn?
      if (
        now >= nextSpawnRef.current &&
        walkers.filter((w) => w.phase !== "exiting").length < maxWalkers
      ) {
        const fromRight = Math.random() > 0.5;
        const id = nextIdRef.current++;
        walkers.push({
          id,
          x: fromRight ? 108 : -8,
          y: 80 + Math.random() * 8,
          direction: fromRight ? "left" : "right",
          message: pick(DIALOGUE_POOL),
          showBubble: false,
          bubbleVisibleSince: 0,
          speed: 0.03 + Math.random() * 0.04,
          pauseUntil: 0,
          phase: "walking",
          spawnedAt: now,
          enteredCenter: false,
        });
        nextSpawnRef.current = now + 8000 + Math.random() * 8000;
      }

      for (const w of walkers) {
        if (w.phase === "exiting" || w.phase === "dragged") continue;

        if (w.phase === "walking") {
          const dx = w.direction === "right" ? w.speed : -w.speed;
          w.x += dx;

          // Entered center zone? Show bubble reliably
          const inCenter = w.x > 35 && w.x < 65;
          if (inCenter && !w.enteredCenter) {
            w.enteredCenter = true;
            w.showBubble = true;
            w.bubbleVisibleSince = now;
          }

          // Auto-hide bubble after 5s
          if (w.showBubble && now - w.bubbleVisibleSince > 5000) {
            w.showBubble = false;
          }

          // Random pause in center
          if (inCenter && Math.random() < 0.003 && now > w.pauseUntil) {
            w.phase = "paused";
            w.pauseUntil = now + 3000 + Math.random() * 4000;
            w.showBubble = true;
            w.bubbleVisibleSince = now;
          }

          // Exited other side?
          if ((w.direction === "right" && w.x > 110) || (w.direction === "left" && w.x < -10)) {
            w.phase = "exiting";
            w.showBubble = false;
          }
        } else if (w.phase === "paused" && now > w.pauseUntil) {
          w.phase = "walking";
        }

        // DOM write
        const el = elRefs.current.get(w.id);
        if (el) {
          if (w.phase === "exiting") {
            el.style.opacity = "0";
            el.style.transition = "opacity 0.4s ease-out";
          } else {
            el.style.opacity = "1";
            el.style.left = `${w.x}%`;
            el.style.top = `${w.y}%`;
            el.style.transition = "left 1.5s linear, top 0.3s ease-out";
          }
        }
      }

      // Remove fully faded walkers
      walkersRef.current = walkers.filter((w) => {
        if (w.phase === "exiting" && Date.now() - w.spawnedAt > 25000) return false;
        return true;
      });

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [dismissed]);

  // ── Drag handlers ────────────────────────────────────────────────────────

  const onPointerDown = useCallback((walkerId: number, e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const w = walkersRef.current.find((x) => x.id === walkerId);
    if (!w) return;
    w.phase = "dragged";
    w.showBubble = false;
    dragRef.current = {
      walkerId,
      startX: e.clientX,
      startY: e.clientY,
      origX: w.x,
      origY: w.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const d = dragRef.current;
    const w = walkersRef.current.find((x) => x.id === d.walkerId);
    if (!w) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const dx = ((e.clientX - d.startX) / vw) * 100;
    const dy = ((e.clientY - d.startY) / vh) * 100;
    w.x = Math.max(2, Math.min(98, d.origX + dx));
    w.y = Math.max(5, Math.min(93, d.origY + dy));
    // Direct DOM update for smooth drag
    const el = elRefs.current.get(w.id);
    if (el) {
      el.style.left = `${w.x}%`;
      el.style.top = `${w.y}%`;
      el.style.transition = "none";
    }
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const w = walkersRef.current.find((x) => x.id === dragRef.current!.walkerId);
    dragRef.current = null;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    if (w) {
      // Resume walking after 5s idle
      w.pauseUntil = Date.now() + 5000;
      w.phase = "paused";
      w.showBubble = true;
      w.bubbleVisibleSince = Date.now();
      w.message = pick(DIALOGUE_POOL);
      setRenderTick((t) => t + 1);
    }
  }, []);

  // Ref callback
  const setRef = useCallback(
    (id: number) => (el: HTMLDivElement | null) => {
      if (el) elRefs.current.set(id, el);
      else elRefs.current.delete(id);
    },
    [],
  );

  if (dismissed) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[40] overflow-hidden" aria-hidden="true">
      {walkersRef.current.map((w) => {
        const show = w.showBubble && w.phase !== "exiting";
        return (
          <div
            key={w.id}
            ref={setRef(w.id)}
            className="absolute select-none"
            style={{
              left: `${w.x}%`,
              top: `${w.y}%`,
              transform: "translate(-50%, -50%)",
              opacity: 1,
              transition: "opacity 0.4s ease-out",
            }}
          >
            {/* Horizontal speech bubble */}
            {show && (
              <div
                className="absolute top-1/2 -translate-y-1/2 flex items-center"
                style={{
                  [w.direction === "right" ? "right" : "left"]: "100%",
                  [w.direction === "right" ? "marginRight" : "marginLeft"]: "14px",
                  animation: "bubble-in 0.3s ease-out both",
                }}
              >
                <div className="relative max-w-[200px] rounded-lg bg-white px-3 py-2 text-xs font-medium leading-snug text-neutral-700 shadow-md ring-1 ring-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:ring-neutral-600">
                  {w.message}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rotate-45 bg-white ring-1 ring-neutral-200 dark:bg-neutral-800 dark:ring-neutral-600"
                    style={{
                      [w.direction === "right" ? "left" : "right"]: "-4px",
                      clipPath:
                        w.direction === "right"
                          ? "polygon(100% 0, 0 0, 100% 100%)"
                          : "polygon(0 0, 100% 0, 0 100%)",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Walker body — draggable */}
            <div
              className="pointer-events-auto cursor-grab active:cursor-grabbing transition-transform duration-200 hover:scale-110"
              onPointerDown={(e) => onPointerDown(w.id, e)}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
            >
              <WalkerSprite id={w.id} size={48} direction={w.direction} />
            </div>
          </div>
        );
      })}

      {/* Dismiss */}
      <button
        onClick={() => setDismissed(true)}
        className="pointer-events-auto fixed bottom-20 right-4 z-[70] flex items-center gap-1 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-400 shadow-sm transition-all hover:text-neutral-600 hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-300"
        title="Hide walkers"
      >
        <X className="h-3 w-3" />
        Hide
      </button>
    </div>
  );
}
