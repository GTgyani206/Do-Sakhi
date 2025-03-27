"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { createBroadcast } from "@/lib/actions"
import { Globe, Image, Link2, Loader2 } from "lucide-react"
import { useState } from "react"

export default function CreateBroadcastForm() {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { ngoId, ngoName } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)
    try {
      await createBroadcast({ content, ngoId, ngoName })
      setContent("")
      toast({
        title: "Broadcast created",
        description: "Your broadcast has been published successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create broadcast. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <Textarea
            placeholder="Share your NGO's latest schemes or announcements..."
            className="min-h-[120px] mb-4 resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button type="button" size="icon" variant="ghost">
                <Image className="h-5 w-5" />
              </Button>
              <Button type="button" size="icon" variant="ghost">
                <Link2 className="h-5 w-5" />
              </Button>
              <Button type="button" size="icon" variant="ghost">
                <Globe className="h-5 w-5" />
              </Button>
            </div>
            <Button type="submit" disabled={isSubmitting || !content.trim()}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing
                </>
              ) : (
                "Publish"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

