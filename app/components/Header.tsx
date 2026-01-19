'use client';

import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';
import { useCartStore } from '../stores/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Heart, CalendarCheck } from 'lucide-react';
import { RSVPModal } from './rsvp/RSVPModal';

const RSVP_STORAGE_KEY = 'rsvp_modal_shown';

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

        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll Lock
    useEffect(() => {
        document.body.style.overflow =
            isRSVPOpen || isMobileMenuOpen ? 'hidden' : 'auto';
    }, [isRSVPOpen, isMobileMenuOpen]);

    // AUTO OPEN RSVP (FIRST VISIT)
    useEffect(() => {
        if (!mounted) return;

        // Proteção extra
        if (isMobileMenuOpen || isRSVPOpen) return;

        try {
            const hasSeenModal = localStorage.getItem(RSVP_STORAGE_KEY);

            if (!hasSeenModal) {
                const timer = setTimeout(() => {
                    setIsRSVPOpen(true);
                    localStorage.setItem(RSVP_STORAGE_KEY, 'true');
                }, 3000);

                return () => clearTimeout(timer);
            }
        } catch (err) {
            console.warn('LocalStorage blocked:', err);
        }
    }, [mounted, isMobileMenuOpen, isRSVPOpen]);

    const handleNavigation = (href: string) => {
        setIsMobileMenuOpen(false);

        setTimeout(() => {
            const targetId = href.replace('#', '');
            const element = document.getElementById(targetId);
            element?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
    };

    return (
        <>
            {/* HEADER */}
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
                    isScrolled || isMobileMenuOpen
                        ? 'bg-background/95 backdrop-blur-md shadow-elegant py-2'
                        : 'bg-transparent py-4'
                )}
            >
                <nav className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <a
                            href="#inicio"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavigation('#inicio');
                            }}
                            className={cn(
                                'flex items-center gap-2 transition-colors duration-300',
                                isScrolled || isMobileMenuOpen
                                    ? 'text-foreground hover:text-accent'
                                    : 'text-accent hover:text-white'
                            )}
                        >
                            <Heart className="h-5 w-5" fill="currentColor" />
                            <span className="font-display text-xl tracking-wide">
                                Larissa & Gabriel
                            </span>
                        </a>

                        {/* Desktop Nav */}
                        <ul className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className={cn(
                                            'font-body text-sm tracking-wide transition-colors elegant-underline',
                                            isScrolled
                                                ? 'text-foreground/80 hover:text-accent'
                                                : 'text-white/90 hover:text-white'
                                        )}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                            {/* Desktop RSVP */}
                            <button
                                onClick={() => setIsRSVPOpen(true)}
                                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-full font-body text-sm hover:bg-accent/90 transition shadow-md"
                            >
                                <CalendarCheck className="h-4 w-4" />
                                Confirmar Presença
                            </button>

                            {/* Cart */}
                            <button
                                onClick={toggleCart}
                                className={cn(
                                    'relative p-2 transition-colors',
                                    isScrolled || isMobileMenuOpen
                                        ? 'text-foreground'
                                        : 'text-white'
                                )}
                            >
                                <ShoppingBag className="h-5 w-5" />

                                {mounted && totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                                        {totalItems}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={cn(
                                    'md:hidden p-2 transition-colors z-[60]',
                                    isScrolled || isMobileMenuOpen
                                        ? 'text-foreground'
                                        : 'text-accent'
                                )}
                            >
                                {isMobileMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>

                    {/* MOBILE NAV */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <>
                                {/* Click Outside Overlay */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="fixed inset-0 top-14 h-screen bg-black/20 backdrop-blur-sm z-40 md:hidden"
                                />

                                {/* Menu Content */}
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="md:hidden overflow-hidden bg-background relative z-50"
                                >
                                    <ul className="flex flex-col gap-4 py-8 items-center border-t border-border/50">
                                        {navLinks.map((link) => (
                                            <li key={link.href}>
                                                <a
                                                    href={link.href}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleNavigation(link.href);
                                                    }}
                                                    className="block font-display text-2xl text-foreground hover:text-accent transition-colors"
                                                >
                                                    {link.label}
                                                </a>
                                            </li>
                                        ))}

                                        <li>
                                            <button
                                                onClick={() => {
                                                    setIsRSVPOpen(true);
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                className="mt-6 flex items-center gap-2 px-8 py-3 bg-accent text-white rounded-full font-body text-lg shadow-lg"
                                            >
                                                <CalendarCheck className="h-5 w-5" />
                                                Confirmar Presença
                                            </button>
                                        </li>
                                    </ul>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </nav>
            </header>

            {/* FLOATING RSVP BUTTON (MOBILE) */}
            <AnimatePresence>
                {!isMobileMenuOpen && !isRSVPOpen && (
                    <motion.button
                        onClick={() => setIsRSVPOpen(true)}
                        className="fixed bottom-6 right-4 z-40 sm:hidden flex items-center gap-2 bg-accent text-white px-5 py-3 rounded-full shadow-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                    >
                        {/* Ping Effect */}
                        <motion.span
                            className="absolute inset-0 rounded-full bg-accent/30 -z-10"
                            animate={{
                                scale: [1, 1.6],
                                opacity: [0.6, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeOut',
                            }}
                        />

                        <CalendarCheck className="h-5 w-5" />
                        <span className="text-sm font-bold font-body">
                            Confirmar Presença
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* MODAL */}
            <RSVPModal
                isOpen={isRSVPOpen}
                onClose={() => setIsRSVPOpen(false)}
            />
        </>
    );
}