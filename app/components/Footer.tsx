'use client';
import { Heart, Instagram, Mail } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 bg-foreground text-background">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center space-y-6">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-accent" fill="currentColor" />
                        <span className="font-display text-2xl">Larissa & Gabriel</span>
                    </div>

                    {/* Message */}
                    <p className="font-display text-lg italic text-background/80 max-w-md">
                        &quot;Obrigado por fazer parte deste momento tão especial em nossas vidas&quot;
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        <a
                            href="#"
                            className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a
                            href="mailto:contato@larissagabriel.com"
                            className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors"
                            aria-label="E-mail"
                        >
                            <Mail className="h-5 w-5" />
                        </a>
                    </div>

                    {/* Divider */}
                    <div className="w-24 h-px bg-background/20" />

                    {/* Copyright */}
                    <p className="font-body text-sm text-background/60">
                        © {currentYear} Larissa & Gabriel. Feito com{' '}
                        <Heart className="inline h-3 w-3 text-accent" fill="currentColor" />{' '}
                        para nosso dia especial.
                    </p>
                </div>
            </div>
        </footer>
    );
}
