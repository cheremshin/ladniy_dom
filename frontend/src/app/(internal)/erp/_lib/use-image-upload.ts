'use client';

import { useRef, useState, type ChangeEvent } from 'react';

export function useImageUpload() {
    const fileRef = useRef<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] ?? null;

        setPreviewUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return selectedFile ? URL.createObjectURL(selectedFile) : null;
        });

        fileRef.current = selectedFile;
        e.target.value = '';
    };

    const reset = () => {
        fileRef.current = null;
        setPreviewUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return null;
        });
    };

    return { fileRef, previewUrl, handleFileChange, reset };
}
