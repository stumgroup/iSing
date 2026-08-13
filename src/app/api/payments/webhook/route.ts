import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Verify the gateway signature here before updating orders.
  const payload = await request.json();
  console.log("Payment webhook received", payload);
  return NextResponse.json({ received: true });
}
