import React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import SignOutButton from "../auth/SignOutButton";

export default async function Navbar() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <nav className="container mx-auto flex items-center justify-between p-4 bg-transparent font-sans">
      <Link href={"/"}>
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-500" />
          <span className="text-xl font-bold">NoteGenius</span>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        {data?.user ? (
          <div className="flex flex-row items-center gap-4">
            <Link href={"/dashboard"} className="ml-4">
            <Button variant="outline">Dashboard</Button>
            </Link>
            <SignOutButton />
          </div>
        ) : (
          <Link href={"/signin"}>
            <Button variant="outline" className="flex">
              Log in
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
