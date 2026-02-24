import { db } from '@/lib/json-db';
import { sendMessage } from '@/actions/messages';

export const metadata = {
    title: 'İletişim | Eylül Sanat Atölyesi',
    description: 'Bizimle iletişime geçin. Adres, telefon ve iletişim formu.',
};

export default async function ContactPage() {
    const settings = await db.settings.get();

    async function handleSubmit(formData: FormData) {
        'use server';
        await sendMessage(formData);
    }

    return (
        <div className="pt-32 pb-24 bg-[#F9F9F9] min-h-screen">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-center">İletişim</h1>
                <p className="text-center text-gray-500 max-w-xl mx-auto mb-16">
                    Sorularınız, kayıt işlemleri veya işbirlikleri için bize dilediğiniz zaman ulaşabilirsiniz.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Info */}
                    <div className="bg-black text-white p-12 rounded-3xl flex flex-col justify-between h-full">
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-lg font-medium text-gray-400 mb-2">Adres</h3>
                                <p className="text-xl leading-relaxed whitespace-pre-line">{settings.contact.address}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-400 mb-2">E-posta</h3>
                                <p className="text-xl">{settings.contact.email}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-400 mb-2">Telefon</h3>
                                <p className="text-2xl font-serif">{settings.contact.phone}</p>
                            </div>
                        </div>
                        <div className="mt-12">
                            <div className="flex gap-4">
                                {settings.socials.instagram && (
                                    <a href={settings.socials.instagram} target="_blank" className="hover:text-gray-400 transition underline">Instagram</a>
                                )}
                                {settings.socials.facebook && (
                                    <a href={settings.socials.facebook} target="_blank" className="hover:text-gray-400 transition underline">Facebook</a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100">
                        <form action={sendMessage} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                                    <input name="name" type="text" required className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-black outline-none transition" placeholder="Adınız Soyadınız" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                                    <input name="phone" type="tel" className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-black outline-none transition" placeholder="05XX XXX XX XX" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">E-posta (Opsiyonel)</label>
                                <input name="email" type="email" className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-black outline-none transition" placeholder="ornek@email.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mesajınız</label>
                                <textarea name="message" required rows={5} className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-black outline-none transition" placeholder="Mesajınızı buraya yazın..."></textarea>
                            </div>
                            <button type="submit" className="w-full py-4 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition shadow-lg">
                                Gönder
                            </button>
                        </form>
                    </div>
                </div>

                {/* Map Section */}
                {settings.contact.mapUrl && (
                    <div className="mt-24 rounded-3xl overflow-hidden h-[450px] shadow-sm border border-gray-100">
                        <iframe
                            src={settings.contact.mapUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                )}
            </div>
        </div>
    );
}
