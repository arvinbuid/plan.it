import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col bg-[#FFFAF5] text-[#3F101E] font-monserrat">
                <header className="flex items-center justify-between text-3xl not-has-[nav]:hidden bg-[#FFFAF5] h-[100px] shadow-md/5 px-[120px]">
                    <nav className='flex justify-between w-full'>
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <h1 className='text-3xl font-playfair font-bold text-[#3F101E]'>Laravel + <span className='text-[#746326]'>React</span></h1>
                                <div className='flex items-center gap-9 font-medium'>
                                    <Link className='uppercase text-[16px]'><p>Philosophy</p></Link>
                                    <Link className='uppercase text-[16px]'><p>Features</p></Link>
                                    <Link className='uppercase text-[16px]'><p>About</p></Link>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Link
                                        href={login()}
                                        className="inline-block rounded-xs border border-[#746326] text-[#746326] px-6 py-2.5 text-xs leading-normal uppercase font-medium"
                                    >
                                        Log in
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="inline-block rounded-xs border border-[#531527] bg-[#531527] text-[#DAC0C8] px-6 py-2.5 text-xs leading-normal uppercase font-medium"
                                        >
                                            Register
                                        </Link>
                                    )}
                                </div>
                            </>
                        )}
                    </nav>
                </header>
            </div>
        </>
    );
}
