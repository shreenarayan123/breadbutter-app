"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col bg-amber-100 items-center justify-center min-h-screen p-4">
      <Link href={"/login"}>
        {" "}
        <Button>New Customer</Button>
      </Link>
    </div>
  );
}
