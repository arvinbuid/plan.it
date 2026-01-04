import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { ModeToggle } from './mode-toggle';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Button } from './ui/button';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        router.get(route('events.index'), {
            search,
        })
    }

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className='flex items-center gap-2'>
                <Input
                    placeholder='Search an event...'
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Button className='cursor-pointer' onClick={handleSearch}>
                    <Search />
                </Button>
                <ModeToggle />
            </div>
        </header>
    );
}
