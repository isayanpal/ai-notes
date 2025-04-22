import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

function createSupabaseServerClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: async () => (await cookies()).getAll(),
        setAll: () => {}, // No-op in route handlers
      },
    }
  );
}

export async function PUT(request: NextRequest) {
  const supabase = createSupabaseServerClient();

  // Extract the 'id' from the request URL
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/");
  const id = segments[segments.length - 1]; // Assuming 'id' is the last segment

  try {
    const { title, content } = await request.json();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: existingNote, error: fetchError } = await supabase
      .from("notes")
      .select("user_id")
      .eq("id", id)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (!existingNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    if (existingNote.user_id !== user.id) {
      return NextResponse.json(
        {
          error:
            "Unauthorized: You do not have permission to update this note.",
        },
        { status: 403 }
      );
    }

    const { data, error } = await supabase
      .from("notes")
      .update({ title, content })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = createSupabaseServerClient();

  // Extract the 'id' from the request URL
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/");
  const id = segments[segments.length - 1]; // Assuming 'id' is the last segment

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: existingNote, error: fetchError } = await supabase
      .from("notes")
      .select("user_id")
      .eq("id", id)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (!existingNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    if (existingNote.user_id !== user.id) {
      return NextResponse.json(
        {
          error:
            "Unauthorized: You do not have permission to delete this note.",
        },
        { status: 403 }
      );
    }

    const { error } = await supabase.from("notes").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
