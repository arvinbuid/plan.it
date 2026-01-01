import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { router } from "@inertiajs/react"

interface EventsPaginationProps {
    prev_page_url: string | null
    next_page_url: string | null
    pages: number[]
    current_page: number
    last_page: number
}

const EventsPagination = ({ prev_page_url, next_page_url, pages, current_page, last_page, }: EventsPaginationProps) => {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {prev_page_url ? (
                        <PaginationPrevious
                            className='cursor-pointer'
                            onClick={(e) => {
                                e.preventDefault()
                                router.visit(prev_page_url, {
                                    preserveScroll: true,
                                    preserveState: true
                                })
                            }}
                        />
                    ) : (
                        <PaginationPrevious className="pointer-events-none opacity-50" aria-disabled />
                    )}
                </PaginationItem>
                {/* Left ellipsis */}
                {current_page >= 2 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                {/* Page numbers (3 maximum) */}
                {pages.map((page, idx) => (
                    <PaginationItem key={idx}>
                        <PaginationLink
                            isActive={page === current_page}
                            className='cursor-pointer'
                            onClick={(e) => {
                                e.preventDefault()
                                router.visit(route('events.index', { page }), {
                                    preserveScroll: true,
                                    preserveState: true
                                })
                            }}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {/* Right ellipsis */}
                {current_page < last_page - 1 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                {/* Next */}
                <PaginationItem>
                    {next_page_url ? (
                        <PaginationNext
                            className='cursor-pointer'
                            onClick={(e) => {
                                e.preventDefault()
                                router.visit(next_page_url, {
                                    preserveScroll: true,
                                    preserveState: true
                                })
                            }}
                        />
                    ) : (
                        <PaginationNext className="pointer-events-none opacity-50" aria-disabled />
                    )}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default EventsPagination;