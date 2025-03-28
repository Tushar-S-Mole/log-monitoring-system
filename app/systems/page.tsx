import { DashboardHeader } from "@/components/dashboard-header"
import { SystemsView } from "@/components/systems-view"

export default function SystemsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 p-6 md:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Systems Management</h1>
          <p className="text-muted-foreground">Monitor and manage all connected systems</p>
        </div>
        <SystemsView />
      </div>
    </main>
  )
}

