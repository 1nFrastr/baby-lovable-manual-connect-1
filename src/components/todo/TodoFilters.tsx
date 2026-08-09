"use client";

export type Filter = "all" | "active" | "done";

type Props = {
  filter: Filter;
  onFilter: (f: Filter) => void;
  remaining: number;
  hasDone: boolean;
  onClearDone: () => void;
};

const tabs: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "done", label: "Done" },
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
      <span className="text-foreground/60">
        {remaining} {remaining === 1 ? "item" : "items"} left
      </span>
      <div className="flex items-center gap-1 rounded-lg border border-foreground/10 bg-background p-0.5">
        {tabs.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => onFilter(t.value)}
            className={`rounded-md px-3 py-1 transition ${
              filter === t.value
                ? "bg-foreground text-background"
                : "text-foreground/70 hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onClearDone}
        disabled={!hasDone}
        className="text-foreground/60 transition hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Clear done
      </button>
    </div>
  );
}
