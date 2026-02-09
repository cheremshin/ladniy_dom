'use client';

import clsx from 'clsx';
import { FC, ReactNode, useState } from 'react';

import './ProductDetailsTabsView.styles.css';

type TabItem = {
    id: string;
    label: string;
    content: ReactNode;
};

type PropsT = {
    defaultTabId: string;
    items: TabItem[];
};

export const ProductDetailsTabsView: FC<PropsT> = ({ defaultTabId, items }) => {
    const [activeTabId, setActiveTabId] = useState(defaultTabId);

    const active = items.find((item) => item.id === activeTabId);

    return (
        <div className="tabs">
            <div className="tabs__list">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTabId(item.id)}
                        className={clsx('tabs__tab', {
                            'tabs__tab--active': item.id === activeTabId,
                        })}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            <div className="tabs__content">
                {active?.content}
            </div>
        </div>
    );
};
