import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "~/components/sign-in";

export const Route = createFileRoute("/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignIn />;
}
