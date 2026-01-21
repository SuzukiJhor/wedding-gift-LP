'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <>
            <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-md"
                >
                    <div className="relative inline-block mb-8">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="bg-secondary/50 p-8 rounded-full"
                        >
                            <Heart className="h-16 w-16 text-accent/20" strokeWidth={1} />
                        </motion.div>
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-5xl text-accent">
                            404
                        </span>
                    </div>

                    <h1 className="font-display text-3xl text-foreground mb-4">
                        Caminho não encontrado
                    </h1>
                    <p className="font-body text-muted-foreground mb-10 leading-relaxed">
                        Parece que você se perdeu um pouquinho no caminho para a nossa celebração.
                        Não se preocupe, o amor sempre nos guia de volta!
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground rounded-full font-display tracking-widest uppercase text-sm shadow-lg shadow-accent/20 transition-all"
                            >
                                <Home className="h-4 w-4" />
                                Início
                            </motion.button>
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 px-8 py-3 bg-secondary text-foreground rounded-full font-display tracking-widest uppercase text-sm hover:bg-secondary/80 transition-all"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Voltar
                        </button>
                    </div>

                    <div className="mt-16 opacity-30">
                        <div className="divider-ornament flex justify-center items-center gap-4">
                            <div className="h-px w-12 bg-accent" />
                            <Heart className="h-3 w-3 text-accent" fill="currentColor" />
                            <div className="h-px w-12 bg-accent" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}