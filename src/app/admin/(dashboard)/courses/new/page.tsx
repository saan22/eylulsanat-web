import CourseForm from '@/components/admin/CourseForm';

export default function NewCoursePage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Yeni Kurs Ekle</h1>
                <p className="text-gray-500">Yeni bir eğitim programı oluşturun.</p>
            </div>
            <CourseForm />
        </div>
    );
}
