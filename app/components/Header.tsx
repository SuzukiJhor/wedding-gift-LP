'use client';

import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';
import { useCartStore } from '../stores/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Heart } from 'lucide-react';

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

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
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
                        <Heart
                            className="h-5 w-5"
                            fill="currentColor"
                        />
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
                                        "font-body text-sm tracking-wide transition-colors duration-200 elegant-underline",
                                        isScrolled
                                            ? "text-foreground/80 hover:text-accent"
                                            : "text-accent/90 hover:text-white"
                                    )}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleCart}
                            className={cn(
                                "relative p-2 transition-colors duration-300",
                                isScrolled ? "text-foreground hover:text-accent" : "text-white hover:text-accent"
                            )}
                            aria-label="Abrir carrinho"
                        >
                            <ShoppingBag className="h-5 w-5" />
                            {mounted && totalItems > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 flex h-5 w-5 hover:text-white items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground shadow-sm"
                                >
                                    {totalItems}
                                </motion.span>
                            )}
                        </button>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={cn(
                                "md:hidden p-2 transition-colors duration-300",
                                isScrolled ? "text-foreground" : "text-accent"
                            )}
                            aria-label="Menu"
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

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
                                                "block font-body text-sm tracking-wide transition-colors",
                                                isScrolled ? "text-foreground/80" : "text-accent"
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
    );
}