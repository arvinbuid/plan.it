import EventsChart from "@/components/events-chart";
import { Event } from "@/types";
import { Link } from "@inertiajs/react";
import { EllipsisVertical, Ticket, CalendarDays, CalendarClock, CalendarCheck } from "lucide-react";
import { format } from 'date-fns'

interface DashboardGridProps {
    totalEvents: number;
    upcomingEvents: Event[]
    upcomingEventsCount: number;
    ongoingEvents: number;
    pastEvents: number;
    chartData: Array<{
        date: string;
        total: number;
    }>
}


const DashboardGrid = ({ totalEvents, upcomingEvents, upcomingEventsCount, ongoingEvents, pastEvents, chartData }: DashboardGridProps) => {
    const latestEvents = upcomingEvents.slice(0, 1); // Get the latest 2 events
    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="grid auto-rows-min md:grid-cols-2 xl:grid-cols-5 gap-4">
                {/* Total Events */}
                <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="p-6 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="bg-fuchsia-500 p-4 rounded-full mb-2"><Ticket className="w-6 h-6 text-white" /></span>
                            <EllipsisVertical className="text-slate-500 dark:text-gray-200" />
                        </div>
                        <h1 className="text-lg text-slate-500 dark:text-gray-200">Total Events</h1>
                        <p className="font-bold text-4xl text-blue-900 dark:text-gray-200">{totalEvents}</p>
                    </div>
                </div>
                {/* Upcoming Events */}
                <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="p-6 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="bg-fuchsia-500 p-4 rounded-full mb-2"><CalendarDays className="w-6 h-6 text-white" /></span>
                            <EllipsisVertical className="text-slate-500 dark:text-gray-200" />
                        </div>
                        <h1 className="text-lg text-slate-500 dark:text-gray-200">Upcoming Events</h1>
                        <p className="font-bold text-4xl text-blue-900 dark:text-gray-200">{upcomingEventsCount}</p>
                    </div>
                </div>
                {/* Ongoing Events */}
                <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="p-6 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="bg-fuchsia-500 p-4 rounded-full mb-2"><CalendarClock className="w-6 h-6 text-white" /></span>
                            <EllipsisVertical className="text-slate-500 dark:text-gray-200" />
                        </div>
                        <h1 className="text-lg text-slate-500 dark:text-gray-200">Ongoing Events</h1>
                        <p className="font-bold text-4xl text-blue-900 dark:text-gray-200">{ongoingEvents}</p>
                    </div>
                </div>
                {/* Past Events */}
                <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="p-6 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="bg-fuchsia-500 p-4 rounded-full mb-2"><CalendarCheck className="w-6 h-6 text-white" /></span>
                            <EllipsisVertical className="text-slate-500 dark:text-gray-200" />
                        </div>
                        <h1 className="text-lg text-slate-500 dark:text-gray-200">Past Events</h1>
                        <p className="font-bold text-4xl text-blue-900 dark:text-gray-200">{pastEvents}</p>
                    </div>
                </div>
                {/* Upcoming Event */}
                <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-fuchsia-100/75 dark:bg-fuchsia-100 col-span-2 xl:col-span-1">
                    {upcomingEvents.length > 0 ? (
                        <div className="p-6 space-y-3">
                            <h1 className="text-lg font-bold text-slate-800">Upcoming Event:</h1>
                            {latestEvents.map((event) => (
                                <div key={event.id} className="flex flex-col gap-6 justify-between">
                                    <div>
                                        <h1 className="text-md font-semibold text-slate-800">{event.title}</h1>
                                        <p className="text-sm text-slate-500">{event.location}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex gap-3">
                                            <CalendarDays className="w-10 h-10 text-gray-700 p-3 bg-white rounded-lg" />
                                            <div className="flex flex-col xl:hidden">
                                                <p className="text-slate-800 font-semibold text-sm">{format(event.start_time, 'LLL dd yyyy')}</p>
                                                <p className="text-slate-500 text-sm">{event.start_time}</p>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/dashboard/${event.id}`}
                                            className="px-4 py-2 bg-fuchsia-500 hover:bg-fuchsia-600 transition-colors text-xs text-white rounded-full tracking-wide cursor-pointer flex items-center"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-6">
                            <p className="text-lg">No upcoming events.</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-5">
                <div className="col-span-5 space-y-2">
                    <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-6">
                        <h1 className="text-2xl font-bold">Events Chart</h1>
                        <EventsChart data={chartData} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardGrid;