import Link from 'next/link';

export default function Hero({ title, subtitle, backgroundImage }: { title: string; subtitle: string; backgroundImage?: string }) {
    const defaultImage = "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2080&auto=format&fit=crop";

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={backgroundImage || defaultImage}
                    alt="Sanat Atölyesi"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
                <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight whitespace-pre-line">
                    {title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
                    {subtitle}
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-4">
                    <Link
                        href="/kurslar"
                        className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition min-w-[200px]"
                    >
                        Kursları İncele
                    </Link>
                    <Link
                        href="/iletisim"
                        className="px-8 py-4 bg-transparent border border-white text-white font-medium rounded-full hover:bg-white/10 transition min-w-[200px]"
                    >
                        Bize Ulaşın
                    </Link>
                </div>
            </div>
        </section>
    );
}
