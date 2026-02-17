"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Status({
  paymentId,
  initialStatus,
}: {
  paymentId: string;
  initialStatus: string;
}) {
  const [status, setStatus] = useState(initialStatus);
  const router = useRouter();

  useEffect(() => {
    if (status === "approved") {
      router.push("/agradecimento");
      return;
    }

    const interval = setInterval(async () => {
      const res = await fetch(`/api/check-payment?id=${paymentId}`);
      const data = await res.json();

      setStatus(data.status);

      if (data.status === "approved") {
        router.push("/agradecimento");
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className="min-h-screen flex items-center justify-center text-center p-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">
          Aguardando confirmação do pagamento...
        </h1>

        <p className="text-muted-foreground">
          Assim que o pagamento for aprovado você será redirecionado automaticamente.
        </p>

        <p className="text-sm opacity-70">
          Status atual: <b>{status}</b>
        </p>
      </div>
    </div>
  );
}
