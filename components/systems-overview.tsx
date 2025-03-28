"use client"

import { Server, Database, MessageSquare, AlertTriangle, CheckCircle2, XCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface System {
  id: string
  name: string
  type: "server" | "database" | "messaging"
  status: "healthy" | "warning" | "critical" | "maintenance"
  load: number
  uptime: string
}

export function SystemsOverview() {
  // Mock data - in a real app, this would come from an API
  const systems: System[] = [
    {
      id: "sys-1",
      name: "WebSphere Liberty Prod",
      type: "server",
      status: "healthy",
      load: 42,
      uptime: "45d 12h",
    },
    {
      id: "sys-2",
      name: "DB2 Production",
      type: "database",
      status: "critical",
      load: 92,
      uptime: "12d 5h",
    },
    {
      id: "sys-3",
      name: "IBM MQ Cluster",
      type: "messaging",
      status: "warning",
      load: 78,
      uptime: "30d 8h",
    },
    {
      id: "sys-4",
      name: "Tomcat App Server",
      type: "server",
      status: "healthy",
      load: 35,
      uptime: "15d 22h",
    },
    {
      id: "sys-5",
      name: "Oracle RAC",
      type: "database",
      status: "healthy",
      load: 65,
      uptime: "60d 14h",
    },
    {
      id: "sys-6",
      name: "Apache Kafka",
      type: "messaging",
      status: "maintenance",
      load: 0,
      uptime: "0d 0h",
    },
  ]

  const getSystemIcon = (type: System["type"]) => {
    switch (type) {
      case "server":
        return <Server className="h-5 w-5" />
      case "database":
        return <Database className="h-5 w-5" />
      case "messaging":
        return <MessageSquare className="h-5 w-5" />
    }
  }

  const getStatusIcon = (status: System["status"]) => {
    switch (status) {
      case "healthy":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "critical":
        return <XCircle className="h-5 w-5 text-destructive" />
      case "maintenance":
        return <AlertTriangle className="h-5 w-5 text-blue-500" />
    }
  }

  const getLoadColor = (load: number) => {
    if (load >= 90) return "bg-destructive"
    if (load >= 70) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="space-y-4">
      {systems.map((system) => (
        <div key={system.id} className="flex flex-col space-y-2 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getSystemIcon(system.type)}
              <span className="font-medium">{system.name}</span>
            </div>
            {getStatusIcon(system.status)}
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Status:</span> <span className="capitalize">{system.status}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Uptime:</span> {system.uptime}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">System Load</span>
              <span>{system.load}%</span>
            </div>
            <Progress value={system.load} className={getLoadColor(system.load)} />
          </div>
        </div>
      ))}
    </div>
  )
}

