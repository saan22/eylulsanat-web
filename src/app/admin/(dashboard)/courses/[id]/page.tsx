import CourseForm from '@/components/admin/CourseForm';
import { db } from '@/lib/json-db';
import { notFound } from 'next/navigation';

export default async function EditCoursePage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const courses = await db.courses.getAll();
    const course = courses.find(c => c.id === id);

    if (!course) {
        notFound();
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Kursu Düzenle</h1>
                <p className="text-gray-500">{course.title}</p>
            </div>
            <CourseForm initialData={course} />
        </div>
    );
}
