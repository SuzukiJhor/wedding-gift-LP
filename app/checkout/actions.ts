"use server";

import { MercadoPagoConfig, Preference } from "mercadopago";
import { getSupabase } from "../rsvp/actions";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

type CheckoutItem = {
  product: {
    id: string | number;
    name: string;
    price: number | string;
  };
  quantity: number;
};

type CheckoutPayload = {
  name: string;
  email: string;
  taxId: string;
  message?: string;
  items: CheckoutItem[];
};

export async function createCheckoutAction(data: CheckoutPayload) {
  try {
    const supabase = await getSupabase();

    // limpa CPF/CNPJ
    const cleanTaxId = data.taxId.replace(/\D/g, "");

    if (!data.name || !data.email || cleanTaxId.length < 11) {
      return { error: "Dados inválidos." };
    }

    if (!data.items?.length) {
      return { error: "Nenhum item selecionado." };
    }

    // cria preferência Mercado Pago
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: data.items.map(item => ({
          id: String(item.product.id),
          title: item.product.name,
          quantity: item.quantity,
          unit_price: Number(item.product.price),
          currency_id: "BRL",
        })),

        payer: {
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          identification: {
            type: cleanTaxId.length === 11 ? "CPF" : "CNPJ",
            number: cleanTaxId,
          },
        },

        back_urls: {
          success: `${baseUrl}/agradecimento`,
          failure: `${baseUrl}/erro`,
          pending: `${baseUrl}/pendente`,
        },

        auto_return: "approved",

        notification_url: `${baseUrl}/api/webhook/mercadopago`,

        metadata: {
          customer_name: data.name,
          message: data.message ?? "",
        },
      },
    });

    if (!result.id) {
      return { error: "Erro ao gerar preferência." };
    }

    // salva presentes como pendentes
    const inserts = data.items.map(item =>
      supabase.from("received_gifts").insert({
        gift_id: item.product.id,
        sender_name: data.name,
        message: data.message,
        amount_paid: Number(item.product.price) * item.quantity,
        status: "pending",
        preference_id: result.id,
      })
    );

    await Promise.all(inserts);

    return {
      url: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${result.id}&platform_id=mp&source=web`,
    };
  } catch (error) {
    console.error("Erro checkout:", error);
    return { error: "Erro interno ao gerar pagamento." };
  }
}
