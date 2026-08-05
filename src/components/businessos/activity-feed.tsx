import { ArrowRightLeft, CheckCircle2, Eye, FileText } from "lucide-react";
import type { HandoffEvent } from "@/features/businessos/data";
import { cn } from "@/lib/utils";

const typeIcons = {
  handoff: ArrowRightLeft,
  review: Eye,
  approval: CheckCircle2,
  report: FileText,
} as const;

const typeColors = {
  handoff: "text-blue-400 bg-blue-500/10",
  review: "text-violet-400 bg-violet-500/10",
  approval: "text-emerald-400 bg-emerald-500/10",
  report: "text-amber-400 bg-amber-500/10",
} as const;

export function ActivityFeed({ events }: { events: HandoffEvent[] }) {
  return (
    <div className="space-y-2">
      {events.map((event) => {
        const Icon = typeIcons[event.type];
        const colorSet = typeColors[event.type];
        return (
          <div
            key={event.id}
            className="flex items-start gap-3 rounded-lg border border-neutral-800 bg-neutral-900/50 p-3 transition-colors hover:border-neutral-700 hover:bg-neutral-900"
          >
            <div className={cn("flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg", colorSet)}>
              <Icon className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-body-sm font-medium text-neutral-200">
                  {event.from}
                </span>
                <span className="text-caption text-neutral-600">→</span>
                <span className="text-body-sm font-medium text-neutral-200">
                  {event.to}
                </span>
                <span className="ml-auto flex-shrink-0 text-caption text-neutral-600 font-mono">
                  {event.timestamp}
                </span>
              </div>
              <p className="mt-0.5 text-body-sm text-neutral-400 line-clamp-2">
                {event.message}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
