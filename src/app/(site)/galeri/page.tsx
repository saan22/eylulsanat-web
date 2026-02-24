import { db } from '@/lib/json-db';
import clsx from 'clsx';
import GalleryGrid from '@/components/gallery/GalleryGrid';

export const metadata = {
    title: 'Galeri | Eylül Sanat',
    description: 'Atölyemizden ve öğrencilerimizden kareler.',
};

export default async function GalleryPage() {
    const items = await db.gallery.getAll();

    return (
        <div className="pt-32 pb-24 bg-white min-h-screen">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-center">Galeri</h1>
                <p className="text-center text-gray-500 max-w-xl mx-auto mb-16">
                    Öğrencilerimizin eserleri ve atölyemizden ilham veren anlar.
                </p>

                <GalleryGrid items={items} />
            </div>
        </div>
    );
}
