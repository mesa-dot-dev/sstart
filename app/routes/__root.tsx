import { createRootRouteWithContext, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Body, Head, Html, Meta, Scripts } from "@tanstack/start";
import * as React from "react";
import appCss from "~/styles/app.css?url";
import type { QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient; getTitle?: () => string }>()({
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
