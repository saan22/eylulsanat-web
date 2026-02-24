import { db } from '@/lib/json-db';
import MessageList from '@/components/admin/MessageList';

export default async function MessagesPage() {
    const messages = await db.messages.getAll();

    return (
        <div>
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Gelen Mesajlar</h1>
                    <p className="text-gray-500">İletişim formundan gelen son mesajlar.</p>
                </div>
                <div className="bg-white border px-4 py-2 rounded-xl text-sm font-medium text-gray-600 shadow-sm">
                    Toplam: <span className="text-black font-bold">{messages.length}</span> Mesaj
                </div>
            </div>

            <MessageList messages={messages} />
        </div>
    );
}
