'use client';

import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';
import { useCartStore } from '../stores/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Heart, CalendarCheck } from 'lucide-react';
import { RSVPModal } from './rsvp/RSVPModal';

const navLinks = [
    { href: '#inicio', label: 'Início' },
    { href: '#nossa-historia', label: 'Nossa História' },
    { href: '#momentos', label: 'Momentos' },
    { href: '#presentes', label: 'Presentes' },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isRSVPOpen, setIsRSVPOpen] = useState(false);

    const { toggleCart, getTotalItems } = useCartStore();
    const totalItems = getTotalItems();

    useEffect(() => {
        setMounted(true);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isRSVPOpen ? 'hidden' : 'auto';
    }, [isRSVPOpen]);

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
                    isScrolled
                        ? 'bg-background/95 backdrop-blur-md shadow-elegant py-2'
                        : 'bg-transparent py-4'
                )}
            >
                <nav className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <a
                            href="#inicio"
                            className={cn(
                                "flex items-center gap-2 transition-colors duration-300",
                                isScrolled ? "text-foreground hover:text-accent" : "text-accent hover:text-white"
                            )}
                        >
                            <Heart className="h-5 w-5" fill="currentColor" />
                            <span className="font-display text-xl tracking-wide">
                                Larissa & Gabriel
                            </span>
                        </a>

                        <ul className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className={cn(
                                            "font-body text-sm tracking-wide transition-colors elegant-underline",
                                            isScrolled
                                                ? "text-foreground/80 hover:text-accent"
                                                : "text-white hover:text-white"
                                        )}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center gap-4">
                            {/* Desktop RSVP */}
                            <button
                                onClick={() => setIsRSVPOpen(true)}
                                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-full font-body text-sm hover:bg-accent/90 transition"
                            >
                                <CalendarCheck className="h-4 w-4" />
                                Confirmar Presença
                            </button>

                            {/* Cart */}
                            <button
                                onClick={toggleCart}
                                className={cn(
                                    "relative p-2 transition-colors",
                                    isScrolled ? "text-foreground hover:text-accent" : "text-white hover:text-accent"
                                )}
                            >
                                <ShoppingBag className="h-5 w-5" />

                                {mounted && totalItems > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground shadow-sm"
                                    >
                                        {totalItems}
                                    </motion.span>
                                )}
                            </button>

                            {/* Mobile Menu */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={cn(
                                    "md:hidden p-2 transition-colors",
                                    isScrolled ? "text-foreground" : "text-accent"
                                )}
                            >
                                {isMobileMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Nav */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="md:hidden overflow-hidden"
                            >
                                <ul className="flex flex-col gap-4 py-4">
                                    {navLinks.map((link) => (
                                        <li key={link.href}>
                                            <a
                                                href={link.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={cn(
                                                    "block font-body text-sm",
                                                    isScrolled ? "text-foreground/80" : "text-white"
                                                )}
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </header>

            <motion.button
                onClick={() => setIsRSVPOpen(true)}
                className="
                    fixed
                    bottom-6
                    right-4
                    z-50
                    sm:hidden
                    flex
                    items-center
                    gap-2
                    bg-accent
                    text-accent-foreground
                    px-5
                    py-3
                    rounded-full
                    shadow-xl
                    backdrop-blur-md
                "
                animate={{
                    scale: [1, 1.06, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                whileTap={{ scale: 0.95 }}
            >
                <CalendarCheck className="h-5 w-5" />
                <span className="text-sm font-medium">Confirmar Presença</span>
            </motion.button>

            {/* RSVP MODAL */}
            <AnimatePresence>
                {isRSVPOpen && (
                    <RSVPModal />
                )}
            </AnimatePresence>
        </>
    );
}