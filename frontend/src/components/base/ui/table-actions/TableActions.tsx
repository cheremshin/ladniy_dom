import React, { FC } from 'react';
import { IconButton } from '../icon-button/IconButton';

import './TableActions.styles.css';
import { DeleteIcon, EditIcon } from '@/components/dummies/icons';

interface TableActionsProps {
    onEdit?: () => void;
    onDelete?: () => void;
    editLabel?: string;
    deleteLabel?: string;
}

export const TableActions: FC<TableActionsProps> = ({
    onEdit,
    onDelete,
    editLabel = 'Редактировать',
    deleteLabel = 'Удалить',
}) => {
    return (
        <div className="table-actions">
            {onEdit && (
                <IconButton
                    variant="default"
                    size="sm"
                    onClick={onEdit}
                    title={editLabel}
                >
                    <EditIcon />
                </IconButton>
            )}
            {onDelete && (
                <IconButton
                    variant="danger"
                    size="sm"
                    onClick={onDelete}
                    title={deleteLabel}
                >
                    <DeleteIcon />
                </IconButton>
            )}
        </div>
    );
};
