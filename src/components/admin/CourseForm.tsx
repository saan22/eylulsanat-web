'use client';

import { Course } from '@/types';
import { useState } from 'react';
import ImageUpload from './ImageUpload';
import { createCourse, updateCourse } from '@/actions/courses';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

interface CourseFormProps {
    initialData?: Course;
}

export default function CourseForm({ initialData }: CourseFormProps) {
    const [image, setImage] = useState(initialData?.image || '');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        if (!image) {
            alert('Lütfen bir görsel yükleyin.');
            setLoading(false);
            return;
        }

        try {
            let res;
            if (initialData) {
                res = await updateCourse(initialData.id, formData);
            } else {
                res = await createCourse(formData);
            }

            if (res && res.success) {
                router.push('/admin/courses');
                router.refresh();
            }
        } catch (error) {
            console.error(error);
            alert('Bir hata oluştu: ' + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Left Side: Basic Info */}
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-bold text-gray-700">Kapak Resmi</label>
                            <span className="text-[10px] text-amber-600 font-bold uppercase tracking-widest bg-amber-50 px-2 py-1 rounded">Önerilen: 800x1000px</span>
                        </div>
                        <ImageUpload value={image} onChange={setImage} />
                        <input type="hidden" name="image" value={image} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 font-bold">Kurs Başlığı</label>
                        <input
                            name="title"
                            defaultValue={initialData?.title}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                            placeholder="Örn: Piyano Eğitimi"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 font-bold">Fiyat (TL)</label>
                            <input
                                name="price"
                                type="number"
                                defaultValue={initialData?.price}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 font-bold">Süre</label>
                            <input
                                name="duration"
                                defaultValue={initialData?.duration}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                                placeholder="Örn: 8 Ay"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 font-bold">Genel Açıklama</label>
                        <textarea
                            name="description"
                            defaultValue={initialData?.description}
                            required
                            rows={6}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none resize-none"
                            placeholder="Kurs içeriği hakkında genel bilgi..."
                        />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <input
                            type="checkbox"
                            name="isActive"
                            id="isActive"
                            defaultChecked={initialData?.isActive ?? true}
                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                        />
                        <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Bu kurs yayında olsun</label>
                    </div>
                </div>

                {/* Right Side: Detailed Info */}
                <div className="space-y-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2 font-bold">Neler Öğreneceğiz? (Her satıra bir madde)</label>
                        <textarea
                            name="learningOutcomes"
                            defaultValue={initialData?.learningOutcomes?.join('\n')}
                            rows={8}
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none font-sans text-sm leading-relaxed"
                            placeholder="Nota okuma ve solfej&#10;Teknik egzersizler&#10;Eser yorumlama..."
                        />
                        <p className="mt-2 text-[10px] text-gray-400">Not: Her yeni satır sitede bir madde (list item) olarak görünecektir.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2 font-bold">Eğitim Metodumuz (Her satıra bir madde)</label>
                        <textarea
                            name="educationMethods"
                            defaultValue={initialData?.educationMethods?.join('\n')}
                            rows={8}
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none font-sans text-sm leading-relaxed"
                            placeholder="Birebir özel dersler&#10;Haftalık pratik takibi&#10;Yıl sonu konserleri..."
                        />
                        <p className="mt-2 text-[10px] text-gray-400">Not: Her yeni satır sitede bir madde (list item) olarak görünecektir.</p>
                    </div>
                </div>

            </div>

            <div className="pt-8 flex justify-end gap-3 border-t border-gray-100 mt-8">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-8 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition font-medium"
                >
                    İptal
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className={clsx(
                        "px-10 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition shadow-xl font-bold",
                        loading && "opacity-50 cursor-not-allowed"
                    )}
                >
                    {loading ? 'Kaydediliyor...' : 'Tüm Değişiklikleri Kaydet'}
                </button>
            </div>
        </form >
    );
}
