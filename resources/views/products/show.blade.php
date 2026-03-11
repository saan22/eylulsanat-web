<x-layouts.app title="{{ $product->title }} | Eylül Sanat Mağaza">
    <div class="pt-48 pb-24 bg-white min-h-screen">
        <div class="container mx-auto px-6">
            <div class="flex flex-col lg:flex-row gap-16">
                <!-- Sol: Görseller -->
                <div class="lg:w-1/2 space-y-4">
                    <div class="rounded-2xl bg-gray-50 border border-gray-100 shadow-sm overflow-hidden" 
                         style="aspect-ratio: 4/5; max-height: 700px; display: flex; align-items: center; justify-content: center;">
                        @php
                            $mainImg = 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop';
                            if ($product->image) {
                                if (\Illuminate\Support\Str::startsWith($product->image, ['http://', 'https://'])) {
                                    $mainImg = $product->image;
                                } else {
                                    $mainImg = asset('storage/' . $product->image);
                                }
                            }
                        @endphp
                        <img id="mainImage" src="{{ $mainImg }}" alt="{{ $product->title }}"
                            class="w-full h-full object-cover" />
                    </div>

                    @if($product->gallery && is_array($product->gallery) && count($product->gallery) > 0)
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 20px;">
                        <!-- Ana resim de küçükler arasında olsun -->
                        <div class="aspect-square rounded-lg overflow-hidden border-2 border-black cursor-pointer thumbnail-item active" 
                             style="aspect-ratio: 1/1; cursor: pointer;"
                             onclick="changeImage('{{ $mainImg }}', this)">
                            <img src="{{ $mainImg }}" class="w-full h-full object-cover" />
                        </div>
                        @foreach($product->gallery as $img)
                            @php
                                $thumbUrl = \Illuminate\Support\Str::startsWith($img, ['http://', 'https://']) ? $img : asset('storage/' . $img);
                            @endphp
                            <div class="aspect-square rounded-lg overflow-hidden border border-gray-200 cursor-pointer thumbnail-item" 
                                 style="aspect-ratio: 1/1; cursor: pointer; opacity: 0.6; transition: 0.3s;"
                                 onmouseover="this.style.opacity='1'" 
                                 onmouseout="if(!this.classList.contains('active')) this.style.opacity='0.6'"
                                 onclick="changeImage('{{ $thumbUrl }}', this)">
                                <img src="{{ $thumbUrl }}" class="w-full h-full object-cover" />
                            </div>
                        @endforeach
                    </div>
                    @endif
                </div>

                <!-- Sağ: Bilgiler -->
                <div class="lg:w-1/2 space-y-8">
                    <div>
                        <nav class="flex text-sm text-gray-400 mb-4" aria-label="Breadcrumb" style="display: flex; gap: 8px; flex-wrap: wrap;">
                            <a href="/" class="hover:text-black">Anasayfa</a>
                            <span>/</span>
                            <a href="/urunler" class="hover:text-black">Mağaza</a>
                            @if($product->category)
                            <span>/</span>
                            <span class="text-gray-600">{{ $product->category }}</span>
                            @endif
                        </nav>
                        <h1 class="text-4xl md:text-5xl font-serif font-bold mb-4" style="line-height: 1.2;">{{ $product->title }}</h1>
                        <p class="text-3xl font-serif text-gray-900" style="margin-top: 10px;">{{ number_format($product->price, 0, ',', '.') }} TL</p>
                    </div>

                    <div class="prose prose-gray max-w-none">
                        <p class="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                            {{ $product->description }}
                        </p>
                    </div>

                    @if($product->features && is_array($product->features) && count($product->features) > 0)
                    <div class="border-t border-b border-gray-100 py-8 space-y-4" style="border-top: 1px solid #f3f4f6; border-bottom: 1px solid #f3f4f6; padding: 2rem 0;">
                        <h3 class="font-bold text-sm uppercase tracking-widest text-gray-400 mb-4">Ürün Özellikleri</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
                            @foreach($product->features as $feature)
                                <div style="display: flex; align-items: center; gap: 12px; color: #4b5563;">
                                    <div style="width: 6px; height: 6px; background: black; border-radius: 50%;"></div>
                                    <span>{{ $feature }}</span>
                                </div>
                            @endforeach
                        </div>
                    </div>
                    @endif

                    @php
                        $waNumber = isset($settings['contact']['phone']) ? preg_replace('/\D/', '', $settings['contact']['phone']) : '';
                        $waMessage = urlencode("Merhaba, '{$product->title}' adlı eseri satın almak istiyorum. Yardımcı olabilir misiniz?");
                    @endphp
                    <div class="pt-6">
                        <a href="https://wa.me/{{ $waNumber }}?text={{ $waMessage }}" target="_blank"
                            class="flex items-center justify-center gap-3 w-full py-5 bg-black text-white rounded-full hover:bg-gray-800 transition text-lg font-bold tracking-wider"
                            style="display: flex; align-items: center; justify-content: center; gap: 12px; padding: 1.25rem; background: black; color: white; border-radius: 9999px; text-decoration: none;">
                            <svg xmlns="http://www.w3.org/2000/svg" style="width: 24px; height: 24px;" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.316 1.592 5.43.003 9.85-4.417 9.853-9.848.002-2.62-1.022-5.087-2.884-6.95s-4.329-2.887-6.953-2.889c-5.43-.003-9.851 4.417-9.854 9.848-.001 2.12.553 3.864 1.567 5.405l-1.01 3.692 3.841-1.007zm14.746-12.985l-.013-.002c-.08-.002-.132-.006-.183-.01-.051-.004-.325-.03-.556-.054l-.014-.001-.055-.005c-.171-.017-.504-.15-.718-.32l-.025-.02-.023-.02c-.171-.144-.326-.453-.393-.728l-.011-.044c-.032-.128-.06-.24-.085-.357l-.027-.123c-.023-.111-.047-.221-.064-.326l-.004-.035-.004-.029c-.015-.125-.025-.213-.03-.27l-.001-.018c-.012-.139-.015-.246-.015-.333v-.016c.001-.115.01-.204.018-.285l-.002-.008z"></path>
                            </svg>
                            SATIN ALMAK İÇİN ULAŞIN
                        </a>
                        <p class="text-center text-gray-400 mt-4 text-sm font-light">Eserler hakkında detaylı bilgi ve gönderim seçenekleri için bizimle WhatsApp üzerinden iletişime geçebilirsiniz.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function changeImage(src, el) {
            document.getElementById('mainImage').src = src;
            
            // Tüm thumbnail'lerin aktiflik sınıfını temizle
            document.querySelectorAll('.thumbnail-item').forEach(function(item) {
                item.classList.remove('border-black', 'active');
                item.style.borderColor = '#e5e7eb';
                item.style.opacity = '0.6';
                item.style.borderWidth = '1px';
            });
            
            // Tıklanana aktiflik ver
            el.classList.add('border-black', 'active');
            el.style.borderColor = 'black';
            el.style.borderWidth = '2px';
            el.style.opacity = '1';
        }
    </script>
</x-layouts.app>
