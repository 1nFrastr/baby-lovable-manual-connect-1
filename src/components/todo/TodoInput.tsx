"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

type Props = {
  onAdd: (text: string) => void;
};

export function TodoInput({ onAdd }: Props) {
  const [value, setValue] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    onAdd(text);
    setValue("");
  }

  return (
    <form
      onSubmit={submit}
      className="flex gap-2 rounded-xl border border-foreground/10 bg-white/70 p-2 shadow-sm backdrop-blur dark:bg-black/30"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What needs to be done?"
        aria-label="New todo"
        className="min-w-0 flex-1 rounded-lg border border-transparent bg-transparent px-3 py-2 text-base text-foreground placeholder:text-foreground/40 outline-none transition focus:border-fuchsia-300 focus:bg-white/80 dark:focus:bg-black/40"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-gradient-to-r from-fuchsia-500 via-orange-400 to-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 hover:shadow disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus className="h-4 w-4" aria-hidden />
        Add
      </button>
    </form>
  );
}
