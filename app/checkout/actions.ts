"use server";

import { getSupabase } from "../rsvp/actions";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function createAbacatePayBilling(formData: {
  name: string,
  email: string,
  taxId: string,
  message: string,
  items: any[]
}) {
  try {
    const supabase = await getSupabase();
    const cleanTaxId = formData.taxId.replace(/\D/g, "");

    if (!formData.name || !formData.email || cleanTaxId.length < 11) {
      return { error: "Dados insuficientes para processar o pagamento." };
    }

    const payload = {
      frequency: "ONE_TIME",
      methods: ["PIX", "CARD"],
      products: formData.items.map(item => ({
        externalId: String(item.product.id),
        name: item.product.name,
        quantity: item.quantity,
        price: Math.round(Number(item.product.price) * 100),
      })),
      customer: {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        taxId: cleanTaxId,
        cellphone: "11999999999"
      },
      returnUrl: `${baseUrl}/agradecimento`,
      completionUrl: `${baseUrl}/agradecimento`,
    };

    const response = await fetch("https://api.abacatepay.com/v1/billing/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.ABACATEPAY_API_KEY}`
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro AbacatePay:", data);
      return {
        error: data.error || data.message || "Erro ao gerar link de pagamento."
      };
    }

    const insertPromises = formData.items.map((item: any) => {
      return supabase.from('received_gifts').insert({
        sender_name: formData.name,
        message: formData.message,
        gift_id: item.product.id,
        amount_paid: Number(item.product.price) * item.quantity,
        status: 'pending'
      });
    });

    const dbResults = await Promise.all(insertPromises);

    const dbError = dbResults.find(r => r.error);
    if (dbError) console.error("Erro ao salvar no banco:", dbError.error);

    if (data.data && data.data.url) {
      return { url: data.data.url };
    }

    return { error: "Não foi possível gerar a URL de checkout." };

  } catch (error: any) {
    console.error("Erro crítico na action createAbacatePayBilling:", error);
    return { error: "Falha interna na comunicação com o provedor de pagamentos." };
  }
}