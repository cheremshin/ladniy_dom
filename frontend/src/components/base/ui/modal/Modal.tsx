'use client';

import { FC, MouseEvent, ReactNode, useEffect, useRef } from 'react';
import { Button } from '../button/Button';
import './Modal.styles.css';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
};

export const Modal: FC<Props> = ({ isOpen, onClose, title, children }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const el = dialogRef.current;
        if (!el) return;
        if (isOpen) {
            el.showModal();
        } else {
            el.close();
        }
    }, [isOpen]);

    const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
        if (e.target === dialogRef.current) onClose();
    };

    return (
        <dialog
            ref={dialogRef}
            className="modal"
            onClick={handleBackdropClick}
            onClose={onClose}
        >
            <div className="modal__content">
                <div className="modal__header">
                    <h3 className="modal__title">{title}</h3>
                    <Button
                        variant="empty"
                        className="modal__close"
                        onClick={onClose}
                        aria-label="Закрыть"
                    >
                        Закрыть
                    </Button>
                </div>
                <div className="modal__body">
                    {children}
                </div>
            </div>
        </dialog>
    );
};
