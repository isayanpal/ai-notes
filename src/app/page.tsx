import SignOutButton from "@/components/auth/SignOutButton";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/signin");
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-3xl">
      {!data?.user &&(
        <div>
          <p>You are not signed in</p>
        </div>
      )}
      {data?.user &&(
        <div className="flex flex-col items-center justify-center h-screen max-w-3xl">
          <p>Hello {data.user.email}</p>
          
          <div>
          <Link href="/dashboard">
          <Button className="text-white">
            Go to Dashboard
          </Button>
          </Link>
          </div>

          <div>
          <SignOutButton/>
          </div>
      </div>
      )}
    </div>
  );
}
