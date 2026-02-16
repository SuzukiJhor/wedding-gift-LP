"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyPaymentAndSave } from "./actions";

export default function Content() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    async function verify() {
      const paymentId = searchParams.get("payment_id");
      const statusParam = searchParams.get("status");

      if (!paymentId) {
        setStatus("error");
        return;
      }

      if (statusParam !== "approved") {
        setStatus("error");
        return;
      }

      const result = await verifyPaymentAndSave(paymentId);

      setStatus(result.status === "approved" ? "success" : "error");
    }

    verify();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">

      {status === "loading" && <p>Validando pagamento...</p>}

      {status === "success" && (
        <div className="text-center">
          <h1 className="text-3xl font-bold">Pagamento aprovado 💚</h1>
          <button onClick={() => router.push("/")}>
            Voltar
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="text-center">
          <h1 className="text-3xl font-bold">Pagamento não confirmado</h1>
          <button onClick={() => router.push("/")}>
            Tentar novamente
          </button>
        </div>
      )}

    </div>
  );
}
