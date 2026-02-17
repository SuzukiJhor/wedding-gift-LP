import { MercadoPagoConfig, Payment } from "mercadopago";
import Status from "./status";

const mp = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export default async function PendentePage({
  searchParams,
}: {
  searchParams: Promise<{ payment_id?: string }>;
}) {
  const params = await searchParams;
  const paymentId = params?.payment_id ?? null;

  if (!paymentId) {
    return <div>Pagamento não encontrado.</div>;
  }

  let status = "unknown";

  try {
    const payment = await new Payment(mp).get({ id: paymentId });
    status = payment.status ?? "unknown";
  } catch {
    status = "error";
  }

  return <Status paymentId={paymentId} initialStatus={status} />;
}
