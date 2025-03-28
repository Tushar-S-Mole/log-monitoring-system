"use client"

import { useEffect, useRef } from "react"

export function LogStatistics() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Mock data for the chart
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const totalLogs = [120000, 145000, 160000, 130000, 170000, 90000, 110000]
    const errorLogs = [2400, 3600, 5800, 3900, 4250, 1800, 2200]

    // Chart configuration
    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, canvas.height - padding)
    ctx.lineTo(canvas.width - padding, canvas.height - padding)
    ctx.strokeStyle = "#d1d5db"
    ctx.stroke()

    // Draw total logs bars
    const barWidth = chartWidth / days.length / 3
    const barSpacing = chartWidth / days.length

    const maxTotal = Math.max(...totalLogs)

    totalLogs.forEach((value, index) => {
      const barHeight = (value / maxTotal) * chartHeight
      const x = padding + index * barSpacing + barWidth
      const y = canvas.height - padding - barHeight

      ctx.fillStyle = "rgba(59, 130, 246, 0.5)"
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw day label
      ctx.fillStyle = "#6b7280"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(days[index], x + barWidth / 2, canvas.height - padding + 20)
    })

    // Draw error logs line
    const maxError = Math.max(...errorLogs)
    const errorScale = chartHeight / maxError

    ctx.beginPath()
    errorLogs.forEach((value, index) => {
      const x = padding + index * barSpacing + barWidth * 1.5
      const y = canvas.height - padding - value * errorScale

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.strokeStyle = "#ef4444"
    ctx.lineWidth = 2
    ctx.stroke()

    // Add points to the line
    errorLogs.forEach((value, index) => {
      const x = padding + index * barSpacing + barWidth * 1.5
      const y = canvas.height - padding - value * errorScale

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = "#ef4444"
      ctx.fill()
    })

    // Add legend
    ctx.fillStyle = "rgba(59, 130, 246, 0.5)"
    ctx.fillRect(padding, padding - 20, 15, 15)

    ctx.fillStyle = "#6b7280"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "left"
    ctx.fillText("Total Logs", padding + 20, padding - 10)

    ctx.beginPath()
    ctx.arc(padding + 7.5, padding - 10, 4, 0, Math.PI * 2)
    ctx.fillStyle = "#ef4444"
    ctx.fill()

    ctx.strokeStyle = "#ef4444"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(padding, padding - 10)
    ctx.lineTo(padding - 15, padding - 10)
    ctx.stroke()

    ctx.fillStyle = "#6b7280"
    ctx.fillText("Error Logs", padding + 20, padding - 10 + 20)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <div className="h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}

