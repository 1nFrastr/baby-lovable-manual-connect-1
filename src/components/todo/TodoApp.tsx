"use client";

import { useEffect, useMemo, useState } from "react";
import { createId, loadTodos, saveTodos, type Todo } from "@/lib/todos";
import { TodoInput } from "./TodoInput";
import { TodoItem } from "./TodoItem";
import { TodoFilters, type Filter } from "./TodoFilters";

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setTodos(loadTodos());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveTodos(todos);
  }, [todos, hydrated]);

  const visible = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.done);
    if (filter === "done") return todos.filter((t) => t.done);
    return todos;
  }, [todos, filter]);

  const remaining = todos.filter((t) => !t.done).length;
  const hasDone = todos.some((t) => t.done);

  return (
    <section className="flex w-full max-w-xl flex-col gap-5">
      <header className="text-center">
        <h1 className="bg-gradient-to-r from-fuchsia-500 via-orange-400 to-sky-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-fuchsia-400 dark:via-orange-300 dark:to-sky-400">
          Todos
        </h1>
        <p className="mt-1 text-sm text-foreground/70">
          Tiny list. Big plans.
        </p>
      </header>

      <TodoInput
        onAdd={(text) =>
          setTodos((prev) => [
            { id: createId(), text, done: false, createdAt: Date.now() },
            ...prev,
          ])
        }
      />

      <TodoFilters
        filter={filter}
        onFilter={setFilter}
        remaining={remaining}
        hasDone={hasDone}
        onClearDone={() => setTodos((prev) => prev.filter((t) => !t.done))}
      />

      {visible.length === 0 ? (
        <div className="rounded-lg border border-dashed border-foreground/15 py-12 text-center text-sm text-foreground/50">
          {hydrated && todos.length === 0
            ? "Nothing here yet. Add your first task above."
            : "No tasks match this filter."}
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {visible.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              onToggle={(id) =>
                setTodos((prev) =>
                  prev.map((x) => (x.id === id ? { ...x, done: !x.done } : x))
                )
              }
              onDelete={(id) =>
                setTodos((prev) => prev.filter((x) => x.id !== id))
              }
              onEdit={(id, text) =>
                setTodos((prev) =>
                  prev.map((x) => (x.id === id ? { ...x, text } : x))
                )
              }
            />
          ))}
        </ul>
      )}
    </section>
  );
}
