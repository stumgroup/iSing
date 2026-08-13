import { NextResponse } from "next/server";
import { createInHouseTask } from "@/lib/ai/inhouse-composer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await createInHouseTask(body);
    return NextResponse.json(result, { status: result.ok ? 200 : 400 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Generation failed.",
      },
      { status: 500 }
    );
  }
}
