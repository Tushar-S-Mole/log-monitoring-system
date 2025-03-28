"use client"

import { useState } from "react"
import { AlertCircle, ArrowRight, Filter, RefreshCw, Search, Server, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogTable } from "@/components/log-table"
import { SystemsOverview } from "@/components/systems-overview"
import { AlertsPanel } from "@/components/alerts-panel"
import { LogStatistics } from "@/components/log-statistics"

export function LogMonitoringDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Log Monitoring Dashboard</h1>
          <p className="text-muted-foreground">Monitor and analyze logs across your enterprise systems</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button size="sm">
            <AlertCircle className="mr-2 h-4 w-4" />
            Configure Alerts
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Logs</CardTitle>
            <Terminal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284,329</div>
            <p className="text-xs text-muted-foreground">+12.5% from last 24h</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4%</div>
            <p className="text-xs text-muted-foreground">-0.7% from last 24h</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Systems</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24/26</div>
            <p className="text-xs text-muted-foreground">2 systems in maintenance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">3 critical, 4 warnings</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        <Card className="md:col-span-4">
          <CardHeader className="flex flex-row items-center">
            <div className="flex-1">
              <CardTitle>Log Stream</CardTitle>
              <CardDescription>Real-time log entries from all systems</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search logs..." className="w-[200px] pl-8 md:w-[260px]" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Logs</TabsTrigger>
                <TabsTrigger value="errors">Errors</TabsTrigger>
                <TabsTrigger value="warnings">Warnings</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <LogTable />
              </TabsContent>
              <TabsContent value="errors" className="mt-4">
                <LogTable type="error" />
              </TabsContent>
              <TabsContent value="warnings" className="mt-4">
                <LogTable type="warning" />
              </TabsContent>
              <TabsContent value="info" className="mt-4">
                <LogTable type="info" />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              Export Logs
            </Button>
            <Button variant="outline" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
            <CardDescription>Alerts requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <AlertsPanel />
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              View All Alerts
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Log Statistics</CardTitle>
            <CardDescription>Log volume and error trends</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <LogStatistics />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Systems Overview</CardTitle>
            <CardDescription>Status of monitored systems</CardDescription>
          </CardHeader>
          <CardContent>
            <SystemsOverview />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

