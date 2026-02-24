import Link from 'next/link';
import { db } from '@/lib/json-db';
import { Plus, Pencil } from 'lucide-react';
import DeleteCourseButton from '@/components/admin/DeleteCourseButton';


export default async function CoursesPage() {
    const courses = await db.courses.getAll();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Kurslar</h1>
                    <p className="text-gray-500">Eğitimleri buradan yönetebilirsiniz.</p>
                </div>
                <Link
                    href="/admin/courses/new"
                    className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition"
                >
                    <Plus size={20} />
                    <span>Yeni Kurs Ekle</span>
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-medium text-gray-500">Görsel</th>
                            <th className="p-4 font-medium text-gray-500">başlık</th>
                            <th className="p-4 font-medium text-gray-500">Fiyat</th>
                            <th className="p-4 font-medium text-gray-500">Durum</th>
                            <th className="p-4 font-medium text-gray-500 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {courses.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-500">
                                    Henüz hiç kurs eklenmemiş.
                                </td>
                            </tr>
                        ) : (
                            courses.map((course) => (
                                <tr key={course.id} className="hover:bg-gray-50 transition">
                                    <td className="p-4">
                                        {course.image && (
                                            <img
                                                src={course.image}
                                                alt={course.title}
                                                className="w-16 h-12 object-cover rounded-lg bg-gray-200"
                                            />
                                        )}
                                    </td>
                                    <td className="p-4 font-medium text-gray-900">{course.title}</td>
                                    <td className="p-4 text-gray-600">{course.price} TL</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${course.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {course.isActive ? 'Yayında' : 'Pasif'}
                                        </span>
                                    </td>
                                    <td className="p-4 flex justify-end gap-2">
                                        <Link
                                            href={`/admin/courses/${course.id}`}
                                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                        >
                                            <Pencil size={18} />
                                        </Link>
                                        <DeleteCourseButton id={course.id} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
