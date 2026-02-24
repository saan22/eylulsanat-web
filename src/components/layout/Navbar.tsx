'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ siteTitle, logo }: { siteTitle: string, logo?: string }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const pathname = usePathname();

    const isTransparent = pathname === '/' && !isScrolled;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { href: '/', label: 'Anasayfa' },
        { href: '/urunler', label: 'Mağaza' },
        { href: '/kurslar', label: 'Atölyeler' },
        { href: '/galeri', label: 'Galeri' },
        { href: '/iletisim', label: 'İletişim', isCTA: true },
    ];

    return (
        <header
            className={clsx(
                'fixed top-0 left-0 w-full z-50 transition-all duration-500',
                !isTransparent ? 'bg-white/90 backdrop-blur-xl py-3 shadow-sm border-b border-gray-100' : 'bg-transparent py-5'
            )}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link href="/" className="flex items-center gap-2 relative z-50 group">
                        {logo ? (
                            <img
                                src={logo}
                                alt={siteTitle}
                                className="h-14 md:h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                            />
                        ) : (
                            <span className={clsx(
                                "font-serif text-2xl font-bold tracking-tight transition-colors duration-500",
                                !isTransparent ? "text-black" : "text-white"
                            )}>
                                {siteTitle}
                            </span>
                        )}
                    </Link>
                </motion.div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-2">
                    {links.map((link, i) => (
                        <motion.div
                            key={link.href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                            <Link
                                href={link.href}
                                onMouseEnter={() => setHoveredLink(link.href)}
                                onMouseLeave={() => setHoveredLink(null)}
                                className={clsx(
                                    "relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full",
                                    link.isCTA
                                        ? (!isTransparent ? "bg-black text-white hover:bg-gray-800 ml-4 px-6" : "bg-white text-black hover:bg-gray-100 ml-4 px-6")
                                        : (!isTransparent ? "text-gray-600 hover:text-black" : "text-white/80 hover:text-white")
                                )}
                            >
                                {link.label}
                                {!link.isCTA && (
                                    <AnimatePresence>
                                        {(hoveredLink === link.href || pathname === link.href) && (
                                            <motion.div
                                                layoutId="nav-underline"
                                                className={clsx(
                                                    "absolute bottom-1 left-4 right-4 h-0.5 rounded-full",
                                                    !isTransparent ? "bg-black" : "bg-white"
                                                )}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            />
                                        )}
                                    </AnimatePresence>
                                )}
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                {/* Mobile Toggle */}
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="md:hidden relative z-50 p-2 rounded-full bg-gray-100/10 backdrop-blur-md"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className="text-black" size={24} />
                    ) : (
                        <Menu className={!isTransparent ? "text-black" : "text-white"} size={24} />
                    )}
                </motion.button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-0 bg-white z-[40] flex flex-col items-center justify-center p-8 md:hidden"
                        >
                            <div className="flex flex-col items-center gap-8">
                                {links.map((link, i) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={clsx(
                                                "text-3xl font-serif font-bold transition-colors",
                                                pathname === link.href ? "text-black" : "text-gray-400 hover:text-black"
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
