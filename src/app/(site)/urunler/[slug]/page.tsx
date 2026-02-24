import { db } from '@/lib/json-db';
import { notFound } from 'next/navigation';
import { MessageCircle, ShieldCheck, Truck, ArrowLeft, Star, Heart } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import ProductGallery from '@/components/products/ProductGallery';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const products = await db.products.getAll();
    const product = products.find(p => p.slug === slug);

    if (!product) return { title: 'Ürün Bulunamadı' };

    return {
        title: `${product.title} | Eylül Sanat Mağaza`,
        description: product.description.substring(0, 160),
    };
}

export async function generateStaticParams() {
    const products = await db.products.getAll();
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const products = await db.products.getAll();
    const product = products.find((p) => p.slug === slug);
    const settings = await db.settings.get();

    if (!product) {
        notFound();
    }

    const whatsappMessage = encodeURIComponent(`Merhaba, "${product.title}" ürününüz ile ilgileniyorum. Bilgi alabilir miyim?`);
    const whatsappUrl = `https://wa.me/${settings.contact.phone.replace(/\D/g, '')}?text=${whatsappMessage}`;

    const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image];

    return (
        <div className="pt-32 pb-24 bg-[#FDFDFD] min-h-screen">
            <div className="container mx-auto px-6">
                <Link href="/urunler" className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-12 transition group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Mağazaya Dön</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 max-w-7xl mx-auto">

                    {/* Interactive Image Gallery */}
                    <ProductGallery images={galleryImages} title={product.title} />

                    {/* Content */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-10 space-y-4">
                            <div className="flex items-center gap-2 text-amber-500">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                                </div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">(Yorum Yok)</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 tracking-tight leading-tight">{product.title}</h1>
                            <div className="flex items-center gap-6">
                                <p className="text-4xl font-light text-gray-900 font-serif">{product.price} TL</p>
                                <div className="h-8 w-px bg-gray-200"></div>
                                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest ${product.stock > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    {product.stock > 0 ? `${product.stock} Adet Stokta` : 'Tükendi'}
                                </span>
                            </div>
                        </div>

                        <div className="prose prose-gray max-w-none text-gray-600 mb-12 leading-relaxed text-lg font-light">
                            <p className="whitespace-pre-line">{product.description}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                                <Truck size={24} className="text-gray-400 mt-1" />
                                <div>
                                    <p className="font-bold text-sm">Güvenli Gönderim</p>
                                    <p className="text-xs text-gray-500">Tüm ürünler kargo garantilidir.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                                <ShieldCheck size={24} className="text-gray-400 mt-1" />
                                <div>
                                    <p className="font-bold text-sm">Orijinal Eser</p>
                                    <p className="text-xs text-gray-500">%100 Atölye işçiliği ve sertifika.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                className="flex-[3] flex items-center justify-center gap-3 bg-green-600 text-white px-10 py-6 rounded-3xl hover:bg-green-700 transition font-bold text-lg shadow-2xl shadow-green-100"
                            >
                                <MessageCircle size={24} />
                                WhatsApp ile Sipariş Ver
                            </a>
                            <button className="flex-1 flex items-center justify-center bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 px-6 py-6 rounded-3xl transition border border-gray-100">
                                <Heart size={24} />
                            </button>
                        </div>

                        <p className="text-xs text-center sm:text-left text-gray-400 mt-8 italic max-w-md leading-relaxed">
                            * Sanat eserlerimiz tamamen el yapımı olduğu için görseldeki üründen milimetrik farklılıklar gösterebilir.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
