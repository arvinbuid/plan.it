import { usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export function useFlashToast() {
    const { flash } = usePage().props;

    const lastShown = useRef({
        success: null as string | null,
        error: null as string | null,
    });

    useEffect(() => {
        if (flash?.success && flash.success !== lastShown.current.success) {
            toast.success(flash.success);
            lastShown.current.success = flash.success;
        }

        if (flash?.error && flash.error !== lastShown.current.error) {
            toast.error(flash.error);
            lastShown.current.error = flash.error;
        }
    }, [flash?.success, flash?.error]);
}
