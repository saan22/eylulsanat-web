'use server';

import { db } from '@/lib/json-db';
import { Course } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createCourse(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const duration = formData.get('duration') as string;
    const image = formData.get('image') as string;
    const isActive = formData.get('isActive') === 'on';

    // Process list fields
    const learningOutcomesStr = formData.get('learningOutcomes') as string || '';
    const educationMethodsStr = formData.get('educationMethods') as string || '';

    const learningOutcomes = learningOutcomesStr.split('\n').map(s => s.trim()).filter(Boolean);
    const educationMethods = educationMethodsStr.split('\n').map(s => s.trim()).filter(Boolean);

    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const newCourse: Course = {
        id: uuidv4(),
        title,
        slug,
        description,
        price,
        duration,
        image,
        isActive,
        learningOutcomes,
        educationMethods,
    };

    const courses = await db.courses.getAll();
    courses.push(newCourse);
    await db.courses.updateAll(courses);

    revalidatePath('/admin/courses');
    revalidatePath('/kurslar');
    return { success: true };
}

export async function updateCourse(id: string, formData: FormData) {
    const courses = await db.courses.getAll();
    const index = courses.findIndex(c => c.id === id);

    if (index === -1) throw new Error('Kurs bulunamadı');

    const title = formData.get('title') as string;
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    // Process list fields
    const learningOutcomesStr = formData.get('learningOutcomes') as string || '';
    const educationMethodsStr = formData.get('educationMethods') as string || '';

    const learningOutcomes = learningOutcomesStr.split('\n').map(s => s.trim()).filter(Boolean);
    const educationMethods = educationMethodsStr.split('\n').map(s => s.trim()).filter(Boolean);

    courses[index] = {
        ...courses[index],
        title,
        slug,
        description: formData.get('description') as string,
        price: parseFloat(formData.get('price') as string),
        duration: formData.get('duration') as string,
        image: formData.get('image') as string,
        isActive: formData.get('isActive') === 'on',
        learningOutcomes,
        educationMethods,
    };

    await db.courses.updateAll(courses);
    revalidatePath('/admin/courses');
    revalidatePath('/kurslar');
    revalidatePath(`/kurslar/${courses[index].slug}`);
    return { success: true };
}

export async function deleteCourse(id: string) {
    let courses = await db.courses.getAll();
    courses = courses.filter(c => c.id !== id);
    await db.courses.updateAll(courses);
    revalidatePath('/admin/courses');
    revalidatePath('/kurslar');
}
