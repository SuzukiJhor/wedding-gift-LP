'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// Referência direta da pasta public
const images = [
    { src: "/img1.jpeg", alt: 'Momento especial 1' },
    { src: "/img2.jpeg", alt: 'Momento especial 2' },
    { src: "/img3.jpeg", alt: 'Momento especial 3' },
    { src: "/img4.jpeg", alt: 'Momento especial 4' },
    { src: "/img5.jpeg", alt: 'Momento especial 5' },
];

export function MomentsGallery() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => setSelectedIndex(index);
    const closeLightbox = () => setSelectedIndex(null);

    const goToPrevious = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
        }
    };

    const goToNext = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % images.length);
        }
    };

    return (
        <section id="momentos" className="py-20 md:py-32 bg-background">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="divider-ornament mb-4">
                        <Heart className="h-4 w-4 text-accent" fill="currentColor" />
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
                        Nossos Momentos
                    </h2>
                    <p className="font-body text-muted-foreground max-w-lg mx-auto">
                        Pequenos instantes que guardaremos para sempre no coração
                    </p>
                </motion.div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative overflow-hidden rounded-lg cursor-pointer group ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                                }`}
                            onClick={() => openLightbox(index)}
                        >
                            <div className={`aspect-square ${index === 0 ? 'md:aspect-auto md:h-full' : ''}`}>
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                            </div>
                            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4"
                        onClick={closeLightbox}
                    >
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 p-2 text-ivory hover:text-accent transition-colors"
                            aria-label="Fechar"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToPrevious();
                            }}
                            className="absolute left-4 p-2 text-ivory hover:text-accent transition-colors"
                            aria-label="Anterior"
                        >
                            <ChevronLeft className="h-8 w-8" />
                        </button>

                        <motion.img
                            key={selectedIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            src={images[selectedIndex].src}
                            alt={images[selectedIndex].alt}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToNext();
                            }}
                            className="absolute right-4 p-2 text-ivory hover:text-accent transition-colors"
                            aria-label="Próximo"
                        >
                            <ChevronRight className="h-8 w-8" />
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedIndex(index);
                                    }}
                                    className={`w-2 h-2 rounded-full transition-colors ${index === selectedIndex ? 'bg-accent' : 'bg-ivory/50'
                                        }`}
                                    aria-label={`Ir para imagem ${index + 1}`}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}