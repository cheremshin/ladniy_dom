'use client';

import type { ChangeEvent, FC } from 'react';

const ACCEPT_IMAGES = 'image/jpeg,image/jpg,image/png,image/webp';

type ImageUploadFieldProps = {
    previewUrl: string | null;
    existingImageUrl?: string | null;
    onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
    label?: string;
};

export const ImageUploadField: FC<ImageUploadFieldProps> = ({
    previewUrl,
    existingImageUrl,
    onFileChange,
    label = 'Загрузить изображение',
}) => {
    const displayUrl = previewUrl ?? existingImageUrl;

    return (
        <div className="base-input">
            <label>{label}</label>
            <input
                type="file"
                accept={ACCEPT_IMAGES}
                onChange={onFileChange}
                style={{ display: 'block', marginTop: 4 }}
            />
            {displayUrl && (
                <div style={{ marginTop: 8 }}>
                    <img
                        src={displayUrl}
                        alt="Превью"
                        style={{ maxWidth: 120, maxHeight: 120, objectFit: 'contain', borderRadius: 8 }}
                    />
                </div>
            )}
        </div>
    );
};
