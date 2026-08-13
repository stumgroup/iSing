export type PaymentRequest = {
  userId: string;
  orderId: string;
  amount: number;
  currency: string;
  product: "audio" | "video";
  phone?: string;
};

export async function createPayment(request: PaymentRequest) {
  const provider = process.env.PAYMENT_PROVIDER;
  const apiKey = process.env.PAYMENT_API_KEY;

  if (!provider || !apiKey) {
    return { status: "pending", providerReference: `demo_payment_${Date.now()}` };
  }

  throw new Error(`Payment provider "${provider}" is configured but its adapter is not implemented yet.`);
}
