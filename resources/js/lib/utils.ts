import { InertiaLinkProps } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isSameUrl(
    url1: NonNullable<InertiaLinkProps['href']>,
    url2: NonNullable<InertiaLinkProps['href']>,
) {
    return resolveUrl(url1) === resolveUrl(url2);
}

export function resolveUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

// Helper function to compute visible page numbers in pagination
export const pagesToShow = (current: number, last: number) => {
    const pages: number[] = [];
    if (last <= 3) {
        for (let i = 1; i <= last; i++) pages.push(i);
        return pages;
    }
    if (current <= 2) return [1, 2, 3];
    if (current >= last - 1) return [last - 2, last - 1, last];
    return [current - 1, current, current + 1];
};

export const capitalizeFirstLetter = (value: string) => {
    return String(value).charAt(0).toUpperCase() + String(value).slice(1);
};
