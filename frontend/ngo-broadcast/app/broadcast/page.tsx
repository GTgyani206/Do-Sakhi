import BroadcastFeed from "@/components/broadcast-feed";
import CreateBroadcastSection from "@/components/create-broadcast-section";
import { Toaster } from "@/components/ui/toaster";

export default function Broadcast() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-6 max-w-3xl px-4">
        <CreateBroadcastSection />
        <BroadcastFeed />
      </main>
      <Toaster />
    </div>
  );
}
