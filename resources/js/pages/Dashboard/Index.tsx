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
        upcomingEvents: number;
        ongoingEvents: number;
        pastEvents: number;
    }
    eventsChartData: Array<{
        date: string;
        total: number;
    }>
}

export default function Dashboard(props: DashboardProps) {
    const { totalEvents, upcomingEvents, ongoingEvents, pastEvents } = props.stats;
    const { eventsChartData } = props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <DashboardGrid
                totalEvents={totalEvents}
                upcomingEvents={upcomingEvents}
                ongoingEvents={ongoingEvents}
                pastEvents={pastEvents}
                chartData={eventsChartData}
            />
        </AppLayout>
    );
}
