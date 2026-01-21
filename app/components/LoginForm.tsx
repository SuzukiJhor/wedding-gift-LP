"use client";

import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "sonner";
import { loginAction } from "../login/actions";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, Lock } from "lucide-react";

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);

        // Pequeno delay para a animação não "piscar" se a internet for rápida demais
        const result = await loginAction(formData);

        if (result?.error) {
            toast.error(result.error, {
                description: "Verifique suas credenciais e tente novamente."
            });
            setIsLoading(false);
        }
        // Se der certo, o redirecionamento acontece pela Action
    }

    return (
        <motion.form
            action={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
        >
            <div className="space-y-2">
                <Label htmlFor="email" className={isLoading ? "opacity-50" : ""}>E-mail</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="exemplo@email.com"
                    required
                    disabled={isLoading}
                    className="bg-secondary transition-all focus:ring-accent/50"
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password" className={isLoading ? "opacity-50" : ""}>Senha</Label>
                </div>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    disabled={isLoading}
                    className="bg-secondary transition-all focus:ring-accent/50"
                />
            </div>

            <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent py-6 rounded-full relative overflow-hidden transition-all active:scale-[0.98]"
            >
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2"
                        >
                            <Loader2 className="animate-spin w-5 h-5" />
                            <span>Autenticando...</span>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="text"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="flex items-center gap-2"
                        >
                            <Lock className="w-4 h-4" />
                            <span>Entrar no Painel</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Button>

            {/* Texto de suporte discreto */}
            <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest mt-4">
                Acesso restrito aos noivos
            </p>
        </motion.form>
    );
}