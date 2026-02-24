'use server';

import bcrypt from 'bcryptjs';
import { createSession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { db } from '@/lib/json-db';

export async function login(formData: FormData) {
    const password = formData.get('password') as string;
    const settings = await db.settings.get();
    const storedHash = settings.adminPasswordHash || process.env.ADMIN_PASSWORD_HASH;

    if (!storedHash) {
        throw new Error('Admin password hash is not set');
    }

    // Development bypass ensures you can login locally easily
    // In production, this block is automatically skipped
    if (process.env.NODE_ENV !== 'production' && password === 'admin123') {
        await createSession();
        redirect('/admin');
    }

    const isValid = await bcrypt.compare(password, storedHash);

    if (!isValid) {
        return { error: 'Hatalı şifre.' };
    }

    await createSession();
    redirect('/admin');
}

export async function logout() {
    await deleteSession();
    redirect('/');
}
