"use client";

import { useState } from "react";
import type { Metadata } from "next";
import {
  Activity,
  BrainCircuit,
  LayoutGrid,
  Radio,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import { AgentCard } from "@/components/businessos/agent-card";
import { ActivityFeed } from "@/components/businessos/activity-feed";
import { CommandBar } from "@/components/businessos/command-bar";
import { AGENTS, RECENT_HANDOFFS } from "@/features/businessos/data";
import { cn } from "@/lib/utils";
import type { AgentRole } from "@/features/businessos/data";

const DEPARTMENTS = [
  { key: "all", label: "All Agents", icon: LayoutGrid },
  { key: "leadership", label: "Leadership", icon: ShieldCheck },
  { key: "engineering", label: "Engineering", icon: BrainCircuit },
  { key: "media", label: "Media & Brand", icon: Radio },
  { key: "revenue", label: "Revenue", icon: Zap },
  { key: "operations", label: "Operations", icon: Activity },
] as const;

export default function BusinessOSPage() {
  const [deptFilter, setDeptFilter] = useState<string>("all");
  const [lastPing, setLastPing] = useState<string | null>(null);
  const [commandLog, setCommandLog] = useState<string[]>([]);

  const filtered =
    deptFilter === "all"
      ? AGENTS
      : AGENTS.filter((a) => a.department === deptFilter);

  const activeCount = AGENTS.filter((a) => a.status === "active").length;
  const reviewingCount = AGENTS.filter((a) => a.status === "reviewing").length;
  const idleCount = AGENTS.filter((a) => a.status === "idle").length;

  function handlePing(name: string) {
    setLastPing(name);
    setCommandLog((prev) => [...prev, `[ping] → ${name}`]);
    setTimeout(() => setLastPing(null), 5000);
  }

  function handleCommand(command: string) {
    setCommandLog((prev) => [...prev, `[cmd] ${command}`]);
    // Simulate agent response
    const matchedAgent = AGENTS.find(
      (a) =>
        command.toLowerCase().includes(a.name.toLowerCase())
    );
    if (matchedAgent) {
      handlePing(matchedAgent.name);
    } else if (command.toLowerCase().includes("status")) {
      setLastPing("System");
      setTimeout(() => setLastPing(null), 4000);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* ── Header ──────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold text-white shadow-lg shadow-violet-500/25">
                OS
              </div>
              <div>
                <h1 className="text-body font-bold text-white tracking-tight">
                  Business<span className="text-violet-400">OS</span>
                </h1>
                <p className="text-caption text-neutral-500">
                  Agent Network Control
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-4">
              {[
                { value: AGENTS.length, label: "Agents", icon: Users, color: "text-blue-400" },
                { value: activeCount, label: "Active", icon: Zap, color: "text-emerald-400" },
                { value: reviewingCount, label: "Reviewing", icon: BrainCircuit, color: "text-violet-400" },
                { value: idleCount, label: "Idle", icon: Activity, color: "text-amber-400" },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center gap-2">
                    <Icon className={cn("h-4 w-4", stat.color)} />
                    <div>
                      <div className="text-body-sm font-bold text-white tabular-nums">
                        {stat.value}
                      </div>
                      <div className="text-caption text-neutral-500">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-caption font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              System Nominal
            </div>
          </div>
        </div>
      </header>

      {/* ── Department Tabs ──────────────────────────────── */}
      <div className="border-b border-neutral-800 bg-neutral-950">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
            {DEPARTMENTS.map((dept) => {
              const Icon = dept.icon;
              const count =
                dept.key === "all"
                  ? AGENTS.length
                  : AGENTS.filter((a) => a.department === dept.key).length;
              return (
                <button
                  key={dept.key}
                  onClick={() => setDeptFilter(dept.key)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2 text-body-sm font-medium whitespace-nowrap transition-all",
                    deptFilter === dept.key
                      ? "bg-neutral-800 text-white shadow-sm"
                      : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {dept.label}
                  <span
                    className={cn(
                      "rounded-md px-1.5 py-0.5 text-caption font-mono",
                      deptFilter === dept.key
                        ? "bg-neutral-700 text-neutral-300"
                        : "bg-neutral-800 text-neutral-600",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-8 pb-36">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Agent Grid */}
          <div className="lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2">
              {filtered.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onPing={handlePing}
                />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-800 py-16 text-center">
                <Users className="mb-3 h-8 w-8 text-neutral-700" />
                <p className="text-body text-neutral-500">
                  No agents in this department.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar — Activity Feed */}
          <div>
            <div className="sticky top-24">
              <div className="mb-4 flex items-center gap-2">
                <Radio className="h-4 w-4 text-violet-400" />
                <h2 className="text-body-sm font-semibold text-neutral-300 uppercase tracking-wider">
                  Live Handoff Feed
                </h2>
              </div>
              <ActivityFeed events={RECENT_HANDOFFS} />

              {/* Command log */}
              {commandLog.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 text-caption font-semibold text-neutral-500 uppercase tracking-wider">
                    Command Log
                  </h3>
                  <div className="space-y-1 rounded-lg border border-neutral-800 bg-neutral-900/50 p-3 font-mono text-caption">
                    {commandLog.slice(-6).map((entry, i) => (
                      <p key={i} className="text-neutral-500">
                        <span className="text-neutral-700">{i + 1}</span>{" "}
                        {entry}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Command Bar ──────────────────────────────────── */}
      <CommandBar onCommand={handleCommand} lastPing={lastPing} />
    </div>
  );
}
