'use server';

import { db } from '@/lib/json-db';
import { Settings } from '@/types';
import { revalidatePath } from 'next/cache';

import bcrypt from 'bcryptjs';

export async function updateSettings(formData: FormData) {
    const currentSettings = await db.settings.get();

    const settings: Settings = {
        siteTitle: formData.get('siteTitle') as string,
        siteDescription: formData.get('siteDescription') as string,
        contact: {
            phone: formData.get('phone') as string,
            email: formData.get('email') as string,
            address: formData.get('address') as string,
            mapUrl: formData.get('mapUrl') as string,
        },
        socials: {
            instagram: formData.get('instagram') as string,
            facebook: formData.get('facebook') as string,
            youtube: formData.get('youtube') as string,
        },
        features: {
            maintenanceMode: formData.get('maintenanceMode') === 'on', // 'on' = açık, 'off' veya null = kapalı
        },
        hero: {
            title: formData.get('heroTitle') as string,
            subtitle: formData.get('heroSubtitle') as string,
            image: formData.get('heroImage') as string,
        },
        about: {
            title: formData.get('aboutTitle') as string,
            description: formData.get('aboutDescription') as string,
            image: formData.get('aboutImage') as string,
        },
        whyUs: {
            title: formData.get('whyUsTitle') as string,
            items: (formData.get('whyUsItems') as string || '').split('\n').filter(Boolean).map(item => item.trim()),
        },
        logo: formData.get('logo') as string,
        adminPasswordHash: currentSettings.adminPasswordHash // Şifreyi koru
    };

    await db.settings.update(settings);
    revalidatePath('/', 'layout');
    revalidatePath('/admin/settings');
}

export async function updatePassword(formData: FormData) {
    const currentPassword = formData.get('currentPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (!currentPassword || !newPassword || !confirmPassword) {
        return { error: 'Lütfen tüm alanları doldurun.' };
    }

    if (newPassword !== confirmPassword) {
        return { error: 'Yeni şifreler eşleşmiyor.' };
    }

    const settings = await db.settings.get();
    const storedHash = settings.adminPasswordHash || process.env.ADMIN_PASSWORD_HASH;

    if (!storedHash) {
        return { error: 'Sistem hatası: Şifre kaydı bulunamadı.' };
    }

    const isValid = await bcrypt.compare(currentPassword, storedHash);
    if (!isValid) {
        return { error: 'Mevcut şifre hatalı.' };
    }

    const newHash = await bcrypt.hash(newPassword, 10);

    const updatedSettings = {
        ...settings,
        adminPasswordHash: newHash
    };

    await db.settings.update(updatedSettings);
    revalidatePath('/admin/settings');

    return { success: true };
}
