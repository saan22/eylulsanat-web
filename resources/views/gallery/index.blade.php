<x-layouts.app title="Galeri | Eylül Sanat">
    <div class="pt-48 pb-24 bg-white min-h-screen" x-data="gallery()">
        <div class="container mx-auto px-6">
            <h1 class="text-4xl md:text-5xl font-serif font-bold mb-6 text-center">Galeri</h1>
            <p class="text-center text-gray-500 max-w-xl mx-auto mb-16">
                Öğrencilerimizin eserleri ve atölyemizden ilham veren anlar.
            </p>

            <!-- Gallery Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8">
                @foreach($galleryItems as $index => $item)
                    <div @click="openLightbox({{ $index }})"
                        class="relative group rounded-3xl overflow-hidden cursor-zoom-in aspect-square shadow-sm border border-gray-100 bg-gray-50">
                        @php
                            $imgUrl = '';
                            if (isset($item->url) && $item->url) {
                                if (\Illuminate\Support\Str::startsWith($item->url, ['http://', 'https://'])) {
                                    $imgUrl = $item->url;
                                } elseif (\Illuminate\Support\Str::startsWith($item->url, '/uploads/')) {
                                    $imgUrl = asset($item->url);
                                } else {
                                    $imgUrl = asset('storage/' . $item->url);
                                }
                            }
                        @endphp
                        <img src="{{ $imgUrl }}" alt="{{ $item->title ?? 'Galeri görseli' }}"
                            class="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                        <div
                            class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4 md:p-6 pointer-events-none">
                            <div>
                                <span
                                    class="text-[10px] md:text-xs font-bold text-white/80 uppercase tracking-widest">{{ $item->category }}</span>
                                <h3 class="text-white font-serif text-lg md:text-xl">{{ $item->title }}</h3>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        <!-- Lightbox Modal via Alpine.js -->
        <div x-show="selectedIdx !== null" x-transition.opacity.duration.300ms
            class="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
            x-cloak @keydown.escape.window="closeLightbox()" @keydown.arrow-left.window="prevImage()"
            @keydown.arrow-right.window="nextImage()">
            <!-- Background overlay -->
            <div class="absolute inset-0 -z-10 cursor-pointer" @click="closeLightbox()"></div>

            <!-- Close btn -->
            <button @click="closeLightbox()"
                class="absolute top-8 right-8 text-white/70 hover:text-white transition z-50 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <!-- Nav Prev -->
            <button @click.stop="prevImage()"
                class="absolute left-4 md:left-8 text-white/50 hover:text-white transition z-50 p-4 bg-white/5 hover:bg-white/10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <!-- Nav Next -->
            <button @click.stop="nextImage()"
                class="absolute right-4 md:right-8 text-white/50 hover:text-white transition z-50 p-4 bg-white/5 hover:bg-white/10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>

            <!-- Image Area -->
            <div class="relative pointer-events-auto" x-show="currentImage"
                x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0 scale-95"
                x-transition:enter-end="opacity-100 scale-100">
                <img :src="currentImage?.url" :alt="currentImage?.title"
                    class="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl mx-auto" />
                <div class="mt-8 text-center text-white space-y-2">
                    <span class="text-xs font-bold text-white/50 uppercase tracking-[0.3em]"
                        x-text="currentImage?.category"></span>
                    <h3 class="text-2xl md:text-3xl font-serif font-bold" x-text="currentImage?.title"></h3>
                    <p class="text-white/40 text-sm mt-4"><span x-text="selectedIdx + 1"></span> / <span
                            x-text="items.length"></span></p>
                </div>
            </div>
        </div>
    </div>

    <!-- Alpine Gallery Component Logic -->
    <script>
        document.addEventListener('alpine:init', () => {
            let initialItems = @json($galleryItems);
            // Storage Asset helper logic inside JS
            initialItems = initialItems.map(item => {
                if (item.url && !item.url.startsWith('http') && !item.url.startsWith('/uploads')) {
                    item.url = '{{ asset('storage') }}/' + item.url;
                } else if (item.url && item.url.startsWith('/uploads')) {
                    item.url = '{{ asset('') }}' + item.url.replace(/^\//, '');
                }
                return item;
            });

            Alpine.data('gallery', () => ({
                items: initialItems,
                selectedIdx: null,
                get currentImage() {
                    if (this.selectedIdx === null) return null;
                    return this.items[this.selectedIdx];
                },
                openLightbox(index) {
                    this.selectedIdx = index;
                    document.body.style.overflow = 'hidden';
                },
                closeLightbox() {
                    this.selectedIdx = null;
                    document.body.style.overflow = '';
                },
                nextImage() {
                    if (this.selectedIdx !== null) {
                        this.selectedIdx = (this.selectedIdx + 1) % this.items.length;
                    }
                },
                prevImage() {
                    if (this.selectedIdx !== null) {
                        this.selectedIdx = (this.selectedIdx - 1 + this.items.length) % this.items.length;
                    }
                }
            }))
        })
    </script>
</x-layouts.app>