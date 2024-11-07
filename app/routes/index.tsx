import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getWebRequest } from "vinxi/http";
import { SignUp } from "~/components/sign-up";
import { Button } from "~/components/ui/button";
import { db } from "~/database/db";
import { auth } from "~/lib/auth";

// const getFirstTodo = createServerFn("GET", async () => {
//   try {
//     return await db.query.todo.findFirst();
//   } catch (error) {
//     console.error(error);
//   }
// });

// const todoQueryOptions = () => queryOptions({ queryKey: ["todo"], queryFn: async () => getFirstTodo() });

const getUser = createServerFn("GET", async () => {
  const { headers } = getWebRequest();
  const session = await auth.api.getSession({ headers });

  if (!session) return null;

  return session.user;
});

export const Route = createFileRoute("/")({
  component: Home,
  beforeLoad: async () => {
    const user = await getUser();

    return { user };
  },
});

function Home() {
  const { user } = Route.useRouteContext();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[hsl(200,96%,22%)] to-[hsl(237,35%,13%)] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h3 className="text-6xl">Hi, Adrian. Thanks for your help with my lights.</h3>
        <span className="mr-2">{user ? user.email : "Not logged in"}</span>
        <Link to="/signout">Sign Out</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/dashboard">Dashboard</Link>

        {/* <Button asChild variant="secondary">
          <Link to="/dashboard">Go to dashboard</Link>
        </Button> */}
        {/* <ErrorBoundary fallback="Loading error!">
          <Suspense fallback="Loading...">
            <Deferred />
          </Suspense>
        </ErrorBoundary> */}
      </div>
    </main>
  );
}

// const Deferred = () => {
//   const { data } = useSuspenseQuery(todoQueryOptions());

//   return (
//     <div>
//       <h1>Deferred Query (when streaming works)</h1>
//       <div>Id: {data?.id}</div>
//       <div>Title: {data?.title}</div>
//       <div>Description: {data?.description}</div>
//     </div>
//   );
// };
