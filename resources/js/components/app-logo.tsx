import { useEffect, useState } from "react";

export default function AppLogo() {
    const [isDarkMode, setIsDarkMode] = useState(
        document.documentElement.classList.contains('dark')
    )

    // Effect to watch changes being made to the DOM tree
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDarkMode(document.documentElement.classList.contains('dark'))
        })

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'] // only watch for changes to the 'class' attribute
        });

        return () => observer.disconnect();
    }, [])

    const defaultLogo = 'images/logo-default.svg';
    const darkModeLogo = 'images/logo-dark.svg';

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
