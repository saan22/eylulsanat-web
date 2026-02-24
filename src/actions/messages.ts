'use server';

import { db } from '@/lib/json-db';
import { Message } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';

import nodemailer from 'nodemailer';

export async function sendMessage(formData: FormData) {
    const settings = await db.settings.get();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string || 'Belirtilmedi';
    const phone = formData.get('phone') as string || 'Belirtilmedi';
    const messageContent = formData.get('message') as string;

    if (!name || !messageContent) {
        throw new Error('Lütfen zorunlu alanları doldurun (Ad ve Mesaj).');
    }

    const newMessage: Message = {
        id: uuidv4(),
        name,
        email,
        phone,
        message: messageContent,
        createdAt: new Date().toISOString(),
        isRead: false
    };

    await db.messages.add(newMessage);

    // E-posta Gönderimi (Opsiyonel SMTP Ayarları ile)
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_PORT === '465',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: settings.contact.email, // Ayarlardaki e-posta adresine gönder
            subject: `Yeni Mesaj: ${name}`,
            text: `
                Yeni bir iletişim formu mesajınız var:
                
                Ad Soyad: ${name}
                E-posta: ${email}
                Telefon: ${phone}
                Mesaj: ${messageContent}
                 Tarih: ${new Date().toLocaleDateString('tr-TR')}
            `,
        };

        if (process.env.SMTP_HOST) {
            await transporter.sendMail(mailOptions);
        }
    } catch (error) {
        console.error('E-posta gönderim hatası:', error);
    }

    revalidatePath('/admin/messages');
}

export async function deleteMessage(id: string) {
    const messages = await db.messages.getAll();
    const filteredMessages = messages.filter(m => m.id !== id);
    await db.messages.updateAll(filteredMessages);
    revalidatePath('/admin/messages');
}
