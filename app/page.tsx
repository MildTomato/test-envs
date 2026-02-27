"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    supabase
      .from("todos")
      .select("*")
      .order("created_at")
      .then(({ data }) => setTodos(data ?? []));
  }, []);

  async function addTodo() {
    const text = input.trim();
    if (!text) return;
    const { data } = await supabase
      .from("todos")
      .insert({ text })
      .select()
      .single();
    if (data) setTodos([...todos, data]);
    setInput("");
  }

  async function toggleTodo(todo: Todo) {
    await supabase.from("todos").update({ done: !todo.done }).eq("id", todo.id);
    setTodos(todos.map((t) => (t.id === todo.id ? { ...t, done: !t.done } : t)));
  }

  async function deleteTodo(id: number) {
    await supabase.from("todos").delete().eq("id", id);
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 dark:bg-black pt-24 px-4">
      <main className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-zinc-50">
          Todos
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-zinc-400"
            placeholder="Add a todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button
            className="rounded-lg bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-4 py-2 text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
            onClick={addTodo}
          >
            Add
          </button>
        </div>

        <ul className="flex flex-col gap-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3"
            >
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo)}
                className="h-4 w-4 accent-zinc-900 dark:accent-zinc-50"
              />
              <span
                className={`flex-1 text-sm ${todo.done ? "line-through text-zinc-400" : "text-zinc-900 dark:text-zinc-50"}`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-xs"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-sm text-zinc-400 mt-8">No todos yet.</p>
        )}
      </main>
    </div>
  );
}
