"use client";

import { Button } from "@/app/components/ui/button";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AgradecimentoPage() {
    const router = useRouter();

    const handleConfirmPresence = () => {
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-lg"
            >
                <div className="bg-card rounded-2xl shadow-elegant p-8 md:p-12 text-center border border-border/50">

                    {/* Decorative Icon */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mb-6"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary">
                            <Heart className="w-8 h-8 text-accent fill-accent/20" />
                        </div>
                    </motion.div>

                    {/* Decorative Ornament */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex items-center justify-center gap-3 mb-6"
                    >
                        <span className="text-accent text-sm">✦</span>
                        <div className="h-px w-12 bg-linear-to-r from-transparent via-accent/50 to-transparent" />
                        <span className="text-accent">💍</span>
                        <div className="h-px w-12 bg-linear-to-r from-transparent via-accent/50 to-transparent" />
                        <span className="text-accent text-sm">✦</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 leading-tight"
                    >
                        Obrigado por fazer parte do nosso grande dia 💍
                    </motion.h1>

                    {/* Secondary Text */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="font-body text-muted-foreground text-base md:text-lg mb-8 leading-relaxed"
                    >
                        Ficamos muito felizes em compartilhar esse momento especial com você.
                        Sua presença é muito importante para nós.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        <Button
                            onClick={handleConfirmPresence}
                            aria-label="Confirmar presença no casamento"
                            className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-8 py-6 text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            Obrigado
                        </Button>
                    </motion.div>

                    {/* Bottom Ornament */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="mt-8 flex items-center justify-center"
                    >
                        <div className="h-px w-24 bg-linear-to-r from-transparent via-border to-transparent" />
                    </motion.div>

                </div>
            </motion.div>
        </div>
    );
}
