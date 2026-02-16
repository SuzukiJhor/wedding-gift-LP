"use client";

import { Button } from "@/app/components/ui/button";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyPaymentAndSave } from "./actions";

export default function AgradecimentoPage() {
  const router = useRouter();
  const params = useSearchParams();

  const [status, setStatus] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const paymentId = params.get("payment_id");

    if (!paymentId) {
      setStatus("not_found");
      return;
    }

    verifyPaymentAndSave(paymentId).then(res => {
      setStatus(res.status);
      if (res.name) setName(res.name);
    });
  }, []);

  const handleBack = () => router.push("/");

  const messages: any = {
    approved: {
      title: `Obrigado ${name ?? ""} ❤️`,
      text: "Recebemos seu presente com muito carinho. Vocês fazem parte desse momento especial!",
    },
    pending: {
      title: "Pagamento em análise ⏳",
      text: "Assim que o pagamento for confirmado ele aparecerá para os noivos.",
    },
    rejected: {
      title: "Pagamento não aprovado",
      text: "Seu pagamento não foi autorizado. Você pode tentar novamente.",
    },
    not_found: {
      title: "Pagamento não encontrado",
      text: "Não conseguimos localizar sua transação.",
    },
    error: {
      title: "Erro ao validar pagamento",
      text: "Ocorreu um problema ao verificar seu pagamento.",
    },
  };

  const msg = messages[status ?? "pending"];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        <div className="bg-card rounded-2xl shadow-elegant p-8 md:p-12 text-center border border-border/50">

          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary">
              <Heart className="w-8 h-8 text-accent fill-accent/20" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-accent text-sm">✦</span>
            <div className="h-px w-12 bg-linear-to-r from-transparent via-accent/50 to-transparent" />
            <span className="text-accent">💍</span>
            <div className="h-px w-12 bg-linear-to-r from-transparent via-accent/50 to-transparent" />
            <span className="text-accent text-sm">✦</span>
          </div>

          <h1 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 leading-tight">
            {msg.title}
          </h1>

          <p className="font-body text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
            {msg.text}
          </p>

          {status === null && (
            <p className="text-sm text-muted-foreground mb-6">
              Verificando pagamento...
            </p>
          )}

          <Button
            onClick={handleBack}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-8 py-6 text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          >
            Voltar ao Site
          </Button>

          <div className="mt-8 flex items-center justify-center">
            <div className="h-px w-24 bg-linear-to-r from-transparent via-border to-transparent" />
          </div>

        </div>
      </motion.div>
    </div>
  );
}
