import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { createClient } from "@supabase/supabase-js";

const mp = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.type !== "payment") {
      return NextResponse.json({ ignored: true });
    }

    const paymentId = body.data?.id;
    if (!paymentId) {
      return NextResponse.json({ error: "No payment id" }, { status: 400 });
    }

    const payment = await new Payment(mp).get({ id: paymentId });

    const status = payment.status;
    const preferenceId =
      payment.order?.id || payment.external_reference;

    console.log("📩 MP Webhook:", {
      paymentId,
      status,
      preferenceId,
    });

    if (status === "approved" && preferenceId) {
      const { data, error } = await supabase
        .from("received_gifts")
        .update({
          status: "paid",
          payment_id: paymentId,
        })
        .eq("preference_id", preferenceId)
        .select();

      if (error) {
        console.error("DB error:", error);
      }

      console.log("🎁 Atualizados:", data?.length ?? 0);
    }

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error("Webhook fatal:", err);
    return NextResponse.json({ error: "Webhook failure" }, { status: 500 });
  }
}
