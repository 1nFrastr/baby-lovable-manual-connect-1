"use client";

import { useState } from "react";
import type { Todo } from "@/lib/todos";

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const palette = [
  "from-fuchsia-500 to-pink-500",
  "from-orange-400 to-amber-500",
  "from-sky-500 to-cyan-500",
  "from-emerald-400 to-teal-500",
  "from-indigo-500 to-violet-500",
  "from-rose-500 to-red-500",
];

function colorFor(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return palette[Math.abs(h) % palette.length];
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  function commit() {
    const next = draft.trim();
    if (next && next !== todo.text) onEdit(todo.id, next);
    else setDraft(todo.text);
    setEditing(false);
  }

  return (
    <li className="group flex items-center gap-3 rounded-lg border border-foreground/10 bg-background px-3 py-2.5 transition hover:border-foreground/20">
      <button
        type="button"
        role="checkbox"
        aria-checked={todo.done}
        aria-label={todo.done ? "Mark as not done" : "Mark as done"}
        onClick={() => onToggle(todo.id)}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${
          todo.done
            ? "border-foreground bg-foreground text-background"
            : "border-foreground/30 hover:border-foreground/60"
        }`}
      >
        {todo.done && (
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M3 8.5l3.5 3.5L13 4" />
          </svg>
        )}
      </button>

      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") {
              setDraft(todo.text);
              setEditing(false);
            }
          }}
          className="flex-1 rounded border border-foreground/20 bg-background px-2 py-1 text-sm outline-none focus:border-foreground/50"
        />
      ) : (
        <button
          type="button"
          onDoubleClick={() => setEditing(true)}
          onClick={() => onToggle(todo.id)}
          className={`flex-1 text-left text-sm leading-6 ${
            todo.done ? "text-foreground/40 line-through" : "text-foreground"
          }`}
        >
          {todo.text}
        </button>
      )}

      <div className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
        <button
          type="button"
          onClick={() => setEditing(true)}
          aria-label="Edit todo"
          className="rounded p-1.5 text-foreground/60 transition hover:bg-foreground/5 hover:text-foreground"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
            <path d="M13.586 2.586a2 2 0 0 1 2.828 0l1 1a2 2 0 0 1 0 2.828l-9.193 9.193a1 1 0 0 1-.45.257l-3.5.875a.5.5 0 0 1-.61-.61l.875-3.5a1 1 0 0 1 .257-.45l9.193-9.193Z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => onDelete(todo.id)}
          aria-label="Delete todo"
          className="rounded p-1.5 text-foreground/60 transition hover:bg-red-500/10 hover:text-red-500"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
            <path
              fillRule="evenodd"
              d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.58.182-2.358.327a.75.75 0 1 0 .298 1.47l.084-.017 1.107 12.225A2.25 2.25 0 0 0 7.376 20h5.248a2.25 2.25 0 0 0 2.245-2.102l1.107-12.224.084.017a.75.75 0 0 0 .298-1.47A41.04 41.04 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}
