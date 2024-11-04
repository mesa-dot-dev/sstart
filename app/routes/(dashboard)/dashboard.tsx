import { createFileRoute, isMatch, Link, linkOptions, Outlet, useMatches } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/dashboard")({
  component: RouteComponent,
  loader: () => ({ breadcrumb: "Dashboard" }),
});

const DashboardBreadcrumb = () => {
  const matches = useMatches();

  if (matches.some((match) => match.status === "pending")) return null;

  const matchesWithCrumbs = matches.filter((match) => isMatch(match, "loaderData.breadcrumb"));

  return (
    <nav>
      <ul className="flex items-center gap-2">
        {matchesWithCrumbs.map((match, i) => (
          <li key={match.loaderData?.breadcrumb} className="flex gap-2">
            <Link className="text-blue-700" from={match.fullPath}>
              {match.loaderData?.breadcrumb}
            </Link>
            {i + 1 < matchesWithCrumbs.length ? <span className="">{">"}</span> : null}
          </li>
        ))}
      </ul>
    </nav>
  );
};

const options = [
  linkOptions({ to: "/dashboard", label: "Summary", activeOptions: { exact: true } }),
  linkOptions({ to: "/dashboard/tasks", label: "Tasks", activeOptions: { exact: true } }),
  linkOptions({ to: "/dashboard/users", label: "Users", activeOptions: { exact: true } }),
];

function RouteComponent() {
  return (
    <>
      <p>This is the dashboard component</p>
      <DashboardBreadcrumb />
      <div className="flex flex-wrap divide-x">
        {options.map((option) => {
          return (
            <Link key={option.to} {...option} activeProps={{ className: `font-bold` }} className="p-2">
              {option.label}
            </Link>
          );
        })}
      </div>
      <Outlet />
    </>
  );
}
