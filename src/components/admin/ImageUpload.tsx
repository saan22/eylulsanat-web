'use client';

import { useDropzone } from 'react-dropzone';
import { useCallback, useState } from 'react';
import { uploadImage } from '@/actions/upload';
import { Loader2, UploadCloud, X } from 'lucide-react';

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const url = await uploadImage(formData);
            onChange(url);
        } catch (error) {
            alert('Resim yüklenirken hata oluştu');
        } finally {
            setLoading(false);
        }
    }, [onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles: 1
    });

    if (value) {
        return (
            <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden group">
                <img src={value} alt="Preview" className="w-full h-full object-cover" />
                <button
                    type="button"
                    onClick={() => onChange('')}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                    <X size={16} />
                </button>
            </div>
        );
    }

    return (
        <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition
        ${isDragActive ? 'border-black bg-gray-50' : 'border-gray-300 hover:border-gray-400'}
      `}
        >
            <input {...getInputProps()} />
            {loading ? (
                <div className="flex flex-col items-center">
                    <Loader2 className="animate-spin text-gray-400 mb-2" />
                    <p className="text-gray-500 text-sm">Yükleniyor...</p>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <UploadCloud className="text-gray-400 mb-2" size={32} />
                    <p className="text-gray-500 text-sm font-medium">Resmi buraya sürükleyin veya tıklayın</p>
                    <p className="text-gray-400 text-xs mt-1">PNG, JPG, WEBP (Max 5MB)</p>
                </div>
            )}
        </div>
    );
}
