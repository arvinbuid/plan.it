import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function Index({ events }) {
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
                        {events.map((event: any) => {
                            const length = event.description.length;
                            const description = length > 50 ? event.description.substring(0, 50) + '...' : event.description;

                            return (
                                <TableRow key={event.id}>
                                    <TableCell className='font-medium'>{event.title}</TableCell>
                                    <TableCell>{description}</TableCell>
                                    <TableCell>{event.location}</TableCell>
                                    <TableCell>{event.start_date_time}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}