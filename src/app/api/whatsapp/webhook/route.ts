import { NextResponse } from "next/server";
import { sendWhatsAppText } from "@/lib/whatsapp";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) return new Response(challenge || "", {status:200});
  return new Response("Forbidden",{status:403});
}

export async function POST(request: Request) {
  const body = await request.json();
  const message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if (message?.from) {
    const text = message?.text?.body || "";
    await sendWhatsAppText(message.from, `🎵 iSing received: "${text}". Your AI music workflow is connected.`);
  }
  return NextResponse.json({ received:true });
}
