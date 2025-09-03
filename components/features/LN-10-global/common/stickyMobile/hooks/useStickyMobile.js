import { useState } from 'react';
import { useGestures } from '@ln/ds-hooks';

export function useStickyMobile() {
    const [displaySticky, setDisplaySticky] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleSwipeUp = () => {
        setIsCollapsed(false);
    };

    const handleSwipeDown = () => {
        setIsCollapsed(true);
    };

    const { ref } = useGestures({
        onSwipeUp: handleSwipeUp,
        onSwipeDown: handleSwipeDown
    });

    const closeHandler = () => {
        if (!displaySticky) return;
        if (!isCollapsed) {
            setIsCollapsed(true);
        } else {
            setDisplaySticky(false);
        }
    };

    return {
        closeHandler,
        displaySticky,
        isCollapsed,
        ref
    };
}
