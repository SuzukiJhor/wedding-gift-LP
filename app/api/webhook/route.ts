import { NextResponse } from "next/server";
import crypto from "node:crypto";

// Esta chave é fornecida pelo AbacatePay na seção de Webhooks
const ABACATEPAY_PUBLIC_KEY = process.env.ABACATEPAY_WEBHOOK_PUBLIC_KEY || "";

function verifySignature(rawBody: string, signature: string) {
  const hmac = crypto.createHmac("sha256", ABACATEPAY_PUBLIC_KEY);
  hmac.update(rawBody);
  const expectedSignature = hmac.digest("base64");
  return expectedSignature === signature;
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-webhook-signature") || "";

    // 1. Validar se a requisição veio mesmo do AbacatePay
    if (!verifySignature(rawBody, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const { event, data } = payload;

    // 2. Tratar o evento de pagamento confirmado
    if (event === "billing.paid") {
      const metadata = data.metadata || [];
      const guestMessage = metadata.find((m: any) => m.key === "guest_message")?.value;
      const guestName = data.customer?.name;
      const amount = data.amount / 100; // Convertendo centavos para Real

      console.log(`✅ Sucesso! ${guestName} enviou um presente de R$ ${amount}`);
      console.log(`💌 Mensagem: ${guestMessage}`);

      // AQUI: Salve no seu banco de dados (Prisma, Supabase, etc.)
      // await db.gift.create({ data: { name: guestName, message: guestMessage, value: amount } });
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}