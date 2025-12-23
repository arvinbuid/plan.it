import EventsChart from "@/components/events-chart";
import { EllipsisVertical, Ticket, CalendarDays, CalendarClock, CalendarCheck } from "lucide-react";

interface DashboardGridProps {
    totalEvents: number;
    upcomingEventsCount: number;
    ongoingEvents: number;
    pastEvents: number;
    chartData: Array<{
        date: string;
        total: number;
    }>
}


const DashboardGrid = ({ totalEvents, upcomingEventsCount, ongoingEvents, pastEvents, chartData }: DashboardGridProps) => {
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
                <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="p-6">
                        <h1 className="text-xl font-bold">Upcoming Events</h1>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-5">
                <div className="col-span-5 md:col-span-4 space-y-2">
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