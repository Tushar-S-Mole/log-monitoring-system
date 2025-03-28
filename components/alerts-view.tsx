"use client"

import { useState } from "react"
import { AlertCircle, AlertTriangle, Bell, CheckCircle2, Filter, RefreshCw, Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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

interface Alert {
  id: string
  level: "critical" | "warning" | "info" | "resolved"
  message: string
  source: string
  timestamp: string
  details: string
  status: "new" | "acknowledged" | "in-progress" | "resolved"
}

export function AlertsView() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  // Mock data - in a real app, this would come from an API
  const alerts: Alert[] = [
    {
      id: "alert-1",
      level: "critical",
      message: "Database connection failure",
      source: "DB2 Production",
      timestamp: "2023-08-15 14:32:45",
      details:
        "Connection to DB2PROD failed with error code DB2-1013. The database instance may be down or network connectivity issues may be present.",
      status: "new",
    },
    {
      id: "alert-2",
      level: "critical",
      message: "High CPU usage (95%)",
      source: "WebSphere Liberty",
      timestamp: "2023-08-15 14:25:12",
      details:
        "CPU usage has exceeded the critical threshold of 90% for more than 5 minutes. This may indicate a runaway process or insufficient resources.",
      status: "acknowledged",
    },
    {
      id: "alert-3",
      level: "critical",
      message: "Disk space critical (98%)",
      source: "App Server 03",
      timestamp: "2023-08-15 14:15:33",
      details:
        "The /var partition is at 98% capacity. Applications may fail if disk space runs out. Immediate action required.",
      status: "in-progress",
    },
    {
      id: "alert-4",
      level: "warning",
      message: "Message queue backup",
      source: "IBM MQ",
      timestamp: "2023-08-15 14:10:22",
      details:
        "Queue SYSTEM.DEF.SVRCONN has exceeded 75% capacity. Messages may be delayed if the queue fills up completely.",
      status: "new",
    },
    {
      id: "alert-5",
      level: "warning",
      message: "Slow response time",
      source: "Customer API",
      timestamp: "2023-08-15 13:55:18",
      details:
        "API response times have exceeded the warning threshold of 2 seconds for the past 15 minutes. This may indicate performance issues.",
      status: "new",
    },
    {
      id: "alert-6",
      level: "warning",
      message: "Memory usage high (85%)",
      source: "Tomcat Server",
      timestamp: "2023-08-15 13:45:09",
      details:
        "Memory usage has exceeded the warning threshold of 80%. This may lead to performance degradation if usage continues to increase.",
      status: "acknowledged",
    },
    {
      id: "alert-7",
      level: "info",
      message: "System restart scheduled",
      source: "System Admin",
      timestamp: "2023-08-15 13:30:00",
      details: "A scheduled system restart has been planned for maintenance purposes at 02:00 AM tomorrow.",
      status: "acknowledged",
    },
    {
      id: "alert-8",
      level: "resolved",
      message: "Service unavailable",
      source: "Payment Gateway",
      timestamp: "2023-08-15 12:15:42",
      details:
        "The payment gateway service was unavailable for 15 minutes due to a network issue. The issue has been resolved and service has been restored.",
      status: "resolved",
    },
  ]

  const getLevelBadge = (level: Alert["level"]) => {
    switch (level) {
      case "critical":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Critical
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="warning" className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600">
            <AlertTriangle className="h-3 w-3" />
            Warning
          </Badge>
        )
      case "info":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Bell className="h-3 w-3" />
            Info
          </Badge>
        )
      case "resolved":
        return (
          <Badge
            variant="outline"
            className="flex items-center gap-1 bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800/20 dark:text-green-400 dark:hover:bg-green-800/30"
          >
            <CheckCircle2 className="h-3 w-3" />
            Resolved
          </Badge>
        )
    }
  }

  const getStatusBadge = (status: Alert["status"]) => {
    switch (status) {
      case "new":
        return <Badge>New</Badge>
      case "acknowledged":
        return <Badge variant="outline">Acknowledged</Badge>
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>
      case "resolved":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800/20 dark:text-green-400 dark:hover:bg-green-800/30"
          >
            Resolved
          </Badge>
        )
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Alert Management</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Configure
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search alerts..." className="w-full pl-8" />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Alerts</TabsTrigger>
              <TabsTrigger value="critical">Critical</TabsTrigger>
              <TabsTrigger value="warning">Warning</TabsTrigger>
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Level</TableHead>
                      <TableHead className="w-[180px]">Timestamp</TableHead>
                      <TableHead className="w-[150px]">Source</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead className="w-[120px]">Status</TableHead>
                      <TableHead className="w-[100px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alerts.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell>{getLevelBadge(alert.level)}</TableCell>
                        <TableCell className="font-mono text-xs">{alert.timestamp}</TableCell>
                        <TableCell>{alert.source}</TableCell>
                        <TableCell className="max-w-[400px] truncate">{alert.message}</TableCell>
                        <TableCell>{getStatusBadge(alert.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedAlert(alert)}>
                            Manage
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="critical" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Level</TableHead>
                      <TableHead className="w-[180px]">Timestamp</TableHead>
                      <TableHead className="w-[150px]">Source</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead className="w-[120px]">Status</TableHead>
                      <TableHead className="w-[100px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alerts
                      .filter((alert) => alert.level === "critical")
                      .map((alert) => (
                        <TableRow key={alert.id}>
                          <TableCell>{getLevelBadge(alert.level)}</TableCell>
                          <TableCell className="font-mono text-xs">{alert.timestamp}</TableCell>
                          <TableCell>{alert.source}</TableCell>
                          <TableCell className="max-w-[400px] truncate">{alert.message}</TableCell>
                          <TableCell>{getStatusBadge(alert.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedAlert(alert)}>
                              Manage
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            {/* Similar content for other tabs */}
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={!!selectedAlert} onOpenChange={(open) => !open && setSelectedAlert(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Manage Alert</DialogTitle>
            <DialogDescription>View and update the status of this alert</DialogDescription>
          </DialogHeader>
          {selectedAlert && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Level</h4>
                  <div className="mt-1">{getLevelBadge(selectedAlert.level)}</div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                  <div className="mt-1">{getStatusBadge(selectedAlert.status)}</div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Source</h4>
                  <p>{selectedAlert.source}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Timestamp</h4>
                  <p className="font-mono">{selectedAlert.timestamp}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Message</h4>
                <p>{selectedAlert.message}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Details</h4>
                <p className="mt-1 rounded-md bg-muted p-3 text-sm">{selectedAlert.details}</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Update Status</h4>
                <Select defaultValue={selectedAlert.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="acknowledged">Acknowledged</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Add Comment</h4>
                <Textarea placeholder="Add notes or resolution details..." />
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Update Alert</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

