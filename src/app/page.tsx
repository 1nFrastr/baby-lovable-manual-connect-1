import { TodoApp } from "@/components/todo/TodoApp";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden px-4 py-12 sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-rose-200 via-amber-100 to-sky-200 dark:from-rose-950 dark:via-amber-950 dark:to-sky-950"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-fuchsia-400/40 via-orange-300/40 to-cyan-300/40 blur-3xl dark:from-fuchsia-500/30 dark:via-orange-400/30 dark:to-cyan-400/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-0 -z-10 h-96 w-96 rounded-full bg-gradient-to-tr from-emerald-300/40 to-indigo-400/40 blur-3xl dark:from-emerald-500/20 dark:to-indigo-500/20"
      />
      <TodoApp />
    </main>
  );
}
