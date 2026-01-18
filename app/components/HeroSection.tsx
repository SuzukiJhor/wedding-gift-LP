'use client';
import { motion } from 'framer-motion';
import { Heart, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
    return (
        <section
            id="inicio"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/img3.jpeg"
                    alt="Larissa e Gabriel"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-linear-to-b from-foreground/30 via-foreground/20 to-background" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    {/* Ornament */}
                    <div className="flex items-center justify-center gap-3 text-champagne">
                        <span className="w-12 h-px bg-champagne" />
                        <Heart className="h-4 w-4" fill="currentColor" />
                        <span className="w-12 h-px bg-champagne" />
                    </div>

                    {/* Names */}
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-ivory tracking-wide">
                        Larissa & Gabriel
                    </h1>

                    {/* Date */}
                    <p className="font-body text-lg md:text-xl text-champagne tracking-[0.2em] uppercase">
                        15 de Maio de 2026
                    </p>

                    {/* Subtitle */}
                    <p className="font-display text-xl md:text-2xl text-ivory/90 italic max-w-lg mx-auto">
                        {"O amor é a poesia dos sentidos"}
                    </p>

                    {/* CTA Button */}
                    <motion.a
                        href="#presentes"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block mt-8 px-8 py-3 bg-accent text-accent-foreground font-body text-sm tracking-wider uppercase rounded-full shadow-elegant hover:bg-accent/90 transition-colors"
                    >
                        Ver Lista de Presentes
                    </motion.a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1, duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-champagne"
            >
                <ChevronDown className="h-6 w-6" />
            </motion.div>
        </section>
    );
}
