"use client"

import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { format } from "date-fns"

interface EventEndTimePickerProps {
    label?: string,
    value: string,
    onChange: (value: string) => void
}

const EventEndTimePicker = ({ label = "Date", value, onChange }: EventEndTimePickerProps) => {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(value ? new Date(value) : undefined)
    const [time, setTime] = useState(value ? format(new Date(value), 'HH:mm:ss') : '10:30:00');

    // Effect to combine date and time
    useEffect(() => {
        if (!date) return
        const [hours, minutes, seconds] = time.split(':').map(Number)
        const combined = new Date(date)
        combined.setHours(hours, minutes, seconds || 0)

        onChange(format(combined, 'yyyy-MM-dd HH:mm:ss'))
    }, [date, time, onChange])

    return (
        <div className="flex justify-between md:justify-start gap-6">
            <div className="flex flex-col gap-3">
                <Label className="px-1">
                    {label}
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-32 justify-between font-normal"
                        >
                            {date ? format(date, 'PPP') : "Select date"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-col gap-3">
                <Label htmlFor="time-picker" className="px-1">
                    Time
                </Label>
                <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
            </div>
        </div>
    )
}

export default EventEndTimePicker
