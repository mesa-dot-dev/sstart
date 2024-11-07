import { createFileRoute, Link } from "@tanstack/react-router";

// const getFirstTodo = createServerFn("GET", async () => {
//   try {
//     return await db.query.todo.findFirst();
//   } catch (error) {
//     console.error(error);
//   }
// });

// const todoQueryOptions = () => queryOptions({ queryKey: ["todo"], queryFn: async () => getFirstTodo() });

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { user } = Route.useRouteContext();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[hsl(200,96%,22%)] to-[hsl(237,35%,13%)] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h3 className="text-6xl">Hi, Adrian. Now you can sign in and out.</h3>
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
