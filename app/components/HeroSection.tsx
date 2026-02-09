'use client'
import { motion } from 'framer-motion'
import { Heart, ChevronDown } from 'lucide-react'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="/capa.jpg"
          alt="Larissa e Gabriel"
          fill
          className="object-cover object-center grayscale"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-background" />
      </div>

      <div className="relative z-10 text-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-center gap-3 text-champagne">
            <span className="w-12 h-px bg-champagne" />
            <Heart className="h-4 w-4" fill="currentColor" />
            <span className="w-12 h-px bg-champagne" />
          </div>

          <h1
            className="font-display text-5xl md:text-7xl lg:text-8xl text-ivory tracking-wide leading-tight"
            style={{
              textShadow:
                '0 4px 20px rgba(0,0,0,0.6), 0 0 30px rgba(255,255,255,0.15)',
            }}
          >
            Larissa
            <br className="md:hidden" />
            <span className="hidden md:inline"> & </span>
            <span className="md:hidden">&</span>
            <br className="md:hidden" />
            Gabriel
          </h1>

          <div className="flex justify-center">
            <div className="px-6 py-2 rounded-full border border-champagne/40 backdrop-blur-md bg-black/30 shadow-elegant">
              <p className="font-body text-sm md:text-base text-champagne tracking-[0.35em] uppercase">
                15 de Maio de 2026
              </p>
            </div>
          </div>

          <p className="font-display text-xl md:text-2xl text-ivory/90 italic max-w-lg mx-auto">
            O amor é a poesia dos sentidos
          </p>

          <motion.a
            href="#presentes"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mt-10 px-10 py-4 bg-accent text-accent-foreground font-body text-sm tracking-wider uppercase rounded-full shadow-elegant hover:bg-accent/90 transition-colors"
          >
            Ver Lista de Presentes
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-champagne"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  )
}
