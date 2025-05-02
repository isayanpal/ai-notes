"use client";

import { signout } from "@/actions/auth/actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SignOutButton() {
  return (
    <Button
      // variant="destructive"
      onClick={async () => {
        await signout();
        toast(
          "Logged Out!"
        );
      }}
      className="bg-[#b91c1c] text-white hover:text-white hover:bg-red-600"
    >
      Sign Out
    </Button>
  );
}