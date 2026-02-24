'use client';

import { Trash2 } from 'lucide-react';
import { deleteProduct } from '@/actions/products';
import { useTransition } from 'react';

export default function DeleteProductButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
        if (confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
            startTransition(async () => {
                await deleteProduct(id);
            });
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
        >
            <Trash2 size={18} />
        </button>
    );
}
