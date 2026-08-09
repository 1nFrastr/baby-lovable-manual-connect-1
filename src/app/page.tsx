import { TodoApp } from "@/components/todo/TodoApp";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-4 py-12 sm:py-16">
      <TodoApp />
    </main>
  );
}
