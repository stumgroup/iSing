import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET() {
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({
      songs: 0, videos: 0, users: 0, countries: 0, previews: 0,
      generated: 0, shared: 0, live: false,
    });
  }

  const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  const [songs, videos, users, countries, previews, shared] = await Promise.all([
    supabase.from("songs").select("id", { count: "exact", head: true }),
    supabase.from("videos").select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("country").not("country", "is", null),
    supabase.from("songs").select("id", { count: "exact", head: true }).eq("preview_ready", true),
    supabase.from("songs").select("id", { count: "exact", head: true }).gt("share_count", 0),
  ]);

  const uniqueCountries = new Set(
    (countries.data ?? []).map((row: { country: string | null }) => row.country?.trim().toUpperCase()).filter(Boolean)
  ).size;

  return NextResponse.json({
    songs: songs.count ?? 0,
    videos: videos.count ?? 0,
    users: users.count ?? 0,
    countries: uniqueCountries,
    previews: previews.count ?? 0,
    generated: (songs.count ?? 0) + (videos.count ?? 0),
    shared: shared.count ?? 0,
    live: true,
  }, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const event = String(body?.event ?? "").trim();
    const allowed = new Set(["landing_view", "create_started", "prompt_submitted", "preview_played", "share_clicked", "pricing_viewed"]);
    if (!allowed.has(event)) return NextResponse.json({ ok: false }, { status: 400 });

    if (!supabaseUrl || !serviceKey) return NextResponse.json({ ok: true });
    const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
    const { error } = await supabase.from("analytics_events").insert({
      event,
      path: typeof body?.path === "string" ? body.path.slice(0, 500) : null,
      country: typeof body?.country === "string" ? body.country.slice(0, 8).toUpperCase() : null,
      metadata: typeof body?.metadata === "object" && body.metadata ? body.metadata : {},
    });
    if (error) console.error("analytics event:", error.message);
    return NextResponse.json({ ok: !error });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
