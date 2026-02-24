'use client';

import { useState } from 'react';

interface ProductGalleryProps {
    images: string[];
    title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
    const [activeImage, setActiveImage] = useState(images[0] || '');

    if (images.length === 0) {
        return (
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-2xl">
                <div className="w-full h-full flex items-center justify-center text-gray-400 italic">Resim Yok</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-2xl transition duration-500">
                <img
                    src={activeImage}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                    {images.map((img, i) => (
                        <div
                            key={i}
                            onClick={() => setActiveImage(img)}
                            className={`aspect-square rounded-2xl bg-gray-100 border-2 overflow-hidden transition cursor-pointer ${activeImage === img ? 'border-black scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                                }`}
                        >
                            <img src={img} alt={`${title} - ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
