'use client';

import { useState } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';
import { addGalleryItem } from '@/actions/gallery';
import { Loader2 } from 'lucide-react';

export default function GalleryUploadForm() {
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!image) return alert('Lütfen resim seçin');

        setLoading(true);
        const formData = new FormData(e.currentTarget);
        formData.append('image', image);

        try {
            await addGalleryItem(formData);
            setImage(''); // Reset
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            alert('Hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <h2 className="font-bold text-lg mb-4">Yeni Resim Ekle</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-bold text-gray-700">Görsel</label>
                        <span className="text-[10px] text-amber-600 font-bold uppercase tracking-widest bg-amber-50 px-2 py-1 rounded">Önerilen: 1200x800px</span>
                    </div>
                    <ImageUpload value={image} onChange={setImage} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                    <input
                        name="title"
                        className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
                        placeholder="Örn: Yıl Sonu Sergisi"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                    <select
                        name="category"
                        className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-black bg-white"
                    >
                        <option value="atelier">Atölye İçi</option>
                        <option value="student">Öğrenci Çalışması</option>
                        <option value="exhibition">Sergi</option>
                        <option value="event">Etkinlik</option>
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition flex justify-center items-center h-[42px]"
                >
                    {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Ekle'}
                </button>
            </div>
        </form>
    );
}
