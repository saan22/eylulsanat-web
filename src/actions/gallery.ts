'use server';

import { db } from '@/lib/json-db';
import { GalleryItem } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';

export async function addGalleryItem(formData: FormData) {
    const fileUrl = formData.get('image') as string;
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;

    if (!fileUrl) throw new Error('Resim yüklenmedi');

    const newItem: GalleryItem = {
        id: uuidv4(),
        src: fileUrl,
        title,
        category
    };

    const gallery = await db.gallery.getAll();
    gallery.push(newItem);
    await db.gallery.updateAll(gallery);

    revalidatePath('/admin/gallery');
}

export async function deleteGalleryItem(id: string) {
    let gallery = await db.gallery.getAll();
    gallery = gallery.filter(i => i.id !== id);
    await db.gallery.updateAll(gallery);
    revalidatePath('/admin/gallery');
}
