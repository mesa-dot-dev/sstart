import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Await, createFileRoute, defer, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "~/components/ui/button";
import { db } from "~/database/db";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const fetchSlowData = async () => {
  console.log("slow");
  await sleep(3000);
  console.log("done");

  return {
    message: `Hello deferred from the server!`,
    status: "success",
    time: new Date(),
  };
};

// const deferredQueryOptions = () =>
//   queryOptions({
//     queryKey: ["deferred"],
//     queryFn: async () => {
//       await new Promise((r) => setTimeout(r, 3000));
//       return {
//         message: `Hello deferred from the server!`,
//         status: "success",
//         time: new Date(),
//       };
//     },
//   });

export const Route = createFileRoute("/")({
  component: Home,
  loader: () => {
    // context.queryClient.prefetchQuery(deferredQueryOptions());
    const slowDataPromise = fetchSlowData();

    return { deferredSlowData: defer(slowDataPromise) };
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
  const { deferredSlowData } = Route.useLoaderData();

  return (
    <Await promise={deferredSlowData} fallback={<div>Loading...</div>}>
      {(data) => {
        return (
          <div>
            <h1>Deferred Query</h1>
            <div>Status: {data.status}</div>
            <div>Message: {data.message}</div>
          </div>
        );
      }}
    </Await>
  );
};
