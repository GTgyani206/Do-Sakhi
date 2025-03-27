import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Broadcast } from "@/lib/actions"
import { formatDistanceToNow } from "date-fns"
import { Heart, MessageSquare, Share } from "lucide-react"

interface BroadcastItemProps {
  broadcast: Broadcast
}

export default function BroadcastItem({ broadcast }: BroadcastItemProps) {
  return (
    <Card className="border-muted">
      <CardHeader className="flex flex-row items-start gap-4 pb-2">
        <Avatar>
          <AvatarImage
            src={`/placeholder.svg?height=40&width=40&text=${broadcast.ngoName.charAt(0)}`}
            alt={broadcast.ngoName}
          />
          <AvatarFallback>{broadcast.ngoName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <h3 className="font-semibold">{broadcast.ngoName}</h3>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(broadcast.createdAt), { addSuffix: true })}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{broadcast.content}</p>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex gap-4 w-full">
          <Button variant="ghost" size="sm" className="gap-1">
            <Heart className="h-4 w-4" />
            <span>{broadcast.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{broadcast.comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1 ml-auto">
            <Share className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

