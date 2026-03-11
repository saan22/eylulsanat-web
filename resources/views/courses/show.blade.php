<x-layouts.app :title="$course->title . ' | Eylül Sanat Atölyesi'">
    <div class="bg-white min-h-screen pb-20 pt-24">

        <!-- Hero Header -->
        <div class="relative h-[50vh] w-full bg-gray-900 overflow-hidden">
            @php
                $imgSrc = 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop';
                if ($course->image) {
                    $imgSrc = \Illuminate\Support\Str::startsWith($course->image, ['http://', 'https://']) ? $course->image : asset('storage/' . $course->image);
                }
            @endphp
            <img src="{{ $imgSrc }}" alt="{{ $course->title }}" class="w-full h-full object-cover opacity-70" />
            <div
                class="absolute inset-0 flex flex-col justify-end p-6 md:p-12 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <div class="container mx-auto">
                    <a href="/kurslar"
                        class="text-white/80 hover:text-white flex items-center gap-2 mb-6 w-fit transition group">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Tüm Kurslar</span>
                    </a>
                    <h1 class="text-4xl md:text-6xl font-serif font-bold text-white mb-4 animate-fade-in">
                        {{ $course->title }}
                    </h1>
                </div>
            </div>
        </div>

        <div class="container mx-auto px-6 -mt-12 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <!-- Main Content -->
                <div class="lg:col-span-2 space-y-8">
                    <div class="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
                        <h2 class="text-2xl font-bold mb-8 flex items-center gap-3">
                            <div class="w-8 h-1 bg-black rounded-full"></div>
                            Eğitim Hakkında
                        </h2>
                        <div class="prose prose-lg text-gray-600 max-w-none whitespace-pre-line leading-relaxed">
                            {{ $course->description }}

                            @if(isset($course->long_description))
                                <br><br>
                                {{ $course->long_description }}
                            @endif
                        </div>

                        <div class="mt-12">
                            <!-- Course Features Info Area if needed -->
                            @if(is_array($course->features) && count($course->features) > 0)
                                <div class="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                    <h3 class="font-bold mb-4 flex items-center gap-2 text-green-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Neler Öğreneceksiniz?
                                    </h3>
                                    <ul class="space-y-3 text-sm text-gray-600">
                                        @foreach($course->features as $feature)
                                            <li class="flex gap-2"><span>•</span> {{ $feature }}</li>
                                        @endforeach
                                    </ul>
                                </div>
                            @endif
                        </div>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="lg:col-span-1">
                    <div class="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 sticky top-32">
                        <div class="space-y-8">
                            <div class="space-y-6">
                                <div class="flex items-center gap-4 text-gray-700">
                                    <div class="bg-gray-50 p-3 rounded-2xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-xs text-gray-500 uppercase tracking-widest font-bold">Ders Süresi
                                        </p>
                                        <p class="font-serif text-xl">{{ $course->duration }}</p>
                                    </div>
                                </div>

                                <div class="flex items-center gap-4 text-gray-700">
                                    <div class="bg-gray-50 p-3 rounded-2xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-xs text-gray-500 uppercase tracking-widest font-bold">Eğitim
                                            Ücreti</p>
                                        <p class="font-serif text-xl">{{ $course->price }} TL <span
                                                class="text-sm font-sans text-gray-400 font-normal">/ Aylık</span></p>
                                    </div>
                                </div>
                            </div>

                            @php
                                $phone = $settings['contact']['phone'] ?? '';
                                $cleanPhone = preg_replace('/\D/', '', $phone);
                                $message = urlencode("Merhaba, \"{$course->title}\" kursunuz hakkında bilgi almak istiyorum.");
                                $waLink = "https://wa.me/{$cleanPhone}?text={$message}";
                            @endphp

                            <div class="pt-6 border-t border-gray-100 space-y-4">
                                <h3 class="font-bold text-center text-lg">Ön Kayıt & Bilgi</h3>
                                <a href="{{ $waLink }}" target="_blank"
                                    class="block w-full text-center py-5 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition shadow-xl shadow-green-100">
                                    WhatsApp ile Bilgi Al
                                </a>
                                <a href="/iletisim"
                                    class="block w-full text-center py-5 bg-black text-white font-bold rounded-2xl hover:bg-gray-800 transition shadow-xl shadow-gray-100">
                                    İletişim Formunu Doldur
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-layouts.app>