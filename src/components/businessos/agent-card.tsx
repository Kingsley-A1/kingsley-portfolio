"use client";

import { useState } from "react";
import { ArrowRightLeft, Zap, Clock, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import type { AgentRole } from "@/features/businessos/data";
import { cn } from "@/lib/utils";

const statusConfig = {
  active: { label: "Active", bg: "bg-emerald-500/10", dot: "bg-emerald-400", text: "text-emerald-400" },
  idle: { label: "Idle", bg: "bg-amber-500/10", dot: "bg-amber-400", text: "text-amber-400" },
  reviewing: { label: "Reviewing", bg: "bg-violet-500/10", dot: "bg-violet-400", text: "text-violet-400" },
  blocked: { label: "Blocked", bg: "bg-red-500/10", dot: "bg-red-400", text: "text-red-400" },
} as const;

const deptLabels: Record<string, string> = {
  leadership: "Leadership",
  operations: "Operations",
  media: "Media & Brand",
  engineering: "Engineering",
  revenue: "Revenue",
};

export function AgentCard({ agent, onPing }: { agent: AgentRole; onPing?: (name: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[agent.status];

  return (
    <div
      className={cn(
        "group rounded-xl border transition-all duration-300",
        "bg-neutral-900/80 border-neutral-800 hover:border-neutral-700",
        "hover:shadow-lg hover:shadow-neutral-950/50",
      )}
      style={{ borderLeftColor: agent.color, borderLeftWidth: "3px" }}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold text-white shadow-inner"
              style={{ backgroundColor: agent.color }}
            >
              {agent.avatar}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-body font-semibold text-neutral-100 truncate">
                  {agent.name}
                </h3>
                <span className="rounded-md bg-neutral-800 px-1.5 py-0.5 text-[10px] font-medium uppercase text-neutral-400">
                  {deptLabels[agent.department]}
                </span>
              </div>
              <p className="text-caption text-neutral-500 truncate">{agent.role}</p>
            </div>
          </div>
          <div className={cn("flex items-center gap-1.5 rounded-full px-2.5 py-1 text-caption font-medium", status.bg, status.text)}>
            <span className={cn("h-1.5 w-1.5 rounded-full", agent.status === "active" && "animate-pulse", status.dot)} />
            {status.label}
          </div>
        </div>

        {/* Progress bar */}
        {agent.progress > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-caption text-neutral-500">Mission progress</span>
              <span className="text-caption font-mono text-neutral-400">{agent.progress}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-neutral-800">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${agent.progress}%`, backgroundColor: agent.color }}
              />
            </div>
          </div>
        )}

        {/* Mission */}
        <p className="mt-3 text-body-sm leading-relaxed text-neutral-400 line-clamp-2">
          {agent.mission}
        </p>

        {/* Handoff chain */}
        {(agent.lastHandoff || agent.nextHandoff) && (
          <div className="mt-3 flex flex-col gap-1 text-caption text-neutral-600">
            {agent.lastHandoff && (
              <span className="inline-flex items-center gap-1">
                <ArrowRightLeft className="h-3 w-3" /> ← {agent.lastHandoff}
              </span>
            )}
            {agent.nextHandoff && (
              <span className="inline-flex items-center gap-1 text-neutral-500">
                <ArrowRightLeft className="h-3 w-3" /> → {agent.nextHandoff}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => onPing?.(agent.name)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-800 px-3 py-1.5 text-caption font-medium text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white"
          >
            <Zap className="h-3 w-3" />
            Ping
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-caption text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-neutral-300"
          >
            {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            {expanded ? "Less" : "Details"}
          </button>
        </div>

        {/* Expanded details */}
        {expanded && (
          <div className="mt-4 space-y-3 border-t border-neutral-800 pt-4 text-body-sm">
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-neutral-600" />
              <div>
                <p className="font-medium text-neutral-300">Current Mission</p>
                <p className="text-neutral-500">{agent.mission}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-neutral-600" />
              <div>
                <p className="font-medium text-neutral-300">Status Report</p>
                <p className="text-neutral-500">
                  {agent.status === "active" && `${agent.name} is actively working. ${agent.progress}% complete. On track for next handoff.`}
                  {agent.status === "idle" && `${agent.name} is waiting for a handoff or assignment. No blockers reported.`}
                  {agent.status === "reviewing" && `${agent.name} is reviewing work from another agent. Expect completion within the current cycle.`}
                  {agent.status === "blocked" && `${agent.name} is blocked. Intervention may be required to resolve dependencies.`}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
