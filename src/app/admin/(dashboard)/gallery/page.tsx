import { db } from '@/lib/json-db';
import GalleryUploadForm from '@/components/admin/GalleryUploadForm';
import DeleteGalleryButton from '@/components/admin/DeleteGalleryButton';

export default async function GalleryAdminPage() {
    const gallery = await db.gallery.getAll();

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Galeri Yönetimi</h1>
                <p className="text-gray-500">Siteye yeni fotoğraflar ekleyin.</p>
            </div>

            <GalleryUploadForm />

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {gallery.slice().reverse().map((item) => (
                    <div key={item.id} className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                            <div>
                                <p className="text-white text-sm font-bold truncate">{item.title || 'İsimsiz'}</p>
                                <p className="text-white/70 text-xs">{item.category}</p>
                            </div>
                        </div>
                        <DeleteGalleryButton id={item.id} />
                    </div>
                ))}
            </div>
        </div>
    );
}
