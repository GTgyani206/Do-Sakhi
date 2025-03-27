import BroadcastFeed from "@/components/broadcast-feed";
import CreateBroadcastSection from "@/components/create-broadcast-section";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import Character from "@/components/home";

export default function Home() {
  return (
    <div className=" bg-background">
      <Character />
    </div>
  );
}
