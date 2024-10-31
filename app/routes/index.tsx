import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { Button } from "~/components/ui/button";
import { db } from "~/database/db";

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

// const getTodos = createServerFn("GET", async () => {
//   const firstTodo = await db.query.todo.findFirst();

//   return firstTodo;
// });

export const Route = createFileRoute("/")({
  component: Home,
  // loader: async () => await getTodos(),
});

function Home() {
  // const state = Route.useLoaderData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[hsl(200,96%,22%)] to-[hsl(237,35%,13%)] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-6xl">Hi, Adrian. Have a nice time in Wisconsin.</h1>
        <Button asChild variant="secondary">
          <Link to="/dashboard">Go to dashboard</Link>
        </Button>
        {/* first todo: {state?.title} */}
      </div>
    </main>
  );
}
