import { createFileRoute, Link } from "@tanstack/react-router";
import { SignUp } from "~/components/sign-up";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SignUp />
      <Link to="/">Home</Link>
    </>
  );
}
