import { useEffect, useRef, useState } from 'react';

async function getMicPermissionState() {
    try {
        if (typeof navigator === 'undefined' || !navigator.permissions?.query) {
            return null;
        }

        const status = await navigator.permissions.query({
            name: 'microphone'
        });

        return status?.state ?? null;
    } catch {
        return null;
    }
}

export const useListeningTimer = isListening => {
    const [seconds, setSeconds] = useState(0);
    const [canCount, setCanCount] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        let mounted = true;

        const resolvePermission = async () => {
            if (!isListening) {
                setCanCount(false);
                return;
            }

            const perm = await getMicPermissionState();

            if (perm === 'prompt') {
                if (mounted) setCanCount(false);
                return;
            }

            if (mounted) setCanCount(true);
        };

        resolvePermission();

        return () => {
            mounted = false;
        };
    }, [isListening]);

    useEffect(() => {
        if (canCount) {
            intervalRef.current = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            setSeconds(0);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [canCount]);

    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');

    return `${minutes}:${secs}`;
};
