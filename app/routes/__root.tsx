import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Body, createServerFn, Head, Html, Meta, Scripts } from "@tanstack/start";
import * as React from "react";
import { getWebRequest } from "vinxi/http";
import { auth } from "~/features/auth/lib/auth";
import appCss from "~/styles/app.css?url";

const getUser = createServerFn("GET", async () => {
  const { headers } = getWebRequest();
  const session = await auth.api.getSession({ headers });

  if (!session) return null;

  return session.user;
});

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  meta: () => [
    {
      charSet: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      title: "TSS",
    },
  ],
  component: RootComponent,
  links: () => [{ rel: "stylesheet", href: appCss }],
  beforeLoad: async () => {
    const user = await getUser();

    return { user };
  },
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </Body>
    </Html>
  );
}
