import Hero from '@/components/home/Hero';
import { db } from '@/lib/json-db';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default async function HomePage() {
    const courses = await db.courses.getAll();
    const activeCourses = courses.filter(c => c.isActive).slice(0, 3);
    const settings = await db.settings.get();

    return (
        <>
            <Hero
                title={settings.hero?.title || 'Sanatın Kalbi Burada Atıyor'}
                subtitle={settings.hero?.subtitle || 'Yeteneklerinizi keşfedin.'}
                backgroundImage={settings.hero?.image}
            />

            {/* Featured Courses Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <span className="text-sm font-medium tracking-widest text-gray-500 uppercase">Keşfedin</span>
                            <h2 className="text-4xl font-serif font-bold mt-2">Popüler Atölyeler</h2>
                        </div>
                        <Link
                            href="/kurslar"
                            className="hidden md:flex items-center gap-2 group text-gray-900 border-b border-black pb-1"
                        >
                            <span>Tümünü Gör</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {activeCourses.length > 0 ? (
                            activeCourses.map((course) => (
                                <Link key={course.id} href={`/kurslar/${course.slug}`} className="group block">
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-6 bg-gray-100 border border-gray-100">
                                        <img
                                            src={course.image || 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop'}
                                            alt={course.title}
                                            className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wide">
                                            {course.duration}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-serif font-medium mb-2 group-hover:text-gray-600 transition">
                                        {course.title}
                                    </h3>
                                    <p className="text-gray-500 line-clamp-2 text-sm leading-relaxed">
                                        {course.description}
                                    </p>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-20 bg-gray-50 rounded-lg">
                                <p className="text-gray-500">Henüz aktif kurs bulunmuyor.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* About Teaser */}
            <section className="py-24 bg-[#F9F9F9]">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <img
                            src={settings.about?.image || "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop"}
                            alt={settings.about?.title || "Biz Kimiz?"}
                            className="relative z-10 w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                        />
                    </div>
                    <div>
                        <span className="text-sm font-medium tracking-widest text-gray-500 uppercase">{settings.about?.title || "Biz Kimiz?"}</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-8">{settings.siteTitle}</h2>
                        <p className="text-gray-600 leading-relaxed mb-6 text-lg whitespace-pre-wrap">
                            {settings.about?.description}
                        </p>
                        <div className="space-y-4 mb-10">
                            <p className="font-medium">{settings.whyUs?.title || "Neden Bizi Seçmelisiniz?"}</p>
                            <ul className="space-y-3">
                                {settings.whyUs?.items.map((item, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Link href="/iletisim" className="bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 transition inline-block">
                            Bizimle Tanışın
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
