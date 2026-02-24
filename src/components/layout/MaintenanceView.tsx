'use client';

import { Settings } from '@/types';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin, Hammer } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function MaintenanceView({ settings }: { settings: Settings }) {
    return (
        <div className="min-h-screen bg-[#F9F9F9] flex flex-col items-center justify-center p-6 text-center overflow-hidden relative font-sans">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-2xl w-full relative z-10 flex flex-col items-center">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-12"
                >
                    {settings.logo ? (
                        <img
                            src={settings.logo}
                            alt={settings.siteTitle}
                            className="h-20 md:h-28 w-auto object-contain"
                        />
                    ) : (
                        <h1 className="text-4xl font-serif font-bold tracking-tight text-black">
                            {settings.siteTitle}
                        </h1>
                    )}
                </motion.div>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white/90 backdrop-blur-2xl p-8 md:p-14 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white/60 w-full"
                >
                    <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mb-8 mx-auto rotate-12 shadow-lg shadow-black/10">
                        <Hammer className="w-8 h-8" />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                        Sanata Kısa Bir Ara
                    </h2>
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-12 max-w-md mx-auto">
                        Sizlere daha iyi bir deneyim sunabilmek için tasarım atölyemizi güncelliyoruz. Çok yakında yeniden buradayız.
                    </p>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left border-t border-gray-100 pt-12">
                        <div className="flex items-start gap-4 p-5 rounded-[24px] bg-gray-50/50 border border-transparent hover:border-gray-100 hover:bg-white transition-all duration-300">
                            <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                                <Phone className="w-5 h-5 text-gray-800" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Bize Ulaşın</p>
                                <a href={`tel:${settings.contact.phone}`} className="text-gray-900 font-bold hover:text-black transition-colors block">{settings.contact.phone}</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-5 rounded-[24px] bg-gray-50/50 border border-transparent hover:border-gray-100 hover:bg-white transition-all duration-300">
                            <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                                <Mail className="w-5 h-5 text-gray-800" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">E-posta Gönder</p>
                                <a href={`mailto:${settings.contact.email}`} className="text-gray-900 font-bold hover:text-black transition-colors block truncate max-w-[150px]">{settings.contact.email}</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-5 rounded-[24px] bg-gray-50/50 border border-transparent hover:border-gray-100 hover:bg-white transition-all duration-300 md:col-span-2">
                            <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                                <MapPin className="w-5 h-5 text-gray-800" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Adresimiz</p>
                                <p className="text-gray-900 font-bold">{settings.contact.address}</p>
                            </div>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="flex items-center justify-center gap-4 mt-12 pt-8 border-t border-gray-50">
                        {settings.socials.instagram && (
                            <a href={settings.socials.instagram} target="_blank" className="w-11 h-11 bg-gray-50 rounded-full flex items-center justify-center text-gray-700 hover:bg-black hover:text-white transition-all duration-500 hover:-translate-y-1">
                                <Instagram className="w-5 h-5" />
                            </a>
                        )}
                        {settings.socials.facebook && (
                            <a href={settings.socials.facebook} target="_blank" className="w-11 h-11 bg-gray-50 rounded-full flex items-center justify-center text-gray-700 hover:bg-black hover:text-white transition-all duration-500 hover:-translate-y-1">
                                <Facebook className="w-5 h-5" />
                            </a>
                        )}
                        {settings.socials.youtube && (
                            <a href={settings.socials.youtube} target="_blank" className="w-11 h-11 bg-gray-50 rounded-full flex items-center justify-center text-gray-700 hover:bg-black hover:text-white transition-all duration-500 hover:-translate-y-1">
                                <Youtube className="w-5 h-5" />
                            </a>
                        )}
                    </div>
                </motion.div>

                {/* Subtle admin link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="mt-12"
                >
                    <Link href="/admin" className="text-[10px] text-gray-400 font-bold hover:text-gray-900 transition-colors uppercase tracking-[0.3em]">
                        Yönetici Girişi
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
