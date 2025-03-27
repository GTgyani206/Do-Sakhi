"use client"

import { useAuth } from "@/components/auth-provider"
import CreateBroadcastForm from "@/components/create-broadcast-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginDialog } from "@/components/login-dialog"
import { useState } from "react"
import { LockIcon } from "lucide-react"

export default function CreateBroadcastSection() {
  const { isLoggedIn, setIsLoggedIn } = useAuth()
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  if (!isLoggedIn) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LockIcon className="h-5 w-5" />
            NGO Access Required
          </CardTitle>
          <CardDescription>You need to be logged in as an NGO to create broadcasts</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setShowLoginDialog(true)}>Login to Create Broadcasts</Button>
          <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} onSuccess={() => setIsLoggedIn(true)} />
        </CardContent>
      </Card>
    )
  }

  return <CreateBroadcastForm />
}

