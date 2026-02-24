'use server';

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function uploadImage(formData: FormData) {
    const file = formData.get('file') as File;
    if (!file) {
        throw new Error('Dosya seçilmedi');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Allow only images
    if (!file.type.startsWith('image/')) {
        throw new Error('Sadece resim dosyaları yüklenebilir');
    }

    const uniqueSuffix = uuidv4();
    const originalName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const ext = file.name.split('.').pop();
    const filename = `${originalName}-${uniqueSuffix}.${ext}`;

    const uploadDir = join(process.cwd(), 'public', 'uploads');

    // Ensure directory exists
    try {
        await mkdir(uploadDir, { recursive: true });
    } catch (e) {
        // ignore
    }

    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    return `/uploads/${filename}`;
}
