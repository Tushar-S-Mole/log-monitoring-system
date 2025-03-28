import { DashboardHeader } from "@/components/dashboard-header"
import { LogsView } from "@/components/logs-view"

export default function LogsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 p-6 md:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Logs Explorer</h1>
          <p className="text-muted-foreground">Search, filter, and analyze logs across all systems</p>
        </div>
        <LogsView />
      </div>
    </main>
  )
}

