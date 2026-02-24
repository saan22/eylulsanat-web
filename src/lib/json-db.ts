import process from 'process';
import { Course, GalleryItem, Message, Settings, Product } from '@/types';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Initialize client
const supabase = createClient(supabaseUrl, supabaseServiceKey || supabaseKey);

// Helper function to map snake_case from db back to camelCase for the frontend
function mapSettings(data: any): Settings {
    return data;
}

function mapCourse(c: any): Course {
    return {
        id: c.id,
        title: c.title,
        slug: c.slug,
        description: c.description,
        longDescription: c.long_description,
        shortDescription: c.short_description,
        image: c.image,
        instructor: c.instructor,
        duration: c.duration,
        schedule: c.schedule,
        price: c.price,
        level: c.level,
        category: c.category,
        features: c.features,
        createdAt: c.created_at,
        updatedAt: c.updated_at
    } as unknown as Course;
}

function mapProduct(p: any): Product {
    return {
        id: p.id,
        title: p.title,
        slug: p.slug,
        description: p.description,
        price: p.price.toString(),
        image: p.image,
        category: p.category,
        features: p.features,
        createdAt: p.created_at,
        updatedAt: p.updated_at
    } as unknown as Product;
}

function mapGallery(g: any): GalleryItem {
    return {
        id: g.id,
        src: g.url,
        url: g.url,
        title: g.title,
        category: g.category,
        createdAt: g.created_at
    } as unknown as GalleryItem;
}

function mapMessage(m: any): Message {
    return {
        id: m.id,
        name: m.name,
        email: m.email,
        subject: m.subject,
        message: m.message,
        read: m.read,
        isRead: m.read,
        createdAt: m.created_at
    } as unknown as Message;
}

// Database API using Supabase
export const db = {
    settings: {
        get: async (): Promise<Settings> => {
            const { data, error } = await supabase.from('settings').select('data').eq('id', 1).single();
            if (error || !data) return {} as Settings;
            return data.data as Settings;
        },
        update: async (settingsData: Settings): Promise<void> => {
            await supabase.from('settings').upsert({ id: 1, data: settingsData });
        },
    },
    courses: {
        getAll: async (): Promise<Course[]> => {
            const { data, error } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
            if (error || !data) return [];
            return data.map(mapCourse);
        },
        updateAll: async (coursesData: Course[]): Promise<void> => {
            // Delete all and re-insert is how updateAll works for json-db
            await supabase.from('courses').delete().neq('id', '0');
            if (coursesData.length === 0) return;
            const insertData = coursesData.map(c => ({
                id: c.id,
                title: c.title,
                slug: c.slug,
                description: c.description,
                long_description: (c as any).longDescription,
                short_description: (c as any).shortDescription,
                image: c.image,
                instructor: (c as any).instructor,
                duration: c.duration,
                schedule: (c as any).schedule,
                price: c.price,
                level: (c as any).level,
                category: (c as any).category,
                features: (c as any).features,
                created_at: new Date((c as any).createdAt || Date.now()).toISOString(),
                updated_at: new Date((c as any).updatedAt || Date.now()).toISOString()
            }));
            await supabase.from('courses').upsert(insertData);
        },
    },
    products: {
        getAll: async (): Promise<Product[]> => {
            const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
            if (error || !data) return [];
            return data.map(mapProduct);
        },
        updateAll: async (productsData: Product[]): Promise<void> => {
            await supabase.from('products').delete().neq('id', '0');
            if (productsData.length === 0) return;
            const insertData = productsData.map(p => ({
                id: p.id,
                title: p.title,
                slug: p.slug,
                description: p.description,
                price: parseFloat(p.price as any) || 0,
                image: p.image,
                category: (p as any).category,
                features: (p as any).features,
                created_at: new Date((p as any).createdAt || new Date()).toISOString(),
                updated_at: new Date((p as any).updatedAt || new Date()).toISOString()
            }));
            await supabase.from('products').upsert(insertData);
        },
    },
    gallery: {
        getAll: async (): Promise<GalleryItem[]> => {
            const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
            if (error || !data) return [];
            return data.map(mapGallery);
        },
        updateAll: async (galleryData: GalleryItem[]): Promise<void> => {
            await supabase.from('gallery').delete().neq('id', '0');
            if (galleryData.length === 0) return;
            const insertData = galleryData.map(g => ({
                id: g.id,
                url: g.src || (g as any).url,
                title: g.title,
                category: g.category,
                created_at: new Date((g as any).createdAt || new Date()).toISOString()
            }));
            await supabase.from('gallery').upsert(insertData);
        },
    },
    messages: {
        getAll: async (): Promise<Message[]> => {
            const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
            if (error || !data) return [];
            return data.map(mapMessage);
        },
        add: async (msg: Message): Promise<void> => {
            await supabase.from('messages').insert({
                id: msg.id,
                name: msg.name,
                email: msg.email,
                subject: msg.subject,
                message: msg.message,
                read: (msg as any).read || false,
                created_at: new Date(msg.createdAt || new Date()).toISOString()
            });
        },
        updateAll: async (messagesData: Message[]): Promise<void> => {
            await supabase.from('messages').delete().neq('id', '0');
            if (messagesData.length === 0) return;
            const insertData = messagesData.map(m => ({
                id: m.id,
                name: m.name,
                email: m.email,
                subject: m.subject,
                message: m.message,
                read: (m as any).read || false,
                created_at: new Date(m.createdAt || new Date()).toISOString()
            }));
            await supabase.from('messages').upsert(insertData);
        },
    },
};
