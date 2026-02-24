import Sidebar from '@/components/admin/Sidebar';
import { verifySession } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await verifySession();

    if (!session?.isAuth) {
        redirect('/admin/login');
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <div className="max-w-6xl mx-auto space-y-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
