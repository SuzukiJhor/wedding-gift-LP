"use client";

import { Button } from "@/app/components/ui/button";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  paymentId: string;
  initialStatus: string;
};

export default function Status({ paymentId, initialStatus }: Props) {
  const [status, setStatus] = useState(initialStatus);
  const router = useRouter();

  useEffect(() => {
    if (status === "approved") {
      router.push("/agradecimento");
      return;
    }

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/payment-status?id=${paymentId}`);
        const json = await res.json();

        if (json.status) {
          setStatus(json.status);

          if (json.status === "approved") {
            router.push("/agradecimento");
          }

          if (json.status === "rejected") {
            router.push("/erro");
          }
        }
      } catch {}
    }, 4000);

    return () => clearInterval(interval);
  }, [status, paymentId, router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <div className="bg-card rounded-2xl shadow-elegant p-8 md:p-12 text-center border border-border/50">

          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary">
              <Clock className="w-8 h-8 text-accent" />
            </div>
          </motion.div>

          {/* Ornament */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="text-accent text-sm">✦</span>
            <div className="h-px w-12 bg-linear-to-r from-transparent via-accent/50 to-transparent" />
            <span className="text-accent">⏳</span>
            <div className="h-px w-12 bg-linear-to-r from-transparent via-accent/50 to-transparent" />
            <span className="text-accent text-sm">✦</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-4"
          >
            Aguardando confirmação do pagamento
          </motion.h1>

          {/* Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-body text-muted-foreground text-base md:text-lg mb-8"
          >
            Assim que o pagamento for aprovado você será redirecionado automaticamente.
          </motion.p>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm opacity-70 mb-6"
          >
            Status atual: <b>{status}</b>
          </motion.div>

          {/* Button */}
          <Button
            onClick={() => router.push("/")}
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 rounded-full"
          >
            Voltar ao site
          </Button>

          {/* Bottom line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex justify-center"
          >
            <div className="h-px w-24 bg-linear-to-r from-transparent via-border to-transparent" />
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
