import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BreadcrumbItem, Event } from '@/types';
import { Button } from '@/components/ui/button';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { pagesToShow, capitalizeFirstLetter } from '@/lib/utils';
import EventsPagination from '@/components/events-pagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard'
    },
    {
        title: 'Events',
        href: '/events'
    }
]
interface IndexProps {
    events: {
        data: Event[]
        links: {
            prev: string | null;
            next: string | null;
        };
        meta: {
            current_page: number;
            last_page: number;
        };
    },
    filters: {
        search?: string;
    }
}

export default function Index(props: IndexProps) {
    const { data, links, meta } = props.events;
    const { search } = props.filters;
    const { prev: prev_page_url, next: next_page_url } = links;
    const { current_page, last_page } = meta;

    console.log(props)

    const hasSearch = !!search;
    const noResults = hasSearch && data.length === 0;
    const pages = pagesToShow(current_page, last_page);

    const handleDeleteEvent = (id: number) => {
        if (confirm('Are you sure you want to delete?')) {
            router.delete(route('events.destroy', id))
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Events" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {hasSearch && !noResults && <h1 className='font-semibold ml-1'>Search Results for “{search}”</h1>}
                <div className="mt-2 flex justify-between">
                    <Link href='/events/create'>
                        <Button
                            variant='outline'
                            className='cursor-pointer'
                        >
                            Create New Event
                        </Button>
                    </Link>
                    {/* Sort By */}
                    {!hasSearch && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='outline' className='cursor-pointer'>Sort By</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem
                                    className='cursor-pointer'
                                    onClick={() => router.get(route('events.index'),
                                        {
                                            sort: 'title',
                                            order: 'asc'
                                        },
                                        {
                                            preserveScroll: true,
                                            preserveState: true
                                        })}
                                >
                                    Title
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className='cursor-pointer'
                                    onClick={() => router.get(route('events.index'),
                                        {
                                            sort: 'created_at',
                                            order: 'desc'
                                        },
                                        {
                                            preserveScroll: true,
                                            preserveState: true
                                        }
                                    )}
                                >
                                    Created At
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
                <Table className='mt-4'>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Title</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className='mt-10'>
                                    {hasSearch ? (
                                        <div className='rounded-lg p-4 border text-center text-muted-foreground'>
                                            <p className="text-xl font-medium">No results found</p>
                                            <p className="text-sm">
                                                No events matched for “{search}”.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className='rounded-lg p-4 border text-center text-muted-foreground'>
                                            <p className="text-lg font-medium">No events yet</p>
                                            <p className="text-sm">
                                                Create your first event to get started.
                                            </p>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        )}

                        {data.map((event) => {
                            const length = event.description.length;
                            const description = length > 50 ? event.description.substring(0, 50) + '...' : event.description;

                            return (
                                <TableRow key={event.id}>
                                    <TableCell className='font-medium'>{event.title}</TableCell>
                                    <TableCell>{capitalizeFirstLetter(event.type.toString())}</TableCell>
                                    <TableCell>{description}</TableCell>
                                    <TableCell>{event.location}</TableCell>
                                    <TableCell>
                                        <Link href={`/events/${event.id}/edit`}>
                                            <Button
                                                variant='secondary'
                                                className='mr-2 cursor-pointer'
                                            >
                                                <PencilIcon />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant='destructive'
                                            onClick={() => handleDeleteEvent(event.id)}
                                            className='cursor-pointer'
                                        >
                                            <Trash2Icon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

                {/* Pagination */}
                {data.length > 0 && (
                    <div className="mt-4">
                        <EventsPagination
                            prev_page_url={prev_page_url}
                            next_page_url={next_page_url}
                            pages={pages}
                            current_page={current_page}
                            last_page={last_page}
                        />
                    </div>
                )}
            </div>
        </AppLayout >
    );
}