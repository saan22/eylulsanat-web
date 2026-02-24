'use server';

import { db } from '@/lib/json-db';
import { Product } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProduct(formData: FormData) {
    const title = formData.get('title') as string;
    const price = Number(formData.get('price'));
    const stock = Number(formData.get('stock'));
    const description = formData.get('description') as string;
    const isActive = formData.get('isActive') === 'on';

    // Process images
    const imagesJson = formData.get('images') as string; // JSON string from client
    const images = JSON.parse(imagesJson || '[]') as string[];
    const image = images[0] || ''; // Set first image as featured

    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const newProduct: Product = {
        id: uuidv4(),
        title,
        slug,
        price,
        stock,
        description,
        image,
        images,
        isActive,
    };

    const products = await db.products.getAll();
    products.push(newProduct);
    await db.products.updateAll(products);

    revalidatePath('/urunler');
    revalidatePath('/admin/products');
    return { success: true };
}

export async function updateProduct(id: string, formData: FormData) {
    const title = formData.get('title') as string;
    const price = Number(formData.get('price'));
    const stock = Number(formData.get('stock'));
    const description = formData.get('description') as string;
    const isActive = formData.get('isActive') === 'on';

    // Process images
    const imagesJson = formData.get('images') as string;
    const images = JSON.parse(imagesJson || '[]') as string[];
    const image = images[0] || '';

    const products = await db.products.getAll();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) throw new Error('Ürün bulunamadı');

    products[index] = {
        ...products[index],
        title,
        price,
        stock,
        description,
        image,
        images,
        isActive,
    };

    await db.products.updateAll(products);

    revalidatePath('/urunler');
    revalidatePath(`/urunler/${products[index].slug}`);
    revalidatePath('/admin/products');
    return { success: true };
}

export async function deleteProduct(id: string) {
    let products = await db.products.getAll();
    products = products.filter((p) => p.id !== id);
    await db.products.updateAll(products);

    revalidatePath('/urunler');
    revalidatePath('/admin/products');
}
