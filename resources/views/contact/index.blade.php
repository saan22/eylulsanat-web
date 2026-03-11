<x-layouts.app title="İletişim | Eylül Sanat Atölyesi">
    <div class="pt-48 pb-24 bg-[#FDFDFD] min-h-screen">
        <div class="container mx-auto px-6">
            <div class="max-w-3xl mx-auto text-center mb-16 space-y-4">
                <div
                    class="flex items-center justify-center gap-2 text-gray-400 text-sm font-bold uppercase tracking-widest">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Bize Ulaşın
                </div>
                <h1 class="text-4xl md:text-6xl font-serif font-bold text-gray-900 leading-tight">İletişim <span
                        class="italic font-light">Bilgilerimiz</span></h1>
                <p class="text-gray-500 text-lg max-w-xl mx-auto font-light">
                    Sorularınız, kayıt işlemleri veya işbirlikleri için bize dilediğiniz zaman ulaşabilirsiniz.
                </p>
            </div>

            @if(session('success'))
                <div
                    class="max-w-6xl mx-auto mb-8 p-4 bg-green-100 text-green-800 rounded-xl font-medium flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {{ session('success') }}
                </div>
            @endif

            <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
                <!-- Info -->
                <div
                    class="lg:col-span-2 bg-black text-white p-10 md:p-12 rounded-[2rem] flex flex-col justify-between shadow-2xl relative overflow-hidden">
                    <div
                        class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none">
                    </div>
                    <div class="space-y-12 relative z-10">
                        <div>
                            <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Adresimiz</h3>
                            <p class="text-lg leading-relaxed whitespace-pre-line text-white/90">
                                {{ $settings['contact']['address'] ?? '' }}
                            </p>
                        </div>
                        <div>
                            <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">E-posta</h3>
                            <a href="mailto:{{ $settings['contact']['email'] ?? '' }}"
                                class="text-xl font-serif text-white hover:text-gray-300 transition block">
                                {{ $settings['contact']['email'] ?? '' }}
                            </a>
                        </div>
                        <div>
                            <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Telefon</h3>
                            <a href="tel:{{ preg_replace('/\D/', '', $settings['contact']['phone'] ?? '') }}"
                                class="text-2xl font-serif text-white hover:text-gray-300 transition block">
                                {{ $settings['contact']['phone'] ?? '' }}
                            </a>
                        </div>
                    </div>

                    @if(isset($settings['socials']))
                        <div class="mt-16 pt-8 border-t border-white/10 relative z-10 flex gap-6">
                            @if(isset($settings['socials']['instagram']))
                                <a href="{{ $settings['socials']['instagram'] }}" target="_blank"
                                    class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>
                                </a>
                            @endif
                            @if(isset($settings['socials']['facebook']))
                                <a href="{{ $settings['socials']['facebook'] }}" target="_blank"
                                    class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                    </svg>
                                </a>
                            @endif
                        </div>
                    @endif
                </div>

                <!-- Form -->
                <div
                    class="lg:col-span-3 bg-white p-10 md:p-12 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col justify-center">
                    <form action="/iletisim" method="POST" class="space-y-6">
                        @csrf
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Ad
                                    Soyad</label>
                                <input name="name" type="text" required
                                    class="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-gray-100 focus:border-black outline-none transition-all placeholder:text-gray-400"
                                    placeholder="Adınız Soyadınız" />
                            </div>
                            <div class="space-y-2">
                                <label class="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Telefon
                                    Numarası</label>
                                <input name="phone" type="tel"
                                    class="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-gray-100 focus:border-black outline-none transition-all placeholder:text-gray-400"
                                    placeholder="05XX XXX XX XX" />
                            </div>
                        </div>
                        <div class="space-y-2">
                            <label class="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">E-posta
                                Adresi</label>
                            <input name="email" type="email"
                                class="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-gray-100 focus:border-black outline-none transition-all placeholder:text-gray-400"
                                placeholder="ornek@email.com" />
                        </div>
                        <div class="space-y-2">
                            <label
                                class="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Mesajınız</label>
                            <textarea name="message" required rows="5"
                                class="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-gray-100 focus:border-black outline-none transition-all placeholder:text-gray-400 resize-none"
                                placeholder="Size nasıl yardımcı olabiliriz?"></textarea>
                        </div>
                        <button type="submit"
                            class="w-full py-5 bg-black text-white font-bold tracking-wide rounded-2xl hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 active:scale-[0.98]">
                            Mesajı Gönder
                        </button>
                    </form>
                </div>
            </div>

            <!-- Map Section -->
            @if(isset($settings['contact']['mapUrl']) && $settings['contact']['mapUrl'])
                <div class="mt-24 rounded-3xl overflow-hidden h-[450px] shadow-sm border border-gray-100">
                    <iframe src="{{ $settings['contact']['mapUrl'] }}" width="100%" height="100%" style="border: 0;"
                        allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            @endif
        </div>
    </div>
</x-layouts.app>