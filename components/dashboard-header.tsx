"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Menu, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"

export function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b px-4 py-2">
                  <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setIsOpen(false)}>
                    LogMonitor
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
                <nav className="flex-1 overflow-auto py-2">
                  <div className="px-4 py-2">
                    <h2 className="mb-2 text-lg font-semibold tracking-tight">Monitoring</h2>
                    <div className="space-y-1">
                      <Button variant="ghost" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                        Dashboard
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                        Logs
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                        Alerts
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                        Systems
                      </Button>
                    </div>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="hidden md:inline-block">Enterprise LogMonitor</span>
            <span className="inline-block md:hidden">LogMonitor</span>
          </Link>
        </div>
        <nav className="hidden gap-6 md:flex">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Dashboard
          </Link>
          <Link href="/logs" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Logs
          </Link>
          <Link
            href="/alerts"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Alerts
          </Link>
          <Link
            href="/systems"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Systems
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

