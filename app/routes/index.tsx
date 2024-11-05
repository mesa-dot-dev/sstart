import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "~/components/ui/button";
import { db } from "~/database/db";

const deferredQueryOptions = () =>
  queryOptions({
    queryKey: ["deferred"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 3000));
      return {
        message: `Hello deferred from the server!`,
        status: "success",
        time: new Date(),
      };
    },
  });

export const Route = createFileRoute("/")({
  component: Home,
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(deferredQueryOptions());
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
        <Suspense fallback="Loading deferred...">
          <Deferred />
        </Suspense>
      </div>
    </main>
  );
}

const Deferred = () => {
  const deferredQuery = useSuspenseQuery(deferredQueryOptions());

  return (
    <div>
      <h1>Deferred Query</h1>
      <div>Status: {deferredQuery.data.status}</div>
      <div>Message: {deferredQuery.data.message}</div>
      <div>Time: {deferredQuery.data.time.toISOString()}</div>
    </div>
  );
};
