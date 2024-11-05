import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "~/components/ui/button";
import { db } from "~/database/db";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const getTodos = createServerFn("GET", async () => {
  console.log("get todos");
  try {
    console.log("sleeping for 5 seconds");
    await sleep(5000);
    const firstTodo = await db.query.todo.findFirst();
    return firstTodo;
  } catch (error) {
    console.error(error);
  }
});

const todosQueryOptions = () => queryOptions({ queryKey: ["todos"], queryFn: () => getTodos() });

export const Route = createFileRoute("/")({
  component: Home,
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(todosQueryOptions());
  },
});

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[hsl(200,96%,22%)] to-[hsl(237,35%,13%)] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-6xl">Hi, Adrian. Thanks for your help with my lights.</h1>
        <Button asChild variant="secondary">
          <Link to="/dashboard">Go to dashboard</Link>
        </Button>
        <ErrorBoundary fallback="oops!">
          <Suspense fallback="Loading todo...">
            <Todos />
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
}

const Todos = () => {
  const todosQuery = useSuspenseQuery(todosQueryOptions());

  return <div>First Todo Title: {todosQuery.data?.title}</div>;
};
