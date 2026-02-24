import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Yeni Ürün Ekle</h1>
                <p className="text-gray-500">Mağazada satılacak yeni bir ürün oluşturun.</p>
            </div>
            <ProductForm />
        </div>
    );
}
