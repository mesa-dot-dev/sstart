import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "~/components/ui/button";
import { db } from "~/database/db";

const getFirstTodo = createServerFn("GET", async () => {
  try {
    return await db.query.todo.findFirst();
  } catch (error) {
    console.error(error);
  }
});

const todoQueryOptions = () => queryOptions({ queryKey: ["todo"], queryFn: async () => getFirstTodo() });

export const Route = createFileRoute("/")({
  component: Home,
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(todoQueryOptions());
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
        <ErrorBoundary fallback="Loading error!">
          <Suspense fallback="Loading...">
            <Deferred />
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
}

const Deferred = () => {
  const { data } = useSuspenseQuery(todoQueryOptions());

  return (
    <div>
      <h1>Deferred Query (when streaming works)</h1>
      <div>Id: {data?.id}</div>
      <div>Title: {data?.title}</div>
      <div>Description: {data?.description}</div>
    </div>
  );
};
