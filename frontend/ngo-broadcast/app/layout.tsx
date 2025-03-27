import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import "@/app/globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { HomeIcon, MegaphoneIcon } from "@heroicons/react/24/outline";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "NGO Broadcast",
  description:
    "A platform for NGOs to broadcast their schemes and announcements",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Header />
            {children}

            <div className="fixed bottom-0 w-full bg-white shadow-md">
              <nav className="flex justify-around py-2">
                {/* Explore Button */}
                <Link
                  href="/"
                  className="flex flex-col items-center text-gray-700 hover:text-indigo-500"
                >
                  <HomeIcon className="h-6 w-6" />
                  <span className="text-xs">Home</span>
                </Link>

                {/* Notifications Button */}
                <Link
                  href="/broadcast"
                  className="flex flex-col items-center text-gray-700 hover:text-indigo-500"
                >
                  <MegaphoneIcon className="h-6 w-6" />
                  <span className="text-xs">Broadcast</span>
                </Link>
              </nav>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
