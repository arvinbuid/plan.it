export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-6 items-center justify-center rounded-md text-sidebar-primary-foreground">
                <img src={'/images/app-logo.svg'} alt='App Logo' />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Plan.it
                </span>
            </div>
        </>
    );
}
