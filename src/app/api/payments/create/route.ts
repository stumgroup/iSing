import { NextResponse } from "next/server";
import { createPayment } from "@/lib/payments";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = body.product === "video" ? "video" : "audio";
    const amount = product === "video" ? 1 : 0.5;
    const result = await createPayment({
      userId: body.userId || "anonymous",
      orderId: body.orderId || `order_${Date.now()}`,
      amount,
      currency: body.currency || "USD",
      product,
      phone: body.phone
    });
    return NextResponse.json({ ok:true, amount, result });
  } catch (error) {
    return NextResponse.json({ ok:false, message:error instanceof Error?error.message:"Payment failed." }, {status:500});
  }
}
