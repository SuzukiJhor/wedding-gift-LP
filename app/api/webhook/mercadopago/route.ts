import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { createClient } from "@supabase/supabase-js";

const mp = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
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

    // consulta pagamento real
    const payment = await new Payment(mp).get({ id: paymentId });

    const status = payment.status;
    const preferenceId = payment.order?.id || payment.metadata?.preference_id;
    const payerName = payment.payer?.first_name || "Convidado";

    console.log("Pagamento recebido:", paymentId, status);

    if (status === "approved") {
      // atualiza presentes
      await supabase
        .from("received_gifts")
        .update({
          status: "paid",
          payment_id: paymentId,
        })
        .eq("preference_id", preferenceId);

      console.log(`✅ Pagamento aprovado de ${payerName}`);
    }

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook failure" }, { status: 500 });
  }
}
