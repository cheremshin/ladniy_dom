'use client';

import { FC, SVGProps } from 'react';

export const SearchIcon: FC<SVGProps<SVGSVGElement>> = ({ className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className={className}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="m11.25 11.25l3 3"></path><circle cx="7.5" cy="7.5" r="4.75"></circle></g></svg>
);
