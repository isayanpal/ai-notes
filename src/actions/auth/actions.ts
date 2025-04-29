"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { toast } from "sonner";

export async function signup(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    toast("Signup failed, please try again");
    throw new Error(error.message);
  }
  revalidatePath("/", "layout");
  redirect("/signin");
  toast(
    "Your account has been created ,please check your email to verify your account"
  );
}

export async function signin(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    toast("Signin failed, please try again");

    throw new Error(error.message);
  }
  revalidatePath("/", "layout");
  redirect("/");
  toast(
    "Welcome back!"
  );
}

export async function signout() {
  const supabase = createClient();

  let { error } = await supabase.auth.signOut();

  if (error) {
    toast("Signout failed, please try again");
    throw new Error(error.message);
  }

  redirect("/signin");
  toast( "You have been signed out. Redirecting to signin...");

}
