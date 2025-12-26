import AppLayout from "@/layouts/app-layout";
import { Event } from "@/types";
import { Head, Link } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar";
import { MapPin, Calendar as CalendarIcon } from "lucide-react";

interface ShowProps {
    event: {
        data: Event;
    }
}

const ShowUpcomingEvent = ({ event }: ShowProps) => {
    const { data } = event;
    const startDate = new Date(data.start_time);
    const endDate = new Date(data.end_time);
    const eventType = data.type.charAt(0).toUpperCase() + data.type.slice(1);

    return (
        <AppLayout>
            <Head title={data.title} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link replace href='/dashboard'>
                    <button
                        type="button"
                        className="cursor-pointer text-blue-500 hover:text-blue-700 transition-colors text-sm"
                    >
                        &larr; Go Back
                    </button>
                </Link>
                <Card className="max-w-xl">
                    <CardHeader className="space-y-2">
                        <CardTitle>{data.title}</CardTitle>
                        <CardDescription>
                            {data.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Dates */}
                        <div className="flex gap-4">
                            <div className="text-sm space-y-2">
                                <p>Start Date</p>
                                <Calendar
                                    mode="single"
                                    selected={startDate}
                                    className="rounded-md border shadow-sm"
                                    captionLayout="dropdown"
                                />
                            </div>
                            <div className="text-sm space-y-2">
                                <p>End Date</p>
                                <Calendar
                                    mode="single"
                                    selected={endDate}
                                    className="rounded-md border shadow-sm"
                                    captionLayout="dropdown"
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <span><MapPin size={16} /></span>
                            <p className="text-sm">{data.location}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span><CalendarIcon size={16} /></span>
                            <p className="text-sm">{eventType}</p>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}

export default ShowUpcomingEvent;