import { db } from '@/lib/json-db';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export const metadata = {
    title: 'Atölyeler ve Kurslar | Eylül Sanat Atölyesi',
    description: 'Piyano, Resim, Seramik, Keman ve daha fazlası. Sanatın her dalında profesyonel eğitimlerle yeteneklerinizi keşfedin.',
};

export default async function CoursesIndexPage() {
    const courses = await db.courses.getAll();
    const activeCourses = courses.filter(c => c.isActive);

    return (
        <div className="pt-32 pb-24 bg-[#FDFDFD] min-h-screen">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
                    <div className="flex items-center justify-center gap-2 text-gray-400 text-sm font-bold uppercase tracking-widest">
                        <Sparkles size={16} />
                        Akademik Eğitimler
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 leading-tight">Sanatsal Yolculuğunuz <br /> <span className="italic font-light">Burada Başlıyor</span></h1>
                    <p className="text-gray-500 text-lg max-w-xl mx-auto font-light">
                        Her yaş grubu için özel olarak hazırlanan müfredatımızla, profesyonel sanatçılar eşliğinde yeteneklerinizi bir üst seviyeye taşıyın.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                    {activeCourses.map((course) => (
                        <Link key={course.id} href={`/kurslar/${course.slug}`} className="group block">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl mb-8 bg-gray-100 shadow-sm border border-gray-100">
                                <img
                                    src={course.image || 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop'}
                                    alt={course.title}
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:rotate-1"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                    <span className="text-white font-medium flex items-center gap-2">
                                        Detayları İncele <ArrowRight size={18} />
                                    </span>
                                </div>
                                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur shadow-lg px-4 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-black">
                                    {course.duration}
                                </div>
                            </div>

                            <div className="space-y-3 px-2">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-serif font-bold group-hover:text-gray-600 transition tracking-tight">
                                        {course.title}
                                    </h2>
                                    <div className="h-px flex-grow mx-4 bg-gray-100 group-hover:bg-black/10 transition-colors"></div>
                                    <span className="font-serif text-lg font-medium text-gray-900 whitespace-nowrap">{course.price} TL</span>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 font-light">
                                    {course.description.split('\n')[0]}
                                </p>
                                <div className="pt-2 flex items-center gap-4">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200"></div>
                                        ))}
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter italic">+120 Mezun Öğrenci</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {activeCourses.length === 0 && (
                    <div className="py-32 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 font-serif italic text-xl">Henüz bir kurs bulunamadı. Lütfen daha sonra tekrar kontrol edin.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
