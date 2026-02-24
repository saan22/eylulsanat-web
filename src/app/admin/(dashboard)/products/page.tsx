import Link from 'next/link';
import { db } from '@/lib/json-db';
import { Plus, Pencil, Package } from 'lucide-react';
import DeleteProductButton from '@/components/admin/DeleteProductButton';

export default async function ProductsPage() {
    const products = await db.products.getAll();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Ürün Yönetimi</h1>
                    <p className="text-gray-500">Satışa sunduğunuz ürünleri buradan yönetin.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition flex items-center gap-2"
                >
                    <Plus size={20} />
                    Yeni Ürün Ekle
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-6 py-4 text-sm font-semibold text-gray-900">Ürün</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-900">Fiyat</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-900">Stok</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <Package size={48} className="text-gray-200" />
                                        Henüz hiç ürün eklenmemiş.
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                                            />
                                            <span className="font-medium text-gray-900">{product.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{product.price} TL</td>
                                    <td className="px-6 py-4 text-gray-600">{product.stock} Adet</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/products/${product.id}`}
                                                className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition"
                                            >
                                                <Pencil size={18} />
                                            </Link>
                                            <DeleteProductButton id={product.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
