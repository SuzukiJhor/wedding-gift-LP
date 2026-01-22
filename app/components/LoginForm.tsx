"use client";

import { useState } from "react";
import { motion } from 'framer-motion';
import { toast } from "sonner";
import { loginAction } from "../login/actions";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, Lock } from "lucide-react";

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);

        try {
            const result = await loginAction(formData);
            if (result?.error) {
                toast.error(result.error, {
                    description: "Verifique suas credenciais e tente novamente."
                });
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Erro no login:", error);
            setIsLoading(false);
        }
    }

    return (
        <motion.form
            onSubmit={onSubmit}
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
                className="w-full bg-accent py-6 rounded-full relative overflow-hidden transition-all active:scale-[0.98] flex items-center justify-center"
            >
                <motion.div
                    initial={false}
                    animate={{
                        opacity: isLoading ? 0 : 1,
                        y: isLoading ? -20 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="flex items-center gap-2"
                >
                    <Lock className="w-4 h-4" />
                    <span>Entrar no Painel</span>
                </motion.div>

                <motion.div
                    initial={false}
                    animate={{
                        opacity: isLoading ? 1 : 0,
                        y: isLoading ? 0 : 20
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute flex items-center gap-2"
                >
                    <Loader2 className="animate-spin w-5 h-5" />
                    <span>Autenticando...</span>
                </motion.div>
            </Button>

            <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest mt-4">
                Acesso restrito aos noivos
            </p>
        </motion.form>
    );
}