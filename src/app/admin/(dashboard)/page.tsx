import { db } from '@/lib/json-db';
import { BookOpen, Image as ImageIcon, Mail, FileText } from 'lucide-react';

async function StatCard({ title, value, icon: Icon, color }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-4 rounded-xl ${color}`}>
                <Icon size={24} className="text-white" />
            </div>
            <div>
                <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );
}

export default async function AdminDashboard() {
    const courses = await db.courses.getAll();
    const gallery = await db.gallery.getAll();
    const messages = await db.messages.getAll();
    const settings = await db.settings.get();

    const unreadMessages = messages.filter(m => !m.isRead).length;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Hoşgeldiniz</h1>
                <p className="text-gray-500">Site panelinin anlık durumu.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Toplam Kurs"
                    value={courses.length}
                    icon={BookOpen}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Galeri Görseli"
                    value={gallery.length}
                    icon={ImageIcon}
                    color="bg-purple-500"
                />
                <StatCard
                    title="Yeni Mesajlar"
                    value={unreadMessages}
                    icon={Mail}
                    color="bg-green-500"
                />
                <StatCard
                    title="Site Durumu"
                    value={settings.features.maintenanceMode ? 'Bakımda' : 'Yayında'}
                    icon={FileText}
                    color="bg-orange-500"
                />
            </div>

            {/* Recent Messages Preview */}
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Son Mesajlar</h2>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {messages.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">Henüz mesaj yok.</div>
                    ) : (
                        <div className="divide-y">
                            {messages.slice(0, 5).reverse().map((msg) => (
                                <div key={msg.id} className="p-4 hover:bg-gray-50 transition flex justify-between items-center bg-white items-center">
                                    <div>
                                        <p className="font-semibold text-gray-900">{msg.name}</p>
                                        <p className="text-sm text-gray-500">{msg.subject}</p>
                                    </div>
                                    <span className="text-xs text-gray-400">
                                        {new Date(msg.createdAt).toLocaleDateString('tr-TR')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
