'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { createProduct, updateProduct } from '@/actions/products';
import ImageUpload from './ImageUpload';
import { Loader2, Info } from 'lucide-react';

interface ProductFormProps {
    product?: Product;
}

export default function ProductForm({ product }: ProductFormProps) {
    const [images, setImages] = useState<string[]>(product?.images || product?.image ? [product.image] : []);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (index: number, url: string) => {
        const newImages = [...images];
        if (url) {
            newImages[index] = url;
        } else {
            newImages.splice(index, 1);
        }
        setImages(newImages.filter(Boolean));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        formData.append('images', JSON.stringify(images));

        try {
            let res;
            if (product) {
                res = await updateProduct(product.id, formData);
            } else {
                res = await createProduct(formData);
            }

            if (res && res.success) {
                // Redirect on client side to avoid Next.js redirect() error catching issues
                window.location.href = '/admin/products';
            }
        } catch (error) {
            console.error(error);
            alert('Bir hata oluştu: ' + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Left Side: Product Details */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Ürün Adı</label>
                        <input
                            name="title"
                            defaultValue={product?.title}
                            required
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none transition"
                            placeholder="Örn: El Yapımı Seramik Vazo"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Fiyat (TL)</label>
                            <input
                                name="price"
                                type="number"
                                defaultValue={product?.price}
                                required
                                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none transition"
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Stok Adedi</label>
                            <input
                                name="stock"
                                type="number"
                                defaultValue={product?.stock}
                                required
                                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none transition"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Ürün Açıklaması</label>
                        <textarea
                            name="description"
                            defaultValue={product?.description}
                            required
                            rows={6}
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none resize-none transition"
                            placeholder="Ürünün hikayesini ve özelliklerini buraya yazın..."
                        />
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <input
                            type="checkbox"
                            name="isActive"
                            id="isActive"
                            defaultChecked={product?.isActive ?? true}
                            className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                        />
                        <label htmlFor="isActive" className="text-sm font-bold text-gray-700 cursor-pointer">Bu ürünü mağazada sergile</label>
                    </div>
                </div>

                {/* Right Side: Image Gallery Management */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-bold text-gray-700">Ürün Görselleri (Maks 4 Adet)</label>
                        <div className="flex items-center gap-1 text-[10px] text-amber-600 font-bold uppercase tracking-widest bg-amber-50 px-2 py-1 rounded">
                            <Info size={12} />
                            Önerilen: 800x1000px
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[0, 1, 2, 3].map((index) => (
                            <div key={index} className="space-y-2">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                    {index === 0 ? 'Ana Görsel (Kapak)' : `${index + 1}. Görsel`}
                                </p>
                                <ImageUpload
                                    value={images[index]}
                                    onChange={(url) => handleImageChange(index, url)}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <p className="text-xs text-blue-700 leading-relaxed">
                            <strong>İpucu:</strong> İlk sıradaki resim, mağaza listesinde kapak fotoğrafı olarak kullanılacaktır. Diğer resimler ürün detay sayfasında galeride gösterilir.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-8 border-t border-gray-100">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white px-12 py-4 rounded-2xl hover:bg-gray-800 transition flex items-center gap-3 disabled:opacity-50 font-bold shadow-2xl shadow-gray-200"
                >
                    {loading && <Loader2 className="animate-spin w-5 h-5" />}
                    {product ? 'Değişiklikleri Kaydet' : 'Ürünü Mağazaya Ekle'}
                </button>
            </div>
        </form>
    );
}
