import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MaintenanceView from '@/components/layout/MaintenanceView';
import { db } from '@/lib/json-db';

// Her istekte taze settings.json oku — asla cache'leme
export const dynamic = 'force-dynamic';

export default async function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const settings = await db.settings.get();

    if (settings.features.maintenanceMode) {
        return <MaintenanceView settings={settings} />;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar siteTitle={settings.siteTitle} logo={settings.logo} />
            <main className="flex-grow">
                {children}
            </main>
            <Footer settings={settings} />
        </div>
    );
}
