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
                <div className='grid grid-cols-12 h-[calc(100vh-150px)]'>
                    {/* Left Side */}
                    <div className='col-span-5'>
                        <div className='mt-20 pl-28 space-y-6 max-w-2xl'>
                            <h2 className='font-playfair text-7xl leading-18 tracking-tighter font-medium'>Make every school <br /><span>events</span> <br /><span className='font-light underline decoration-[1.5px] underline-offset-8 text-[#DFBF4A] italic'>nice.</span></h2>
                            <p className='text-lg text-[#626162]'>From the bottom to the summit. Effortlessly manage school events, meetings with a platform design for grandeur.</p>
                            <Link>
                                <button className='flex items-center gap-3 px-8 py-4 bg-[#531527] text-[#DAC0C8] uppercase text-sm tracking-wider font-semibold'>Get Started <span className='w-2 h-2 rounded-full bg-[#E4C967]'></span></button>
                            </Link>
                        </div>
                    </div>
                    {/* Right Side */}
                    <div className='col-span-7 flex items-center'>
                        <img src='/images/project-showcase.png' alt='Hero Image' className='border-6 border-[#531527] rounded-xl translate-x-32 h-[88%] object-cover' />
                    </div>
                </div>
            </div>
        </>
    );
}
