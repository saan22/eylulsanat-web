<x-layouts.app title="{{ $product->title }} | Eylül Sanat Mağaza">
    <div class="pt-48 pb-24 bg-white min-h-screen">
        <div class="container mx-auto px-6">
            <!-- Ana Sayfa Düzeni (Flex Container) -->
            <div style="display: flex; flex-wrap: wrap; gap: 40px; align-items: flex-start;">
                
                <!-- Sol Kolon: Görseller (Genişlik %40) -->
                <div style="flex: 1; min-width: 300px; max-width: 500px;">
                    <div class="rounded-2xl bg-gray-50 border border-gray-100 shadow-sm overflow-hidden" 
                         style="aspect-ratio: 4/5; display: flex; align-items: center; justify-content: center; background: #f9fafb;">
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
                            style="width: 100%; height: 100%; object-fit: cover;" />
                    </div>

                    @if($product->gallery && is_array($product->gallery) && count($product->gallery) > 0)
                    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-top: 15px;">
                        <div class="thumbnail-item active" 
                             style="aspect-ratio: 1/1; cursor: pointer; border: 2px solid black; border-radius: 8px; overflow: hidden;"
                             onclick="changeImage('{{ $mainImg }}', this)">
                            <img src="{{ $mainImg }}" style="width: 100%; height: 100%; object-fit: cover;" />
                        </div>
                        @foreach($product->gallery as $img)
                            @php
                                $thumbUrl = \Illuminate\Support\Str::startsWith($img, ['http://', 'https://']) ? $img : asset('storage/' . $img);
                            @endphp
                            <div class="thumbnail-item" 
                                 style="aspect-ratio: 1/1; cursor: pointer; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; opacity: 0.6; transition: 0.3s;"
                                 onmouseover="this.style.opacity='1'" 
                                 onmouseout="if(!this.classList.contains('active')) this.style.opacity='0.6'"
                                 onclick="changeImage('{{ $thumbUrl }}', this)">
                                <img src="{{ $thumbUrl }}" style="width: 100%; height: 100%; object-fit: cover;" />
                            </div>
                        @endforeach
                    </div>
                    @endif
                </div>

                <!-- Sağ Kolon: Bilgiler (Genişlik %55-60) -->
                <div style="flex: 1.5; min-width: 320px; display: flex; flex-direction: column; gap: 25px;">
                    <div>
                        <nav style="display: flex; gap: 8px; color: #9ca3af; font-size: 0.875rem; margin-bottom: 15px;">
                            <a href="/" style="color: inherit; text-decoration: none;">Anasayfa</a>
                            <span>/</span>
                            <a href="/urunler" style="color: inherit; text-decoration: none;">Mağaza</a>
                            @if($product->category)
                            <span>/</span>
                            <span style="color: #4b5563;">{{ $product->category }}</span>
                            @endif
                        </nav>
                        <h1 style="font-family: serif; font-size: clamp(2rem, 5vw, 3rem); font-weight: bold; margin: 0; line-height: 1.1;">{{ $product->title }}</h1>
                        <p style="font-family: serif; font-size: 1.875rem; color: #111827; margin-top: 15px;">{{ number_format($product->price, 0, ',', '.') }} TL</p>
                    </div>

                    <div style="margin: 10px 0;">
                        <p style="color: #4b5563; font-size: 1.125rem; line-height: 1.7; white-space: pre-wrap;">{{ $product->description }}</p>
                    </div>

                    @php
                        $waNumber = isset($settings['contact']['phone']) ? preg_replace('/\D/', '', $settings['contact']['phone']) : '';
                        $waMessage = urlencode("Merhaba, '{$product->title}' adlı eseri satın almak istiyorum. Yardımcı olabilir misiniz?");
                    @endphp
                    
                    <div style="margin-top: 10px;">
                        <a href="https://wa.me/{{ $waNumber }}?text={{ $waMessage }}" target="_blank"
                           style="display: flex; align-items: center; justify-content: center; gap: 12px; width: 100%; padding: 1.25rem; background: black; color: white; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 1.125rem; transition: 0.3s;"
                           onmouseover="this.style.background='#333'" onmouseout="this.style.background='black'">
                            <svg xmlns="http://www.w3.org/2000/svg" style="width: 24px; height: 24px;" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.316 1.592 5.43.003 9.85-4.417 9.853-9.848.002-2.62-1.022-5.087-2.884-6.95s-4.329-2.887-6.953-2.889c-5.43-.003-9.851 4.417-9.854 9.848-.001 2.12.553 3.864 1.567 5.405l-1.01 3.692 3.841-1.007zm14.746-12.985l-.013-.002c-.08-.002-.132-.006-.183-.01-.051-.004-.325-.03-.556-.054l-.014-.001-.055-.005c-.171-.017-.504-.15-.718-.32l-.025-.02-.023-.02c-.171-.144-.326-.453-.393-.728l-.011-.044c-.032-.128-.06-.24-.085-.357l-.027-.123c-.023-.111-.047-.221-.064-.326l-.004-.035-.004-.029c-.015-.125-.025-.213-.03-.27l-.001-.018c-.012-.139-.015-.246-.015-.333v-.016c.001-.115.01-.204.018-.285l-.002-.008z"></path>
                            </svg>
                            SATIN ALMAK İÇİN ULAŞIN
                        </a>
                        <p style="text-align: center; color: #9ca3af; font-size: 0.875rem; margin-top: 15px;">Eserler hakkında detaylı bilgi için bizimle iletişime geçebilirsiniz.</p>
                    </div>

                    @if($product->features && is_array($product->features) && count($product->features) > 0)
                    <div style="border-top: 1px solid #f3f4f6; padding-top: 25px; margin-top: 10px;">
                        <h3 style="font-weight: bold; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin-bottom: 20px;">Ürün Özellikleri</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
                            @foreach($product->features as $feature)
                                <div style="display: flex; align-items: center; gap: 10px; color: #4b5563;">
                                    <div style="width: 5px; height: 5px; background: black; border-radius: 50%;"></div>
                                    <span style="font-size: 0.9375rem;">{{ $feature }}</span>
                                </div>
                            @endforeach
                        </div>
                    </div>
                    @endif
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
