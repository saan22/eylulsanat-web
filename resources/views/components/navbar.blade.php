<header x-data="{ isScrolled: false, isMobileMenuOpen: false }" @scroll.window="isScrolled = window.scrollY > 50"
    :class="{
        'bg-white/95 backdrop-blur-xl py-2 shadow-sm border-b border-gray-100 text-black': isScrolled || '{{ request()->is('/') ? 'false' : 'true' }}' === 'true',
        'bg-transparent py-4 text-white': !isScrolled && '{{ request()->is('/') ? 'true' : 'false' }}' === 'true'
    }" class="fixed top-0 left-0 w-full z-50 transition-all duration-300">
    <div class="container mx-auto px-6 py-2 flex justify-between items-center">
        <!-- Logo -->
        <div>
            <a href="/" class="flex items-center gap-2 relative z-50 group">
                @if(isset($settings['logo']) && $settings['logo'])
                    @php
                        if (\Illuminate\Support\Str::startsWith($settings['logo'], ['http://', 'https://'])) {
                            $logoImg = $settings['logo'];
                        } elseif (\Illuminate\Support\Str::startsWith($settings['logo'], '/uploads/')) {
                            $logoImg = asset($settings['logo']);
                        } else {
                            $logoImg = asset('storage/' . $settings['logo']);
                        }
                    @endphp
                    <img src="{{ $logoImg }}" alt="{{ $settings['siteTitle'] ?? 'Eylül Sanat' }}"
                        class="h-14 md:h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
                @else
                    <span class="font-serif text-2xl font-bold tracking-tight transition-colors duration-500">
                        {{ $settings['siteTitle'] ?? 'Eylul Sanat' }}
                    </span>
                @endif
            </a>
        </div>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-2">
            <a href="/"
                class="relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full hover:bg-gray-100/20">Anasayfa</a>
            <a href="/urunler"
                class="relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full hover:bg-gray-100/20">Mağaza</a>
            <a href="/kurslar"
                class="relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full hover:bg-gray-100/20">Kurslarımız</a>
            <a href="/galeri"
                class="relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full hover:bg-gray-100/20">Galeri</a>
            <a href="/iletisim" :class="{
                   'bg-black text-white hover:bg-gray-800': isScrolled || '{{ request()->is('/') ? 'false' : 'true' }}' === 'true',
                   'bg-white text-black hover:bg-gray-100': !isScrolled && '{{ request()->is('/') ? 'true' : 'false' }}' === 'true'
               }"
                class="relative text-sm tracking-wide transition-all duration-300 rounded-full font-bold ml-4 px-6 py-2">
                İletişim
            </a>
        </nav>

        <!-- Mobile Toggle -->
        <button @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden relative z-50 p-2 rounded-full bg-gray-100/10 backdrop-blur-md">
            <svg x-show="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            <svg x-show="isMobileMenuOpen" x-cloak xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-black"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <!-- Mobile Menu -->
        <div x-show="isMobileMenuOpen" x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="opacity-0 translate-x-full" x-transition:enter-end="opacity-100 translate-x-0"
            x-transition:leave="transition ease-in duration-300" x-transition:leave-start="opacity-100 translate-x-0"
            x-transition:leave-end="opacity-0 translate-x-full"
            class="fixed inset-0 bg-white z-[40] flex flex-col items-center justify-center p-8 md:hidden text-black"
            x-cloak>
            <div class="flex flex-col items-center gap-8">
                <a href="/" @click="isMobileMenuOpen = false"
                    class="text-3xl font-serif font-bold transition-colors hover:text-gray-500">Anasayfa</a>
                <a href="/urunler" @click="isMobileMenuOpen = false"
                    class="text-3xl font-serif font-bold transition-colors hover:text-gray-500">Mağaza</a>
                <a href="/kurslar" @click="isMobileMenuOpen = false"
                    class="text-3xl font-serif font-bold transition-colors hover:text-gray-500">Kurslarımız</a>
                <a href="/galeri" @click="isMobileMenuOpen = false"
                    class="text-3xl font-serif font-bold transition-colors hover:text-gray-500">Galeri</a>
                <a href="/iletisim" @click="isMobileMenuOpen = false"
                    class="text-3xl font-serif font-bold transition-colors text-primary">İletişim</a>
            </div>
        </div>
    </div>
</header>