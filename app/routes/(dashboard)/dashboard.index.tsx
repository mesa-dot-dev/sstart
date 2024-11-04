import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <p>
        This is the main section of the dashboard. It's the first thing you see when opening the dashboard,
        but it's still viewed via the dashboard outlet.
      </p>
    </>
  );
}
