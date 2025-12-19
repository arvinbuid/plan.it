import { EllipsisVertical, Ticket } from "lucide-react";

interface DashboardGridProps {
    totalEvents: number;
}

const DashboardGrid = ({ totalEvents }: DashboardGridProps) => {
    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">

                <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="p-6 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="bg-fuchsia-500 p-4 rounded-full mb-2"><Ticket className="w-6 h-6 text-white" /></span>
                            <EllipsisVertical className="text-slate-500 dark:text-gray-200" />
                        </div>
                        <h1 className="text-lg text-slate-500 dark:text-gray-200">Total Events</h1>
                        <p className="font-bold text-4xl text-blue-900 dark:text-gray-200">{totalEvents}</p>
                    </div>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">

                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">

                </div>
            </div>
            <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">

            </div>
        </div>
    );
}

export default DashboardGrid;