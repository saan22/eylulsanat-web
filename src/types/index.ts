export interface Settings {
    siteTitle: string;
    siteDescription: string;
    contact: {
        phone: string;
        email: string;
        address: string;
        mapUrl: string;
    };
    socials: {
        instagram: string;
        facebook: string;
        youtube: string;
    };
    features: {
        maintenanceMode: boolean;
    };
    hero: {
        title: string;
        subtitle: string;
        image?: string;
    };
    about?: {
        title: string;
        description: string;
        image: string;
    };
    whyUs?: {
        title: string;
        items: string[];
    };
    logo: string;
    adminPasswordHash?: string;
}

export interface Course {
    id: string;
    title: string;
    slug: string;
    price: number;
    duration: string;
    description: string;
    image: string;
    isActive: boolean;
    learningOutcomes: string[];
    educationMethods: string[];
}

export interface GalleryItem {
    id: string;
    src: string;
    category: string;
    title?: string;
}

export interface Message {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    createdAt: string;
    isRead: boolean;
}

export interface Product {
    id: string;
    title: string;
    slug: string;
    price: number;
    description: string;
    image: string; // Featured image
    images: string[]; // Gallery images
    stock: number;
    isActive: boolean;
}

