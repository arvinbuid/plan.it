import AppLayout from "@/layouts/app-layout";
import { Event } from "@/types";
import { Head, Link } from "@inertiajs/react";

interface ShowProps {
    event: {
        data: Event;
    }
}

const Show = ({ event }: ShowProps) => {
    const { data } = event;
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
            </div>
        </AppLayout>
    );
}

export default Show;