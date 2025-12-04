import { PageProps as InertiaPageProps } from '@inertiajs/core';

declare module '@inertiajs/core' {
    export interface PageProps extends InertiaPageProps {
        flash?: {
            success?: string;
            error?: string;
        };
    }
}
