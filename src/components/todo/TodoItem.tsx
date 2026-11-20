"use client";

import { Check, Pencil, Trash2 } from "lucide-react";
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
          <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
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
          <Pencil className="h-4 w-4" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => onDelete(todo.id)}
          aria-label="Delete todo"
          className="rounded p-1.5 text-foreground/60 transition hover:bg-red-500/10 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </li>
  );
}
