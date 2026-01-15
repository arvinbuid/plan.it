import AppLayout from "@/layouts/app-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@/types";

type UpdateUserForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    avatar: string | undefined;
}

const EditUser = ({ user }: { user: User }) => {
    const { data, setData, put, processing, errors, reset } = useForm<Required<UpdateUserForm>>({
        name: user.name,
        email: user.email,
        password: "",
        password_confirmation: "",
        avatar: user.avatar
    })

    const handleUpdateUser: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('users.update', user.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset('name', 'email', 'password', 'password_confirmation')
            }
        })
    }

    return (
        <AppLayout>
            <Head title="Update User" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link replace href='/users'>
                    <button
                        type="button"
                        className="cursor-pointer text-blue-500 hover:text-blue-700 transition-colors text-sm"
                    >
                        &larr; Go Back
                    </button>
                </Link>
                <div className="mt-4">
                    <form
                        onSubmit={handleUpdateUser}

                    >
                        <FieldSet className="max-w-md pl-4">
                            <FieldLegend>Update User</FieldLegend>
                            <FieldGroup className="mt-2 space-y-1">
                                <Field>
                                    <FieldLabel htmlFor="name">Name</FieldLabel>
                                    <Input
                                        id="name"
                                        name="name"
                                        autoComplete="on"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input
                                        id="email"
                                        name="email"
                                        autoComplete="on"
                                        placeholder="johndoe@example.com"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Input
                                        type="password"
                                        id="password"
                                        name="password"
                                        autoComplete="on"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    {errors.password && <span className="text-xs text-red-500">{errors.password}</span>}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="password_confirmation">Confirm Password</FieldLabel>
                                    <Input
                                        type="password"
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        autoComplete="on"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                    {errors.password_confirmation && <span className="text-xs text-red-500">{errors.password_confirmation}</span>}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="avatar">Avatar</FieldLabel>
                                    <Input
                                        type="file"
                                        id="avatar"
                                        name="avatar"
                                        onChange={(e) => {
                                            if (e.target.files) {
                                                setData('avatar', e.target.files[0]);
                                            }
                                        }
                                        }
                                    />
                                    {errors.avatar && <span className="text-xs text-red-500">{errors.avatar}</span>}
                                </Field>
                                <Field orientation="horizontal">
                                    <Button type="submit" className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50" disabled={processing}>
                                        {processing ? 'Updating...' : 'Update User'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="cursor-pointer"
                                        onClick={() => {
                                            reset()
                                        }}
                                    >
                                        Cancel
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

export default EditUser;