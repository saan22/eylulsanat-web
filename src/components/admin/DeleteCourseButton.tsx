'use client';

import { Trash2 } from 'lucide-react';
import { deleteCourse } from '@/actions/courses';
import { useTransition } from 'react';

export default function DeleteCourseButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        if (confirm('Bu kursu silmek istediğinize emin misiniz?')) {
            startTransition(async () => {
                await deleteCourse(id);
            });
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
        >
            <Trash2 size={18} />
        </button>
    );
}
