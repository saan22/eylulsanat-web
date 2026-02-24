'use client';

import { useState, useCallback, useEffect } from 'react';
import { GalleryItem } from '@/types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryGridProps {
    items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    const openLightbox = (index: number) => {
        setSelectedIdx(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = useCallback(() => {
        setSelectedIdx(null);
        document.body.style.overflow = 'auto';
    }, []);

    const nextImage = useCallback(() => {
        if (selectedIdx !== null) {
            setSelectedIdx((selectedIdx + 1) % items.length);
        }
    }, [selectedIdx, items.length]);

    const prevImage = useCallback(() => {
        if (selectedIdx !== null) {
            setSelectedIdx((selectedIdx - 1 + items.length) % items.length);
        }
    }, [selectedIdx, items.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIdx === null) return;
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'Escape') closeLightbox();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIdx, nextImage, prevImage, closeLightbox]);

    return (
        <>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-zoom-in"
                        onClick={() => openLightbox(index)}
                    >
                        <img
                            src={item.src}
                            alt={item.title || 'Galeri görseli'}
                            className="w-full h-auto object-cover transition duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-8">
                            <div>
                                <span className="text-xs font-bold text-white/80 uppercase tracking-widest">{item.category}</span>
                                <h3 className="text-white font-serif text-xl">{item.title}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedIdx !== null && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300">
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-8 right-8 text-white/70 hover:text-white transition group z-50 p-2"
                    >
                        <X size={32} />
                    </button>

                    {/* Navigation Buttons */}
                    <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-4 md:left-8 text-white/50 hover:text-white transition z-50 p-4 bg-white/5 hover:bg-white/10 rounded-full"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 md:right-8 text-white/50 hover:text-white transition z-50 p-4 bg-white/5 hover:bg-white/10 rounded-full"
                    >
                        <ChevronRight size={32} />
                    </button>

                    {/* Image Container */}
                    <div
                        className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center pointer-events-none"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative pointer-events-auto">
                            <img
                                src={items[selectedIdx].src}
                                alt={items[selectedIdx].title || ''}
                                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                            />
                            <div className="mt-8 text-center text-white space-y-2">
                                <span className="text-xs font-bold text-white/50 uppercase tracking-[0.3em]">{items[selectedIdx].category}</span>
                                <h3 className="text-2xl md:text-3xl font-serif font-bold">{items[selectedIdx].title}</h3>
                                <p className="text-white/40 text-sm mt-4">{selectedIdx + 1} / {items.length}</p>
                            </div>
                        </div>
                    </div>

                    {/* Background overlay click to close */}
                    <div className="absolute inset-0 -z-10" onClick={closeLightbox}></div>
                </div>
            )}
        </>
    );
}
