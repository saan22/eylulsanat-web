import { db } from '@/lib/json-db';
import ProductForm from '@/components/admin/ProductForm';
import { notFound } from 'next/navigation';

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const products = await db.products.getAll();
    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Ürünü Düzenle</h1>
                <p className="text-gray-500">{product.title} ürününü güncelliyorsunuz.</p>
            </div>
            <ProductForm product={product} />
        </div>
    );
}
