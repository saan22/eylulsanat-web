'use client';

import { Trash2 } from 'lucide-react';
import { deleteGalleryItem } from '@/actions/gallery';
import { useTransition } from 'react';

export default function DeleteGalleryButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    return (
        <button
            onClick={() => {
                if (confirm('Silmek istediğinize emin misiniz?')) {
                    startTransition(() => deleteGalleryItem(id));
                }
            }}
            disabled={isPending}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
        >
            <Trash2 size={16} />
        </button>
    );
}
