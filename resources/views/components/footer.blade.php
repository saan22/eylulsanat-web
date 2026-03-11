<footer class="bg-black text-white py-16">
    <div class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

        <div class="md:col-span-2">
            @php
                $footerLogo = $settings['footer_logo'] ?? ($settings['logo'] ?? null);
            @endphp
            @if($footerLogo)
                @php
                    if (\Illuminate\Support\Str::startsWith($footerLogo, ['http://', 'https://'])) {
                        $logoImg = $footerLogo;
                    } elseif (\Illuminate\Support\Str::startsWith($footerLogo, '/uploads/')) {
                        $logoImg = asset($footerLogo);
                    } else {
                        $logoImg = asset('storage/' . $footerLogo);
                    }
                @endphp
                <img src="{{ $logoImg }}" alt="{{ $settings['siteTitle'] ?? 'Eylül Sanat' }}"
                    class="h-20 w-auto object-contain mb-8" />
            @else
                <h2 class="font-serif text-2xl font-bold mb-6">{{ $settings['siteTitle'] ?? 'Eylül Sanat Atölyesi' }}</h2>
            @endif
            <p class="text-gray-400 leading-relaxed max-w-sm">
                {{ $settings['siteDescription'] ?? '' }}
            </p>
        </div>

        <div>
            <h3 class="font-medium text-lg mb-6">Keşfedin</h3>
            <ul class="space-y-4 text-gray-400">
                <li><a href="/urunler" class="hover:text-white transition">Mağaza</a></li>
                <li><a href="/kurslar" class="hover:text-white transition">Kurslarımız</a></li>
                <li><a href="/galeri" class="hover:text-white transition">Galeri</a></li>
            </ul>
        </div>

        <div>
            <h3 class="font-medium text-lg mb-6">İletişim</h3>
            <ul class="space-y-4 text-gray-400">
                <li>{{ $settings['contact']['address'] ?? '' }}</li>
                <li>{{ $settings['contact']['phone'] ?? '' }}</li>
                <li>{{ $settings['contact']['email'] ?? '' }}</li>
            </ul>
        </div>

    </div>
    <div class="container mx-auto px-6 pt-8 mt-12 border-t border-gray-800 text-center text-gray-500 text-sm">
        &copy; {{ date('Y') }} {{ $settings['siteTitle'] ?? 'Eylül Sanat Atölyesi' }}. Tüm hakları saklıdır.
    </div>
</footer>