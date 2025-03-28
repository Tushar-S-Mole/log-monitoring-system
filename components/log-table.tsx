"use client"

import { useState } from "react"
import { AlertCircle, AlertTriangle, Info } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type LogLevel = "error" | "warning" | "info" | "debug"

interface Log {
  id: string
  timestamp: string
  level: LogLevel
  source: string
  message: string
  details: string
}

interface LogTableProps {
  type?: LogLevel
}

export function LogTable({ type }: LogTableProps = {}) {
  const [selectedLog, setSelectedLog] = useState<Log | null>(null)

  // Mock data - in a real app, this would come from an API
  const logs: Log[] = [
    {
      id: "log-1",
      timestamp: "2023-08-15 14:32:45",
      level: "error",
      source: "WebSphere Liberty",
      message: "Connection refused to database DB2PROD",
      details:
        "java.sql.SQLException: Connection refused. The connection attempt failed because the server is not accepting connections or the connection timed out. (Connection refused)",
    },
    {
      id: "log-2",
      timestamp: "2023-08-15 14:30:22",
      level: "warning",
      source: "IBM MQ",
      message: "Message delivery delayed",
      details: "MQRC_Q_FULL: Queue SYSTEM.DEF.SVRCONN is full. Messages are being queued for later delivery.",
    },
    {
      id: "log-3",
      timestamp: "2023-08-15 14:28:17",
      level: "info",
      source: "Tomcat",
      message: "Application deployed successfully",
      details: "Application 'customer-portal' deployed successfully on node 'app-server-01'.",
    },
    {
      id: "log-4",
      timestamp: "2023-08-15 14:25:33",
      level: "error",
      source: "Oracle DB",
      message: "ORA-12514: TNS listener could not resolve SERVICE_NAME",
      details:
        "ORA-12514: TNS:listener does not currently know of service requested in connect descriptor. The database instance may not be registered or the service name might be incorrect.",
    },
    {
      id: "log-5",
      timestamp: "2023-08-15 14:20:11",
      level: "warning",
      source: "Apache Kafka",
      message: "Consumer lag detected",
      details: "Consumer group 'order-processing' is lagging behind by 15,000 messages on topic 'customer-orders'.",
    },
    {
      id: "log-6",
      timestamp: "2023-08-15 14:15:42",
      level: "info",
      source: "ActiveMQ",
      message: "Queue size threshold reached",
      details: "Queue 'ORDERS.QUEUE' has reached 75% capacity (1500/2000 messages).",
    },
    {
      id: "log-7",
      timestamp: "2023-08-15 14:10:05",
      level: "error",
      source: "MongoDB",
      message: "Write operation failed",
      details:
        "Write operation failed: { WriteError: { code: 11000, errmsg: 'E11000 duplicate key error collection: customers.profiles index: email_1 dup key: { email: \"user@example.com\" }' } }",
    },
  ]

  const filteredLogs = type ? logs.filter((log) => log.level === type) : logs

  const getLevelBadge = (level: LogLevel) => {
    switch (level) {
      case "error":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Error
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
            <Info className="h-3 w-3" />
            Info
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            Debug
          </Badge>
        )
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Timestamp</TableHead>
              <TableHead className="w-[100px]">Level</TableHead>
              <TableHead className="w-[150px]">Source</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                <TableCell>{getLevelBadge(log.level)}</TableCell>
                <TableCell>{log.source}</TableCell>
                <TableCell className="max-w-[400px] truncate">{log.message}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedLog(log)}>
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedLog} onOpenChange={(open) => !open && setSelectedLog(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Log Details</DialogTitle>
            <DialogDescription>Full information about the selected log entry</DialogDescription>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Timestamp</h4>
                  <p className="font-mono">{selectedLog.timestamp}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Level</h4>
                  <div className="mt-1">{getLevelBadge(selectedLog.level)}</div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Source</h4>
                  <p>{selectedLog.source}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Log ID</h4>
                  <p className="font-mono">{selectedLog.id}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Message</h4>
                <p>{selectedLog.message}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Details</h4>
                <pre className="mt-2 max-h-[300px] overflow-auto rounded-md bg-muted p-4 font-mono text-sm">
                  {selectedLog.details}
                </pre>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

