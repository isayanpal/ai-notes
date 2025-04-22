"use client";

import { signout } from "@/actions/auth/actions";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  return (
    <Button
      // variant="destructive"
      onClick={async () => {
        await signout();
      }}
      className="bg-[#b91c1c] text-white hover:text-white hover:bg-red-600"
    >
      Sign Out
    </Button>
  );
}