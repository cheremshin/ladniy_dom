'use client';

import { ButtonLink, Card } from '@/components/base';
import { sidebarConfig, SidebarItem } from '@/shared/config/erp.sidebar.config';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import './Sidebar.styles.css';

export const Sidebar: FC = () => {
    const pathname = usePathname();

    if (pathname === '/erp/profile') return null;

    return (
        <aside className="admin-sidebar">
            <Card className="admin-sidebar__card">
                <div className="admin-sidebar__header">
                    <h3>Админ Панель</h3>
                </div>
                <nav className="admin-sidebar__nav">
                    {sidebarConfig.map((item: SidebarItem) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

                        return (
                            <ButtonLink
                                key={item.key}
                                href={item.href}
                                variant="primary"
                                className={clsx(
                                    'admin-sidebar__link',
                                    isActive && 'admin-sidebar__link--active',
                                )}
                            >
                                {item.label}
                            </ButtonLink>
                        );
                    })}
                </nav>
            </Card>
        </aside>
    );
};
