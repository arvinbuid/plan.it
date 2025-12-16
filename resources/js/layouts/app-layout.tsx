import { ThemeProvider } from '@/components/theme-provider';
import { useFlashToast } from '@/hooks/useFlashToast';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { Toaster } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    useFlashToast()
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
                <Toaster position='top-right' />
                {children}
            </AppLayoutTemplate>
        </ThemeProvider>
    )
}
