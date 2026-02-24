import LoginForm from '@/components/admin/LoginForm';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-2">Yönetici Girişi</h1>
                <p className="text-gray-500 mb-6 text-sm">Devam etmek için şifrenizi giriniz.</p>
                <LoginForm />
            </div>

            {/* Designer Signature */}
            <div className="mt-8 flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity duration-500">
                <a href="https://nerzen.com" target="_blank" rel="noopener noreferrer" className="bg-gray-900 p-2 rounded-lg mb-3 hover:bg-black transition-colors">
                    <img src="/nerzen-logo.png" alt="Nerzen Bilişim" className="h-4 w-auto" />
                </a>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Powered by Nerzen Bilişim</p>
            </div>
        </div>
    );
}
