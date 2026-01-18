'use client';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import coupleImage from '@/assets/couple-2.jpeg';
import Image from 'next/image';

export function OurStorySection() {
    return (
        <section id="nossa-historia" className="py-20 md:py-32 bg-secondary">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative aspect-4/5 rounded-lg overflow-hidden shadow-elegant-lg">

                            <Image
                                src="/img2.jpeg"
                                alt="Larissa e Gabriel"
                                fill
                                className="w-full h-full object-cover"
                                priority
                                sizes="100vw"
                            />
                        </div>
                        {/* Decorative Frame */}
                        <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-accent/30 rounded-lg -z-10" />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Ornament */}
                        <div className="divider-ornament justify-start">
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
                                cotidianos, de paciência, compreensão e muito companheirismo.
                            </p>
                            <p>
                                Agora, estamos prontos para dar o próximo passo nessa jornada
                                maravilhosa. E nada nos deixaria mais felizes do que celebrar
                                esse momento especial ao lado de vocês, pessoas que amamos e
                                que fazem parte da nossa história.
                            </p>
                        </div>

                        {/* Timeline */}
                        <div className="flex items-center gap-6 pt-4">
                            <div className="text-center">
                                <span className="block font-display text-3xl text-accent">2019</span>
                                <span className="text-sm text-muted-foreground">Nos conhecemos</span>
                            </div>
                            <div className="flex-1 h-px bg-border" />
                            <div className="text-center">
                                <span className="block font-display text-3xl text-accent">2022</span>
                                <span className="text-sm text-muted-foreground">Noivado</span>
                            </div>
                            <div className="flex-1 h-px bg-border" />
                            <div className="text-center">
                                <span className="block font-display text-3xl text-accent">2025</span>
                                <span className="text-sm text-muted-foreground">Casamento</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
