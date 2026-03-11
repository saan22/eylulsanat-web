<x-layouts.app title="Ürünlerimiz | Eylül Sanat Mağaza">
    <div class="pt-48 pb-24 bg-white min-h-screen">
        <div class="container mx-auto px-6">
            <div class="text-center max-w-2xl mx-auto mb-16">
                <h1 class="text-4xl md:text-5xl font-serif font-bold mb-6">Mağaza Seçkisi</h1>
                <p class="text-gray-500">
                    Eylül Sanat Atölyesi'nde eğitmenlerimiz ve sanatçılarımız tarafından özenle hazırlanan sınırlı
                    sayıdaki eserler.
                </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                @forelse($products as $product)
                    <div class="group block">
                        <a href="/urunler/{{ $product->slug }}" class="block">
                            <div
                                class="aspect-[4/5] overflow-hidden rounded-2xl mb-6 bg-gray-50 shadow-sm border border-gray-100 relative">
                                @php
                                    $imgSrc = 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop';
                                    if ($product->image) {
                                        if (\Illuminate\Support\Str::startsWith($product->image, ['http://', 'https://'])) {
                                            $imgSrc = $product->image;
                                        } elseif (\Illuminate\Support\Str::startsWith($product->image, '/uploads/')) {
                                            $imgSrc = asset($product->image);
                                        } else {
                                            $imgSrc = asset('storage/' . $product->image);
                                        }
                                    }
                                @endphp
                                <img src="{{ $imgSrc }}" alt="{{ $product->title }}"
                                    class="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                            </div>
                        </a>
                        
                        <div class="space-y-2">
                            <div class="flex justify-between items-start gap-4">
                                <a href="/urunler/{{ $product->slug }}" class="hover:text-gray-600 transition">
                                    <h2 class="text-xl font-serif font-medium">
                                        {{ $product->title }}
                                    </h2>
                                </a>
                                <span class="font-bold text-lg whitespace-nowrap">{{ $product->price }} TL</span>
                            </div>
                            <p class="text-gray-500 text-sm line-clamp-2">{{ $product->description }}</p>

                            @if(isset($settings['contact']['phone']))
                                @php
                                    $waNumber = preg_replace('/\D/', '', $settings['contact']['phone']);
                                    $waMessage = urlencode("Merhaba, '{$product->title}' adlı eseri satın almak istiyorum.");
                                @endphp
                                <div class="pt-4">
                                    <a href="https://wa.me/{{ $waNumber }}?text={{ $waMessage }}" target="_blank"
                                        class="block w-full text-center py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition text-sm font-bold tracking-wider">
                                        SATIN ALMAK İÇİN ULAŞIN
                                    </a>
                                </div>
                            @endif
                        </div>
                    </div>
                @empty
                    <div class="col-span-1 lg:col-span-3 py-20 text-center bg-gray-50 rounded-2xl">
                        <p class="text-gray-500">Henüz ürün eklenmemiş.</p>
                    </div>
                @endforelse
            </div>
        </div>
    </div>
</x-layouts.app>