'use client';

import { Message } from '@/types';
import { Mail, Trash2, Loader2, Phone, Calendar } from 'lucide-react';
import { deleteMessage } from '@/actions/messages';
import { useState, useTransition } from 'react';

export default function MessageList({ messages }: { messages: Message[] }) {
    const [isPending, startTransition] = useTransition();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm('Bu mesajı sitemden kalıcı olarak silmek istediğinize emin misiniz?')) return;

        setDeletingId(id);
        startTransition(async () => {
            try {
                await deleteMessage(id);
            } catch (error) {
                alert('Mesaj silinirken bir hata oluştu.');
            } finally {
                setDeletingId(null);
            }
        });
    };

    if (messages.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-16 shadow-sm border border-gray-100 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <Mail size={40} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Henüz mesajınız yok</h3>
                <p className="text-gray-500 max-w-xs">İletişim formundan mesaj aldığınızda burada listelenecektir.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {messages.slice().reverse().map((msg) => (
                <div key={msg.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6 md:p-8">
                        <div className="flex justify-between items-start gap-4 mb-6">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{msg.name}</h3>
                                <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <Mail size={14} className="text-gray-400" />
                                        <a href={`mailto:${msg.email}`} className="hover:text-black hover:underline">{msg.email}</a>
                                    </div>
                                    {msg.phone && msg.phone !== 'Belirtilmedi' && (
                                        <div className="flex items-center gap-2">
                                            <Phone size={14} className="text-gray-400" />
                                            <a href={`tel:${msg.phone}`} className="hover:text-black hover:underline">{msg.phone}</a>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-gray-400" />
                                        <span>{new Date(msg.createdAt).toLocaleString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(msg.id)}
                                disabled={deletingId === msg.id}
                                className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 flex-shrink-0"
                                title="Mesajı Sil"
                            >
                                {deletingId === msg.id ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <Trash2 size={20} />
                                )}
                            </button>
                        </div>

                        <div className="bg-gray-50/80 p-6 rounded-2xl text-gray-800 whitespace-pre-line border border-gray-100 leading-relaxed text-sm md:text-base">
                            {msg.message}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
