import { useDarkMode } from "@/hooks/useDarkMode";

export default function AppLogo() {
    const defaultLogo = '/images/logo-default.svg';
    const darkModeLogo = '/images/logo-dark.svg';
    const isDarkMode = useDarkMode();

    return (
        <>
            <div className="flex aspect-square size-6 items-center justify-center rounded-md text-sidebar-primary-foreground">
                <img src={isDarkMode ? darkModeLogo : defaultLogo} alt='App Logo' />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Plan.it
                </span>
            </div>
        </>
    );
}
