import { useEffect, useState } from "react";

export function useDarkMode() {
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

    return isDarkMode;
}