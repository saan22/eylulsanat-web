import { db } from '@/lib/json-db';
import SettingsForm from '@/components/admin/SettingsForm';

export default async function SettingsPage() {
    const settings = await db.settings.get();

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Site Ayarları</h1>
                <p className="text-gray-500">Genel bilgileri ve iletişim kanallarını güncelleyin.</p>
            </div>
            <SettingsForm settings={settings} />
        </div>
    );
}
