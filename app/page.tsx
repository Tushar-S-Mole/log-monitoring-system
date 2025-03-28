import { DashboardHeader } from "@/components/dashboard-header"
import { LogMonitoringDashboard } from "@/components/log-monitoring-dashboard"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 p-6 md:p-8">
        <LogMonitoringDashboard />
      </div>
    </main>
  )
}

