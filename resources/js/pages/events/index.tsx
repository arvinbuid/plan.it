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
import { BreadcrumbItem, Event } from '@/types';
import { Button } from '@/components/ui/button';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { pagesToShow, capitalizeFirstLetter } from '@/lib/utils';

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
    data: Event[]
    links: {
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        last_page: number;
    };
}

export default function Index({ events }: { events: IndexProps }) {
    const { data, links, meta } = events;
    const { prev: prev_page_url, next: next_page_url } = links;
    const { current_page, last_page } = meta;

    const handleDeleteEvent = (id: number) => {
        if (confirm('Are you sure you want to delete?')) {
            router.delete(route('events.destroy', id))
        }
    }

    const pages = pagesToShow(current_page, last_page);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Events" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mt-8">
                    <Link href='/events/create'>
                        <Button
                            variant='outline'
                            className='cursor-pointer'
                        >
                            Create New Event
                        </Button>
                    </Link>
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

                <div className="mt-4">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                {prev_page_url ? (
                                    <PaginationPrevious
                                        className='cursor-pointer'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            router.visit(prev_page_url, {
                                                preserveScroll: true,
                                                preserveState: true
                                            })
                                        }}
                                    />
                                ) : (
                                    <PaginationPrevious className="pointer-events-none opacity-50" aria-disabled />
                                )}
                            </PaginationItem>
                            {/* Left ellipsis */}
                            {current_page >= 2 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}
                            {/* Page numbers (3 maximum) */}
                            {pages.map((page, idx) => (
                                <PaginationItem key={idx}>
                                    <PaginationLink
                                        isActive={page === current_page}
                                        className='cursor-pointer'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            router.visit(route('events.index', { page }), {
                                                preserveScroll: true,
                                                preserveState: true
                                            })
                                        }}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            {/* Right ellipsis */}
                            {current_page < last_page - 1 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}
                            {/* Next */}
                            <PaginationItem>
                                {next_page_url ? (
                                    <PaginationNext
                                        className='cursor-pointer'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            router.visit(next_page_url, {
                                                preserveScroll: true,
                                                preserveState: true
                                            })
                                        }}
                                    />
                                ) : (
                                    <PaginationNext className="pointer-events-none opacity-50" aria-disabled />
                                )}
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </AppLayout>
    );
}