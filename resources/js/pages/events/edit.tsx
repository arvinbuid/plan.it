import AppLayout from "@/layouts/app-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Event } from "@/types";
import { FormEventHandler } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import DatePickerRangeAndTimePicker from "@/components/date-picker-range-and-time-picker";

type UpdateEventForm = {
    title: string,
    description: string,
    location: string,
    type: 'academic' | 'extra-curricular' | 'holiday' | 'administrative',
    start_time: string,
    end_time: string
}

const EditEventPage = ({ event }: { event: Event }) => {
    const { data, setData, put, processing, errors, reset } = useForm<Required<UpdateEventForm>>({
        title: event.title,
        description: event.description,
        location: event.location,
        type: event.type,
        start_time: event.start_time,
        end_time: event.end_time
    });

    const handleUpdateEvent: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('events.update', event.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset('title', 'description', 'location')
            }
        })
    }

    return (
        <AppLayout>
            <Head title="Update Event" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link href='/events'>
                    <button
                        type="button"
                        className="cursor-pointer text-blue-500 hover:text-blue-700 transition-colors text-sm"
                    >
                        &larr; Go Back
                    </button>
                </Link>
                <div className="mt-4">
                    <form
                        onSubmit={handleUpdateEvent}

                    >
                        <FieldSet className="max-w-md pl-4">
                            <FieldLegend>Update Event</FieldLegend>
                            <FieldGroup className="mt-2 space-y-1">
                                <Field>
                                    <FieldLabel htmlFor="title">Title</FieldLabel>
                                    <Input
                                        id="title"
                                        name="title"
                                        autoComplete="on"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                    />
                                    {errors.title && <span className="text-xs text-red-500">{errors.title}</span>}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="description">Description</FieldLabel>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        autoComplete="on"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    {errors.description && <span className="text-xs text-red-500">{errors.description}</span>}
                                </Field>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="location">Location</FieldLabel>
                                        <Input
                                            id="location"
                                            name="location"
                                            autoComplete="on"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                        />
                                        {errors.location && <span className="text-xs text-red-500">{errors.location}</span>}
                                    </Field>
                                </div>
                                <div>
                                    <DatePickerRangeAndTimePicker />
                                    {errors.start_time && <span className="text-xs text-red-500">{errors.start_time}</span>}
                                </div>
                                <div>
                                    <Field>
                                        <FieldLabel htmlFor="type">Event Type</FieldLabel>
                                        <Select value={data.type} onValueChange={(value) => setData('type', value as UpdateEventForm['type'])}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="academic">Academic</SelectItem>
                                                <SelectItem value="extra-curricular">Extra Curricular</SelectItem>
                                                <SelectItem value="holiday">Holiday</SelectItem>
                                                <SelectItem value="administrative">Administrative</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                </div>
                                <Field orientation="horizontal">
                                    <Button type="submit" className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50" disabled={processing}>
                                        {processing ? 'Updating...' : 'Update Event'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="cursor-pointer"
                                    >
                                        <Link replace href='/events'>Cancel</Link>
                                    </Button>
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

export default EditEventPage;