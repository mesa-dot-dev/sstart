import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AppSidebar } from '~/components/app-sidebar'

export const Route = createFileRoute('/old-busted/old-and-busted-layout')({
  component: DashboardLayout,
})
function DashboardLayout() {
  return (
    <AppSidebar>
      <Outlet />
    </AppSidebar>
  )
}
