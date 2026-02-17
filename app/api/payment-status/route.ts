import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

const mp = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "missing id" }, { status: 400 });
  }

  try {
    const payment = await new Payment(mp).get({ id });

    return NextResponse.json({
      status: payment.status,
    });
  } catch {
    return NextResponse.json({ status: "error" });
  }
}
