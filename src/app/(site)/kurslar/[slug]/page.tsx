import { db } from '@/lib/json-db';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, CreditCard, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = await params;
    const courses = await db.courses.getAll();
    const course = courses.find(c => c.slug === slug);

    if (!course) {
        return {
            title: 'Kurs Bulunamadı',
        };
    }

    return {
        title: `${course.title} | Eylül Sanat Atölyesi`,
        description: course.description.substring(0, 160),
        openGraph: {
            images: course.image ? [course.image] : [],
        }
    };
}

export async function generateStaticParams() {
    const courses = await db.courses.getAll();
    return courses.map((course) => ({
        slug: course.slug,
    }));
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const courses = await db.courses.getAll();
    const course = courses.find(c => c.slug === slug);
    const settings = await db.settings.get();

    if (!course) {
        notFound();
    }

    // Schema.org JSON-LD
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: course.title,
        description: course.description,
        provider: {
            '@type': 'Organization',
            name: settings.siteTitle,
            address: settings.contact.address
        },
        offers: {
            '@type': 'Offer',
            price: course.price,
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock'
        }
    };

    const whatsappMessage = encodeURIComponent(`Merhaba, "${course.title}" kursunuz hakkında bilgi almak istiyorum.`);
    const whatsappUrl = `https://wa.me/${settings.contact.phone.replace(/\D/g, '')}?text=${whatsappMessage}`;

    return (
        <div className="bg-white min-h-screen pb-20 pt-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Header */}
            <div className="relative h-[50vh] w-full bg-gray-900 overflow-hidden">
                <img
                    src={course.image || 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop'}
                    alt={course.title}
                    className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                    <div className="container mx-auto">
                        <Link href="/kurslar" className="text-white/80 hover:text-white flex items-center gap-2 mb-6 w-fit transition group">
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Tüm Kurslar</span>
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 animate-fade-in">{course.title}</h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
                            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                <div className="w-8 h-1 bg-black rounded-full"></div>
                                Eğitim Hakkında
                            </h2>
                            <div className="prose prose-lg text-gray-600 max-w-none whitespace-pre-line leading-relaxed">
                                {course.description}
                            </div>

                            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Learning Outcomes */}
                                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                    <h3 className="font-bold mb-4 flex items-center gap-2">
                                        <CheckCircle2 size={20} className="text-green-600" />
                                        Neler Öğreneceksiniz?
                                    </h3>
                                    <ul className="space-y-3 text-sm text-gray-600">
                                        {course.learningOutcomes && course.learningOutcomes.length > 0 ? (
                                            course.learningOutcomes.map((item, index) => (
                                                <li key={index} className="flex gap-2"><span>•</span> {item}</li>
                                            ))
                                        ) : (
                                            <li className="italic text-gray-400">İçerik henüz eklenmedi.</li>
                                        )}
                                    </ul>
                                </div>

                                {/* Education Methods */}
                                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                    <h3 className="font-bold mb-4 flex items-center gap-2">
                                        <CheckCircle2 size={20} className="text-green-600" />
                                        Eğitim Metodumuz
                                    </h3>
                                    <ul className="space-y-3 text-sm text-gray-600">
                                        {course.educationMethods && course.educationMethods.length > 0 ? (
                                            course.educationMethods.map((item, index) => (
                                                <li key={index} className="flex gap-2"><span>•</span> {item}</li>
                                            ))
                                        ) : (
                                            <li className="italic text-gray-400">Metotlar henüz eklenmedi.</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 sticky top-32">
                            <div className="space-y-8">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-gray-700">
                                        <div className="bg-gray-50 p-3 rounded-2xl"><Clock className="w-6 h-6" /></div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Ders Süresi</p>
                                            <p className="font-serif text-xl">{course.duration}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-gray-700">
                                        <div className="bg-gray-50 p-3 rounded-2xl"><CreditCard className="w-6 h-6" /></div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Eğitim Ücreti</p>
                                            <p className="font-serif text-xl">{course.price} TL <span className="text-sm font-sans text-gray-400 font-normal">/ Aylık</span></p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100 space-y-4">
                                    <h3 className="font-bold text-center text-lg">Ön Kayıt & Bilgi</h3>
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        className="block w-full text-center py-5 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition shadow-xl shadow-green-100"
                                    >
                                        WhatsApp ile Bilgi Al
                                    </a>
                                    <Link
                                        href="/iletisim"
                                        className="block w-full text-center py-5 bg-black text-white font-bold rounded-2xl hover:bg-gray-800 transition shadow-xl shadow-gray-100"
                                    >
                                        İletişim Formunu Doldur
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
