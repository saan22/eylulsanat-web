'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Settings, BookOpen, Image as ImageIcon, Mail, LogOut, Package } from 'lucide-react';
import { logout } from '@/actions/auth';
import clsx from 'clsx';

const links = [
    { href: '/admin', label: 'Özet', icon: LayoutDashboard },
    { href: '/admin/courses', label: 'Kurslar', icon: BookOpen },
    { href: '/admin/products', label: 'Ürünler', icon: Package },
    { href: '/admin/gallery', label: 'Galeri', icon: ImageIcon },
    { href: '/admin/messages', label: 'Mesajlar', icon: Mail },
    { href: '/admin/settings', label: 'Ayarlar', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white border-r min-h-screen p-6 flex flex-col fixed left-0 top-0 h-full z-10">
            <div className="mb-10 flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded-lg"></div>
                <span className="font-bold text-xl">Admin Panel</span>
            </div>

            <nav className="flex-1 space-y-1">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={clsx(
                                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                                isActive
                                    ? 'bg-black text-white'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                            )}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{link.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-100">
                <div className="px-4 mb-4">
                    <a href="https://nerzen.com" target="_blank" rel="noopener noreferrer" className="bg-gray-900 p-2 rounded-lg inline-block mb-3 hover:bg-black transition-colors">
                        <img src="/nerzen-logo.png" alt="Nerzen Bilişim" className="h-4 w-auto" />
                    </a>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Destek & Yazılım</p>
                    <h4 className="text-xs font-bold text-gray-900 mb-1">Nerzen Bilişim Teknolojileri</h4>
                    <div className="space-y-1 text-[10px] text-gray-500 font-medium">
                        <p className="leading-tight">GMKP Mah. Özcan Sk. Anaç Apt. No:12/1 Çerkezköy</p>
                        <p>+90 (282) 606 07 71</p>
                        <a href="https://nerzen.com" target="_blank" className="text-blue-600 hover:underline">www.nerzen.com</a>
                    </div>
                </div>

                <button
                    onClick={() => logout()}
                    className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Çıkış Yap</span>
                </button>
            </div>
        </aside>
    );
}
