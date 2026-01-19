'use client';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Image from 'next/image';

export function OurStorySection() {
    return (
        <section id="nossa-historia" className="py-20 md:py-32 bg-secondary">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Content (Texto) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6 order-1 md:order-2 text-center md:text-left"
                    >
                        <div className="divider-ornament justify-center md:justify-start">
                            <Heart className="h-4 w-4 text-accent" fill="currentColor" />
                        </div>

                        <h2 className="font-display text-4xl md:text-5xl text-foreground">
                            Nossa História
                        </h2>

                        <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
                            <p>
                                Tudo começou em uma tarde de verão, quando nossos caminhos se
                                cruzaram pela primeira vez. Um olhar, um sorriso, e soubemos
                                que algo especial estava nascendo.
                            </p>
                            <p>
                                Foram anos construindo memórias, enfrentando desafios juntos e
                                descobrindo que o amor verdadeiro é feito de pequenos gestos
                                cotidianos.
                            </p>
                        </div>

                        {/* Timeline */}
                        <div className="flex items-center justify-center md:justify-start gap-4 pt-4">
                            <div className="text-center">
                                <span className="block font-display text-2xl text-accent">2019</span>
                                <span className="text-xs text-muted-foreground">Início</span>
                            </div>
                            <div className="w-8 h-px bg-accent/30" />
                            <div className="text-center">
                                <span className="block font-display text-2xl text-accent">2022</span>
                                <span className="text-xs text-muted-foreground">Noivado</span>
                            </div>
                            <div className="w-8 h-px bg-accent/30" />
                            <div className="text-center">
                                <span className="block font-display text-2xl text-accent">2025</span>
                                <span className="text-xs text-muted-foreground">Casamento</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Image Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative order-2 md:order-1 w-full"
                    >
                        {/* Ajuste de Altura: 
                            h-[450px] garante que a imagem apareça no mobile.
                            md:h-[600px] ajusta para telas maiores.
                        */}
                        <div className="relative w-full h-112.5 md:h-137.5 lg:h-150 rounded-lg overflow-hidden shadow-elegant-lg">
                            <Image
                                src="/img2.jpeg"
                                alt="Larissa e Gabriel"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-accent/30 rounded-lg -z-10" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}