"use client"

import { AlertCircle, AlertTriangle, ArrowUpRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Alert {
  id: string
  level: "critical" | "warning" | "resolved"
  message: string
  source: string
  timestamp: string
}

export function AlertsPanel() {
  // Mock data - in a real app, this would come from an API
  const alerts: Alert[] = [
    {
      id: "alert-1",
      level: "critical",
      message: "Database connection failure",
      source: "DB2 Production",
      timestamp: "10 min ago",
    },
    {
      id: "alert-2",
      level: "critical",
      message: "High CPU usage (95%)",
      source: "WebSphere Liberty",
      timestamp: "15 min ago",
    },
    {
      id: "alert-3",
      level: "critical",
      message: "Disk space critical (98%)",
      source: "App Server 03",
      timestamp: "25 min ago",
    },
    {
      id: "alert-4",
      level: "warning",
      message: "Message queue backup",
      source: "IBM MQ",
      timestamp: "30 min ago",
    },
    {
      id: "alert-5",
      level: "warning",
      message: "Slow response time",
      source: "Customer API",
      timestamp: "45 min ago",
    },
    {
      id: "alert-6",
      level: "warning",
      message: "Memory usage high (85%)",
      source: "Tomcat Server",
      timestamp: "1 hour ago",
    },
    {
      id: "alert-7",
      level: "warning",
      message: "Connection pool near limit",
      source: "Oracle DB",
      timestamp: "1.5 hours ago",
    },
    {
      id: "alert-8",
      level: "resolved",
      message: "Service unavailable",
      source: "Payment Gateway",
      timestamp: "2 hours ago",
    },
  ]

  const getAlertIcon = (level: Alert["level"]) => {
    switch (level) {
      case "critical":
        return <AlertCircle className="h-5 w-5 text-destructive" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "resolved":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
    }
  }

  return (
    <div className="space-y-4">
      {alerts.slice(0, 5).map((alert) => (
        <div key={alert.id} className="flex items-start gap-3 rounded-lg border p-3 text-sm">
          {getAlertIcon(alert.level)}
          <div className="flex-1 space-y-1">
            <div className="font-medium">{alert.message}</div>
            <div className="text-xs text-muted-foreground">
              {alert.source} • {alert.timestamp}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <ArrowUpRight className="h-4 w-4" />
            <span className="sr-only">View details</span>
          </Button>
        </div>
      ))}
    </div>
  )
}

