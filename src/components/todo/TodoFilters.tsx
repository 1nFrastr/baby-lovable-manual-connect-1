"use client";

import { Circle, CircleCheck, Eraser, List, ListChecks, type LucideIcon } from "lucide-react";

export type Filter = "all" | "active" | "done";

type Props = {
  filter: Filter;
  onFilter: (f: Filter) => void;
  remaining: number;
  hasDone: boolean;
  onClearDone: () => void;
};

const tabs: { value: Filter; label: string; active: string; icon: LucideIcon }[] = [
  { value: "all", label: "All", active: "from-fuchsia-500 to-pink-500", icon: List },
  { value: "active", label: "Active", active: "from-orange-400 to-amber-500", icon: Circle },
  { value: "done", label: "Done", active: "from-sky-500 to-cyan-500", icon: CircleCheck },
];

export function TodoFilters({
  filter,
  onFilter,
  remaining,
  hasDone,
  onClearDone,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1 font-medium text-foreground/70 shadow-sm backdrop-blur dark:bg-black/30">
        <ListChecks className="h-3.5 w-3.5" aria-hidden />
        {remaining} {remaining === 1 ? "item" : "items"} left
      </span>
      <div className="flex items-center gap-1 rounded-full border border-foreground/10 bg-white/60 p-1 shadow-sm backdrop-blur dark:bg-black/30">
        {tabs.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => onFilter(t.value)}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition ${
              filter === t.value
                ? `bg-gradient-to-r ${t.active} text-white shadow`
                : "text-foreground/70 hover:text-foreground"
            }`}
          >
            <t.icon className="h-3.5 w-3.5" aria-hidden />
            {t.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onClearDone}
        disabled={!hasDone}
        className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1 font-medium text-foreground/70 shadow-sm backdrop-blur transition hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-black/30"
      >
        <Eraser className="h-3.5 w-3.5" aria-hidden />
        Clear done
      </button>
    </div>
  );
}
