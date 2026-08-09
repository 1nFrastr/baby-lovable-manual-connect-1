"use client";

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
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What needs to be done?"
        aria-label="New todo"
        className="flex-1 rounded-lg border border-foreground/15 bg-background px-4 py-2.5 text-base text-foreground placeholder:text-foreground/40 outline-none transition focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Add
      </button>
    </form>
  );
}
