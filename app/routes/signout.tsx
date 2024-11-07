import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { getWebRequest } from "vinxi/http";
import { auth } from "~/lib/auth";

const logout = createServerFn("POST", async () => {
  const { headers } = getWebRequest();

  await auth.api.signOut({ headers });

  throw redirect({ to: "/" });
});

export const Route = createFileRoute("/signout")({
  preload: false,
  loader: () => logout(),
});
