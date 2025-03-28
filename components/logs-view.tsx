"use client"

import { useState } from "react"
import { Calendar, ChevronDown, Download, Filter, RefreshCw, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogTable } from "@/components/log-table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

export function LogsView() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Log Explorer</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search logs by message, source, or ID..." className="w-full pl-8" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filter
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuCheckboxItem checked>Application Servers</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>Databases</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>Messaging</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>APIs</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>Security</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <Calendar className="h-4 w-4" />
                  Date
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Logs</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
            <TabsTrigger value="warnings">Warnings</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="debug">Debug</TabsTrigger>
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
          <TabsContent value="debug" className="mt-4">
            <LogTable type="debug" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

