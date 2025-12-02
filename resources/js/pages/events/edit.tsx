import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";

const EditEventPage = () => {
    return (
        <AppLayout>
            <Head title="Edit Event" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link replace href='/events'>
                    <button
                        type="button"
                        className="cursor-pointer text-blue-500 hover:text-blue-700 transition-colors text-sm"
                    >
                        &larr; Go Back
                    </button>
                </Link>
                <div className="mt-4">

                </div>
            </div>
        </AppLayout>
    );
}

export default EditEventPage;