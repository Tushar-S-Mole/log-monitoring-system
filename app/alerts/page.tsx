import { DashboardHeader } from "@/components/dashboard-header"
import { AlertsView } from "@/components/alerts-view"

export default function AlertsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 p-6 md:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Alerts Management</h1>
          <p className="text-muted-foreground">Monitor and respond to system alerts</p>
        </div>
        <AlertsView />
      </div>
    </main>
  )
}

