import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({children}) {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900">
      <Navbar />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
