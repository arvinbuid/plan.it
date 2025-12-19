import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import DashboardGrid from './DashboardGrid';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    stats: {
        totalEvents: number;
    }
}

export default function Dashboard(props: DashboardProps) {
    const { totalEvents } = props.stats;
    console.log(totalEvents);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <DashboardGrid totalEvents={totalEvents} />
        </AppLayout>
    );
}
