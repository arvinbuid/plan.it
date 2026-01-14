import AppLayout from "@/layouts/app-layout";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { BreadcrumbItem, User } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { format } from "date-fns";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard'
    },
    {
        title: 'Users',
        href: '/users'
    }
]

interface IndexProps {
    users: User[];
}

const Index = ({ users }: IndexProps) => {
    const handleDeleteUser = (userId: number) => {
        if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            router.delete(route('users.destroy', userId))
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mt-2 flex justify-between">
                    <Link href='/users/create'>
                        <Button
                            variant='outline'
                            className='cursor-pointer'
                        >
                            Create New User
                        </Button>
                    </Link>
                </div>
                <Table className='mt-4'>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Avatar</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => {
                            return (
                                <TableRow key={user.id}>
                                    <TableCell className='font-medium cursor-pointer' onClick={() => router.get(`/users/${user.id}`)}>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={`/storage/${user.avatar}`} />
                                            <AvatarFallback>NA</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{format(user.created_at, "dd/MM/yyyy")}</TableCell>
                                    <TableCell>
                                        <Link href={`/users/${user.id}/edit`}>
                                            <Button
                                                variant='secondary'
                                                className='mr-2 cursor-pointer'
                                            >
                                                <PencilIcon />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant='destructive'
                                            onClick={() => handleDeleteUser(user.id)}
                                            className='cursor-pointer'
                                        >
                                            <Trash2Icon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}

export default Index;