"use client"

import { useState } from "react"
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Database,
  Filter,
  MessageSquare,
  Plus,
  RefreshCw,
  Search,
  Server,
  Settings,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface System {
  id: string
  name: string
  type: "server" | "database" | "messaging"
  status: "healthy" | "warning" | "critical" | "maintenance"
  load: number
  uptime: string
  version: string
  location: string
  details: string
}

export function SystemsView() {
  const [selectedSystem, setSelectedSystem] = useState<System | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  // Mock data - in a real app, this would come from an API
  const systems: System[] = [
    {
      id: "sys-1",
      name: "WebSphere Liberty Prod",
      type: "server",
      status: "healthy",
      load: 42,
      uptime: "45d 12h",
      version: "22.0.0.3",
      location: "US-East",
      details: "Primary application server for customer-facing applications. Running on Red Hat OpenShift.",
    },
    {
      id: "sys-2",
      name: "DB2 Production",
      type: "database",
      status: "critical",
      load: 92,
      uptime: "12d 5h",
      version: "11.5.7",
      location: "US-East",
      details: "Primary transactional database. High load due to end-of-month processing.",
    },
    {
      id: "sys-3",
      name: "IBM MQ Cluster",
      type: "messaging",
      status: "warning",
      load: 78,
      uptime: "30d 8h",
      version: "9.2.5",
      location: "US-East",
      details: "Message broker for asynchronous processing. Queue depth increasing.",
    },
    {
      id: "sys-4",
      name: "Tomcat App Server",
      type: "server",
      status: "healthy",
      load: 35,
      uptime: "15d 22h",
      version: "10.0.12",
      location: "US-West",
      details: "Secondary application server for internal applications.",
    },
    {
      id: "sys-5",
      name: "Oracle RAC",
      type: "database",
      status: "healthy",
      load: 65,
      uptime: "60d 14h",
      version: "19c",
      location: "US-West",
      details: "Reporting database cluster. Used for business intelligence applications.",
    },
    {
      id: "sys-6",
      name: "Apache Kafka",
      type: "messaging",
      status: "maintenance",
      load: 0,
      uptime: "0d 0h",
      version: "3.2.1",
      location: "US-Central",
      details: "Event streaming platform. Currently undergoing scheduled maintenance and upgrades.",
    },
    {
      id: "sys-7",
      name: "MongoDB Cluster",
      type: "database",
      status: "healthy",
      load: 28,
      uptime: "25d 6h",
      version: "5.0.9",
      location: "US-East",
      details: "NoSQL database for customer profile data and preferences.",
    },
    {
      id: "sys-8",
      name: "ActiveMQ",
      type: "messaging",
      status: "warning",
      load: 72,
      uptime: "18d 3h",
      version: "5.17.1",
      location: "US-West",
      details: "Legacy message broker. Scheduled for migration to Kafka.",
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

  const getStatusBadge = (status: System["status"]) => {
    switch (status) {
      case "healthy":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800/20 dark:text-green-400 dark:hover:bg-green-800/30"
          >
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Healthy
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="warning" className="bg-yellow-500 hover:bg-yellow-600">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Warning
          </Badge>
        )
      case "critical":
        return (
          <Badge variant="destructive">
            <AlertCircle className="mr-1 h-3 w-3" />
            Critical
          </Badge>
        )
      case "maintenance":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-800/20 dark:text-blue-400 dark:hover:bg-blue-800/30"
          >
            <Settings className="mr-1 h-3 w-3" />
            Maintenance
          </Badge>
        )
    }
  }

  const getLoadColor = (load: number) => {
    if (load >= 90) return "bg-destructive"
    if (load >= 70) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Systems Management</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add System
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search systems..." className="w-full pl-8" />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Systems</TabsTrigger>
              <TabsTrigger value="servers">Servers</TabsTrigger>
              <TabsTrigger value="databases">Databases</TabsTrigger>
              <TabsTrigger value="messaging">Messaging</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {systems.map((system) => (
                  <Card key={system.id} className="overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="flex items-center gap-2">
                        {getSystemIcon(system.type)}
                        <CardTitle className="text-base">{system.name}</CardTitle>
                      </div>
                      {getStatusIcon(system.status)}
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Status:</span> {getStatusBadge(system.status)}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Uptime:</span> {system.uptime}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Version:</span> {system.version}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Location:</span> {system.location}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">System Load</span>
                            <span>{system.load}%</span>
                          </div>
                          <Progress value={system.load} className={getLoadColor(system.load)} />
                        </div>
                        <Button variant="outline" className="w-full" onClick={() => setSelectedSystem(system)}>
                          Manage
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="servers" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {systems
                  .filter((system) => system.type === "server")
                  .map((system) => (
                    <Card key={system.id} className="overflow-hidden">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="flex items-center gap-2">
                          {getSystemIcon(system.type)}
                          <CardTitle className="text-base">{system.name}</CardTitle>
                        </div>
                        {getStatusIcon(system.status)}
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Status:</span> {getStatusBadge(system.status)}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Uptime:</span> {system.uptime}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Version:</span> {system.version}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Location:</span> {system.location}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">System Load</span>
                              <span>{system.load}%</span>
                            </div>
                            <Progress value={system.load} className={getLoadColor(system.load)} />
                          </div>
                          <Button variant="outline" className="w-full" onClick={() => setSelectedSystem(system)}>
                            Manage
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            {/* Similar content for other tabs */}
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={!!selectedSystem} onOpenChange={(open) => !open && setSelectedSystem(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>System Details</DialogTitle>
            <DialogDescription>View and manage system configuration</DialogDescription>
          </DialogHeader>
          {selectedSystem && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {getSystemIcon(selectedSystem.type)}
                <h3 className="text-lg font-semibold">{selectedSystem.name}</h3>
                {getStatusBadge(selectedSystem.status)}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Type</h4>
                  <p className="capitalize">{selectedSystem.type}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Version</h4>
                  <p>{selectedSystem.version}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                  <p>{selectedSystem.location}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Uptime</h4>
                  <p>{selectedSystem.uptime}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Details</h4>
                <p className="mt-1 rounded-md bg-muted p-3 text-sm">{selectedSystem.details}</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">System Load</h4>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Current Load</span>
                    <span>{selectedSystem.load}%</span>
                  </div>
                  <Progress value={selectedSystem.load} className={getLoadColor(selectedSystem.load)} />
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Update Status</h4>
                <Select defaultValue={selectedSystem.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="healthy">Healthy</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Add Notes</h4>
                <Textarea placeholder="Add maintenance notes or system details..." />
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Update System</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

