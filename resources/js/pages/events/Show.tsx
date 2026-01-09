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
import { type DateRange } from "react-day-picker"
import { useState } from "react";

interface ShowProps {
    event: {
        data: Event;
    }
}

const Show = ({ event }: ShowProps) => {
    const { data } = event;
    const startDate = new Date(data.start_time);
    const endDate = new Date(data.end_time);
    const eventType = data.type.charAt(0).toUpperCase() + data.type.slice(1);

    const [dateRange] = useState<DateRange | undefined>({
        from: startDate,
        to: endDate
    })

    return (
        <AppLayout>
            <Head title={data.title}></Head>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link href='/events' >
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
                        <div className="flex flex-col items-center mt-2 sm:flex-row md:mt-0 gap-4">
                            <div className="text-sm space-y-2">
                                <p>{data.title} Schedule</p>
                                <Calendar
                                    mode="range"
                                    numberOfMonths={2}
                                    defaultMonth={dateRange?.from}
                                    required
                                    selected={dateRange}
                                    className="rounded-md border shadow-sm"
                                    captionLayout="label"
                                    disableNavigation
                                    hideNavigation
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

export default Show;