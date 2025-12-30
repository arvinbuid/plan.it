"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
    start: Date | undefined;
    end: Date | undefined;
    onStartChange: (start: Date | undefined) => void
    onEndChange: (end: Date | undefined) => void
}

const DatePickerRangeAndTimePicker = ({ start, end, onStartChange, onEndChange }: Props) => {
    const [openFrom, setOpenFrom] = useState(false)
    const [openTo, setOpenTo] = useState(false)

    const hours = Array.from({ length: 12 }, (_, i) => i + 1);

    const handleTimeChange = (
        date: Date | undefined,
        type: "hour" | "minute" | "ampm",
        value: string,
        onChange: (d: Date | undefined) => void
    ) => {
        if (!date) return;
        const newDate = new Date(date);
        if (type === "hour") {
            newDate.setHours((parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0));
        } else if (type === "minute") {
            newDate.setMinutes(parseInt(value));
        } else if (type === "ampm") {
            const currentHours = newDate.getHours();
            newDate.setHours(
                value === "PM" ? currentHours + 12 : currentHours - 12
            );
        }
        onChange(newDate);
    };

    return (
        <div className='flex w-full max-w-64 min-w-0 flex-col gap-6'>
            {/* Start Date & Time */}
            <div className='flex gap-4'>
                <div className='flex flex-1 flex-col gap-3'>
                    <Label htmlFor='date-from' className='px-1'>
                        Start Date
                    </Label>
                    <Popover open={openFrom} onOpenChange={setOpenFrom}>
                        <PopoverTrigger asChild>
                            <Button
                                variant='outline'
                                id='date-from'
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !start && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {start ? (
                                    format(start, "MM/dd/yyyy hh:mm aa")
                                ) : (
                                    <span>MM/DD/YYYY hh:mm aa</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto overflow-hidden p-0 flex flex-col sm:flex-row' align='start'>
                            <Calendar
                                mode='single'
                                selected={start}
                                onSelect={onStartChange}
                            />
                            <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                                <ScrollArea className="w-64 sm:w-auto">
                                    <div className="flex sm:flex-col p-2">
                                        {[...hours].reverse().map((hour) => (
                                            <Button
                                                key={hour}
                                                size="icon"
                                                variant={start && start.getHours() % 12 === hour % 12 ? "default" : "ghost"}
                                                className="sm:w-full shrink-0 aspect-square"
                                                onClick={() => handleTimeChange(start, "hour", hour.toString(), onStartChange)}
                                            >
                                                {hour}
                                            </Button>
                                        ))}
                                    </div>
                                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                                </ScrollArea>
                                <ScrollArea className="w-64 sm:w-auto">
                                    <div className="flex sm:flex-col p-2">
                                        {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                                            <Button
                                                key={minute}
                                                size="icon"
                                                variant={start && start.getMinutes() === minute ? "default" : "ghost"}
                                                className="sm:w-full shrink-0 aspect-square"
                                                onClick={() => handleTimeChange(start, 'minute', minute.toString(), onStartChange)}
                                            >
                                                {minute.toString().padStart(2, '0')}
                                            </Button>
                                        ))}
                                    </div>
                                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                                </ScrollArea>
                                <ScrollArea className="">
                                    <div className="flex sm:flex-col p-2">
                                        {["AM", "PM"].map((ampm) => (
                                            <Button
                                                key={ampm}
                                                size="icon"
                                                variant={
                                                    start &&
                                                        ((ampm === "AM" && start.getHours() < 12) ||
                                                            (ampm === "PM" && start.getHours() >= 12))
                                                        ? "default"
                                                        : "ghost"
                                                }
                                                className="sm:w-full shrink-0 aspect-square"
                                                onClick={() => handleTimeChange(start, 'ampm', ampm, onStartChange)}
                                            >
                                                {ampm}
                                            </Button>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            {/* End Date & Time */}
            <div className='flex gap-4'>
                <div className='flex flex-1 flex-col gap-3'>
                    <Label htmlFor='date-to' className='px-1'>
                        End Date
                    </Label>
                    <Popover open={openTo} onOpenChange={setOpenTo}>
                        <PopoverTrigger asChild>
                            <Button
                                variant='outline'
                                id='date-to'
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !end && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {end ? (
                                    format(end, "MM/dd/yyyy hh:mm aa")
                                ) : (
                                    <span>MM/DD/YYYY hh:mm aa</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto overflow-hidden p-0 flex flex-col sm:flex-row' align='start'>
                            <Calendar
                                mode='single'
                                selected={end}
                                onSelect={onEndChange}
                                disabled={start && { before: start }}
                            />
                            <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                                <ScrollArea className="w-64 sm:w-auto">
                                    <div className="flex sm:flex-col p-2">
                                        {[...hours].reverse().map((hour) => (
                                            <Button
                                                key={hour}
                                                size="icon"
                                                variant={end && end.getHours() % 12 === hour % 12 ? "default" : "ghost"}
                                                className="sm:w-full shrink-0 aspect-square"
                                                onClick={() => handleTimeChange(end, "hour", hour.toString(), onEndChange)}
                                            >
                                                {hour}
                                            </Button>
                                        ))}
                                    </div>
                                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                                </ScrollArea>
                                <ScrollArea className="w-64 sm:w-auto">
                                    <div className="flex sm:flex-col p-2">
                                        {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                                            <Button
                                                key={minute}
                                                size="icon"
                                                variant={end && end.getMinutes() === minute ? "default" : "ghost"}
                                                className="sm:w-full shrink-0 aspect-square"
                                                onClick={() => handleTimeChange(end, 'minute', minute.toString(), onEndChange)}
                                            >
                                                {minute.toString().padStart(2, '0')}
                                            </Button>
                                        ))}
                                    </div>
                                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                                </ScrollArea>
                                <ScrollArea className="">
                                    <div className="flex sm:flex-col p-2">
                                        {["AM", "PM"].map((ampm) => (
                                            <Button
                                                key={ampm}
                                                size="icon"
                                                variant={
                                                    end &&
                                                        ((ampm === "AM" && end.getHours() < 12) ||
                                                            (ampm === "PM" && end.getHours() >= 12))
                                                        ? "default"
                                                        : "ghost"
                                                }
                                                className="sm:w-full shrink-0 aspect-square"
                                                onClick={() => handleTimeChange(end, 'ampm', ampm, onEndChange)}
                                            >
                                                {ampm}
                                            </Button>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    )
}

export default DatePickerRangeAndTimePicker
