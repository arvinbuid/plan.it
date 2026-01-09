import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard'
    },
    {
        title: 'Users',
        href: '/users'
    }
]

const Index = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="users" />
        </AppLayout>
    );
}

export default Index;