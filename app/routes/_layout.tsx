import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "~/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";

export const Route = createFileRoute("/_layout")({
  component: HomeLayout,
});

function HomeLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex min-h-screen w-[inherit] flex-col items-center justify-center bg-gradient-to-b from-[#02496d] to-[#15162c] text-white">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
