import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/user-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Globe } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Globe className="h-6 w-6" />
          <span className="font-bold text-xl">NGO Broadcast</span>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="outline" asChild>
            <Link href="/about">About</Link>
          </Button>
          <UserButton />
        </div>
      </div>
    </header>
  );
}
