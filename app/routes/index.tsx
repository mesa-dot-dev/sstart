import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "~/components/ui/button";
import { db } from "~/database/db";

// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// const filePath = "count.txt";

// async function readCount() {
//   return parseInt(await fs.promises.readFile(filePath, "utf-8").catch(() => "0"));
// }

// const getCount = createServerFn("GET", () => {
//   return readCount();
// });

// const updateCount = createServerFn("POST", async (addBy: number) => {
//   const count = await readCount();
//   await fs.promises.writeFile(filePath, `${count + addBy}`);
// });

const getTodos = createServerFn("GET", async () => {
  try {
    const firstTodo = db.query.todo.findMany();
    return firstTodo;
  } catch (error) {
    console.error("Failed to get todos", error);
    throw new Error("Failed to fetch todos");
  }
});

// const todosQueryOptions = () => queryOptions({ queryKey: ["todos"], queryFn: () => getTodos() });

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    return await getTodos();
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
  const todo = Route.useLoaderData();

  console.log("dodo", todo);

  return <div>First Todo Title: plz work</div>;
};
