"use server";

import { MercadoPagoConfig, Payment } from "mercadopago";
import { createClient } from "@supabase/supabase-js";

const mp = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function verifyPaymentAndSave(paymentId: string) {
  if (!paymentId) return { status: "not_found" };

  try {
    // 1) busca pagamento real
    const payment = await new Payment(mp).get({ id: paymentId });

    const status = payment.status;

    if (status !== "approved") {
      return { status };
    }

    // 2) verifica se pedido já existe
    const { data: existing } = await supabase
      .from("orders")
      .select("id")
      .eq("payment_method", "mercadopago")
      .eq("id", paymentId)
      .maybeSingle();

    if (existing) {
      return { status: "approved" };
    }

    // 3) cria pedido
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        id: paymentId,
        guest_name: payment.payer?.first_name ?? "Convidado",
        guest_email: payment.payer?.email,
        total_amount: payment.transaction_amount,
        payment_method: "mercadopago",
        status: "paid",
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 4) adiciona itens do pedido
    const items = payment.additional_info?.items || [];

    for (const item of items) {
      await supabase.from("order_items").insert({
        order_id: order.id,
        gift_id: item.id,
        quantity: item.quantity,
        price: item.unit_price,
      });

      await supabase.from("received_gifts").insert({
        sender_name: payment.payer?.first_name,
        gift_id: item.id,
        amount_paid: item.unit_price * item.quantity,
        message: payment.metadata?.message || null,
      });
    }

    return {
      status: "approved",
      name: payment.payer?.first_name ?? null,
      value: payment.transaction_amount,
    };
  } catch (err) {
    console.error("Erro validação pagamento:", err);
    return { status: "error" };
  }
}
