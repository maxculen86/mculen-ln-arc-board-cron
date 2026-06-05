import { useEffect, useRef, useState } from 'react';
import { getMicPermissionState } from './getMicPermissionState';

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
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setSeconds(0);
        }

        return () => clearInterval(intervalRef.current);
    }, [canCount]);

    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');

    return `${minutes}:${secs}`;
};
