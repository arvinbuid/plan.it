import AppLayout from "@/layouts/app-layout";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { BreadcrumbItem, User } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { PencilIcon, Trash2Icon } from "lucide-react";

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
    const handleDeleteUser = (userId: number) => { }

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
                                    <TableCell>{user.avatar}</TableCell>
                                    <TableCell>{user.created_at}</TableCell>
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