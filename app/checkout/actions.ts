"use server";

import AbacatePay from "abacatepay-nodejs-sdk";

// Inicialização correta conforme a documentação
const abacate = AbacatePay(process.env.ABACATEPAY_API_KEY || "");
console.log("Chave configurada?", !!process.env.ABACATEPAY_API_KEY);
console.log("URL Base:", process.env.NEXT_PUBLIC_BASE_URL);
export async function createAbacatePayBilling(formData: {
  name: string;
  email: string;
  message: string;
  items: any[];
}) {
  try {
    const products = formData.items.map((item) => ({
      externalId: String(item.product.id),
      name: item.product.name,
      quantity: item.quantity,
      price: Math.round(Number(item.product.price) * 100),
    }));

    console.log("Enviando produtos:", JSON.stringify(products));

    const billingData: any = {
      frequency: "ONE_TIME",
      methods: ["PIX", "CARD"],
      products,
      returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      completionUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/agradecimento`,
      customer: {
        name: formData.name,
        email: formData.email,
        taxId: "64619472002", // USE UM CPF VÁLIDO PARA TESTE
        cellphone: "11999999999",
      },
      metadata: [
        { key: "guest_message", value: formData.message || "Sem mensagem." }
      ],
    };

    const billing = await abacate.billing.create(billingData);

    if (billing?.data?.url) {
      return { url: billing.data.url };
    }

    return { error: "Resposta da API sem URL" };
  } catch (error: any) {
    // ESTE LOG É O MAIS IMPORTANTE AGORA:
    const apiError = error?.response?.data;
    console.error("DETALHE DO ERRO NO ABACATEPAY:", JSON.stringify(apiError, null, 2));

    return { error: apiError?.message || "Erro interno na integração" };
  }
}