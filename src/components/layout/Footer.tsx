import Link from 'next/link';
import { Settings } from '@/types';

export default function Footer({ settings }: { settings: Settings }) {
    return (
        <footer className="bg-black text-white py-16">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

                <div className="md:col-span-2">
                    {settings.logo ? (
                        <img src={settings.logo} alt={settings.siteTitle} className="h-20 w-auto object-contain mb-8" />
                    ) : (
                        <h2 className="font-serif text-2xl font-bold mb-6">{settings.siteTitle}</h2>
                    )}
                    <p className="text-gray-400 leading-relaxed max-w-sm">
                        {settings.siteDescription}
                    </p>
                </div>

                <div>
                    <h3 className="font-medium text-lg mb-6">Keşfedin</h3>
                    <ul className="space-y-4 text-gray-400">
                        <li><Link href="/urunler" className="hover:text-white transition">Mağaza</Link></li>
                        <li><Link href="/kurslar" className="hover:text-white transition">Atölyeler</Link></li>
                        <li><Link href="/galeri" className="hover:text-white transition">Galeri</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-medium text-lg mb-6">İletişim</h3>
                    <ul className="space-y-4 text-gray-400">
                        <li>{settings.contact.address}</li>
                        <li>{settings.contact.phone}</li>
                        <li>{settings.contact.email}</li>
                    </ul>
                </div>

            </div>
            <div className="container mx-auto px-6 pt-8 mt-12 border-t border-gray-800 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} {settings.siteTitle}. Tüm hakları saklıdır.
            </div>
        </footer>
    );
}
