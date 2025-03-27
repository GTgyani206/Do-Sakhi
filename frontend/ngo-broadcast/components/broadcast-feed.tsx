"use client"

import { useEffect, useState } from "react"
import BroadcastItem from "./broadcast-item"
import { type Broadcast, fetchBroadcasts } from "@/lib/actions"
import { Skeleton } from "./ui/skeleton"

export default function BroadcastFeed() {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBroadcasts = async () => {
      try {
        const data = await fetchBroadcasts()
        setBroadcasts(data)
      } catch (error) {
        console.error("Failed to fetch broadcasts:", error)
      } finally {
        setLoading(false)
      }
    }

    loadBroadcasts()

    // Set up polling for new broadcasts
    const interval = setInterval(loadBroadcasts, 30000) // Poll every 30 seconds
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
            <Skeleton className="h-24 w-full" />
          </div>
        ))}
      </div>
    )
  }

  if (broadcasts.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <h3 className="text-lg font-medium">No broadcasts yet</h3>
        <p className="text-muted-foreground">Be the first to share an announcement!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {broadcasts.map((broadcast) => (
        <BroadcastItem key={broadcast.id} broadcast={broadcast} />
      ))}
    </div>
  )
}

