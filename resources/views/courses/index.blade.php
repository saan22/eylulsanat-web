<x-layouts.app>
    <div class="pt-48 pb-24 bg-[#FDFDFD] min-h-screen">
        <div class="container mx-auto px-6">
            <div class="max-w-3xl mx-auto text-center mb-20 space-y-4">
                <div
                    class="flex items-center justify-center gap-2 text-gray-400 text-sm font-bold uppercase tracking-widest">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path
                            d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a4.4 4.4 0 0 1 0-8.5l6.135-1.582a2 2 0 0 0 1.437-1.437l1.582-6.135a4.4 4.4 0 0 1 8.5 0l1.582 6.135a2 2 0 0 0 1.437 1.437l6.135 1.582a4.4 4.4 0 0 1 0 8.5l-6.135 1.582a2 2 0 0 0-1.437 1.437l-1.582 6.135a4.4 4.4 0 0 1-8.5 0z" />
                    </svg>
                    Akademik Eğitimler
                </div>
                <h1 class="text-4xl md:text-6xl font-serif font-bold text-gray-900 leading-tight">Sanatsal Yolculuğunuz
                    <br /> <span class="italic font-light">Burada Başlıyor</span>
                </h1>
                <p class="text-gray-500 text-lg max-w-xl mx-auto font-light">
                    Her yaş grubu için özel olarak hazırlanan müfredatımızla, profesyonel sanatçılar eşliğinde
                    yeteneklerinizi bir üst seviyeye taşıyın.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                @forelse($courses as $course)
                    <a href="{{ url('/kurslar', $course->slug) }}" class="group block">
                        <div
                            class="relative aspect-[4/5] overflow-hidden rounded-3xl mb-8 bg-gray-100 shadow-sm border border-gray-100">
                            @php
                                $imgSrc = 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop';
                                if ($course->image) {
                                    if (\Illuminate\Support\Str::startsWith($course->image, ['http://', 'https://'])) {
                                        $imgSrc = $course->image;
                                    } elseif (\Illuminate\Support\Str::startsWith($course->image, '/uploads/')) {
                                        $imgSrc = asset($course->image);
                                    } else {
                                        $imgSrc = asset('storage/' . $course->image);
                                    }
                                }
                            @endphp
                            <img src="{{ $imgSrc }}" alt="{{ $course->title }}"
                                class="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:rotate-1" />
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                <span class="text-white font-medium flex items-center gap-2">
                                    Detayları İncele
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            </div>
                            @if($course->duration)
                                <div
                                    class="absolute top-6 right-6 bg-white/95 backdrop-blur shadow-lg px-4 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-black">
                                    {{ $course->duration }}
                                </div>
                            @endif
                        </div>

                        <div class="space-y-3 px-2">
                            <div class="flex justify-between items-center">
                                <h2
                                    class="text-2xl font-serif font-bold group-hover:text-gray-600 transition tracking-tight">
                                    {{ $course->title }}
                                </h2>
                                <div class="h-px flex-grow mx-4 bg-gray-100 group-hover:bg-black/10 transition-colors">
                                </div>
                                <span
                                    class="font-serif text-lg font-medium text-gray-900 whitespace-nowrap">{{ $course->price }}
                                    TL</span>
                            </div>
                            <p class="text-gray-500 text-sm leading-relaxed line-clamp-2 font-light">
                                {{ strtok($course->description, "\n") }}
                            </p>

                        </div>
                    </a>
                @empty
                    <div
                        class="col-span-1 lg:col-span-3 py-32 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <p class="text-gray-400 font-serif italic text-xl">Henüz bir kurs bulunamadı. Lütfen daha sonra
                            tekrar kontrol edin.</p>
                    </div>
                @endforelse
            </div>
        </div>
    </div>
</x-layouts.app>