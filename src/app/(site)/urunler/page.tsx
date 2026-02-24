import { db } from '@/lib/json-db';
import Link from 'next/link';

export const metadata = {
    title: 'Ürünlerimiz | Eylül Sanat Mağaza',
    description: 'Atölyemizde üretilen el yapımı sanat eserlerini keşfedin.',
};

export default async function ProductsIndexPage() {
    const products = await db.products.getAll();

    return (
        <div className="pt-32 pb-24 bg-white min-h-screen">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Atölye Seçkisi</h1>
                    <p className="text-gray-500">
                        Eylül Sanat Atölyesi'nde eğitmenlerimiz ve sanatçılarımız tarafından özenle hazırlanan sınırlı sayıdaki eserler.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {products.filter(p => p.isActive).map((product) => (
                        <Link key={product.id} href={`/urunler/${product.slug}`} className="group block">
                            <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-6 bg-gray-50 shadow-sm border border-gray-100 flex items-center justify-center">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-serif font-medium group-hover:text-gray-600 transition">
                                        {product.title}
                                    </h2>
                                    <span className="font-bold text-lg">{product.price} TL</span>
                                </div>
                                <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
                                <div className="pt-2">
                                    <span className="text-xs uppercase tracking-widest font-bold text-gray-400">
                                        {product.stock > 0 ? `STOKTA: ${product.stock} ADET` : 'TÜKENDİ'}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
