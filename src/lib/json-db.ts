import fs from 'fs/promises';
import path from 'path';
import { Course, GalleryItem, Message, Settings, Product } from '@/types';

// Veri dosyaları src/data değil proje kökündeki database/ klasöründe tutulur.
// Bu sayede cPanel'e yeni kod yüklenince data dosyaları üzerine yazılmaz.
const DATA_DIR = path.join(process.cwd(), 'database');

// Generic helper to read JSON files
async function readJSON<T>(filename: string): Promise<T> {
    const filePath = path.join(DATA_DIR, filename);
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data) as T;
    } catch (error) {
        console.error(`Error reading ${filename}:`, error);
        throw new Error(`Failed to read database: ${filename}`);
    }
}

// Generic helper to write JSON files
async function writeJSON<T>(filename: string, data: T): Promise<void> {
    const filePath = path.join(DATA_DIR, filename);
    try {
        // Write with pretty printing for readability
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error(`Error writing ${filename}:`, error);
        throw new Error(`Failed to write database: ${filename}`);
    }
}

// Database API
export const db = {
    settings: {
        get: () => readJSON<Settings>('settings.json'),
        update: (data: Settings) => writeJSON<Settings>('settings.json', data),
    },
    courses: {
        getAll: () => readJSON<Course[]>('courses.json'),
        updateAll: (data: Course[]) => writeJSON<Course[]>('courses.json', data),
    },
    products: {
        getAll: () => readJSON<Product[]>('products.json'),
        updateAll: (data: Product[]) => writeJSON<Product[]>('products.json', data),
    },
    gallery: {
        getAll: () => readJSON<GalleryItem[]>('gallery.json'),
        updateAll: (data: GalleryItem[]) => writeJSON<GalleryItem[]>('gallery.json', data),
    },
    messages: {
        getAll: () => readJSON<Message[]>('messages.json'),
        add: async (msg: Message) => {
            const messages = await readJSON<Message[]>('messages.json');
            messages.push(msg);
            await writeJSON<Message[]>('messages.json', messages);
        },
        updateAll: (data: Message[]) => writeJSON<Message[]>('messages.json', data),
    },
};
