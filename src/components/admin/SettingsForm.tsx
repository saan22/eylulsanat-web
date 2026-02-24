'use client';

import { Settings } from '@/types';
import { updateSettings, updatePassword } from '@/actions/settings';
import { Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { useTransition, useState } from 'react';
import ImageUpload from './ImageUpload';

export default function SettingsForm({ settings }: { settings: Settings }) {
    const [isPending, startTransition] = useTransition();
    const [isPasswordPending, setIsPasswordPending] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [logo, setLogo] = useState(settings.logo || '');
    const [aboutImage, setAboutImage] = useState(settings.about?.image || '');
    const [heroImage, setHeroImage] = useState(settings.hero?.image || '');
    const [maintenanceMode, setMaintenanceMode] = useState(settings.features.maintenanceMode);

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            await updateSettings(formData);
            alert('Ayarlar güncellendi.');
        });
    };

    const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPasswordPending(true);
        setPasswordError('');
        setPasswordSuccess(false);

        const formData = new FormData(e.currentTarget);
        const result = await updatePassword(formData);

        if (result?.error) {
            setPasswordError(result.error);
        } else {
            setPasswordSuccess(true);
            (e.target as HTMLFormElement).reset();
        }
        setIsPasswordPending(false);
    };

    return (
        <div className="space-y-12 max-w-4xl">
            {/* General Settings Form */}
            <form action={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="space-y-8">
                    {/* General */}
                    <div>
                        <h2 className="text-xl font-bold mb-4 border-b pb-2">Genel Ayarlar</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Site Başlığı</label>
                                <input name="siteTitle" defaultValue={settings.siteTitle} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Site Açıklaması (SEO)</label>
                                <input name="siteDescription" defaultValue={settings.siteDescription} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" />
                            </div>
                            <div>
                                {/* hidden input ensures value is always in FormData (unchecked checkbox sends nothing) */}
                                <input type="hidden" name="maintenanceMode" value={maintenanceMode ? 'on' : 'off'} />
                                <div className="flex items-center gap-2 mt-6">
                                    <input
                                        type="checkbox"
                                        id="mm"
                                        checked={maintenanceMode}
                                        onChange={(e) => setMaintenanceMode(e.target.checked)}
                                        className="w-4 h-4 cursor-pointer"
                                    />
                                    <label htmlFor="mm" className="text-gray-900 font-medium cursor-pointer">Bakım Modunu Aç</label>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Bakım modu açıkken site ziyaretçilere kapalı görünür.</p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4 border-b pb-2">Ana Sayfa (Hero) Karşılama</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Büyük Başlık</label>
                                <input name="heroTitle" defaultValue={settings.hero?.title} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" placeholder="Sanatın Kalbi Burada Atıyor" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Alt Başlık (Açıklama)</label>
                                <textarea name="heroSubtitle" rows={3} defaultValue={settings.hero?.subtitle} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" placeholder="Yeteneklerinizi keşfedin..." />
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-bold text-gray-700">Kapak Görseli (Hero)</label>
                                    <span className="text-[10px] text-amber-600 font-bold uppercase tracking-widest bg-amber-50 px-2 py-1 rounded">Önerilen: 1920x1080px</span>
                                </div>
                                <ImageUpload value={heroImage} onChange={setHeroImage} />
                                <input type="hidden" name="heroImage" value={heroImage} />
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h2 className="text-xl font-bold mb-4 border-b pb-2">İletişim Bilgileri</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                                <input name="phone" defaultValue={settings.contact.phone} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                                <input name="email" defaultValue={settings.contact.email} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Adres</label>
                                <textarea name="address" rows={2} defaultValue={settings.contact.address} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps Embed URL</label>
                                <input name="mapUrl" defaultValue={settings.contact.mapUrl} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none text-gray-500 font-mono text-sm" />
                            </div>
                        </div>
                    </div>

                    {/* About Us Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4 border-b pb-2">Biz Kimiz? Bölümü</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Bölüm Başlığı</label>
                                <input name="aboutTitle" defaultValue={settings.about?.title} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" placeholder="Biz Kimiz?" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tanıtım Metni</label>
                                <textarea name="aboutDescription" rows={6} defaultValue={settings.about?.description} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" />
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-bold text-gray-700">Bölüm Görseli</label>
                                    <span className="text-[10px] text-amber-600 font-bold uppercase tracking-widest bg-amber-50 px-2 py-1 rounded">Önerilen: 1200x800px</span>
                                </div>
                                <ImageUpload value={aboutImage} onChange={setAboutImage} />
                                <input type="hidden" name="aboutImage" value={aboutImage} />
                            </div>
                        </div>
                    </div>

                    {/* Why Us Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4 border-b pb-2">Neden Bizi Seçmelisiniz?</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Bölüm Başlığı</label>
                                <input name="whyUsTitle" defaultValue={settings.whyUs?.title} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" placeholder="Neden Bizi Seçmelisiniz?" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Özellikler (Her satıra bir tane yazın)</label>
                                <textarea
                                    name="whyUsItems"
                                    rows={5}
                                    defaultValue={settings.whyUs?.items.join('\n')}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none font-sans"
                                    placeholder="Örn:&#10;Akademik eğitimli sanatçılar&#10;Butik sınıflar"
                                />
                                <p className="text-xs text-gray-400 mt-1">Her yeni satır ana sayfada ayrı bir madde olarak görünecektir.</p>
                            </div>
                        </div>
                    </div>

                    {/* Socials */}
                    <div>
                        <h2 className="text-xl font-bold mb-4 border-b pb-2">Sosyal Medya</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                                <input name="instagram" defaultValue={settings.socials.instagram} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                                <input name="facebook" defaultValue={settings.socials.facebook} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
                                <input name="youtube" defaultValue={settings.socials.youtube} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" />
                            </div>
                        </div>
                    </div>

                    {/* Logo Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4 border-b pb-2">Kurumsal Logo</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm font-bold text-gray-700">Site Logosu</label>
                                    <span className="text-[10px] text-amber-600 font-bold uppercase tracking-widest bg-amber-50 px-2 py-1 rounded">Önerilen: 600x200px (Şeffaf PNG)</span>
                                </div>
                                <ImageUpload value={logo} onChange={setLogo} />
                                <input type="hidden" name="logo" value={logo} />
                            </div>
                            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-start gap-4">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-bold text-sm">!</div>
                                <div className="text-sm text-blue-700 leading-relaxed">
                                    <p className="font-bold mb-1">Logo Hakkında İpucu:</p>
                                    <p>Sitenizin üst menüsünde (Header) görünecek logoyu buradan güncelleyebilirsiniz. Arka planı şeffaf olan (Transparent PNG) bir logo kullanmanız, her türlü arka planda daha profesyonel durmasını sağlar.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition flex items-center gap-2"
                        >
                            {isPending && <Loader2 className="animate-spin w-4 h-4" />}
                            Değişiklikleri Kaydet
                        </button>
                    </div>
                </div>
            </form>

            {/* Password Change Section */}
            <form onSubmit={handlePasswordSubmit} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
                <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                        <ShieldCheck className="text-black" />
                        <h2 className="text-xl font-bold">Admin Panel Şifresi Değiştirme</h2>
                    </div>

                    {passwordError && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 border border-red-100">
                            <AlertCircle size={20} />
                            <p className="text-sm font-medium">{passwordError}</p>
                        </div>
                    )}

                    {passwordSuccess && (
                        <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl flex items-center gap-3 border border-emerald-100">
                            <ShieldCheck size={20} />
                            <p className="text-sm font-medium">Şifre başarıyla güncellendi!</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mevcut Şifre</label>
                            <input name="currentPassword" type="password" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Yeni Şifre</label>
                            <input name="newPassword" type="password" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Yeni Şifre (Tekrar)</label>
                            <input name="confirmPassword" type="password" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isPasswordPending}
                            className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition flex items-center gap-2"
                        >
                            {isPasswordPending && <Loader2 className="animate-spin w-4 h-4" />}
                            Şifreyi Güncelle
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
