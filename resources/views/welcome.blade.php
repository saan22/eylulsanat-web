<x-layouts.app>

    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
        <!-- Background Image with Overlay -->
        <div class="absolute inset-0 z-0">
            @php
                $heroImg = 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2080&auto=format&fit=crop';
                if(isset($settings['hero']['image']) && $settings['hero']['image']) {
                    $heroImg = \Illuminate\Support\Str::startsWith($settings['hero']['image'], ['http://', 'https://']) ? $settings['hero']['image'] : asset('storage/' . $settings['hero']['image']);
                }
            @endphp
            <img
                src="{{ $heroImg }}"
                alt="Sanat Atölyesi"
                class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <h1 class="font-serif text-5xl md:text-7xl font-bold text-white leading-tight whitespace-pre-line">
                {{ $settings['hero']['title'] ?? 'Sanatın Kalbi Burada Atıyor' }}
            </h1>
            <p class="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
                {{ $settings['hero']['subtitle'] ?? 'Yeteneklerinizi keşfedin.' }}
            </p>

            <div class="flex flex-col md:flex-row gap-4 justify-center items-center pt-4">
                <a
                    href="/kurslar"
                    class="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition min-w-[200px]"
                >
                    Kursları İncele
                </a>
                <a
                    href="/iletisim"
                    class="px-8 py-4 bg-transparent border border-white text-white font-medium rounded-full hover:bg-white/10 transition min-w-[200px]"
                >
                    Bize Ulaşın
                </a>
            </div>
        </div>
    </section>

    <!-- Featured Courses Section -->
    <section class="py-24 bg-white">
        <div class="container mx-auto px-6">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                <div>
                    <span class="text-sm font-medium tracking-widest text-gray-500 uppercase">Keşfedin</span>
                    <h2 class="text-4xl font-serif font-bold mt-2">Popüler Kurslarımız</h2>
                </div>
                <a
                    href="/kurslar"
                    class="hidden md:flex items-center gap-2 group text-gray-900 border-b border-black pb-1"
                >
                    <span>Tümünü Gör</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                @forelse($activeCourses as $course)
                    <a href="/kurslar/{{ $course->slug }}" class="group block">
                        <div class="relative aspect-[4/5] overflow-hidden rounded-sm mb-6 bg-gray-100 border border-gray-100">
                            @php
                                $imgSrc = 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop';
                                if($course->image) {
                                    $imgSrc = \Illuminate\Support\Str::startsWith($course->image, ['http://', 'https://']) ? $course->image : asset('storage/' . $course->image);
                                }
                            @endphp
                            <img
                                src="{{ $imgSrc }}"
                                alt="{{ $course->title }}"
                                class="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                            />
                            @if($course->duration)
                            <div class="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-sm">
                                {{ $course->duration }}
                            </div>
                            @endif
                        </div>
                        <h3 class="text-2xl font-serif font-medium mb-2 group-hover:text-gray-600 transition text-black">
                            {{ $course->title }}
                        </h3>
                        <p class="text-gray-500 line-clamp-2 text-sm leading-relaxed">
                            {{ Str::limit($course->description, 120) }}
                        </p>
                    </a>
                @empty
                    <div class="col-span-3 text-center py-20 bg-gray-50 rounded-lg">
                        <p class="text-gray-500">Henüz aktif kurs bulunmuyor.</p>
                    </div>
                @endforelse
            </div>
        </div>
    </section>

    <!-- About Teaser -->
    <section class="py-24 bg-[#F9F9F9]">
        <div class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div class="relative bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
                @php
                    $aboutImg = 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop';
                    if(isset($settings['about']['image']) && $settings['about']['image']) {
                        $aboutImg = \Illuminate\Support\Str::startsWith($settings['about']['image'], ['http://', 'https://']) ? $settings['about']['image'] : asset('storage/' . $settings['about']['image']);
                    }
                @endphp
                <img
                    src="{{ $aboutImg }}"
                    alt="{{ $settings['about']['title'] ?? 'Biz Kimiz?' }}"
                    class="relative z-10 w-full h-[500px] object-cover shadow-2xl"
                />
            </div>
            <div>
                <span class="text-sm font-medium tracking-widest text-gray-500 uppercase">{{ $settings['about']['title'] ?? 'Biz Kimiz?' }}</span>
                <h2 class="text-4xl md:text-5xl font-serif font-bold mt-4 mb-8">{{ $settings['siteTitle'] ?? 'Eylül Sanat' }}</h2>
                <p class="text-gray-600 leading-relaxed mb-6 text-lg whitespace-pre-wrap">
                    {{ $settings['about']['description'] ?? '' }}
                </p>
                
                @if(isset($settings['whyUs']) && isset($settings['whyUs']['items']))
                <div class="space-y-4 mb-10">
                    <p class="font-medium">{{ $settings['whyUs']['title'] ?? 'Neden Bizi Seçmelisiniz?' }}</p>
                    <ul class="space-y-3">
                        @foreach($settings['whyUs']['items'] as $item)
                            <li class="flex items-center gap-3">
                                <div class="w-1.5 h-1.5 bg-black rounded-full"></div>
                                <span class="text-gray-700">{{ $item }}</span>
                            </li>
                        @endforeach
                    </ul>
                </div>
                @endif
                
                <a href="/iletisim" class="bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 transition inline-block">
                    Bizimle Tanışın
                </a>
            </div>
        </div>
    </section>

</x-layouts.app>
