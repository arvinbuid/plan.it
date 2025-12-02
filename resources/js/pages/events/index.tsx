import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Event } from '@/types';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { usePage } from '@inertiajs/react'
import { useEffect } from 'react';

export default function Index({ events }: { events: Event[] }) {
    const { props } = usePage();
    const flash = props.flash as { success?: string, error?: string }

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success)
        }
        if (flash.error) {
            toast.error(flash.error)
        }
    })

    const handleDeleteEvent = (id: number) => {
        if (confirm('Are you sure you want to delete?')) {
            router.delete(route('events.destroy', { event: id }))
        }
    }
    return (
        <AppLayout>
            <Head title="Events" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Start Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {events.map((event) => {
                            const length = event.description.length;
                            const description = length > 50 ? event.description.substring(0, 50) + '...' : event.description;

                            return (
                                <TableRow key={event.id}>
                                    <TableCell className='font-medium'>{event.title}</TableCell>
                                    <TableCell>{description}</TableCell>
                                    <TableCell>{event.location}</TableCell>
                                    <TableCell>{event.start_date_time}</TableCell>
                                    <TableCell>
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
            </div>
        </AppLayout>
    );
}