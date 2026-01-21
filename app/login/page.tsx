import { Heart } from "lucide-react";
import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-card rounded-2xl shadow-elegant p-8 border border-border/50 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
                    <Heart className="w-8 h-8 text-accent fill-accent/20" />
                </div>

                <h1 className="font-display text-3xl mb-2">Área Restrita</h1>
                <p className="font-body text-muted-foreground mb-8">Acesso exclusivo para os noivos</p>

                {/* Componente que criamos no passo 1 */}
                <LoginForm />

                <div className="mt-8 h-px w-24 bg-linear-to-r from-transparent via-border to-transparent mx-auto" />
            </div>
        </div>
    );
}